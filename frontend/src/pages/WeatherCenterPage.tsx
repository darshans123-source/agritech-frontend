import React from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  CloudLightning,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Thermometer,
  Gauge,
  Compass
} from 'lucide-react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';

export const WeatherCenterPage: React.FC = () => {
  const { weather, user } = useFarmData();
  const { t } = useLanguage();

  return (
    <div className="space-y-8 pb-12 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-1 border border-amber-200">
            <CloudSun className="w-3.5 h-3.5" />
            <span>Hyper-Local Micro-Climate Station</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {t('weatherCenter')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time farm weather telemetry in {user?.district || 'Mandya'}, {user?.state || 'Karnataka'}.
          </p>
        </div>
      </div>

      {/* 1. HERO WEATHER GLANCE & ADVISORY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Current Weather Big Card */}
        <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/80 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Current Weather Telemetry
              </span>
              <h2 className="text-xl font-bold text-white font-heading">
                {user?.village || 'Pandavapura'}, {user?.district || 'Mandya'}
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30">
              Live Station
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-400 border border-white/10">
              <Sun className="w-12 h-12" />
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-black font-heading text-white">
                {weather.temp}°C
              </div>
              <p className="text-sm text-slate-300 font-medium mt-1">
                {weather.condition} • Feels like 31°C
              </p>
            </div>
          </div>

          {/* Micro-climate 4-metrics bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 font-medium">Humidity</div>
              <div className="text-base font-bold text-white mt-0.5">{weather.humidity}%</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 font-medium">Wind Speed</div>
              <div className="text-base font-bold text-white mt-0.5">{weather.windSpeed} km/h</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 font-medium">Soil Temp</div>
              <div className="text-base font-bold text-white mt-0.5">{weather.soilTemp}°C</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 font-medium">Air Quality</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5">{weather.airQuality}</div>
            </div>
          </div>
        </div>

        {/* Right Smart Spraying & Irrigation Advisory Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Foliar Spraying Window */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-sm text-slate-900 font-heading">
                  AI Foliar Spraying Window
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {weather.sprayingAdvisory.status}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-900">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Best Spraying Window: {weather.sprayingAdvisory.bestWindow}</span>
              </div>
              <p className="text-emerald-800 leading-relaxed">
                {weather.sprayingAdvisory.reason}
              </p>
            </div>
          </div>

          {/* Irrigation & Rain Alert */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-cyan-600" />
                <h3 className="font-extrabold text-sm text-slate-900 font-heading">
                  Smart Irrigation Advisory
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold">
                Standby Mode
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-100 text-xs text-cyan-900">
              <p className="text-cyan-800 leading-relaxed font-medium">
                {weather.irrigationAdvisory.reason}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 7-DAY FORECAST GRID */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 font-heading">
              7-Day Agricultural Weather Forecast
            </h3>
            <p className="text-xs text-slate-500">
              Predictive rainfall radar and daily diurnal temperature ranges.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 text-center">
          {weather.forecast.map((fc, i) => (
            <div
              key={i}
              className={`p-4 rounded-3xl border transition-all ${
                i === 0
                  ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20'
                  : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-slate-700">{fc.day}</div>
              <div className="text-[10px] text-slate-400">{fc.date}</div>

              <div className="my-3 flex justify-center text-amber-500">
                {fc.icon === 'sun' && <Sun className="w-8 h-8" />}
                {fc.icon === 'cloud-sun' && <CloudSun className="w-8 h-8" />}
                {fc.icon === 'cloud-rain' && <CloudRain className="w-8 h-8 text-blue-500" />}
                {fc.icon === 'cloud-lightning' && <CloudLightning className="w-8 h-8 text-purple-500" />}
                {fc.icon === 'cloud' && <CloudSun className="w-8 h-8 text-slate-400" />}
              </div>

              <div className="text-sm font-black text-slate-900">
                {fc.tempMax}° / <span className="text-xs font-normal text-slate-500">{fc.tempMin}°</span>
              </div>

              <div className="text-[10px] font-bold text-blue-600 mt-2 flex items-center justify-center gap-1">
                <Droplets className="w-3 h-3" />
                <span>{fc.rainProb}% Rain</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
