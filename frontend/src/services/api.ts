import type {
  StudentProfile,
  SkillItem,
  Company,
  PlannerTask,
  TechnicalTopic,
  BehavioralQuestion,
  SkillLevel
} from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Helper to safely perform fetch requests with error handling and timeouts
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API Error [${response.status}] ${response.statusText}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}

export const CareerCompassApi = {
  // Check if Spring Boot backend is active
  async isBackendHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/profile`, { method: 'GET', signal: AbortSignal.timeout(3000) });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Student Profile
  async getProfile(): Promise<StudentProfile> {
    return apiFetch<StudentProfile>('/profile');
  },

  async updateProfile(updates: Partial<StudentProfile>): Promise<StudentProfile> {
    return apiFetch<StudentProfile>('/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Skills
  async getSkills(): Promise<SkillItem[]> {
    return apiFetch<SkillItem[]>('/skills');
  },

  async updateSkillLevel(skillId: string, level: SkillLevel): Promise<SkillItem> {
    return apiFetch<SkillItem>(`/skills/${skillId}/level`, {
      method: 'PUT',
      body: JSON.stringify({ level }),
    });
  },

  // Companies
  async getCompanies(): Promise<Company[]> {
    return apiFetch<Company[]>('/companies');
  },

  // Tasks
  async getTasks(): Promise<PlannerTask[]> {
    return apiFetch<PlannerTask[]>('/tasks');
  },

  async createTask(task: {
    domain: PlannerTask['domain'];
    title: string;
    durationMinutes: number;
    priority: PlannerTask['priority'];
    dueTime?: string;
  }): Promise<PlannerTask> {
    return apiFetch<PlannerTask>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  },

  async toggleTask(taskId: string): Promise<PlannerTask> {
    return apiFetch<PlannerTask>(`/tasks/${taskId}/toggle`, {
      method: 'PATCH',
    });
  },

  async deleteTask(taskId: string): Promise<void> {
    await apiFetch<void>(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  },

  // Technical & Behavioral Interview
  async getTechnicalTopics(): Promise<TechnicalTopic[]> {
    return apiFetch<TechnicalTopic[]>('/interview/technical');
  },

  async getBehavioralQuestions(): Promise<BehavioralQuestion[]> {
    return apiFetch<BehavioralQuestion[]>('/interview/behavioral');
  },

  async updateBehavioralNotes(questionId: string, userNotes: string): Promise<BehavioralQuestion> {
    return apiFetch<BehavioralQuestion>(`/interview/behavioral/${questionId}/notes`, {
      method: 'PUT',
      body: JSON.stringify({ userNotes }),
    });
  },

  // Analytics
  async getReadinessAnalytics(): Promise<{
    readinessScore: number;
    skillsMasteredCount: number;
    totalSkillsCount: number;
    eligibleCompaniesCount: number;
    totalCompaniesCount: number;
    priorityGaps: Array<{
      skill: SkillItem;
      currentLevel: SkillLevel;
      requiredLevel: SkillLevel;
      gapSeverity: 'High' | 'Medium' | 'Low';
    }>;
    hoursAllocation: {
      dsaHours: number;
      aptitudeHours: number;
      projectHours: number;
      communicationHours: number;
    };
  }> {
    return apiFetch('/analytics/readiness');
  },
};
