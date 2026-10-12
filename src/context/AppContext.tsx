import React, { createContext, useContext, useState, useMemo } from 'react';
import type {
  StudentProfile,
  SkillItem,
  Company,
  PlannerTask,
  TargetPackage,
  SkillLevel,
  ViewType,
  ThemeMode
} from '../types';
import {
  initialStudentProfile,
  initialSkills,
  mockCompanies,
  initialDailyTasks
} from '../data/mockData';
import { CareerCompassApi } from '../services/api';

interface AppContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  skills: SkillItem[];
  updateSkillLevel: (skillId: string, level: SkillLevel) => void;
  companies: Company[];
  tasks: PlannerTask[];
  toggleTask: (taskId: string) => void;
  addTask: (domain: PlannerTask['domain'], title: string, durationMinutes: number, priority: PlannerTask['priority']) => void;
  deleteTask: (taskId: string) => void;
  isLiveBackend: boolean;
  
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;

  // Derived state
  readinessScore: number;
  skillsMasteredCount: number;
  priorityGaps: {
    skill: SkillItem;
    current: SkillLevel;
    required: SkillLevel;
    gapSeverity: 'High' | 'Medium' | 'Low';
  }[];
  hoursAllocation: {
    dsaHours: number;
    aptitudeHours: number;
    projectHours: number;
    communicationHours: number;
  };
  eligibleCompaniesCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const levelNumericMap: Record<SkillLevel, number> = {
  'Unexplored': 0,
  'Beginner': 1,
  'Intermediate': 2,
  'Advanced': 3,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewType>('landing');
  const [isLiveBackend, setIsLiveBackend] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('careercompass-theme');
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('careercompass-theme', theme);
    } catch {}
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev: ThemeMode) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [profile, setProfile] = useState<StudentProfile>(initialStudentProfile);
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills);
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [tasks, setTasks] = useState<PlannerTask[]>(initialDailyTasks);

  // Sync with Spring Boot backend on mount if reachable
  React.useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const healthy = await CareerCompassApi.isBackendHealthy();
        if (healthy && isMounted) {
          setIsLiveBackend(true);
          const [backendProfile, backendSkills, backendCompanies, backendTasks] = await Promise.all([
            CareerCompassApi.getProfile().catch(() => null),
            CareerCompassApi.getSkills().catch(() => null),
            CareerCompassApi.getCompanies().catch(() => null),
            CareerCompassApi.getTasks().catch(() => null),
          ]);
          if (isMounted) {
            if (backendProfile) setProfile(backendProfile);
            if (backendSkills && backendSkills.length > 0) setSkills(backendSkills);
            if (backendCompanies && backendCompanies.length > 0) setCompanies(backendCompanies);
            if (backendTasks && backendTasks.length > 0) setTasks(backendTasks);
          }
        }
      } catch (e) {
        // Fall back gracefully to local state
        console.info('CareerCompass running with local store (Spring Boot backend offline).', e);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updates };
      CareerCompassApi.updateProfile(next).catch(() => {});
      return next;
    });
  };

  const updateSkillLevel = (skillId: string, level: SkillLevel) => {
    setSkills(prev =>
      prev.map(item => (item.id === skillId ? { ...item, level } : item))
    );
    CareerCompassApi.updateSkillLevel(skillId, level).catch(() => {});
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          if (newCompleted) {
            setProfile(p => ({ ...p, completedTasksCount: p.completedTasksCount + 1 }));
          } else {
            setProfile(p => ({ ...p, completedTasksCount: Math.max(0, p.completedTasksCount - 1) }));
          }
          return { ...task, completed: newCompleted };
        }
        return task;
      })
    );
    CareerCompassApi.toggleTask(taskId).catch(() => {});
  };

  const addTask = (
    domain: PlannerTask['domain'],
    title: string,
    durationMinutes: number,
    priority: PlannerTask['priority']
  ) => {
    const newTask: PlannerTask = {
      id: `task-${Date.now()}`,
      domain,
      title,
      durationMinutes,
      completed: false,
      priority,
      dueTime: 'Today',
    };
    setTasks(prev => [newTask, ...prev]);
    CareerCompassApi.createTask({
      domain,
      title,
      durationMinutes,
      priority,
      dueTime: 'Today',
    }).catch(() => {});
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    CareerCompassApi.deleteTask(taskId).catch(() => {});
  };

  // Skill Gaps & Readiness Calculation
  const { priorityGaps, skillsMasteredCount, readinessScore } = useMemo(() => {
    const target = profile.targetPackage;
    let totalScore = 0;
    let maxPossibleScore = 0;
    let masteredCount = 0;
    const gaps: AppContextType['priorityGaps'] = [];

    skills.forEach(skill => {
      const currentVal = levelNumericMap[skill.level];
      const requiredLevel = skill.requiredFor[target];
      const requiredVal = levelNumericMap[requiredLevel];

      maxPossibleScore += Math.max(1, requiredVal);
      totalScore += Math.min(currentVal, requiredVal);

      if (currentVal >= requiredVal && requiredVal > 0) {
        masteredCount++;
      } else if (currentVal < requiredVal) {
        const diff = requiredVal - currentVal;
        gaps.push({
          skill,
          current: skill.level,
          required: requiredLevel,
          gapSeverity: diff >= 2 ? 'High' : 'Medium',
        });
      }
    });

    // Score based on skills match (70%) + CGPA factor (20%) + Daily dedication (10%)
    const skillRatio = maxPossibleScore > 0 ? totalScore / maxPossibleScore : 0.5;
    const cgpaRatio = Math.min(1, Math.max(0, (profile.cgpa - 6.0) / 4.0));
    const hoursRatio = Math.min(1, profile.dailyStudyHours / 6.0);

    const calculatedPct = Math.round(
      (skillRatio * 70) + (cgpaRatio * 20) + (hoursRatio * 10)
    );

    return {
      priorityGaps: gaps,
      skillsMasteredCount: masteredCount,
      readinessScore: Math.min(98, Math.max(25, calculatedPct)),
    };
  }, [skills, profile.targetPackage, profile.cgpa, profile.dailyStudyHours]);

  // Derived Hours Allocation
  const hoursAllocation = useMemo(() => {
    const total = profile.dailyStudyHours;
    return {
      dsaHours: Number((total * 0.40).toFixed(1)),
      aptitudeHours: Number((total * 0.20).toFixed(1)),
      projectHours: Number((total * 0.25).toFixed(1)),
      communicationHours: Number((total * 0.15).toFixed(1)),
    };
  }, [profile.dailyStudyHours]);

  // Eligible Companies Count
  const eligibleCompaniesCount = useMemo(() => {
    return companies.filter(c => profile.cgpa >= c.minCgpa).length;
  }, [companies, profile.cgpa]);

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        profile,
        updateProfile,
        skills,
        updateSkillLevel,
        companies,
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        readinessScore,
        skillsMasteredCount,
        priorityGaps,
        hoursAllocation,
        eligibleCompaniesCount,
        isLiveBackend,
        theme,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
