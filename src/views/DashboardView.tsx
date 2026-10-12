import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Flame,
  Target,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Calendar,
  Building2,
  Clock,
  Sparkles,
  Zap,
  TrendingUp,
  Cpu,
  GraduationCap,
  Play,
  Layers,
  ChevronRight
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    profile,
    skills,
    companies,
    tasks,
    setActiveView,
    readinessScore,
    skillsMasteredCount,
    priorityGaps,
    eligibleCompaniesCount,
    hoursAllocation,
    addTask
  } = useApp();

  const completedTodayTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed);
  const nextTask = pendingTasks[0] || tasks[0];

  // Upcoming deadlines sorted by days remaining
  const upcomingDeadlines = [...companies]
    .sort((a, b) => a.daysRemaining - b.daysRemaining)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Cockpit Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/80">
              Welcome back, {profile.fullName.split(' ')[0]}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              • {profile.branch} • Year {profile.currentYear.charAt(0)}
            </span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
              {profile.currentStreakDays} Day Streak
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-indigo-600" />
            <span>Placement Readiness Cockpit</span>
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveView('profile')}
            className="text-xs font-bold px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 shadow-xs hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            <span>Target: {profile.targetPackage}</span>
          </button>
          <button
            onClick={() => setActiveView('planner')}
            className="text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-sm shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Daily Sprint ({completedTodayTasks}/{tasks.length})</span>
          </button>
        </div>
      </div>

      {/* TOP 4 KEY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Readiness Score */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Readiness Score
            </span>
            <span className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-600 font-extrabold text-xs">
              %
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {readinessScore}%
              </span>
              <span className={`text-xs font-bold ${
                readinessScore >= 80 ? 'text-emerald-600' : readinessScore >= 60 ? 'text-indigo-600' : 'text-amber-600'
              }`}>
                {readinessScore >= 80 ? 'Tier-1 Calibrated' : readinessScore >= 60 ? 'Competitive' : 'Foundational'}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-indigo-600 to-cyan-500"
                style={{ width: `${Math.min(100, readinessScore)}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Top 18% among students targeting {profile.targetPackage}
            </p>
          </div>
        </div>

        {/* Metric 2: Skills Mastered */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-cyan-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Skills Mastered
            </span>
            <span className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-200/80 flex items-center justify-center text-cyan-600">
              <Cpu className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {skillsMasteredCount}
              </span>
              <span className="text-xs font-bold text-slate-500">
                / {skills.length} tracked
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 bg-cyan-500"
                style={{ width: `${(skillsMasteredCount / skills.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {Math.round((skillsMasteredCount / skills.length) * 100)}% of full placement curriculum
            </p>
          </div>
        </div>

        {/* Metric 3: Priority Gaps */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-rose-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Priority Gaps
            </span>
            <span className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-rose-600">
                {priorityGaps.length}
              </span>
              <span className="text-xs font-bold text-rose-500">
                Action Required
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Critical missing milestones for {profile.targetPackage} tier
            </p>
            <button
              onClick={() => setActiveView('skills')}
              className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 mt-2 cursor-pointer"
            >
              <span>Inspect Gap Radar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 4: Eligible Companies */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Eligible Companies
            </span>
            <span className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-600">
              <Building2 className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {eligibleCompaniesCount}
              </span>
              <span className="text-xs font-bold text-slate-500">
                / {companies.length} hiring
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 bg-indigo-600"
                style={{ width: `${(eligibleCompaniesCount / companies.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              CGPA {profile.cgpa} qualifies for {eligibleCompaniesCount} recruiters
            </p>
          </div>
        </div>

      </div>

      {/* CENTRAL COCKPIT ROW: Recommended Action & Study Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Next Up Sprint Recommendation (Span 7) */}
        <div className="lg:col-span-7 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold border border-white/10 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Next Recommended Action</span>
            </span>
            <span className="text-xs font-bold text-slate-400">
              Today's Sprint
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-1.5">
              {nextTask?.title || 'Daily Technical Practice Sprint'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Focus on high-frequency questions calibrated for {profile.targetPackage} screening rounds. Completing this keeps your {profile.currentStreakDays}-day streak active.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold flex items-center gap-1.5 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-cyan-300" />
              <span>{nextTask?.durationMinutes || 45} Minutes</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-cyan-200">
              Domain: {nextTask?.domain || 'DSA'}
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-300">
              Priority: {nextTask?.priority || 'High'}
            </div>
          </div>

          <div className="pt-3 flex items-center gap-3">
            <button
              onClick={() => setActiveView('planner')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Launch Focus Timer</span>
            </button>
            <button
              onClick={() => setActiveView('interview-prep')}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs border border-white/10 transition-all cursor-pointer"
            >
              Review STAR & Tech Hub
            </button>
          </div>
        </div>

        {/* Daily Time Allocation Radar (Span 5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Daily Study Blueprint</span>
              </h3>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">
                {profile.dailyStudyHours} hrs / day
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Algorithmically allocated across critical domains for {profile.targetPackage} target.
            </p>

            {/* Domain Progress Tracks */}
            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-700">DSA & Problem Solving</span>
                  <span className="text-indigo-600 font-bold">{hoursAllocation.dsaHours} hrs</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${(hoursAllocation.dsaHours / profile.dailyStudyHours) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-700">Projects & Dev Frameworks</span>
                  <span className="text-cyan-600 font-bold">{hoursAllocation.projectHours} hrs</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full"
                    style={{ width: `${(hoursAllocation.projectHours / profile.dailyStudyHours) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-700">Quantitative & Logical Aptitude</span>
                  <span className="text-amber-600 font-bold">{hoursAllocation.aptitudeHours} hrs</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${(hoursAllocation.aptitudeHours / profile.dailyStudyHours) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-700">STAR Behavioral & Communication</span>
                  <span className="text-violet-600 font-bold">{hoursAllocation.communicationHours} hrs</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-violet-500 h-full rounded-full"
                    style={{ width: `${(hoursAllocation.communicationHours / profile.dailyStudyHours) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveView('planner')}
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Manage Time Blocks in Planner</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* LOWER SPLIT ROW: Priority Gaps & Upcoming Company Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Priority Skill Gaps (Span 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>Priority Skill Gap Matrix</span>
              </h3>
              <p className="text-xs text-slate-500">
                Skills where your verified level falls short of {profile.targetPackage} requirements.
              </p>
            </div>
            <button
              onClick={() => setActiveView('skills')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              View All Skills
            </button>
          </div>

          {priorityGaps.length === 0 ? (
            <div className="p-8 text-center bg-emerald-50/60 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-emerald-900">Zero Critical Gaps Found!</p>
              <p className="text-xs text-emerald-700 mt-1">
                You satisfy all baseline competencies for {profile.targetPackage}.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {priorityGaps.slice(0, 4).map(gap => (
                <div
                  key={gap.skill.id}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-xs">
                        {gap.skill.name}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                        {gap.skill.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>Current: <strong className="text-slate-700">{gap.current}</strong></span>
                      <span>→</span>
                      <span>Required: <strong className="text-indigo-600">{gap.required}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        addTask(
                          gap.skill.category === 'Problem Solving' ? 'DSA' : 'Projects',
                          `Close gap: ${gap.skill.name} interview problem sets`,
                          60,
                          'High'
                        );
                        setActiveView('planner');
                      }}
                      className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 cursor-pointer transition-colors"
                    >
                      + Add to Sprint
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Deadlines Radar (Span 5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Upcoming Drive Deadlines</span>
              </h3>
              <p className="text-xs text-slate-500">
                Application windows closing soon for registered campus drives.
              </p>
            </div>
            <button
              onClick={() => setActiveView('companies')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {upcomingDeadlines.map(comp => {
              const isEligible = profile.cgpa >= comp.minCgpa;
              return (
                <div
                  key={comp.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-white text-xs shadow-xs"
                      style={{ backgroundColor: comp.accentColor }}
                    >
                      {comp.logoInitial}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">{comp.name}</p>
                      <p className="text-[11px] text-slate-500">{comp.ctcBracket} • {comp.role}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      comp.daysRemaining <= 10
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {comp.daysRemaining} days left
                    </span>
                    <p className={`text-[10px] font-semibold mt-0.5 ${
                      isEligible ? 'text-emerald-600' : 'text-slate-400'
                    }`}>
                      {isEligible ? '✓ Eligible' : 'CGPA gap'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
