import React, { useState } from 'react';
import {
  Sprout,
  Plus,
  Calendar,
  Layers,
  Droplets,
  Zap,
  TrendingUp,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { Crop } from '../types';

export const MyFarmsPage: React.FC = () => {
  const { farms, addFarm, crops, addCrop, advanceCropStage, deleteCrop } = useFarmData();
  const { t } = useLanguage();

  const [selectedFarmId, setSelectedFarmId] = useState<string>(farms[0]?.id || 'farm-1');
  const [showAddCropModal, setShowAddCropModal] = useState(false);
  const [showAddFarmModal, setShowAddFarmModal] = useState(false);

  // Form states for Add Crop
  const [cropName, setCropName] = useState('Cotton (Bt Hybrid)');
  const [variety, setVariety] = useState('RCH-659 BG-II');
  const [cropArea, setCropArea] = useState<number>(2.0);
  const [sowingDate, setSowingDate] = useState('2026-06-15');
  const [expectedHarvestDate, setExpectedHarvestDate] = useState('2026-11-20');
  const [irrigationSchedule, setIrrigationSchedule] = useState('Drip fertigation every 3 days');
  const [fertilizerSchedule, setFertilizerSchedule] = useState('19:19:19 + Boron foliar spray');
  const [projectedYieldKg, setProjectedYieldKg] = useState<number>(3200);
  const [expectedRevenue, setExpectedRevenue] = useState<number>(224000);

  // Form states for Add Farm
  const [farmName, setFarmName] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [farmTotalArea, setFarmTotalArea] = useState<number>(3.0);
  const [farmSoilType, setFarmSoilType] = useState('Red Sandy Loam');
  const [farmWaterSource, setFarmWaterSource] = useState<'Borewell' | 'Canal' | 'Drip/Sprinkler' | 'Rainfed'>('Borewell');

  const selectedFarm = farms.find((f) => f.id === selectedFarmId) || farms[0];
  const farmCrops = crops.filter((c) => c.farmId === selectedFarmId);

  const handleAddCropSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCrop({
      farmId: selectedFarmId,
      name: cropName,
      variety,
      area: cropArea,
      sowingDate,
      expectedHarvestDate,
      currentStage: 'germination',
      healthScore: 92,
      status: 'Healthy',
      irrigationSchedule,
      fertilizerSchedule,
      projectedYieldKg,
      expectedRevenue
    });
    setShowAddCropModal(false);
  };

  const handleAddFarmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName.trim()) return;
    addFarm({
      name: farmName,
      location: farmLocation || 'Mandya, Karnataka',
      totalArea: farmTotalArea,
      soilType: farmSoilType,
      waterSource: farmWaterSource,
      fieldsCount: 2
    });
    setShowAddFarmModal(false);
  };

  const stages: Array<{ id: Crop['currentStage']; label: string; icon: string }> = [
    { id: 'seed', label: '1. Seed & Sowing', icon: '🌰' },
    { id: 'germination', label: '2. Germination', icon: '🌱' },
    { id: 'growth', label: '3. Vegetative Growth', icon: '🌿' },
    { id: 'flowering', label: '4. Flowering / Fruiting', icon: '🌸' },
    { id: 'harvest', label: '5. Harvest & Market', icon: '🌾' }
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {t('myFarms')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Multi-field lifecycle management, growth stages, schedules, and projected harvest yields.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddFarmModal(true)}
            className="px-4 py-2.5 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all shadow-xs"
          >
            + Add Farm Parcel
          </button>

          <button
            onClick={() => setShowAddCropModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addCrop')}</span>
          </button>
        </div>
      </div>

      {/* Farm Parcel Selector Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {farms.map((farm) => {
          const isSelected = farm.id === selectedFarmId;
          const farmCropCount = crops.filter((c) => c.farmId === farm.id).length;
          return (
            <button
              key={farm.id}
              onClick={() => setSelectedFarmId(farm.id)}
              className={`p-4 rounded-3xl border text-left transition-all shrink-0 min-w-[240px] ${
                isSelected
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-lg shadow-emerald-900/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                  {farm.totalArea} Acres • {farm.waterSource}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-700'}`}>
                  {farmCropCount} Crops
                </span>
              </div>
              <div className="font-bold text-sm font-heading">{farm.name}</div>
              <div className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-emerald-100/80' : 'text-slate-400'}`}>
                {farm.location}
              </div>
            </button>
          );
        })}
      </div>

      {/* Farm Overview Stats Bar */}
      {selectedFarm && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs text-xs">
          <div>
            <span className="text-slate-400 font-medium">Soil Classification</span>
            <div className="font-bold text-slate-800 text-sm mt-0.5">{selectedFarm.soilType}</div>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Irrigation Source</span>
            <div className="font-bold text-slate-800 text-sm mt-0.5">{selectedFarm.waterSource}</div>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Fields / Plots</span>
            <div className="font-bold text-slate-800 text-sm mt-0.5">{selectedFarm.fieldsCount} Zones Active</div>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Est. Seasonal Revenue</span>
            <div className="font-bold text-emerald-700 text-sm mt-0.5">
              ₹{farmCrops.reduce((s, c) => s + c.expectedRevenue, 0).toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      )}

      {/* Crops List with 5-Stage Timelines */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 font-heading">
            Active Crops in {selectedFarm?.name || 'Farm'}
          </h2>
          <span className="text-xs text-slate-500">{farmCrops.length} planted</span>
        </div>

        {farmCrops.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300 p-8 space-y-3">
            <Sprout className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700">No active crops registered in this farm parcel</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Add a new crop to start tracking its 5-stage timeline, irrigation schedules, and yield forecasts.
            </p>
            <button
              onClick={() => setShowAddCropModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
            >
              + Add Crop Now
            </button>
          </div>
        ) : (
          farmCrops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6 hover:border-emerald-400 transition-all"
            >
              {/* Crop Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl">
                    🌱
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900 font-heading">
                        {crop.name}
                      </h3>
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          crop.status === 'Healthy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {crop.status} • {crop.healthScore}% Vigor
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      Variety: {crop.variety} • Allocated Land: <strong>{crop.area} Acres</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Projected Value</div>
                    <div className="text-base font-black text-emerald-700 font-heading">
                      ₹{crop.expectedRevenue.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-500">{crop.projectedYieldKg.toLocaleString('en-IN')} kg est.</div>
                  </div>

                  <button
                    onClick={() => deleteCrop(crop.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove Crop"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 5-STAGE VISUAL TIMELINE */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 font-heading uppercase tracking-wider text-[10px]">
                    Visual Crop Timeline
                  </span>
                  <span className="text-slate-500">
                    Sown: <strong>{crop.sowingDate}</strong> | Harvest: <strong>{crop.expectedHarvestDate}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {stages.map((stg, idx) => {
                    const timelineData = crop.timeline.find((t) => t.id === stg.id);
                    const isCompleted = timelineData?.status === 'completed';
                    const isActive = crop.currentStage === stg.id;
                    return (
                      <div
                        key={stg.id}
                        onClick={() => advanceCropStage(crop.id, stg.id)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer group ${
                          isActive
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400/40'
                            : isCompleted
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                            : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="text-base mb-1">{stg.icon}</div>
                        <div className={`text-[11px] font-bold ${isActive ? 'text-white' : isCompleted ? 'text-emerald-900' : 'text-slate-600'}`}>
                          {stg.label}
                        </div>
                        <div className={`text-[9px] mt-0.5 font-semibold ${isActive ? 'text-emerald-100' : isCompleted ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {isCompleted ? '✓ Done' : isActive ? '● Active' : 'Upcoming'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Schedules & Direct Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                    <Droplets className="w-4 h-4 text-cyan-600" />
                    <span>Irrigation Protocol</span>
                  </div>
                  <p className="text-slate-600">{crop.irrigationSchedule}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Fertilizer & Nutrition Schedule</span>
                  </div>
                  <p className="text-slate-600">{crop.fertilizerSchedule}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD CROP MODAL */}
      {showAddCropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-lg text-slate-900 font-heading">
                Register New Crop to Farm
              </h3>
              <button onClick={() => setShowAddCropModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCropSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Crop Name</label>
                  <input
                    type="text"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    placeholder="e.g. Tomato, Cotton, Wheat"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Variety / Hybrid</label>
                  <input
                    type="text"
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    placeholder="e.g. Arka Rakshak F1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Area (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={cropArea}
                    onChange={(e) => setCropArea(parseFloat(e.target.value))}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sowing Date</label>
                  <input
                    type="date"
                    value={sowingDate}
                    onChange={(e) => setSowingDate(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expected Harvest</label>
                  <input
                    type="date"
                    value={expectedHarvestDate}
                    onChange={(e) => setExpectedHarvestDate(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Irrigation Schedule</label>
                <input
                  type="text"
                  value={irrigationSchedule}
                  onChange={(e) => setIrrigationSchedule(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  placeholder="e.g. Drip 45 mins daily"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Fertilizer Plan</label>
                <input
                  type="text"
                  value={fertilizerSchedule}
                  onChange={(e) => setFertilizerSchedule(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  placeholder="e.g. 19:19:19 fertigation twice a week"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Projected Yield (Kg)</label>
                  <input
                    type="number"
                    value={projectedYieldKg}
                    onChange={(e) => setProjectedYieldKg(parseInt(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expected Revenue (₹)</label>
                  <input
                    type="number"
                    value={expectedRevenue}
                    onChange={(e) => setExpectedRevenue(parseInt(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all mt-2"
              >
                Save Crop (+200 XP)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD FARM PARCEL MODAL */}
      {showAddFarmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 font-heading">
                Add New Farm Parcel
              </h3>
              <button onClick={() => setShowAddFarmModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddFarmSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Farm Parcel Name</label>
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="e.g. North Cauvery High Parcel"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location / Village</label>
                <input
                  type="text"
                  value={farmLocation}
                  onChange={(e) => setFarmLocation(e.target.value)}
                  placeholder="e.g. Pandavapura, Mandya"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Land (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={farmTotalArea}
                    onChange={(e) => setFarmTotalArea(parseFloat(e.target.value))}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Water Source</label>
                  <select
                    value={farmWaterSource}
                    onChange={(e: any) => setFarmWaterSource(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="Borewell">Borewell</option>
                    <option value="Canal">Canal</option>
                    <option value="Drip/Sprinkler">Drip / Sprinkler</option>
                    <option value="Rainfed">Rainfed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Soil Type</label>
                <input
                  type="text"
                  value={farmSoilType}
                  onChange={(e) => setFarmSoilType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  placeholder="e.g. Red Loamy / Black Cotton"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all mt-2"
              >
                Register Farm Parcel (+150 XP)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
