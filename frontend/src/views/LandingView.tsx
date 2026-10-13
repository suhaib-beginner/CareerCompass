import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  ArrowRight,
  Target,
  Cpu,
  CalendarDays,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  ChevronRight,
  Flame,
  Zap,
  Building2,
  Sparkles,
  Layers,
  Clock,
  Briefcase,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import type { TargetPackage } from '../types';

export const LandingView: React.FC = () => {
  const { setActiveView, profile, readinessScore, updateProfile, companies, skillsMasteredCount, priorityGaps } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How is CareerCompass different from regular coding platforms?",
      a: "CareerCompass connects your target CTC package (10 LPA, 15 LPA, 20 LPA) directly to company cutoffs, skill gap diagnostics, and a calibrated daily sprint planner. Rather than solving random problems, every minute is mapped to specific placement criteria."
    },
    {
      q: "How does the Readiness Score calculate my placement probability?",
      a: "Your Readiness Score dynamically evaluates your verified skill levels against your target CTC requirements, weighted by Tier-1 company criteria across DSA, Core CS fundamentals, development projects, and aptitude."
    },
    {
      q: "Can I adjust my package goal midway?",
      a: "Yes! You can toggle between 10 LPA, 15 LPA, and 20 LPA anytime. CareerCompass instantly recalibrates your skill gap matrix, company eligibility radar, and daily study hours allocation."
    },
    {
      q: "Is CareerCompass tailored for on-campus or off-campus recruitment?",
      a: "Both. We track on-campus cutoff rules (CGPA benchmarks, test formats) alongside off-campus pool drives with application deadlines and stage-by-stage interview guides."
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Modern Split Hero Section */}
      <section className="relative rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-300/70 dark:border-slate-800/80 p-6 sm:p-10 shadow-lg dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headlines, Target Switcher & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Dynamic Live Status Pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-300 text-xs font-bold shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600 dark:bg-cyan-400"></span>
                </span>
                <span>2026-2027 Campus Placement Sprint Active</span>
                <span className="text-indigo-300 dark:text-indigo-700">|</span>
                <span className="text-cyan-700 dark:text-cyan-300 font-semibold flex items-center gap-1">
                  <Compass className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                  Tier-1 Calibrated
                </span>
              </div>

              {/* Main Headline - Simple, Small, and Clear */}
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                Navigate Your Placement Trajectory with CareerCompass
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                Continuous skill-gap analysis, Tier-1 company eligibility scoring, and an adaptive daily study schedule calibrated to your target CTC package.
              </p>

              {/* Interactive Target Package Switcher in Hero */}
              <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-950/70 border border-slate-300/80 dark:border-slate-800/80 shadow-sm max-w-xl space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Target CTC Package Milestone
                  </span>
                  <span className="text-indigo-600 dark:text-cyan-400 font-bold">
                    Active: {profile.targetPackage}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['10 LPA', '15 LPA', '20 LPA'] as const).map(pkg => {
                    const isSelected = profile.targetPackage === pkg;
                    return (
                      <button
                        key={pkg}
                        onClick={() => updateProfile({ targetPackage: pkg })}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                          isSelected
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400 dark:ring-cyan-400'
                            : 'bg-white/90 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-800'
                        }`}
                      >
                        <span className="text-sm font-extrabold">{pkg}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'}`}>
                          {pkg === '20 LPA' ? 'Dream Tier' : pkg === '15 LPA' ? 'Scaleup' : 'Core Tech'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
                <button
                  onClick={() => setActiveView('profile')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-sm shadow-md shadow-indigo-600/25 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Compass className="w-4 h-4" />
                  <span>Configure My Trajectory</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveView('dashboard')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-300 dark:border-slate-700 transition-all cursor-pointer shadow-xs"
                >
                  <span>Open Command Center</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-bold">
                    {readinessScore}% Score
                  </span>
                </button>
              </div>

              {/* Social Proof Stats */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200/80 dark:border-slate-800">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white">98.4%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Placement Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">450+</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Recruiting Tech Firms</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">₹18.4 LPA</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Avg Dream Offer</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-amber-500 flex items-center gap-1">
                    <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
                    12,000+
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Daily Focus Streaks</p>
                </div>
              </div>

            </div>

            {/* Right Column: Live Trajectory Radar Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                
                {/* Decorative glow backing */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-600 rounded-3xl blur-lg opacity-30"></div>
                
                {/* Main Card */}
                <div className="relative bg-white/95 dark:bg-slate-900/95 rounded-3xl border border-slate-300/80 dark:border-slate-800 p-6 shadow-xl dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] space-y-6">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-xs">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Career Compass Radar</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Live Simulation • {profile.targetPackage} Goal</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      LIVE
                    </span>
                  </div>

                  {/* Readiness Circular / Arc Gauge */}
                  <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-inner flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                        Current Readiness
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-extrabold tracking-tight">
                          {readinessScore}%
                        </span>
                        <span className="text-xs text-slate-300">
                          {readinessScore >= 80 ? 'Tier-1 Ready' : readinessScore >= 60 ? 'Competitive' : 'Foundational'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Calibrated for {profile.targetPackage} tech roles
                      </p>
                    </div>

                    <div className="w-16 h-16 rounded-full bg-indigo-900/80 border-4 border-cyan-400 flex flex-col items-center justify-center shadow-lg shadow-cyan-500/20">
                      <Compass className="w-6 h-6 text-cyan-300 animate-spin-slow" />
                      <span className="text-[9px] font-bold text-cyan-200">READY</span>
                    </div>
                  </div>

                  {/* Diagnostic Quick Metrics */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Eligible</p>
                      <p className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                        {companies.filter(c => profile.cgpa >= c.minCgpa).length} Firms
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Mastered</p>
                      <p className="text-base font-extrabold text-cyan-600 dark:text-cyan-400">
                        {skillsMasteredCount} Skills
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Gaps</p>
                      <p className="text-base font-extrabold text-rose-600 dark:text-rose-400">
                        {priorityGaps.length} Priority
                      </p>
                    </div>
                  </div>

                  {/* Next Up Recommendation */}
                  <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-indigo-950 dark:text-indigo-200">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
                        Next Recommended Sprint
                      </span>
                      <span className="text-indigo-600 dark:text-cyan-300 font-bold">45 Mins</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      Graph Algorithms: Cycle Detection & Topological Sort Patterns
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        Direct Impact: +4% Readiness Score
                      </span>
                      <button
                        onClick={() => setActiveView('planner')}
                        className="text-[11px] font-bold text-indigo-700 dark:text-cyan-300 hover:text-indigo-900 dark:hover:text-cyan-200 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Start Sprint</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Student Persona Pill */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span>Simulated: {profile.fullName}</span>
                    <span>{profile.branch.split(' ')[0]} • CGPA {profile.cgpa}</span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bento Grid Feature Showcase */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold">
            <Layers className="w-3.5 h-3.5 text-cyan-600" />
            <span>Integrated Placement Stack</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Engineered to Guide Every Step of Your Journey
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Continuous diagnostics, company cutoffs, and tailored practice in one unified cockpit.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          
          {/* Bento Card 1: Skill Gap Radar (Span 2) */}
          <div 
            onClick={() => setActiveView('skills')}
            className="md:col-span-2 bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-slate-300/80 dark:border-slate-800 p-7 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:border-indigo-400/60"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Skill Diagnostics
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
              Dynamic Skill Gap Radar
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Compare your current competence across Languages, Core CS, DSA, and System Design against the requirements of your target CTC tier.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <p className="text-slate-500 dark:text-slate-400 font-medium">DSA Mastery</p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-indigo-600 dark:bg-cyan-400 h-full rounded-full w-3/4"></div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <p className="text-slate-500 dark:text-slate-400 font-medium">System Design</p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Company Eligibility (Span 2) */}
          <div 
            onClick={() => setActiveView('companies')}
            className="md:col-span-2 bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-slate-300/80 dark:border-slate-800 p-7 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:border-cyan-400/60"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                Company Radar
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              Company Eligibility Radar
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Live matching of your CGPA, branch, and skill inventory against criteria for top tech employers with interview stages and deadline countdowns.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-xs">
                Google • 8.0 CGPA
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-xs">
                Microsoft • 7.5 CGPA
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-xs">
                PhonePe • 7.5 CGPA
              </span>
            </div>
          </div>

          {/* Bento Card 3: Daily Sprint Engine (Span 2) */}
          <div 
            onClick={() => setActiveView('planner')}
            className="md:col-span-2 bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-slate-300/80 dark:border-slate-800 p-7 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:border-amber-400/60"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CalendarDays className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                Smart Planner
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Intelligent Daily Sprint Engine
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Daily time allocation customized across DSA, Aptitude, Core CS, and Projects with integrated Pomodoro timer and streak gamification.
            </p>
            <div className="flex items-center gap-3 text-xs font-bold text-amber-900 dark:text-amber-300 bg-amber-50/90 dark:bg-amber-950/50 px-3.5 py-2 rounded-xl border border-amber-200/70 dark:border-amber-800/60">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Calibrated: {profile.dailyStudyHours} hrs / day recommended schedule</span>
            </div>
          </div>

          {/* Bento Card 4: STAR Interview Hub (Span 2) */}
          <div 
            onClick={() => setActiveView('interview-prep')}
            className="md:col-span-2 bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-slate-300/80 dark:border-slate-800 p-7 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:border-violet-400/60"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                Interview Simulator
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              Technical & STAR Prep Hub
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Curated question bank for DSA patterns, System Design basics, and guided STAR framework responses for behavioral rounds with persistent notes.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-violet-900 dark:text-violet-300 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Situation</span>
              <span>→</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Task</span>
              <span>→</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Action</span>
              <span>→</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Result</span>
            </div>
          </div>

        </div>
      </section>

      {/* Target Package CTC Matrix Breakdown */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            <span>Calibrated Compensation Tiers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Choose Your Placement Milestone
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Every tier demands distinct depths in algorithms, system design, and engineering aptitude. Select a tier to preview expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 10 LPA Tier */}
          <div className={`rounded-3xl border p-7 transition-all flex flex-col justify-between ${
            profile.targetPackage === '10 LPA'
              ? 'bg-white border-indigo-500 shadow-xl ring-2 ring-indigo-400/50'
              : 'bg-white/80 border-slate-200/90 shadow-sm hover:shadow-md'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Fast-Track Core
                </span>
                <span className="text-xl font-extrabold text-slate-900">₹10 LPA</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Associate Software Engineer</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Foundational tech roles at established IT consulting giants and stable product firms.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Intermediate DSA (Arrays, Linked Lists, Binary Search)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Core CS: DBMS, SQL queries & OOP concepts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Quantitative Aptitude & Verbal Reasoning rounds</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>One fullstack or core academic project</span>
                </li>
              </ul>
            </div>
            <div className="pt-6">
              <button
                onClick={() => updateProfile({ targetPackage: '10 LPA' })}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  profile.targetPackage === '10 LPA'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {profile.targetPackage === '10 LPA' ? 'Selected Trajectory' : 'Target 10 LPA'}
              </button>
            </div>
          </div>

          {/* 15 LPA Tier */}
          <div className={`rounded-3xl border p-7 transition-all flex flex-col justify-between ${
            profile.targetPackage === '15 LPA'
              ? 'bg-white border-cyan-500 shadow-xl ring-2 ring-cyan-400/50'
              : 'bg-white/80 border-slate-200/90 shadow-sm hover:shadow-md'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-200">
                  High-Growth Scaleup
                </span>
                <span className="text-xl font-extrabold text-slate-900">₹15 LPA</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Software Development Engineer I</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fast-growing enterprise SaaS, FinTech, and unicorn engineering teams.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Strong DSA: Trees, Heaps, Dynamic Programming</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Operating Systems, Concurrency, Computer Networks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Low-Level Design (LLD), Design Patterns & Clean Code</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Production-grade project with REST APIs & DB indexing</span>
                </li>
              </ul>
            </div>
            <div className="pt-6">
              <button
                onClick={() => updateProfile({ targetPackage: '15 LPA' })}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  profile.targetPackage === '15 LPA'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {profile.targetPackage === '15 LPA' ? 'Selected Trajectory' : 'Target 15 LPA'}
              </button>
            </div>
          </div>

          {/* 20 LPA Tier */}
          <div className={`rounded-3xl border p-7 transition-all flex flex-col justify-between ${
            profile.targetPackage === '20 LPA'
              ? 'bg-white border-violet-500 shadow-xl ring-2 ring-violet-400/50'
              : 'bg-white/80 border-slate-200/90 shadow-sm hover:shadow-md'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 border border-violet-200">
                  Dream Product Tier
                </span>
                <span className="text-xl font-extrabold text-violet-700">₹20+ LPA</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Member Technical Staff / SDE</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tier-1 global tech companies, quantitative trading firms, and elite product platforms.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
                  <span>Advanced DSA: Graphs, DP with Bitmask, Segment Trees</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
                  <span>High-Level System Design (HLD): Caching, Sharding, Scalability</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
                  <span>Rigorous STAR behavioral alignment & culture fit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
                  <span>Complex distributed system, cloud deployment or open-source PRs</span>
                </li>
              </ul>
            </div>
            <div className="pt-6">
              <button
                onClick={() => updateProfile({ targetPackage: '20 LPA' })}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  profile.targetPackage === '20 LPA'
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {profile.targetPackage === '20 LPA' ? 'Selected Trajectory' : 'Target 20 LPA'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">
            Everything you need to know about the CareerCompass navigation methodology.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-90 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section>
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 p-8 sm:p-10 text-white shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Ready to Lock In Your Dream Offer?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Let CareerCompass Steer Your Placement Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join thousands of engineering students who transformed uncertainty into structured, daily confidence.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => setActiveView('profile')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Set Up Career Goal Now
              </button>
              <button
                onClick={() => setActiveView('dashboard')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                Explore Live Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
