import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { TargetPackage, CurrentYear } from '../types';
import {
  Compass,
  UserCheck,
  Target,
  Clock,
  GraduationCap,
  Sparkles,
  Check,
  Building2,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

export const ProfileSetupView: React.FC = () => {
  const {
    profile,
    updateProfile,
    setActiveView,
    readinessScore,
    eligibleCompaniesCount,
    hoursAllocation
  } = useApp();

  const [savedAlert, setSavedAlert] = useState(false);

  // Form local state matching profile
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [branch, setBranch] = useState(profile.branch);
  const [currentYear, setCurrentYear] = useState<CurrentYear>(profile.currentYear);
  const [cgpa, setCgpa] = useState<number>(profile.cgpa);
  const [dailyHours, setDailyHours] = useState<number>(profile.dailyStudyHours);
  const [targetPackage, setTargetPackage] = useState<TargetPackage>(profile.targetPackage);

  const branches = [
    'Computer Science & Engineering',
    'Information Technology',
    'AI & Machine Learning / Data Science',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
  ];

  const years: CurrentYear[] = ['1st Year', '2nd Year', '3rd Year', 'Final Year'];

  const packages: { id: TargetPackage; title: string; subtitle: string; roleType: string; accentColor: string }[] = [
    {
      id: '10 LPA',
      title: '10 LPA',
      subtitle: 'Fast-Track Core Tier',
      roleType: 'Product Analyst, Associate Software Engineer at established tech firms',
      accentColor: 'indigo'
    },
    {
      id: '15 LPA',
      title: '15 LPA',
      subtitle: 'High-Growth Tech Tier',
      roleType: 'Fullstack / Systems Engineer at scale-ups & unicorn tech platforms',
      accentColor: 'cyan'
    },
    {
      id: '20 LPA',
      title: '20 LPA',
      subtitle: 'Dream Tier-1 Product',
      roleType: 'Member Technical Staff / SDE at Tier-1 product giants & quant firms',
      accentColor: 'violet'
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      email,
      branch,
      currentYear,
      cgpa,
      dailyStudyHours: dailyHours,
      targetPackage,
    });
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Placement Trajectory Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Baseline & Target CTC Calibration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            CareerCompass recalibrates all skill diagnostic matrixes, company cutoffs, and daily study blocks around your selected goals.
          </p>
        </div>

        {savedAlert && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-xs animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Trajectory Calibration Saved!</span>
          </div>
        )}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form (Span 7) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          
          <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2 pb-3 border-b border-slate-100">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <span>Student Academic Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-900 font-semibold transition-all outline-hidden bg-slate-50/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                College Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-900 font-semibold transition-all outline-hidden bg-slate-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Engineering Department / Branch
              </label>
              <select
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-900 font-semibold transition-all outline-hidden bg-slate-50/50"
              >
                {branches.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Academic Year
              </label>
              <select
                value={currentYear}
                onChange={e => setCurrentYear(e.target.value as CurrentYear)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-900 font-semibold transition-all outline-hidden bg-slate-50/50"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* CGPA & Daily Study Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Cumulative CGPA</span>
                <span className="font-extrabold text-base text-indigo-600">{cgpa.toFixed(1)} / 10.0</span>
              </div>
              <input
                type="range"
                min="5.0"
                max="10.0"
                step="0.1"
                value={cgpa}
                onChange={e => setCgpa(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Minimum for Tier-1 eligibility is generally 7.5 – 8.0 CGPA
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Daily Study Hours</span>
                <span className="font-extrabold text-base text-cyan-600">{dailyHours} Hours/Day</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={dailyHours}
                onChange={e => setDailyHours(parseInt(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Recommended for {targetPackage}: 3–5 hours focused sprint
              </p>
            </div>
          </div>

          {/* Target CTC Tier Cards */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Placement Target Package
            </label>
            <div className="grid grid-cols-1 gap-3">
              {packages.map(pkg => {
                const isSelected = targetPackage === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setTargetPackage(pkg.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 shadow-sm'
                        : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-slate-900">{pkg.title}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {pkg.subtitle}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{pkg.roleType}</p>
                    </div>

                    <div className="shrink-0">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Save & Recalibrate Trajectory</span>
            </button>
          </div>

        </form>

        {/* Right Column: Live Trajectory Projection Card (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Projected Compass Radar</span>
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                Live Preview
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-400">Target Trajectory</p>
              <h2 className="text-2xl font-extrabold text-white mt-0.5">
                {targetPackage} CTC Milestone
              </h2>
              <p className="text-xs text-cyan-200 mt-1">
                {cgpa >= 7.5 ? 'Eligible for 90%+ Premium Tech Recruiters' : 'Qualifies for core & mid-market recruiters'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[11px] text-slate-400">Readiness Score</p>
                <p className="text-2xl font-extrabold text-white mt-1">{readinessScore}%</p>
                <p className="text-[10px] text-cyan-300 mt-0.5">Calculated Matrix</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[11px] text-slate-400">Eligible Recruiters</p>
                <p className="text-2xl font-extrabold text-white mt-1">{eligibleCompaniesCount}</p>
                <p className="text-[10px] text-cyan-300 mt-0.5">At CGPA {cgpa.toFixed(1)}</p>
              </div>
            </div>

            {/* Daily Hours Breakdown Preview */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                <span>Calculated Daily Distribution</span>
                <span>{dailyHours} Hours</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span>DSA & Algorithms</span>
                  <span className="font-bold text-cyan-300">{hoursAllocation.dsaHours}h</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span>System / Projects</span>
                  <span className="font-bold text-cyan-300">{hoursAllocation.projectHours}h</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span>Quantitative Aptitude</span>
                  <span className="font-bold text-cyan-300">{hoursAllocation.aptitudeHours}h</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span>STAR Behavioral</span>
                  <span className="font-bold text-cyan-300">{hoursAllocation.communicationHours}h</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveView('dashboard')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Go to Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
