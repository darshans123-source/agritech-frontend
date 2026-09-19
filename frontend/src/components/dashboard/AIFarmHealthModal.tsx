import React from 'react';
import {
  ShieldCheck,
  X,
  Sparkles,
  Sprout,
  Droplets,
  CloudSun,
  Activity,
  Store,
  ArrowUpRight,
  BrainCircuit,
  Info
} from 'lucide-react';
import { useFarmData } from '../../context/FarmDataContext';

interface AIFarmHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export const AIFarmHealthModal: React.FC<AIFarmHealthModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { aiFarmHealth, locationState, weather } = useFarmData();

  if (!isOpen) return null;

  const pillars = [
    {
      title: 'Crop Foliar Health',
      score: aiFarmHealth.cropHealth,
      weight: '30%',
      icon: Sprout,
      color: 'text-emerald-700 bg-emerald-100',
      barColor: 'bg-emerald-500',
      reason: 'Active vegetative tillering with healthy chlorophyll reflection. Minor fungal risk on lower tomato leaves.'
    },
    {
      title: 'Soil Condition & Moisture',
      score: aiFarmHealth.soilCondition,
      weight: '25%',
      icon: Activity,
      color: 'text-amber-700 bg-amber-100',
      barColor: 'bg-amber-500',
      reason: 'Soil volumetric water content is 58% (optimum range: 50–65%). Soil temperature is stable at 24.2°C.'
    },
    {
      title: 'Weather & Micro-Climate Risk',
      score: aiFarmHealth.weatherRisk,
      weight: '20%',
      icon: CloudSun,
      color: 'text-blue-700 bg-blue-100',
      barColor: 'bg-blue-500',
      reason: `Calm wind speed (${weather.windSpeed} km/h) with ${weather.rainProbability}% precipitation probability.`
    },
    {
      title: 'Irrigation & Pump Efficiency',
      score: aiFarmHealth.irrigation,
      weight: '15%',
      icon: Droplets,
      color: 'text-cyan-700 bg-cyan-100',
      barColor: 'bg-cyan-500',
      reason: 'Automated pressure cycle saved 3,400 liters of water this week with zero over-watering detected.'
    },
    {
      title: 'Market Timing & Price Opportunity',
      score: aiFarmHealth.marketOpportunity,
      weight: '10%',
      icon: Store,
      color: 'text-purple-700 bg-purple-100',
      barColor: 'bg-purple-500',
      reason: 'Nearby APMC mandis show strong demand with +7.1% upward price momentum.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-lg text-slate-900 font-heading">
                  AI Farm Health Diagnostic
                </h2>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  Explainable AI
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Multi-factor neural synthesis for {locationState.address.formatted}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto pr-1 flex-1">
          {/* Main Score Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 text-white flex items-center justify-between shadow-md">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                Overall Index Rating
              </span>
              <div className="text-3xl font-black text-white font-heading mt-0.5">
                {aiFarmHealth.overall} <span className="text-emerald-400 text-xl font-normal">/ 100</span>
              </div>
              <p className="text-xs text-emerald-100/80 mt-1 max-w-sm">
                Ranked in the <strong>top 5%</strong> of precision farms in {locationState.address.district}.
              </p>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-emerald-300 font-bold uppercase">Status</span>
              <span className="text-emerald-400 font-extrabold text-sm">Optimal</span>
            </div>
          </div>

          {/* Sub-Score Breakdown Pillars */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              5 Core Agricultural Pillars
            </h3>

            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-3 rounded-2xl border border-slate-200/90 bg-white hover:border-emerald-300 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg ${p.color} flex items-center justify-center shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-800">{p.title}</span>
                      <span className="text-[10px] text-slate-400 font-medium">(Weight: {p.weight})</span>
                    </div>
                    <span className="text-xs font-black text-slate-900 font-heading">{p.score}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`${p.barColor} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${p.score}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 leading-normal">{p.reason}</p>
                </div>
              );
            })}
          </div>

          {/* AI Recommendation to boost to 98% */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>How to elevate score to 98/100:</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              1. Complete preventive bio-fungicide foliar spray on Tomato Field 2 before Thursday rain.
              <br />
              2. Keep smart pump on AUTO mode to prevent nutrient leaching during precipitation.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              onClose();
              onNavigate('aiHub');
            }}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Open AI Diagnostics Hub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
