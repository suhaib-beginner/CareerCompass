import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Views
import { LandingView } from './views/LandingView';
import { DashboardView } from './views/DashboardView';
import { ProfileSetupView } from './views/ProfileSetupView';
import { SkillsAnalyzerView } from './views/SkillsAnalyzerView';
import { CompanyExplorerView } from './views/CompanyExplorerView';
import { DailyPlannerView } from './views/DailyPlannerView';
import { InterviewPrepView } from './views/InterviewPrepView';

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="w-full">
      {activeView === 'landing' && <LandingView />}
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'profile' && <ProfileSetupView />}
      {activeView === 'skills' && <SkillsAnalyzerView />}
      {activeView === 'companies' && <CompanyExplorerView />}
      {activeView === 'planner' && <DailyPlannerView />}
      {activeView === 'interview-prep' && <InterviewPrepView />}
    </div>
  );
};

const AppLayout: React.FC = () => {
  const { theme } = useApp();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 relative ${
      isDark
        ? 'bg-[#080c14] text-slate-300 selection:bg-indigo-500/30 selection:text-cyan-200'
        : 'bg-[#eef2f6] text-slate-700 selection:bg-indigo-200 selection:text-indigo-900'
    }`}>
      
      {/* Background Soft Mesh Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute -top-32 -right-32 w-[34rem] h-[34rem] rounded-full blur-3xl transition-opacity duration-500 ${
          isDark ? 'bg-indigo-600/10 opacity-70' : 'bg-indigo-300/30 opacity-60'
        }`}></div>
        <div className={`absolute top-1/2 -left-32 w-[32rem] h-[32rem] rounded-full blur-3xl transition-opacity duration-500 ${
          isDark ? 'bg-cyan-500/10 opacity-70' : 'bg-cyan-300/25 opacity-60'
        }`}></div>
        <div className={`absolute -bottom-32 right-1/4 w-[34rem] h-[34rem] rounded-full blur-3xl transition-opacity duration-500 ${
          isDark ? 'bg-violet-600/10 opacity-70' : 'bg-violet-300/20 opacity-60'
        }`}></div>
      </div>

      {/* Left Feature Sidebar: Click to expand all features */}
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Header
          isSidebarExpanded={isSidebarExpanded}
          onToggleSidebar={() => setIsSidebarExpanded(prev => !prev)}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
          <MainContent />
        </main>

        <Footer />
      </div>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}
