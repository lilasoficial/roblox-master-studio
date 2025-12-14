import React, { useState } from 'react';
import { User, AppView, Language } from './types';
import { NAV_ITEMS, TEXTS } from './constants';
import { LayoutDashboard, Globe, LogOut, Menu, X, Rocket, Gamepad } from 'lucide-react';

// Components
import { Dashboard } from './components/Dashboard';
import { ScriptEditor } from './components/ScriptEditor';
import { IdeaGenerator } from './components/IdeaGenerator';
import { AIChat } from './components/AIChat';

// Placeholder components for other views
const PlaceholderComponent: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 animate-fade-in">
    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 neon-border">
      <Rocket size={40} className="text-purple-500" />
    </div>
    <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
    <p className="text-gray-400 max-w-md">{desc}</p>
    <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="w-32 h-24 bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="w-32 h-24 bg-gray-800 rounded-lg animate-pulse animation-delay-200"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [lang, setLang] = useState<Language>('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      setUser({
        username: usernameInput,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${usernameInput}`
      });
      setCurrentView(AppView.DASHBOARD);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(AppView.LOGIN);
    setUsernameInput('');
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return user ? <Dashboard user={user} lang={lang} onNavigate={setCurrentView} /> : null;
      case AppView.IDEAS:
        return <IdeaGenerator lang={lang} />;
      case AppView.SCRIPTS:
        return <ScriptEditor lang={lang} />;
      case AppView.MAPS:
        return <PlaceholderComponent title="Map Builder" desc="3D Terrain tools, object placement, and lighting controls coming soon." />;
      case AppView.MODELING:
        return <PlaceholderComponent title="Asset Studio" desc="Create 3D models or generate assets from images using AI." />;
      case AppView.GUI:
        return <PlaceholderComponent title="Interface Designer" desc="Drag & Drop UI builder for Roblox ScreenGuis and Frames." />;
      case AppView.GAMEPLAY:
        return <PlaceholderComponent title="Gameplay Mechanics" desc="Balance economy, configure progression systems, and set rules." />;
      case AppView.LEARNING:
        return <PlaceholderComponent title="Learning Hub" desc="Interactive Lua tutorials and building challenges." />;
      case AppView.EXTRAS:
        return <PlaceholderComponent title="Extra Tools" desc="Market trends, monetization tips, and team collaboration." />;
      default:
        return <div>Not Found</div>;
    }
  };

  if (!user || currentView === AppView.LOGIN) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-md w-full bg-gray-900/80 backdrop-blur-lg border border-gray-700 p-8 rounded-2xl shadow-2xl relative z-10 neon-border">
          <div className="text-center mb-8">
             <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg">
                <Gamepad size={32} className="text-white" />
             </div>
             <h1 className="text-3xl font-bold text-white mb-2">{TEXTS['app.name'][lang]}</h1>
             <p className="text-gray-400">The ultimate AI toolkit for Roblox creators.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder={TEXTS['login.placeholder'][lang]}
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:scale-[1.02]"
            >
              {TEXTS['btn.login'][lang]}
            </button>
          </form>

          <div className="mt-6 flex justify-between text-sm text-gray-400">
            <button className="hover:text-white transition-colors">{TEXTS['btn.start'][lang]}</button>
            <button className="hover:text-white transition-colors">{TEXTS['btn.tutorial'][lang]}</button>
          </div>

          <div className="absolute top-4 right-4">
            <button 
              onClick={() => setLang(l => l === 'en' ? 'pt' : 'en')}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors"
            >
              <Globe size={12} />
              {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:relative z-30 w-64 h-full bg-[#1e293b] border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } flex flex-col`}
      >
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded flex items-center justify-center">
               <Gamepad size={18} />
             </div>
             <span className="font-bold text-lg tracking-tight">Master Studio</span>
          </div>
          <button className="md:hidden text-gray-400" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentView === AppView[item.view as keyof typeof AppView];
            const Icon = item.icon;
            return (
              <button
                key={item.view}
                onClick={() => {
                  setCurrentView(AppView[item.view as keyof typeof AppView]);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-600/50' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{TEXTS[item.labelKey][lang]}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
           <div className="flex items-center gap-3 mb-4 p-2 bg-gray-800/50 rounded-lg">
              <img src={user.avatarUrl} alt="User" className="w-8 h-8 rounded-full bg-gray-600" />
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{user.username}</p>
                <p className="text-xs text-gray-500">Free Plan</p>
              </div>
           </div>
           <button 
             onClick={handleLogout}
             className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
           >
             <LogOut size={16} />
             Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#0f172a] border-b border-gray-700 flex items-center justify-between px-6 sticky top-0 z-10">
          <button 
            className="md:hidden text-gray-400"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
             <div className="relative group">
                <button 
                  onClick={() => setLang(l => l === 'en' ? 'pt' : 'en')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 border border-gray-600 text-xs font-medium text-gray-300 hover:border-purple-500 transition-colors"
                >
                  <Globe size={14} />
                  {lang === 'en' ? 'English' : 'Português'}
                </button>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {renderContent()}
        </div>
      </main>

      <AIChat lang={lang} />
    </div>
  );
};

export default App;