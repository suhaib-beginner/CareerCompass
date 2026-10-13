import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, ShieldCheck, HeartHandshake, BookOpen, Sparkles, Target, Award, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Career<span className="text-cyan-400">Compass</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your intelligent navigation platform for campus placements, competitive CTC benchmarks, and Tier-1 engineering interview readiness.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700/80 text-[11px] text-cyan-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Calibrated for 2026-2027 Placement Cycles</span>
            </div>
          </div>

          {/* Preparation Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3 flex items-center gap-1.5">
              <span>Guidance Modules</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveView('skills')} className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1">
                  <span>Skill Gap Compass</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('companies')} className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1">
                  <span>Company Eligibility Radar</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('planner')} className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1">
                  <span>Intelligent Daily Sprint</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('interview-prep')} className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1">
                  <span>STAR & Technical Interview Hub</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1">
                  <span>Readiness Command Center</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Placement Tiers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3">
              Trajectory CTC Tiers
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                <span className="text-slate-300 font-semibold">Dream Tier-1: 20+ LPA</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>High-Growth Scaleup: 15 LPA</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span>Fast-Track Core: 10 LPA</span>
              </li>
              <li className="text-[11px] text-slate-500 pt-1">
                Calibrated against DSA, System Design, and Aptitude rounds.
              </li>
            </ul>
          </div>

          {/* Guiding Principles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3">
              Core Principles
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Verified questions from recent campus placement rounds.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <HeartHandshake className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Zero-noise interface engineered for sustained daily focus.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Structured STAR behavioral responses with editable notes.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CareerCompass. Navigate Your Placement Trajectory.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Placement Handbook</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Honor Code</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Assessment Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
