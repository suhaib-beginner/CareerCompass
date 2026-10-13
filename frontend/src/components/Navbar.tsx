import React, { useState } from 'react';
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
  Menu,
  X,
  Target,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, profile, readinessScore } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: 'Explore', icon: <Compass className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'Goal Setup', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills Radar', icon: <Cpu className="w-4 h-4" /> },
    { id: 'companies', label: 'Companies', icon: <Building2 className="w-4 h-4" /> },
    { id: 'planner', label: 'Daily Planner', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'interview-prep', label: 'Interview Hub', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  const handleNavClick = (viewId: ViewType) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all duration-200">
              <Compass className="w-5 h-5 text-white animate-spin-slow group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Career<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">Compass</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 tracking-wide uppercase">
                  TRAJECTORY
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Placement Guidance & Intelligence
              </p>
            </div>
          </div>

          {/* Desktop Nav Floating Dock */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
            {navItems.map(item => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-sm border border-slate-200 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span className={isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Profile & Live Status Indicators */}
          <div className="hidden md:flex items-center gap-3">
            {/* Streak Counter Pill */}
            <div 
              title="Consecutive Days Streak"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs font-bold shadow-xs hover:bg-amber-100/80 transition-colors"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{profile.currentStreakDays}d streak</span>
            </div>

            {/* Target Package Pill */}
            <div 
              title="Target CTC Benchmark"
              onClick={() => handleNavClick('profile')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50/80 border border-indigo-200 text-indigo-900 text-xs font-bold shadow-xs cursor-pointer hover:bg-indigo-100/80 transition-colors"
            >
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              <span>{profile.targetPackage}</span>
            </div>

            {/* User Profile Avatar with Circular Readiness Indicator */}
            <button
              onClick={() => handleNavClick('profile')}
              className="flex items-center gap-2.5 pl-2 pr-3.5 py-1 rounded-full border border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50 transition-all cursor-pointer shadow-xs group"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {profile.fullName.charAt(0)}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 leading-none group-hover:text-indigo-600 transition-colors">
                  {profile.fullName.split(' ')[0]}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] font-semibold text-cyan-600 bg-cyan-50 px-1 py-0.2 rounded">
                    {readinessScore}% Ready
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{profile.currentStreakDays}d</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold text-slate-700">Target: {profile.targetPackage}</span>
            </div>
            <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              Readiness: {readinessScore}%
            </span>
          </div>
          {navItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-800 border border-indigo-200 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
