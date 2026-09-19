import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Coins,
  Store,
  Clock,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
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
    { day: 'Today', price: forecast.timeframes.today, kgPrice: (forecast.timeframes.today / 100).toFixed(0) },
    { day: '7 Days', price: forecast.timeframes.days7, kgPrice: (forecast.timeframes.days7 / 100).toFixed(0) },
    { day: '15 Days', price: forecast.timeframes.days15, kgPrice: (forecast.timeframes.days15 / 100).toFixed(0) },
    { day: '30 Days', price: forecast.timeframes.days30, kgPrice: (forecast.timeframes.days30 / 100).toFixed(0) },
    { day: '60 Days', price: forecast.timeframes.days60, kgPrice: (forecast.timeframes.days60 / 100).toFixed(0) },
  ];

  const currentTotalRevenue = harvestQuantityQtl * forecast.timeframes.today;
  const peakTotalRevenue = harvestQuantityQtl * forecast.peakPrice;
  const extraProfit = peakTotalRevenue - currentTotalRevenue;

  const todayKg = (forecast.timeframes.today / 100).toFixed(0);
  const days15Kg = (forecast.timeframes.days15 / 100).toFixed(0);
  const days30Kg = (forecast.timeframes.days30 / 100).toFixed(0);
  const peakKg = (forecast.peakPrice / 100).toFixed(0);

  return (
    <div className="space-y-8 pb-16 animate-in fade-in">
      {/* ================================================== */}
      {/* 1. HEADER: "When should I sell my crop?" */}
      {/* ================================================== */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-6 sm:p-8 shadow-sm border border-emerald-700 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-bold w-fit">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>KrishiBhavishya Mandi Forecast</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
          When should I sell my crop?
        </h1>
        <p className="text-xs sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
          Compare market rates today versus holding your harvest for 15 to 30 days to maximize profit.
        </p>
      </div>

      {/* ================================================== */}
      {/* 2. CROP SELECTOR */}
      {/* ================================================== */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h2 className="text-base font-extrabold text-stone-900 font-heading">
            Select Your Crop & Output
          </h2>
          <span className="text-xs text-stone-500">Live APMC Mandi Forecast</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">Select Crop</label>
            <select
              value={selectedCropKey}
              onChange={(e) => {
                setSelectedCropKey(e.target.value);
                addXP(20, `Checked Bhavishya for ${e.target.value}`);
              }}
              className="w-full p-3 rounded-xl border border-stone-300 text-xs font-bold bg-white text-stone-800 focus:ring-2 focus:ring-emerald-600"
            >
              <option value="Tomato">Tomato (Hybrid F1)</option>
              <option value="Paddy (Rice)">Paddy / Rice (Samba Mahsuri)</option>
              <option value="Onion">Onion (Nashik Red)</option>
              <option value="Sugarcane">Sugarcane (Co-86032)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">Harvest Quantity (Quintals)</label>
            <input
              type="number"
              value={harvestQuantityQtl}
              onChange={(e) => setHarvestQuantityQtl(parseInt(e.target.value) || 1)}
              className="w-full p-3 rounded-xl border border-stone-300 text-xs font-bold focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">Estimated Harvest Date</label>
            <input
              type="date"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 3. THREE LARGE PRICE CARDS: TODAY, 15 DAYS, 30 DAYS */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* TODAY */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-2 text-center">
          <div className="text-xs font-black uppercase tracking-wider text-stone-400">
            TODAY
          </div>
          <div className="text-3xl sm:text-4xl font-black text-stone-900 font-heading">
            ₹{todayKg}<span className="text-base font-normal text-stone-500">/kg</span>
          </div>
          <div className="text-xs text-stone-500">
            ₹{forecast.timeframes.today} per quintal
          </div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-bold mt-1">
            Current Rate
          </span>
        </div>

        {/* 15 DAYS */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-2 text-center">
          <div className="text-xs font-black uppercase tracking-wider text-stone-400">
            15 DAYS
          </div>
          <div className="text-3xl sm:text-4xl font-black text-stone-900 font-heading">
            ₹{days15Kg}<span className="text-base font-normal text-stone-500">/kg</span>
          </div>
          <div className="text-xs text-stone-500">
            ₹{forecast.timeframes.days15} per quintal
          </div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold mt-1">
            +{(parseFloat(days15Kg) - parseFloat(todayKg)).toFixed(0)}/kg expected
          </span>
        </div>

        {/* 30 DAYS (PEAK) */}
        <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-300 shadow-2xs space-y-2 text-center ring-2 ring-emerald-600/20">
          <div className="text-xs font-black uppercase tracking-wider text-emerald-800">
            30 DAYS (RECOMMENDED ⭐)
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-900 font-heading">
            ₹{days30Kg}<span className="text-base font-normal text-emerald-700">/kg</span>
          </div>
          <div className="text-xs text-emerald-700">
            ₹{forecast.timeframes.days30} per quintal
          </div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[11px] font-bold mt-1">
            Best Price Window
          </span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 4. KEY SELLING DECISION BOX */}
      {/* ================================================== */}
      <div className="p-6 sm:p-7 rounded-3xl bg-emerald-900 text-white shadow-sm space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
          Optimal Selling Plan
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Suggested Selling Window */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
            <div className="text-xs text-emerald-200">Suggested Selling Window:</div>
            <div className="text-base sm:text-lg font-black text-white font-heading">
              {forecast.bestSellingWindow}
            </div>
            <div className="text-[11px] text-emerald-200">Peak festive & metro demand</div>
          </div>

          {/* Expected Price */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
            <div className="text-xs text-emerald-200">Expected Peak Price:</div>
            <div className="text-base sm:text-lg font-black text-amber-300 font-heading">
              ₹{peakKg}/kg (₹{forecast.peakPrice}/qtl)
            </div>
            <div className="text-[11px] text-emerald-200">
              +{forecast.expectedProfitIncrease}% vs selling today
            </div>
          </div>

          {/* Risk */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
            <div className="text-xs text-emerald-200">Risk Assessment:</div>
            <div className="text-base sm:text-lg font-black text-white font-heading flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>Low Risk</span>
            </div>
            <div className="text-[11px] text-emerald-200">Holding in dry storage is safe</div>
          </div>
        </div>

        <div className="pt-3 border-t border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-emerald-100 gap-2">
          <span>
            Projected Extra Profit on {harvestQuantityQtl} quintals: <strong className="text-amber-300 text-sm">+₹{extraProfit.toLocaleString('en-IN')}</strong>
          </span>
          <span className="text-emerald-300">Confidence Score: {forecast.confidenceScore}%</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 5. CLEAN 60-DAY TIMELINE CHART */}
      {/* ================================================== */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-stone-900 font-heading">
              Price Trajectory Timeline (Next 60 Days)
            </h3>
            <p className="text-xs text-stone-500">
              Anticipated rate fluctuations across APMC markets.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 w-fit">
            Market Trend: {forecast.marketSentiment}
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#78716c' }} />
              <YAxis
                tick={{ fontSize: 11, fill: '#78716c' }}
                tickFormatter={(val) => `₹${val}`}
                domain={['auto', 'auto']}
              />
              <Tooltip
                formatter={(val: any) => [`₹${val} / Quintal (₹${(val / 100).toFixed(0)}/kg)`, 'Projected Rate']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e7e5e4' }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#15803d"
                strokeWidth={3}
                dot={{ r: 5, fill: '#15803d', stroke: '#ffffff', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#d97706' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Factors */}
        <div className="pt-3 border-t border-stone-100 space-y-2">
          <div className="text-xs font-bold text-stone-700">Market Drivers & Reasons:</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-600">
            {forecast.factors.map((factor, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
