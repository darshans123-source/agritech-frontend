import React from 'react';
import {
  LayoutDashboard,
  Sprout,
  BrainCircuit,
  Coins,
  TrendingUp,
  Landmark,
  Store,
  CloudSun,
  Plane,
  Activity,
  Droplets,
  ShoppingBag,
  Award,
  Crown,
  User,
  Sparkles,
  ChevronRight,
  Flame
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useFarmData } from '../../context/FarmDataContext';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  isMobile = false,
  onCloseMobile
}) => {
  const { t } = useLanguage();
  const { user, crops, tasks, isProUnlocked } = useFarmData();

  const activeCropsCount = crops.length;
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  const navItems = [
    {
      group: 'Core Operations',
      items: [
        { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard, badge: null },
        { id: 'myFarms', label: t('myFarms'), icon: Sprout, badge: `${activeCropsCount} Crops` },
        { id: 'aiHub', label: t('aiHub'), icon: BrainCircuit, badge: 'AI Doctor', isHighlight: true },
        { id: 'weather', label: t('weatherCenter'), icon: CloudSun, badge: null },
      ]
    },
    {
      group: 'Smart Intelligence & Market',
      items: [
        { id: 'krishiBhavishya', label: t('krishiBhavishya'), icon: TrendingUp, badge: 'Time Machine', isPro: true },
        { id: 'market', label: t('marketIntelligence'), icon: Store, badge: 'Mandi Live' },
        { id: 'govtSchemes', label: t('govtSchemes'), icon: Landmark, badge: 'Finder' },
        { id: 'finance', label: t('krishiNidhi'), icon: Coins, badge: null },
      ]
    },
    {
      group: 'Precision Tech & Automation',
      items: [
        { id: 'drone', label: t('droneSpray'), icon: Plane, badge: 'Simulation' },
        { id: 'iot', label: t('smartFarmIot'), icon: Activity, badge: 'Live Telemetry' },
        { id: 'pump', label: t('smartPump'), icon: Droplets, badge: 'Auto Drip' },
        { id: 'store', label: t('krishiStore'), icon: ShoppingBag, badge: 'Agri Mart' },
      ]
    },
    {
      group: 'Growth & Rewards',
      items: [
        { id: 'journey', label: t('krishiJourney'), icon: Award, badge: `Lvl ${user?.level || 1}` },
        { id: 'premium', label: t('premium'), icon: Crown, badge: isProUnlocked ? 'Active' : 'Upgrade', isGold: true },
        { id: 'profile', label: t('profile'), icon: User, badge: null },
      ]
    }
  ];

  const handleSelect = (tabId: string) => {
    setCurrentTab(tabId);
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside
      className={`h-full flex flex-col justify-between bg-white border-r border-slate-200/90 py-5 select-none overflow-y-auto ${
        isMobile ? 'w-full px-4' : 'w-64 px-4 shrink-0'
      }`}
    >
      {/* Top Header if in Mobile Drawer */}
      {isMobile && (
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-green-500 flex items-center justify-center text-white">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-base text-slate-900 font-heading">
              KRISHISMART <span className="text-emerald-600">AI</span>
            </div>
            <p className="text-[11px] text-slate-500">{t('tagline')}</p>
          </div>
        </div>
      )}

      {/* Navigation Sections */}
      <div className="space-y-6">
        {navItems.map((sec, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
              {sec.group}
            </div>
            <div className="space-y-0.5 mt-1">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-bold translate-x-1'
                        : 'text-slate-600 hover:bg-emerald-50/70 hover:text-emerald-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive
                            ? 'text-white'
                            : item.isGold
                            ? 'text-amber-500'
                            : item.isHighlight
                            ? 'text-emerald-600'
                            : 'text-slate-400 group-hover:text-emerald-600'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-tight shrink-0 ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : item.isGold
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : item.isHighlight
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
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

      {/* Bottom Farm Snapshot Card */}
      <div className="mt-8 pt-4 border-t border-slate-100">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] font-bold text-slate-200">
                {user?.streakDays || 1} Day Streak
              </span>
            </div>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 border border-emerald-500/40">
              {user?.xp || 0} XP
            </span>
          </div>

          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mb-2">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, ((user?.xp || 0) % 1000) / 10)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-300">
            <span>{pendingTasksCount} Tasks Pending</span>
            <button
              onClick={() => handleSelect('journey')}
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5"
            >
              <span>Rewards</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
