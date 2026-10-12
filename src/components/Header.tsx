import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  Flame,
  Target,
  Play,
  Sparkles,
  ChevronRight,
  Compass,
  PanelLeftOpen,
  PanelLeftClose,
  Layers,
  Sun,
  Moon
} from 'lucide-react';

interface HeaderProps {
  isSidebarExpanded: boolean;
  onToggleSidebar: () => void;
  onOpenMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isSidebarExpanded,
  onToggleSidebar,
  onOpenMobileSidebar
}) => {
  const { activeView, setActiveView, profile, readinessScore, theme, toggleTheme, isLiveBackend } = useApp();

  const isDark = theme === 'dark';

  const viewTitles: Record<string, { section: string; title: string }> = {
    landing: { section: 'Platform', title: 'Explore Overview' },
    dashboard: { section: 'Platform', title: 'Command Center' },
    profile: { section: 'Intelligence', title: 'Goal Calibration' },
    skills: { section: 'Intelligence', title: 'Skills Matrix' },
    companies: { section: 'Intelligence', title: 'Company Radar' },
    planner: { section: 'Practice & Prep', title: 'Daily Sprint Planner' },
    'interview-prep': { section: 'Practice & Prep', title: 'STAR & Technical Hub' },
  };

  const current = viewTitles[activeView] || { section: 'CareerCompass', title: 'Overview' };

  return (
    <header className={`sticky top-0 z-30 h-16 px-4 sm:px-6 flex items-center justify-between border-b backdrop-blur-xl transition-colors duration-300 ${
      isDark
        ? 'bg-slate-900/80 border-slate-800/80 text-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.3)]'
        : 'bg-slate-100/90 border-slate-300/80 text-slate-900 shadow-[0_2px_10px_rgba(0,0,0,0.03)]'
    }`}>
      
      {/* Left: Sidebar Toggle Button & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenMobileSidebar}
          className={`lg:hidden p-2 rounded-xl border transition-colors cursor-pointer ${
            isDark
              ? 'text-slate-300 hover:text-white bg-slate-800/80 border-slate-700 hover:bg-slate-750'
              : 'text-slate-600 hover:text-slate-900 bg-white/80 border-slate-200 hover:bg-white'
          }`}
          title="Open Features Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Sidebar Toggle Button: "Click to see all features" */}
        <button
          onClick={onToggleSidebar}
          className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            isSidebarExpanded
              ? isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-200/90 text-slate-800 border-slate-300 hover:bg-slate-300/70'
              : isDark
                ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60 hover:bg-indigo-900 shadow-xs'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 shadow-xs'
          }`}
          title={isSidebarExpanded ? 'Collapse features' : 'Click to view all features'}
        >
          {isSidebarExpanded ? (
            <>
              <PanelLeftClose className="w-4 h-4 text-slate-400" />
              <span>Hide Sidebar</span>
            </>
          ) : (
            <>
              <Layers className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>All Features</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-extrabold ${
                isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-indigo-200/60 text-indigo-800'
              }`}>
                OPEN
              </span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium hidden md:inline">{current.section}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden md:inline" />
          <span className={`font-extrabold text-sm sm:text-base tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {current.title}
          </span>
        </div>
      </div>

      {/* Right: Status Pills, Theme Switcher & Action CTA */}
      <div className="flex items-center gap-2.5">
        
        {/* Streak Pill */}
        <div 
          title="Daily Focus Streak"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
            isDark
              ? 'bg-amber-950/40 border-amber-800/60 text-amber-300'
              : 'bg-amber-100/90 border-amber-300 text-amber-900'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
          <span className="hidden sm:inline">{profile.currentStreakDays}d streak</span>
          <span className="sm:hidden">{profile.currentStreakDays}d</span>
        </div>

        {/* Target Package Pill */}
        <button
          onClick={() => setActiveView('profile')}
          title="Target CTC Benchmark (Click to change)"
          className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
            isDark
              ? 'bg-indigo-950/50 border-indigo-800/60 text-indigo-300 hover:bg-indigo-900/60'
              : 'bg-indigo-50 border-indigo-200 text-indigo-900 hover:bg-indigo-100'
          }`}
        >
          <Target className="w-3.5 h-3.5 text-indigo-400" />
          <span>{profile.targetPackage}</span>
        </button>

        {/* Backend Connectivity Status */}
        <div
          title={isLiveBackend ? "Connected to Java Spring Boot & MySQL backend on localhost:8080" : "Spring Boot backend offline (run 'mvn spring-boot:run' to connect MySQL)"}
          className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
            isLiveBackend
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
              : isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-400'
                : 'bg-slate-200 border-slate-300 text-slate-600'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isLiveBackend ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}></span>
          <span>{isLiveBackend ? 'MySQL Spring Live' : 'Spring Boot Standby'}</span>
        </div>

        {/* Readiness Badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
          isDark
            ? 'bg-cyan-950/40 border-cyan-800/60 text-cyan-300'
            : 'bg-cyan-50 border-cyan-300 text-cyan-900'
        }`}>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>{readinessScore}% Ready</span>
        </div>

        {/* Dark / Light Mode Switcher */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700 shadow-sm'
              : 'bg-white hover:bg-slate-50 text-indigo-600 border-slate-300 shadow-sm'
          }`}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <Sun className="w-4 h-4 hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 hover:-rotate-12 transition-transform" />
          )}
        </button>

        {/* Quick Launch Planner */}
        {activeView !== 'planner' && (
          <button
            onClick={() => setActiveView('planner')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-sm shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Sprint</span>
          </button>
        )}

      </div>

    </header>
  );
};
