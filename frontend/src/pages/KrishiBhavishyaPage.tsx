import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Coins,
  Store,
  Clock,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';
import { MOCK_BHAVISHYA_FORECASTS } from '../constants/mockData';
import { useLanguage } from '../context/LanguageContext';
import { useFarmData } from '../context/FarmDataContext';

export const KrishiBhavishyaPage: React.FC = () => {
  const { t } = useLanguage();
  const { addXP } = useFarmData();

  const [selectedCropKey, setSelectedCropKey] = useState<string>('Tomato');
  const [harvestQuantityQtl, setHarvestQuantityQtl] = useState<number>(100);
  const [harvestDate, setHarvestDate] = useState('2026-09-15');

  const forecast = MOCK_BHAVISHYA_FORECASTS[selectedCropKey] || MOCK_BHAVISHYA_FORECASTS['Tomato'];

  const chartData = [
    { day: 'Today', price: forecast.timeframes.today, label: 'Today (Base)' },
    { day: 'Day 7', price: forecast.timeframes.days7, label: '+7 Days' },
    { day: 'Day 15', price: forecast.timeframes.days15, label: '+15 Days' },
    { day: 'Day 30', price: forecast.timeframes.days30, label: '+30 Days (Peak)' },
    { day: 'Day 60', price: forecast.timeframes.days60, label: '+60 Days' },
  ];

  const currentTotalRevenue = harvestQuantityQtl * forecast.timeframes.today;
  const peakTotalRevenue = harvestQuantityQtl * forecast.peakPrice;
  const extraProfit = peakTotalRevenue - currentTotalRevenue;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-6 sm:p-8 shadow-xl border border-amber-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Mandi Commodity Time Machine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white">
            {t('krishiBhavishya')}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Project agricultural mandi rates up to 60 days into the future. Analyze seasonal supply shortages, metro festival demand surges, and identify the optimal day to sell your harvest.
          </p>
        </div>
      </div>

      {/* 1. INTERACTIVE INPUT CONTROLS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-base text-slate-900 font-heading">
            Enter Harvest Parameters
          </h3>
          <span className="text-xs text-slate-500">Live APMC Market Simulation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Crop</label>
            <select
              value={selectedCropKey}
              onChange={(e) => {
                setSelectedCropKey(e.target.value);
                addXP(20, `Checked Bhavishya for ${e.target.value}`);
              }}
              className="w-full p-3 rounded-2xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-amber-500"
            >
              <option value="Tomato">Tomato (Hybrid F1)</option>
              <option value="Paddy (Rice)">Paddy / Rice (Sona Masoori)</option>
              <option value="Onion">Onion (Red Nashik Quality)</option>
              <option value="Sugarcane">Sugarcane (Co-86032)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Harvest Quantity (Quintals)</label>
            <input
              type="number"
              value={harvestQuantityQtl}
              onChange={(e) => setHarvestQuantityQtl(parseInt(e.target.value) || 1)}
              className="w-full p-3 rounded-2xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Harvest Date</label>
            <input
              type="date"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 2. RECHARTS TIME MACHINE CURVE & TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Interactive 60-Day Price Trajectory */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 font-heading">
                60-Day Mandi Price Trajectory
              </h3>
              <p className="text-xs text-slate-500">Confidence Score: <strong className="text-emerald-700">{forecast.confidenceScore}%</strong></p>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
              {forecast.marketSentiment}
            </span>
          </div>

          {/* Interactive Chart */}
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fontWeight: 600 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(val) => `₹${val}`}
                  domain={['auto', 'auto']}
                />
                <Tooltip
                  formatter={(val: any) => [`₹${val} / Quintal`, 'Projected Rate']}
                  contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#d97706"
                  strokeWidth={3.5}
                  dot={{ r: 6, fill: '#d97706', stroke: '#ffffff', strokeWidth: 2 }}
                  activeDot={{ r: 9, fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 5-Step Future Timeline Cards */}
          <div className="grid grid-cols-5 gap-2 text-center pt-2">
            {[
              { time: 'Today', price: forecast.timeframes.today, status: 'Base' },
              { time: '7 Days', price: forecast.timeframes.days7, status: '+10%' },
              { time: '15 Days', price: forecast.timeframes.days15, status: '+22%' },
              { time: '30 Days', price: forecast.timeframes.days30, status: 'PEAK ⭐', isPeak: true },
              { time: '60 Days', price: forecast.timeframes.days60, status: 'Cooling' },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border transition-all ${
                  step.isPeak
                    ? 'bg-amber-500/15 border-amber-400 text-amber-900 ring-2 ring-amber-400/40 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="text-[10px] font-bold text-slate-400 uppercase">{step.time}</div>
                <div className="text-sm font-black text-slate-900 mt-1">₹{step.price}</div>
                <div className="text-[9px] font-extrabold text-amber-700 mt-0.5">{step.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Financial Gain Summary & Catalysts */}
        <div className="lg:col-span-4 space-y-6">
          {/* Potential Extra Profit Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 rounded-3xl p-6 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold text-emerald-300 tracking-wider">
                Harvest Profit Optimization
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-bold">
                Low Risk Index
              </span>
            </div>

            <div>
              <div className="text-xs text-slate-300">Potential Extra Profit:</div>
              <div className="text-3xl font-black font-heading text-amber-400 mt-0.5">
                +₹{extraProfit.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-emerald-200 mt-1">
                Gain: <strong>+{forecast.expectedProfitIncrease}%</strong> compared to selling today.
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs space-y-1">
              <div className="text-[11px] font-bold text-emerald-300">Recommended Selling Window:</div>
              <div className="text-xs font-semibold text-white">{forecast.bestSellingWindow}</div>
            </div>

            <div className="text-[10px] text-slate-400 pt-2 border-t border-emerald-800">
              Calculated on {harvestQuantityQtl} quintals output. Hold in cold storage for 20 days.
            </div>
          </div>

          {/* AI Market Drivers & Catalysts */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <h3 className="font-extrabold text-sm text-slate-900 font-heading">
                AI Market Catalysts & Drivers
              </h3>
            </div>

            <ul className="space-y-2 text-xs text-slate-600">
              {forecast.factors.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
