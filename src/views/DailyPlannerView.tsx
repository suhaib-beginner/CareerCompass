import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import type { PlannerTask } from '../types';
import {
  Compass,
  CalendarDays,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Clock,
  Flame,
  Award,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  BookOpen,
  Filter,
  X
} from 'lucide-react';

export const DailyPlannerView: React.FC = () => {
  const {
    profile,
    tasks,
    toggleTask,
    addTask,
    deleteTask,
    hoursAllocation
  } = useApp();

  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState<PlannerTask['domain']>('DSA');
  const [newDuration, setNewDuration] = useState<number>(45);
  const [newPriority, setNewPriority] = useState<PlannerTask['priority']>('High');

  // Focus Timer / Pomodoro State
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [initialSeconds, setInitialSeconds] = useState(25 * 60);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const setTimerPreset = (mins: number) => {
    setTimerRunning(false);
    setTimerSeconds(mins * 60);
    setInitialSeconds(mins * 60);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask(newDomain, newTitle.trim(), newDuration, newPriority);
    setNewTitle('');
    setShowAddModal(false);
  };

  const domains = ['All', 'DSA', 'Aptitude', 'Projects', 'Communication'];

  const filteredTasks = tasks.filter(
    t => selectedDomain === 'All' || t.domain === selectedDomain
  );

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const totalMinutes = tasks.reduce((sum, t) => sum + t.durationMinutes, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Intelligent Placement Sprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Daily Execution & Focus Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Engineered time blocks calibrated for your target {profile.targetPackage} CTC milestone.
          </p>
        </div>

        {/* Streak & Completion Bar */}
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
              <Flame className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{profile.currentStreakDays} Day Streak</p>
              <p className="text-[11px] text-slate-500">{completedCount} of {tasks.length} Completed Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Timer / Allocation & Sprint Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Pomodoro Focus Timer & Study Blueprint (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Focus Timer Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Deep Work Focus Engine</span>
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                {timerRunning ? 'SPRINT IN PROGRESS' : 'READY'}
              </span>
            </div>

            {/* Circular Timer Display */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-44 h-44 rounded-full border-4 border-indigo-500/40 bg-white/5 flex flex-col items-center justify-center shadow-inner relative">
                <span className="text-5xl font-black tracking-tight font-mono text-white">
                  {formatTimer(timerSeconds)}
                </span>
                <span className="text-[11px] font-bold text-cyan-300 mt-1 uppercase tracking-wider">
                  {timerRunning ? 'Stay Immersed' : 'Focus Block'}
                </span>
              </div>
            </div>

            {/* Preset Selector */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setTimerPreset(25)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  initialSeconds === 25 * 60 ? 'bg-cyan-500 text-slate-950 shadow-xs' : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                25m Sprint
              </button>
              <button
                onClick={() => setTimerPreset(45)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  initialSeconds === 45 * 60 ? 'bg-cyan-500 text-slate-950 shadow-xs' : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                45m Standard
              </button>
              <button
                onClick={() => setTimerPreset(60)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  initialSeconds === 60 * 60 ? 'bg-cyan-500 text-slate-950 shadow-xs' : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                60m Deep Dive
              </button>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`px-8 py-3 rounded-xl font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                  timerRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    : 'bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white'
                }`}
              >
                {timerRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Sprint</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Start Sprint</span>
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(initialSeconds);
                }}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Allocation Blueprint Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Target Allocation vs Active Sprint</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-700">DSA & Algorithms</span>
                <span className="font-extrabold text-indigo-600">{hoursAllocation.dsaHours} hrs</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-700">Projects & Systems</span>
                <span className="font-extrabold text-cyan-600">{hoursAllocation.projectHours} hrs</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-700">Aptitude & Puzzles</span>
                <span className="font-extrabold text-amber-600">{hoursAllocation.aptitudeHours} hrs</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-700">STAR Behavioral</span>
                <span className="font-extrabold text-violet-600">{hoursAllocation.communicationHours} hrs</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Target: {profile.dailyStudyHours} hours / day for {profile.targetPackage}
            </p>
          </div>

        </div>

        {/* Right Column: Sprint Task Manager (Span 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6">
          
          {/* Header & Add Task Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Today's Focus Tasks</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {completedCount} of {tasks.length} tasks finished ({totalMinutes} mins total)
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-xs shadow-sm shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Sprint Task</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Daily Completion Target</span>
              <span className="text-indigo-600 font-extrabold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-600 to-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {domains.map(d => {
              const isSelected = selectedDomain === d;
              return (
                <button
                  key={d}
                  onClick={() => setSelectedDomain(d)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-200">
                <CalendarDays className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">No tasks in this category</p>
                <p className="text-xs text-slate-500 mt-1">Click "Add Sprint Task" to schedule focused preparation.</p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    task.completed
                      ? 'bg-slate-50/70 border-slate-200/60 opacity-75'
                      : 'bg-white border-slate-200 hover:border-indigo-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="cursor-pointer text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <p className={`text-xs font-bold ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.2 rounded">
                          {task.domain}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {task.durationMinutes}m
                        </span>
                        <span>•</span>
                        <span className={`font-semibold ${
                          task.priority === 'High' ? 'text-rose-600' : task.priority === 'Medium' ? 'text-amber-600' : 'text-slate-500'
                        }`}>
                          {task.priority} Priority
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>Create New Sprint Task</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Task Title / Focus Topic
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Binary Search on Rotated Array"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs text-slate-900 font-semibold outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Domain
                  </label>
                  <select
                    value={newDomain}
                    onChange={e => setNewDomain(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 outline-hidden bg-slate-50/50"
                  >
                    <option value="DSA">DSA</option>
                    <option value="Projects">Projects</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="Communication">Communication</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Duration
                  </label>
                  <select
                    value={newDuration}
                    onChange={e => setNewDuration(parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 outline-hidden bg-slate-50/50"
                  >
                    <option value={25}>25 Minutes</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>60 Minutes</option>
                    <option value={90}>90 Minutes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Priority
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['High', 'Medium', 'Low'] as const).map(p => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setNewPriority(p)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        newPriority === p
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 shadow-xs cursor-pointer"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
