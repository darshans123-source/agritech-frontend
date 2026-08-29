import React, { useState } from 'react';
import {
  Sprout,
  Activity,
  Droplets,
  Coins,
  Sun,
  BrainCircuit,
  Store,
  Plane,
  Plus,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
  Flame,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';

interface DashboardProps {
  onNavigate: (tabId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user, crops, tasks, toggleTask, addTask, weather, financialSummary, smartPump } = useFarmData();
  const { t } = useLanguage();

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'Irrigation' | 'Fertilizer' | 'Pesticide' | 'Harvest' | 'Soil' | 'Drone' | 'Market'>('Irrigation');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newTaskDueDate, setNewTaskDueDate] = useState('Today, 5:00 PM');

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask({
      title: newTaskTitle,
      category: newTaskCategory,
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
      xpReward: 40,
      notes: 'Added from farmer daily schedule'
    });
    setNewTaskTitle('');
    setShowAddTaskModal(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('goodMorning');
    if (hour < 17) return t('goodAfternoon');
    return t('goodEvening');
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* 1. HERO GREETING & FARM HEALTH BANNER */}
      <div className="relative overflow-hidden rounded-3xl gradient-green-hero text-white p-6 sm:p-8 shadow-xl border border-emerald-500/30">
        {/* Decorative background vectors */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Smart Precision Farm Management</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight">
              {getGreeting()}, {user?.name || 'Farmer'} 🌱
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
              All sensors normal in {user?.district || 'Mandya'}. Weather is calm with an optimal foliar spraying window starting at 4:30 PM today.
            </p>
          </div>

          {/* Quick Hero KPI Capsule */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shrink-0">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider">
                {t('farmHealth')}
              </div>
              <div className="text-2xl font-black font-heading text-white">94 / 100</div>
              <div className="text-[10px] text-emerald-300 font-semibold flex items-center justify-end gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>All 3 parcels thriving</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-emerald-400 flex items-center justify-center font-black text-sm bg-emerald-800">
              94%
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE METRICS QUAD (Farm Health, Crops, Weather, Projected Net Income, Soil Moisture) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Crops */}
        <div
          onClick={() => onNavigate('myFarms')}
          className="glass-card p-5 rounded-3xl cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              {t('cropStatus')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading">
            {crops.length} Active Crops
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <span>6.5 Acres in cultivation</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Stat 2: Weather & Spray Advisory */}
        <div
          onClick={() => onNavigate('weather')}
          className="glass-card p-5 rounded-3xl cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              {t('weatherToday')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sun className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading">
            {weather.temp}°C
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1 truncate">
            {weather.condition} • {weather.windSpeed} km/h
          </div>
        </div>

        {/* Stat 3: Soil Moisture */}
        <div
          onClick={() => onNavigate('iot')}
          className="glass-card p-5 rounded-3xl cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              {t('soilMoisture')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading flex items-center gap-2">
            <span>{weather.soilMoisture}%</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Optimal
            </span>
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Pump Status: <span className="font-bold text-slate-700">{smartPump.status} ({smartPump.mode})</span>
          </div>
        </div>

        {/* Stat 4: Projected Net Income */}
        <div
          onClick={() => onNavigate('finance')}
          className="glass-card p-5 rounded-3xl cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              {t('projectedIncome')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700 font-heading">
            ₹{financialSummary.netProfit.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <span>ROI: {financialSummary.profitMargin}% margin</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 3. QUICK ACTION SHORTCUTS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider font-heading">
            {t('quickActions')}
          </h2>
          <span className="text-xs text-slate-400">One-tap intelligence</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2.5">
          {[
            { id: 'aiHub', label: t('cropScan'), icon: BrainCircuit, color: 'bg-emerald-600 text-white' },
            { id: 'krishiBhavishya', label: 'Bhavishya', icon: TrendingUp, color: 'bg-amber-600 text-white' },
            { id: 'market', label: t('marketMandi'), icon: Store, color: 'bg-blue-600 text-white' },
            { id: 'finance', label: t('finance'), icon: Coins, color: 'bg-teal-600 text-white' },
            { id: 'drone', label: t('drone'), icon: Plane, color: 'bg-purple-600 text-white' },
            { id: 'pump', label: t('pump'), icon: Droplets, color: 'bg-sky-600 text-white' },
            { id: 'iot', label: t('iotSensors'), icon: Activity, color: 'bg-indigo-600 text-white' },
          ].map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={() => onNavigate(act.id)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl ${act.color} flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-700 text-center leading-tight">
                  {act.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN TWO-COLUMN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (My Crops & Today's Tasks) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Crops Summary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900 font-heading">
                  {t('myFarms')}
                </h2>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  {crops.length} Plots
                </span>
              </div>
              <button
                onClick={() => onNavigate('myFarms')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>View Full Timeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {crops.map((crop) => (
                <div
                  key={crop.id}
                  onClick={() => onNavigate('myFarms')}
                  className="glass-card rounded-3xl p-4.5 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {crop.area} Acres
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          crop.status === 'Healthy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {crop.status}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base font-heading">
                      {crop.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3 truncate">{crop.variety}</p>

                    {/* Stage Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium capitalize">Stage: {crop.currentStage}</span>
                        <span className="text-emerald-700 font-bold">{crop.healthScore}% Vigor</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{
                            width:
                              crop.currentStage === 'seed'
                                ? '20%'
                                : crop.currentStage === 'germination'
                                ? '40%'
                                : crop.currentStage === 'growth'
                                ? '60%'
                                : crop.currentStage === 'flowering'
                                ? '80%'
                                : '100%'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Est. Harvest</span>
                    <span className="font-bold text-slate-800">{crop.expectedHarvestDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Tasks Checklist */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 font-heading">
                  {t('todaysTasks')}
                </h2>
                <p className="text-xs text-slate-500">
                  {pendingTasks.length} pending • Earn XP towards your Krishi Journey badges
                </p>
              </div>
              <button
                onClick={() => setShowAddTaskModal(true)}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-200"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Task list items */}
            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    task.completed
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                        task.completed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                    <div>
                      <div
                        className={`text-xs sm:text-sm font-bold ${
                          task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {task.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-emerald-700">{task.category}</span>
                        <span>•</span>
                        <span>Due {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                      task.priority === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : task.priority === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    +{task.xpReward} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (AI Live Recommendations, Weather Alert, Market Opportunity) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Weather Alert Card */}
          <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200/80 text-amber-900 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="font-extrabold text-sm font-heading">{t('weatherAlert')}</h3>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              Scattered thunderstorms forecasted for Thursday & Friday (65-80% rain probability). Postpone nitrogen top-dressing and clear drainage furrows.
            </p>
            <button
              onClick={() => onNavigate('weather')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <span>View 7-day detailed radar & spray window</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Market Opportunity Spotlight */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-bold rounded-full">
                KrishiBhavishya Alert
              </span>
              <span className="text-[10px] text-slate-400">APMC Mandis</span>
            </div>
            <div>
              <h3 className="text-base font-extrabold font-heading text-white">
                Tomato Price Surge Alert
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Wholesale rate in Kolar & Bengaluru projected to peak at <strong className="text-amber-400">₹3,120 / qtl</strong> in 25 days (+38% profit lift).
              </p>
            </div>
            <button
              onClick={() => onNavigate('krishiBhavishya')}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>Open Farm Time Machine</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* AI Live Recommendations Feed */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <BrainCircuit className="w-4 h-4 text-emerald-600" />
              <h3 className="font-extrabold text-sm text-slate-900 font-heading">
                {t('aiRecommendations')}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="font-bold text-emerald-900">Spraying Window Optimal</div>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Low wind speed (9.8 km/h). Apply micronutrient foliar spray between 4:30 PM and 6:45 PM today.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-slate-800">PMFBY Fasal Bima Deadline</div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  12 days remaining to enroll your Paddy crop for Kharif insurance coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ADD TASK MODAL */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 font-heading">
                Schedule New Farm Task
              </h3>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Check drip lines for calcium clogging"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newTaskCategory}
                    onChange={(e: any) => setNewTaskCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="Irrigation">Irrigation</option>
                    <option value="Fertilizer">Fertilizer</option>
                    <option value="Pesticide">Pesticide</option>
                    <option value="Harvest">Harvest</option>
                    <option value="Soil">Soil</option>
                    <option value="Drone">Drone</option>
                    <option value="Market">Market</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e: any) => setNewTaskPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Due Date / Time</label>
                <input
                  type="text"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all mt-2"
              >
                Schedule Task (+40 XP)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
