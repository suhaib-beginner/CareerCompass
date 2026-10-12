import React, { useState, useEffect } from 'react';
import {
  mockTechnicalTopics,
  mockBehavioralQuestions
} from '../data/mockData';
import { CareerCompassApi } from '../services/api';
import type { TechnicalTopic, BehavioralQuestion } from '../types';
import {
  Compass,
  GraduationCap,
  Code2,
  Users,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Layers,
  Save,
  BookmarkCheck,
  Check
} from 'lucide-react';

export const InterviewPrepView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'technical' | 'behavioral'>('technical');
  const [techCategory, setTechCategory] = useState<string>('All');
  const [expandedTechId, setExpandedTechId] = useState<string | null>('tech-dsa-trees');
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  // Technical topics and Behavioral questions state with editable notes
  const [technicalTopics, setTechnicalTopics] = useState<TechnicalTopic[]>(mockTechnicalTopics);
  const [questions, setQuestions] = useState<BehavioralQuestion[]>(mockBehavioralQuestions);
  const [expandedBehavioralId, setExpandedBehavioralId] = useState<string | null>('beh-conflict');
  const [savedNotesAlert, setSavedNotesAlert] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      CareerCompassApi.getTechnicalTopics().catch(() => null),
      CareerCompassApi.getBehavioralQuestions().catch(() => null),
    ]).then(([backendTech, backendQuestions]) => {
      if (mounted) {
        if (backendTech && backendTech.length > 0) setTechnicalTopics(backendTech);
        if (backendQuestions && backendQuestions.length > 0) setQuestions(backendQuestions);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const toggleTechExpand = (id: string) => {
    setExpandedTechId(prev => (prev === id ? null : id));
  };

  const toggleHint = (questionIndex: string) => {
    setRevealedHints(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

  const toggleBehavioralExpand = (id: string) => {
    setExpandedBehavioralId(prev => (prev === id ? null : id));
  };

  const handleNotesChange = (id: string, notes: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, userNotes: notes } : q))
    );
  };

  const handleSaveNotes = (id: string) => {
    const target = questions.find(q => q.id === id);
    if (target) {
      CareerCompassApi.updateBehavioralNotes(id, target.userNotes || '').catch(() => {});
    }
    setSavedNotesAlert(id);
    setTimeout(() => setSavedNotesAlert(null), 2500);
  };

  const filteredTech = technicalTopics.filter(
    t => techCategory === 'All' || t.category === techCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-violet-600" />
            <span>Placement Interview Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Technical Rounds & Behavioral STAR Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Curated high-frequency problem sets and structured STAR storytelling frameworks calibrated for Tier-1 recruiters.
          </p>
        </div>

        {/* Tab Toggle Switch */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 gap-1.5">
          <button
            onClick={() => setActiveTab('technical')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'technical'
                ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Technical Question Bank</span>
          </button>
          <button
            onClick={() => setActiveTab('behavioral')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'behavioral'
                ? 'bg-white text-violet-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Behavioral STAR Simulator</span>
          </button>
        </div>
      </div>

      {/* TECHNICAL TAB CONTENT */}
      {activeTab === 'technical' && (
        <div className="space-y-6">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['All', 'DSA', 'System Design', 'Core CS'].map(cat => (
              <button
                key={cat}
                onClick={() => setTechCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  techCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Technical Topics Accordion */}
          <div className="space-y-4">
            {filteredTech.map(topic => {
              const isExpanded = expandedTechId === topic.id;

              return (
                <div
                  key={topic.id}
                  className={`bg-white rounded-3xl border transition-all ${
                    isExpanded ? 'border-indigo-300 shadow-md ring-1 ring-indigo-100' : 'border-slate-200/90 shadow-xs hover:border-slate-300'
                  }`}
                >
                  {/* Topic Row Header */}
                  <div
                    onClick={() => toggleTechExpand(topic.id)}
                    className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {topic.category}
                        </span>
                        <h3 className="font-extrabold text-base text-slate-900">{topic.title}</h3>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          topic.difficulty === 'Hard'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : topic.difficulty === 'Medium'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {topic.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{topic.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                        {topic.sampleQuestions.length} Questions
                      </span>
                      <div className="p-2 rounded-xl border border-slate-200 text-slate-500">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-slate-100 space-y-6 animate-in fade-in">
                      
                      {/* Core Concepts */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Must-Know Core Concepts
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {topic.coreConcepts.map(c => (
                            <span
                              key={c}
                              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Sample Questions & Hints */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                          High-Frequency Interview Problems
                        </p>
                        <div className="space-y-3">
                          {topic.sampleQuestions.map((q, idx) => {
                            const hintKey = `${topic.id}-${idx}`;
                            const isHintVisible = !!revealedHints[hintKey];

                            return (
                              <div
                                key={idx}
                                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2.5">
                                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                      {idx + 1}
                                    </span>
                                    <p className="text-xs font-bold text-slate-800">{q.question}</p>
                                  </div>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                                    q.frequency === 'Very High'
                                      ? 'bg-rose-100 text-rose-800'
                                      : 'bg-indigo-100 text-indigo-800'
                                  }`}>
                                    {q.frequency} Frequency
                                  </span>
                                </div>

                                {/* Hint Button & Content */}
                                <div className="pt-1">
                                  <button
                                    onClick={() => toggleHint(hintKey)}
                                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                                  >
                                    <Lightbulb className="w-3.5 h-3.5" />
                                    <span>{isHintVisible ? 'Hide Solution Hint' : 'Reveal Solution Hint'}</span>
                                  </button>

                                  {isHintVisible && (
                                    <div className="mt-2 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
                                      <strong>Approach Hint:</strong> {q.hint}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* BEHAVIORAL STAR TAB CONTENT */}
      {activeTab === 'behavioral' && (
        <div className="space-y-6">
          
          <div className="p-5 rounded-2xl bg-violet-50/60 border border-violet-200 text-xs text-violet-900 leading-relaxed">
            <strong>The STAR Framework:</strong> Top engineering recruiters evaluate leadership, ownership, and conflict resolution by examining your <em>Situation</em>, <em>Task</em>, <em>Action</em>, and measurable <em>Result</em>. Review curated responses and tailor your own personal anecdotes below.
          </div>

          <div className="space-y-4">
            {questions.map(item => {
              const isExpanded = expandedBehavioralId === item.id;
              const isSaved = savedNotesAlert === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl border transition-all ${
                    isExpanded ? 'border-violet-300 shadow-md ring-1 ring-violet-100' : 'border-slate-200/90 shadow-xs hover:border-slate-300'
                  }`}
                >
                  {/* Header */}
                  <div
                    onClick={() => toggleBehavioralExpand(item.id)}
                    className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800">
                          {item.competency}
                        </span>
                        <h3 className="font-extrabold text-base text-slate-900">{item.question}</h3>
                      </div>
                      <p className="text-xs text-slate-500">Structured STAR Framework Breakdown & Guided Response</p>
                    </div>

                    <div className="p-2 rounded-xl border border-slate-200 text-slate-500 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-slate-100 space-y-6 animate-in fade-in">
                      
                      {/* STAR 4-Part Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700">
                            1. Situation
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {item.starFramework.situation}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-200/80 space-y-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-700">
                            2. Task
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {item.starFramework.task}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                            3. Action
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {item.starFramework.action}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                            4. Result
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {item.starFramework.result}
                          </p>
                        </div>
                      </div>

                      {/* Sample Full Delivery */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                          <span>Recommended Verbal Delivery Sample</span>
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed italic">
                          "{item.sampleAnswer}"
                        </p>
                      </div>

                      {/* User Notes Input Area */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <BookmarkCheck className="w-4 h-4 text-violet-600" />
                            <span>Your Personal Story Notes & Project Examples</span>
                          </label>
                          {isSaved && (
                            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              <span>Notes Saved!</span>
                            </span>
                          )}
                        </div>
                        <textarea
                          rows={3}
                          placeholder="Draft your own project anecdote following the STAR structure above..."
                          value={item.userNotes || ''}
                          onChange={e => handleNotesChange(item.id, e.target.value)}
                          className="w-full p-3.5 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 text-xs text-slate-800 font-medium outline-hidden bg-slate-50/50"
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleSaveNotes(item.id)}
                            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Notes</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
