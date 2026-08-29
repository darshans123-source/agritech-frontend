import React, { useState } from 'react';
import {
  Plane,
  Sparkles,
  Play,
  CheckCircle2,
  AlertTriangle,
  Battery,
  Clock,
  Wind,
  ShieldCheck,
  RotateCcw,
  Sliders,
  Layers,
  MapPin
} from 'lucide-react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';

export const DroneSprayPage: React.FC = () => {
  const { dronePlans, addDronePlan, executeDroneMission, crops, weather } = useFarmData();
  const { t } = useLanguage();

  const [selectedField, setSelectedField] = useState('Field 2 (Tomato 2.0 Acres)');
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [fieldAreaAcres, setFieldAreaAcres] = useState<number>(2.0);
  const [sprayType, setSprayType] = useState<'Bio-Fungicide' | 'Micronutrient Mix' | 'Nano Urea' | 'Insecticide'>('Bio-Fungicide');
  const [chemicalName, setChemicalName] = useState('Bio-Trichoderma & Pseudomonas Blend');
  const [altitudeMeters, setAltitudeMeters] = useState<number>(2.2);

  const activePlan = dronePlans[0];

  const handleCreateNewPlan = (e: React.FormEvent) => {
    e.preventDefault();
    addDronePlan({
      fieldName: selectedField,
      cropName: selectedCrop,
      areaAcres: fieldAreaAcres,
      sprayType,
      chemicalName,
      solutionVolumeLitres: fieldAreaAcres * 20,
      altitudeMeters,
      estimatedFlightTimeMinutes: Math.round(fieldAreaAcres * 7),
      batteryPacksNeeded: fieldAreaAcres > 2 ? 2 : 1,
      windSpeedAcceptable: weather.windSpeed < 14
    });
  };

  const isWindSafe = weather.windSpeed < 14;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1 border border-purple-200">
            <Plane className="w-3.5 h-3.5" />
            <span>Autonomous Agri-Drone Flight Planner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {t('droneSpray')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Precision spraying mission planner with simulated waypoint paths and micronized droplet coverage.
          </p>
        </div>
      </div>

      {/* Safety Notice Badge */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
        <p>
          <strong>Safety & Compliance Notice:</strong> DroneSpray AI is a mission planning and simulation tool. Always ensure certified DGCA drone pilot supervision and adhere to prescribed agro-chemical label dilution guidelines.
        </p>
      </div>

      {/* 1. SIMULATED FIELD FLIGHT RADAR & MISSION STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive SVG Field Map & Drone Waypoint Simulation */}
        <div className="lg:col-span-8 bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-purple-400 animate-ping"></span>
              <h3 className="font-extrabold text-base text-white font-heading">
                Live Flight Path Visualization: {activePlan?.fieldName || 'Tomato Parcel'}
              </h3>
            </div>
            <span
              className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                activePlan?.status === 'Completed'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : activePlan?.status === 'In Flight'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 animate-pulse'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              Status: {activePlan?.status || 'Scheduled'}
            </span>
          </div>

          {/* Simulated SVG Agricultural Field Map */}
          <div className="relative w-full h-64 sm:h-72 bg-emerald-950/40 rounded-2xl border border-emerald-900/60 overflow-hidden flex items-center justify-center p-4">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b15_1px,transparent_1px),linear-gradient(to_bottom,#064e3b15_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Simulated Drone Waypoint Route SVG */}
            <svg className="w-full h-full" viewBox="0 0 500 240">
              {/* Field Boundaries */}
              <rect x="20" y="20" width="460" height="200" rx="16" fill="#064e3b25" stroke="#10b98140" strokeWidth="2" />
              
              {/* Waypoint Zig-Zag Flight Lines */}
              <path
                d="M 40 40 L 460 40 L 460 80 L 40 80 L 40 120 L 460 120 L 460 160 L 40 160 L 40 200 L 460 200"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
                strokeDasharray="6,6"
              />

              {/* Waypoint Dots */}
              {[40, 80, 120, 160, 200].map((y, idx) => (
                <g key={idx}>
                  <circle cx="40" cy={y} r="4" fill="#a855f7" />
                  <circle cx="460" cy={y} r="4" fill="#a855f7" />
                </g>
              ))}

              {/* Simulated Drone Icon Moving along Path */}
              <circle
                cx={activePlan?.status === 'In Flight' ? '250' : activePlan?.status === 'Completed' ? '460' : '40'}
                cy={activePlan?.status === 'In Flight' ? '120' : activePlan?.status === 'Completed' ? '200' : '40'}
                r="12"
                fill="#ec4899"
                className="transition-all duration-1000 shadow-lg"
              />
            </svg>

            {/* Live Telemetry Floating Pill */}
            <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[10px] space-y-0.5">
              <div>Altitude: <strong className="text-purple-300">{activePlan?.altitudeMeters || 2.2} m AGL</strong></div>
              <div>Coverage: <strong className="text-emerald-400">{activePlan?.coverageProgress || 0}%</strong></div>
            </div>
          </div>

          {/* Mission Progress & Launch Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex-1 space-y-1">
              <div className="flex justify-between text-xs text-slate-400 font-semibold">
                <span>Canopy Spray Coverage Progress</span>
                <span className="text-white font-bold">{activePlan?.coverageProgress || 0}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${activePlan?.coverageProgress || 0}%` }}
                />
              </div>
            </div>

            {activePlan && activePlan.status !== 'In Flight' && (
              <button
                onClick={() => executeDroneMission(activePlan.id)}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 shrink-0 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Simulate Drone Flight (+150 XP)</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Flight Planning Form */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900 font-heading">
              New Flight Mission Parameters
            </h3>
            <p className="text-xs text-slate-500">Configure spray volume and flight window.</p>
          </div>

          <form onSubmit={handleCreateNewPlan} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Select Field Parcel</label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="Field 2 (Tomato 2.0 Acres)">Field 2 (Tomato 2.0 Acres)</option>
                <option value="Field 1 (Paddy 2.5 Acres)">Field 1 (Paddy 2.5 Acres)</option>
                <option value="Field 3 (Sugarcane 2.0 Acres)">Field 3 (Sugarcane 2.0 Acres)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Spray Formulation Type</label>
              <select
                value={sprayType}
                onChange={(e: any) => setSprayType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="Bio-Fungicide">Bio-Fungicide (Trichoderma / Pseudomonas)</option>
                <option value="Micronutrient Mix">Foliar Micronutrient Chelate Mix</option>
                <option value="Nano Urea">IFFCO Nano Urea Liquid</option>
                <option value="Insecticide">Bio-Neem Oil & Pest Shield</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Flight Altitude</label>
                <input
                  type="number"
                  step="0.1"
                  value={altitudeMeters}
                  onChange={(e) => setAltitudeMeters(parseFloat(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Total Volume (L)</label>
                <input
                  type="text"
                  readOnly
                  value={`${fieldAreaAcres * 20} Litres`}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-100 text-slate-600 font-bold"
                />
              </div>
            </div>

            {/* Flight Metrics Quick Summary */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Estimated Flight Time:</span>
                <strong className="text-slate-800">{fieldAreaAcres * 7} Minutes</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Batteries Required:</span>
                <strong className="text-slate-800">{fieldAreaAcres > 2 ? '2 Packs' : '1 Pack'}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Wind Tolerance ({weather.windSpeed} km/h):</span>
                <strong className={isWindSafe ? 'text-emerald-700' : 'text-rose-700'}>
                  {isWindSafe ? '✓ Safe for Spray' : '⚠️ Too High'}
                </strong>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all mt-2"
            >
              Create Drone Mission Plan (+100 XP)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
