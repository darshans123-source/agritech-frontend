import React from 'react';
import {
  Home,
  Sprout,
  BrainCircuit,
  TrendingUp,
  User
} from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAI?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  setCurrentTab
}) => {
  if (currentTab === 'landing') return null;

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'myFarms', label: 'Farm', icon: Sprout },
    { id: 'aiHub', label: 'AI', icon: BrainCircuit },
    { id: 'market', label: 'Market', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 shadow-lg px-2 py-1.5 flex items-center justify-around lg:hidden safe-area-bottom">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`flex flex-col items-center justify-center min-w-[56px] py-1.5 px-3 rounded-2xl transition-all duration-150 min-h-[48px] active:scale-95 ${
              isActive
                ? 'text-emerald-800 font-bold bg-emerald-50'
                : 'text-stone-600 hover:text-stone-900 font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-stone-500'}`} />
            <span className="text-[11px] mt-1 font-semibold tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
