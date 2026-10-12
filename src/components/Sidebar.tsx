import React from 'react';
import { useApp } from '../context/AppContext';
import type { ViewType } from '../types';
import {
  Compass,
  LayoutDashboard,
  UserCheck,
  Cpu,
  Building2,
  CalendarDays,
  GraduationCap,
  Flame,
  Target,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  Layers,
  ArrowRight,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon
} from 'lucide-react';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean | ((prev: boolean) => boolean)) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  setIsExpanded,
  mobileOpen,
  setMobileOpen
}) => {
  const { activeView, setActiveView, profile, readinessScore, tasks, theme, toggleTheme } = useApp();

  const completedTodayTasks = tasks.filter(t => t.completed).length;

  const features = [
    {
      section: 'CORE PLATFORM',
      items: [
        {
          id: 'landing' as ViewType,
          label: 'Explore',
          desc: 'Placement benchmarks & platform overview',
          icon: Compass,
          badge: 'Overview',
          accent: 'text-indigo-400'
        },
        {
          id: 'dashboard' as ViewType,
          label: 'Command Center',
          desc: 'Readiness gauge, active gaps & sprint queue',
          icon: LayoutDashboard,
          badge: `${readinessScore}% Ready`,
          accent: 'text-cyan-400'
        },
      ]
    },
    {
      section: 'DIAGNOSTICS & RADAR',
      items: [
        {
          id: 'profile' as ViewType,
          label: 'Goal Calibration',
          desc: 'Calibrate target package & CGPA eligibility',
          icon: UserCheck,
          badge: profile.targetPackage,
          accent: 'text-violet-400'
        },
        {
          id: 'skills' as ViewType,
          label: 'Skills Matrix',
          desc: 'DSA, System Design & Dev competence stepper',
          icon: Cpu,
          badge: 'Matrix',
          accent: 'text-indigo-400'
        },
        {
          id: 'companies' as ViewType,
          label: 'Company Radar',
          desc: 'Hiring stages, CGPA cutoffs & CTC brackets',
          icon: Building2,
          badge: 'Cutoffs',
          accent: 'text-cyan-400'
        },
      ]
    },
    {
      section: 'EXECUTION & HUB',
      items: [
        {
          id: 'planner' as ViewType,
          label: 'Daily Sprint Planner',
          desc: 'Integrated Pomodoro timer & study schedule',
          icon: CalendarDays,
          badge: `${completedTodayTasks}/${tasks.length}`,
          accent: 'text-amber-400'
        },
        {
          id: 'interview-prep' as ViewType,
          label: 'STAR & Technical Hub',
          desc: 'Curated questions & STAR behavioral simulator',
          icon: GraduationCap,
          badge: 'Questions',
          accent: 'text-violet-400'
        },
      ]
    }
  ];

  const handleSelect = (view: ViewType) => {
    setActiveView(view);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Dynamic Sidebar (Icon rail when collapsed, Full feature drawer when expanded) */}
      <aside
        className={`hidden lg:flex flex-col h-screen sticky top-0 z-40 bg-slate-950/95 backdrop-blur-2xl border-r border-slate-800/80 text-slate-300 transition-all duration-300 ease-in-out select-none shadow-2xl ${
          isExpanded ? 'w-80' : 'w-20'
        }`}
      >
        {/* Top Header / Brand Toggle Bar */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80">
          <div
            onClick={() => setIsExpanded(prev => !prev)}
            className="flex items-center gap-3 cursor-pointer group w-full overflow-hidden"
            title={isExpanded ? 'Click to collapse sidebar' : 'Click to expand all features'}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all">
              <Compass className="w-5 h-5 text-white animate-spin-slow" />
            </div>

            {isExpanded && (
              <div className="min-w-0 flex-1 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base tracking-tight text-white">
                      Career<span className="text-cyan-400">Compass</span>
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      v2.4
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">
                    Placement Trajectory OS
                  </p>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                  title="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Feature Click-to-Expand Trigger Banner if Collapsed */}
        {!isExpanded && (
          <div className="p-2 border-b border-slate-800/80">
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer group"
              title="Click to view all features"
            >
              <PanelLeftOpen className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold tracking-tight">OPEN</span>
            </button>
          </div>
        )}

        {/* User Snapshot Card (Visible when Expanded) */}
        {isExpanded && (
          <div className="p-4 border-b border-slate-800/80">
            <div
              onClick={() => handleSelect('profile')}
              className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                    {profile.fullName.charAt(0)}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950"></span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                    {profile.fullName}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {profile.branch.split(' ')[0]} • CGPA {profile.cgpa}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Readiness Score</span>
                <span className="font-extrabold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800/50">
                  {readinessScore}% Ready
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Feature Navigation List */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-5">
          {features.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {isExpanded && (
                <p className="px-3 text-[10px] font-extrabold tracking-wider uppercase text-slate-500">
                  {section.section}
                </p>
              )}

              <div className="space-y-1 pt-0.5">
                {section.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center rounded-xl transition-all cursor-pointer group relative ${
                        isExpanded
                          ? `px-3.5 py-2.5 justify-between ${
                              isActive
                                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 font-bold'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                            }`
                          : `h-11 justify-center ${
                              isActive
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                            }`
                      }`}
                      title={!isExpanded ? `${item.label} – Click to view` : undefined}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isActive
                              ? 'text-white scale-110'
                              : `${item.accent} group-hover:scale-110`
                          }`}
                        />
                        {isExpanded && (
                          <div className="text-left min-w-0">
                            <p className="text-xs font-semibold leading-tight truncate">
                              {item.label}
                            </p>
                            <p
                              className={`text-[10px] leading-tight truncate mt-0.5 ${
                                isActive ? 'text-indigo-200' : 'text-slate-500'
                              }`}
                            >
                              {item.desc}
                            </p>
                          </div>
                        )}
                      </div>

                      {isExpanded && item.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Expand Toggle Bar / Target Goal Card */}
        <div className="p-3 border-t border-slate-800/80">
          {isExpanded ? (
            <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-indigo-400" />
                  Target CTC Goal
                </span>
                <span className="text-cyan-400">{profile.targetPackage}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {profile.currentStreakDays}d streak
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {theme === 'dark' ? <Sun className="w-3 h-3 text-amber-300" /> : <Moon className="w-3 h-3 text-indigo-300" />}
                  </button>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                  >
                    <span>Collapse</span>
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <button
                onClick={toggleTheme}
                className="w-full h-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-indigo-300" />}
              </button>
              <button
                onClick={() => setIsExpanded(true)}
                className="w-full h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                title="Expand all features (Click to view)"
              >
                <ChevronRight className="w-4 h-4 text-cyan-400 animate-pulse" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          ></div>

          <div className="relative w-80 max-w-[85vw] h-full bg-slate-950 border-r border-slate-800 text-slate-300 flex flex-col shadow-2xl animate-in slide-in-from-left">
            <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white">
                  <Compass className="w-4 h-4 text-white" />
                </div>
                <span className="font-extrabold text-sm text-white">CareerCompass</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {features.map((section, idx) => (
                <div key={idx} className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase text-slate-500 px-2">
                    {section.section}
                  </p>
                  <div className="space-y-1">
                    {section.items.map(item => {
                      const Icon = item.icon;
                      const isActive = activeView === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold ${
                            isActive
                              ? 'bg-indigo-600 text-white font-bold'
                              : 'text-slate-300 hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4" />
                            <div className="text-left">
                              <p>{item.label}</p>
                              <p className="text-[10px] text-slate-400">{item.desc}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
