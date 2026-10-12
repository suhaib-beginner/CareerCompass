import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { SkillLevel, SkillItem } from '../types';
import {
  Compass,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Target,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  Search,
  Check
} from 'lucide-react';

export const SkillsAnalyzerView: React.FC = () => {
  const {
    skills,
    updateSkillLevel,
    profile,
    updateProfile,
    priorityGaps,
    skillsMasteredCount,
    readinessScore,
    addTask,
    setActiveView
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [taskAddedSkill, setTaskAddedSkill] = useState<string | null>(null);

  const categories = ['All', 'Languages', 'Problem Solving', 'Core CS', 'Development'];
  const levels: SkillLevel[] = ['Unexplored', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredSkills = skills.filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCreateTaskFromGap = (skill: SkillItem) => {
    addTask(
      skill.category === 'Problem Solving' ? 'DSA' : 'Projects',
      `Master missing gap: ${skill.name} fundamentals & high-frequency interview patterns`,
      60,
      'High'
    );
    setTaskAddedSkill(skill.id);
    setTimeout(() => setTaskAddedSkill(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / Goal Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Placement Skill Compass</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Skill Gap Diagnostic Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track and calibrate your competence against the exact requirements demanded by {profile.targetPackage} recruiters.
          </p>
        </div>

        {/* Readiness Pill */}
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-sm">
              {readinessScore}%
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Placement Readiness</p>
              <p className="text-[11px] text-slate-500">{skillsMasteredCount} / {skills.length} Mastered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'All' ? skills.length : skills.filter(s => s.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search skills, algorithms, frameworks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-hidden bg-white text-slate-900 font-medium"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSkills.map(skill => {
          const requiredLevel = skill.requiredFor[profile.targetPackage];
          const isGap = 
            (requiredLevel === 'Advanced' && (skill.level === 'Unexplored' || skill.level === 'Beginner' || skill.level === 'Intermediate')) ||
            (requiredLevel === 'Intermediate' && (skill.level === 'Unexplored' || skill.level === 'Beginner')) ||
            (requiredLevel === 'Beginner' && skill.level === 'Unexplored');
          const isMastered = skill.level === 'Advanced' || (!isGap && skill.level !== 'Unexplored');

          return (
            <div
              key={skill.id}
              className={`p-5 rounded-2xl border transition-all ${
                isGap
                  ? 'bg-white border-rose-200/90 shadow-xs'
                  : 'bg-white border-slate-200/90 shadow-xs'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Skill Details */}
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-extrabold text-base text-slate-900">{skill.name}</h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {skill.category}
                    </span>
                    {isGap ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-500" />
                        Priority Gap for {profile.targetPackage}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Requirement Met
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {skill.description}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium pt-1">
                    <span>Target Minimum: <strong className="text-indigo-600">{requiredLevel}</strong></span>
                    <span>•</span>
                    <span>Recommended Practice: {skill.recommendedHours} hrs</span>
                  </div>
                </div>

                {/* Level Stepper & Quick Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                  
                  {/* Stepper Buttons */}
                  <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 gap-1">
                    {levels.map(lvl => {
                      const isCurrent = skill.level === lvl;
                      return (
                        <button
                          key={lvl}
                          onClick={() => updateSkillLevel(skill.id, lvl)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                          }`}
                        >
                          {lvl}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add to Daily Planner Button if Gap */}
                  {isGap && (
                    <button
                      onClick={() => handleCreateTaskFromGap(skill)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      {taskAddedSkill === skill.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Scheduled!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Schedule Sprint</span>
                        </>
                      )}
                    </button>
                  )}

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
