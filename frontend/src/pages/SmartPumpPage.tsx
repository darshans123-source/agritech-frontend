import React, { useState } from 'react';
import {
  Droplets,
  Power,
  Clock,
  Sliders,
  Sparkles,
  AlertTriangle,
  Play,
  Square,
  CheckCircle2,
  Calendar,
  Layers,
  Activity
} from 'lucide-react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';

export const SmartPumpPage: React.FC = () => {
  const { smartPump, togglePumpStatus, setPumpMode, updatePumpThreshold } = useFarmData();
  const { t } = useLanguage();

  const isPumpRunning = smartPump.status === 'ON';

  return (
    <div className="space-y-8 pb-12 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-1 border border-cyan-200">
            <Droplets className="w-3.5 h-3.5" />
            <span>Automated Micro-Drip Controller</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {t('smartPump')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Smart starter relay, automated threshold triggers, and precision water consumption monitoring.
          </p>
        </div>
      </div>

      {/* Demo Mode Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
        <p>
          <strong>Simulated Controller Mode:</strong> In this demo environment, hardware starter relays and motor pumps are simulated in real-time. Connect physical GSM/LoRa smart starters via our API gateway for field deployment.
        </p>
      </div>

      {/* 1. MASTER PUMP CONTROLLER HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Master Toggle Card */}
        <div
          className={`lg:col-span-6 rounded-3xl p-6 sm:p-8 text-white transition-all shadow-xl flex flex-col justify-between space-y-6 ${
            isPumpRunning
              ? 'bg-gradient-to-br from-cyan-900 via-teal-900 to-emerald-950 border border-cyan-500/40'
              : 'bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                {smartPump.name}
              </span>
              <h2 className="text-xl font-bold font-heading text-white mt-0.5">
                {smartPump.field} ({smartPump.hp} HP Submersible)
              </h2>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                isPumpRunning
                  ? 'bg-emerald-500 text-slate-950 animate-pulse'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{smartPump.status}</span>
            </span>
          </div>

          {/* Big Interactive Power Button */}
          <div className="flex flex-col items-center justify-center py-4">
            <button
              onClick={() => togglePumpStatus()}
              className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 shadow-2xl ${
                isPumpRunning
                  ? 'bg-gradient-to-tr from-rose-600 to-rose-500 text-white ring-8 ring-rose-500/30'
                  : 'bg-gradient-to-tr from-emerald-600 to-green-500 text-white ring-8 ring-emerald-500/20 hover:scale-105'
              }`}
            >
              <Power className="w-10 h-10 mb-1" />
              <span className="text-xs font-black uppercase tracking-wider">
                {isPumpRunning ? 'Turn OFF' : 'Turn ON'}
              </span>
            </button>

            <div className="text-xs font-bold text-cyan-200 mt-4">
              {isPumpRunning
                ? `Pumping @ ${smartPump.currentFlowLpm} Litres/min`
                : 'Motor Idle • Standing by for schedule'}
            </div>
          </div>

          {/* Mode Switcher Tabs (MANUAL / AUTO / SCHEDULE) */}
          <div className="p-1.5 bg-black/30 rounded-2xl flex gap-1">
            {(['AUTO', 'MANUAL', 'SCHEDULE'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setPumpMode(mode)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  smartPump.mode === mode
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Right Flow Metrics & Automation Rules */}
        <div className="lg:col-span-6 space-y-6">
          {/* Water Metrics Bar */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Flow Rate</div>
              <div className="text-2xl font-black text-cyan-700 font-heading mt-1">
                {smartPump.currentFlowLpm} <span className="text-xs font-normal text-slate-500">LPM</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Drip line pressure: 2.1 bar</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Today's Consumption</div>
              <div className="text-2xl font-black text-slate-900 font-heading mt-1">
                {smartPump.dailyWaterLitres.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal text-slate-500">Litres</span>
              </div>
              <div className="text-xs text-emerald-600 font-semibold mt-0.5">Saves 60% vs flood</div>
            </div>
          </div>

          {/* Soil Moisture Auto-Start Threshold Slider */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 font-heading">
                  Auto-Irrigation Trigger Threshold
                </h3>
                <p className="text-xs text-slate-500">
                  Pump starts automatically when sensor falls below this value.
                </p>
              </div>
              <span className="text-base font-black text-emerald-700 font-heading">
                {smartPump.soilMoistureThreshold}%
              </span>
            </div>

            <input
              type="range"
              min="20"
              max="60"
              value={smartPump.soilMoistureThreshold}
              onChange={(e) => updatePumpThreshold(parseInt(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>Dry (20%)</span>
              <span>Recommended (40%)</span>
              <span>Moist (60%)</span>
            </div>
          </div>

          {/* Active Irrigation Schedules */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-600" />
                <h3 className="font-extrabold text-sm text-slate-900 font-heading">
                  Automated Irrigation Timers
                </h3>
              </div>
              <span className="text-xs text-emerald-600 font-bold">2 Active</span>
            </div>

            <div className="space-y-2 text-xs">
              {smartPump.schedules.map((sch) => (
                <div
                  key={sch.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-800">
                      {sch.startTime} ({sch.durationMins} Mins Duration)
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Days: {sch.days.join(', ')}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                    Enabled
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
