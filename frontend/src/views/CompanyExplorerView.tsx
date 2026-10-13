import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import type { Company } from '../types';
import {
  Compass,
  Building2,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  Calendar,
  MapPin,
  Sparkles,
  Layers,
  Clock,
  Briefcase,
  X
} from 'lucide-react';

export const CompanyExplorerView: React.FC = () => {
  const { companies, profile, setActiveView } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [cgpaFilter, setCgpaFilter] = useState<'All' | 'EligibleOnly' | '7.0+' | '7.5+' | '8.0+'>('All');
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>('phonepe');
  const [resourceModal, setResourceModal] = useState<{ company: string; title: string; type: string } | null>(null);

  const industries = [
    'All',
    'Fintech',
    'Big Tech / E-Commerce',
    'Enterprise SaaS',
    'Enterprise Cloud',
    'Networking & Cloud',
    'Consulting & IT Services'
  ];

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.keySkills.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesIndustry =
        industryFilter === 'All' || company.industry.includes(industryFilter);

      let matchesCgpa = true;
      if (cgpaFilter === 'EligibleOnly') {
        matchesCgpa = profile.cgpa >= company.minCgpa;
      } else if (cgpaFilter === '7.0+') {
        matchesCgpa = company.minCgpa >= 7.0;
      } else if (cgpaFilter === '7.5+') {
        matchesCgpa = company.minCgpa >= 7.5;
      } else if (cgpaFilter === '8.0+') {
        matchesCgpa = company.minCgpa >= 8.0;
      }

      return matchesSearch && matchesIndustry && matchesCgpa;
    });
  }, [companies, searchQuery, cgpaFilter, industryFilter, profile.cgpa]);

  const eligibleCount = companies.filter(c => profile.cgpa >= c.minCgpa).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-cyan-600" />
            <span>Campus Eligibility Radar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Recruiter Cutoffs & Interview Stage Radar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time verification against CGPA cutoffs, hiring round formats, and application deadlines.
          </p>
        </div>

        {/* Live Eligibility Pill */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm">
            {eligibleCount}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Eligible Recruiters</p>
            <p className="text-[11px] text-slate-500">Based on your {profile.cgpa} CGPA</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          
          {/* Search Box (Span 6) */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by company name, role, or required skill (e.g. PhonePe, Go, React)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs text-slate-900 font-medium outline-hidden bg-slate-50/50"
            />
          </div>

          {/* CGPA Eligibility Filter (Span 3) */}
          <div className="md:col-span-3">
            <select
              value={cgpaFilter}
              onChange={e => setCgpaFilter(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs text-slate-900 font-semibold outline-hidden bg-slate-50/50"
            >
              <option value="All">All CGPA Cutoffs</option>
              <option value="EligibleOnly">Eligible Only (My CGPA: {profile.cgpa})</option>
              <option value="7.0+">Cutoff 7.0+ & Above</option>
              <option value="7.5+">Cutoff 7.5+ & Above</option>
              <option value="8.0+">Cutoff 8.0+ (Tier-1 Cutoff)</option>
            </select>
          </div>

          {/* Industry Filter (Span 3) */}
          <div className="md:col-span-3">
            <select
              value={industryFilter}
              onChange={e => setIndustryFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs text-slate-900 font-semibold outline-hidden bg-slate-50/50"
            >
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind === 'All' ? 'All Industries' : ind}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Companies List */}
      <div className="space-y-4">
        {filteredCompanies.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-base font-bold text-slate-800">No recruiters match current criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or loosening CGPA filters.</p>
          </div>
        ) : (
          filteredCompanies.map(company => {
            const isEligible = profile.cgpa >= company.minCgpa;
            const isExpanded = expandedCompanyId === company.id;

            return (
              <div
                key={company.id}
                className={`bg-white rounded-3xl border transition-all ${
                  isExpanded ? 'border-indigo-300 shadow-md ring-1 ring-indigo-100' : 'border-slate-200/90 shadow-xs hover:border-slate-300'
                }`}
              >
                {/* Main Row */}
                <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left Company Header */}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-white text-base shadow-sm shrink-0"
                      style={{ backgroundColor: company.accentColor }}
                    >
                      {company.logoInitial}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-extrabold text-lg text-slate-900">{company.name}</h3>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {company.role}
                        </span>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                          {company.hiringType}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{company.industry}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {company.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right CTC & Eligibility Chips */}
                  <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                    
                    <div className="text-left lg:text-right">
                      <p className="text-base font-extrabold text-slate-900">{company.ctcBracket}</p>
                      <p className="text-[11px] text-slate-500">Min CGPA: {company.minCgpa.toFixed(1)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
                        isEligible
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}>
                        {isEligible ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>CGPA Eligible</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                            <span>CGPA Gap (-{(company.minCgpa - profile.cgpa).toFixed(1)})</span>
                          </>
                        )}
                      </span>

                      <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
                        company.daysRemaining <= 10
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{company.daysRemaining}d Left</span>
                      </span>

                      <button
                        onClick={() => setExpandedCompanyId(isExpanded ? null : company.id)}
                        className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                  </div>

                </div>

                {/* Expanded Details: Interview Stages & Prep Resources */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-slate-100 space-y-6 animate-in fade-in">
                    
                    {/* Key Skills */}
                    <div className="pt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Evaluated Skill Competencies
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {company.keySkills.map(skill => (
                          <span
                            key={skill}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Interview Stages Timeline */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Hiring Pipeline Stages
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {company.interviewStages.map(st => (
                          <div
                            key={st.stage}
                            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                          >
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700">
                              Round {st.stage}
                            </span>
                            <h4 className="font-bold text-xs text-slate-900">{st.title}</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                              {st.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Company-Calibrated Resources
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {company.resources.map(res => (
                          <button
                            key={res.title}
                            onClick={() => setResourceModal({ company: company.name, title: res.title, type: res.type })}
                            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 cursor-pointer flex items-center gap-1.5 transition-colors"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{res.title} ({res.type})</span>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Resource Modal Preview */}
      {resourceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
                {resourceModal.type}
              </span>
              <button
                onClick={() => setResourceModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">{resourceModal.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Calibrated for {resourceModal.company} interview rounds.</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              This module includes verified previous questions, round scoring rubrics, and recommended time targets for {resourceModal.company}.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setResourceModal(null)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
