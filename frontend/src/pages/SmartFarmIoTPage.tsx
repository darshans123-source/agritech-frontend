import React, { useState } from 'react';
import {
  Activity,
  Droplets,
  Thermometer,
  Sun,
  Battery,
  Wifi,
  Plus,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Radio
} from 'lucide-react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { IoTDevice } from '../types';

export const SmartFarmIoTPage: React.FC = () => {
  const { iotDevices, addIoTDevice } = useFarmData();
  const { t } = useLanguage();

  const [showAddModal, setShowAddModal] = useState(false);
  const [devName, setDevName] = useState('');
  const [devType, setDevType] = useState<IoTDevice['type']>('Soil Probe');
  const [devLocation, setDevLocation] = useState('Field 1 (Paddy Parcel)');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devName.trim()) return;
    addIoTDevice({
      name: devName,
      type: devType,
      fieldLocation: devLocation,
      batteryLevel: 100,
      signalStrength: 95,
      metrics: {
        soilMoisture: 56,
        soilTemp: 24.5,
        ambientTemp: 29.8,
        humidity: 66
      }
    });
    setDevName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-1 border border-cyan-200">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>LoRaWAN & MQTT IoT Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {t('smartFarmIot')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time wireless telemetry from in-field dielectric soil sensors and micro-weather nodes.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Connect IoT Node</span>
        </button>
      </div>

      {/* 1. LIVE TELEMETRY SENSOR MATRIX */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Soil Moisture */}
        <div className="glass-card p-5 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-extrabold text-slate-400">Soil Moisture</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-sensor-pulse"></span>
          </div>
          <div className="text-3xl font-black text-slate-900 font-heading">
            58% <span className="text-xs font-bold text-emerald-600">VWC</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Status: <strong className="text-emerald-700">NORMAL</strong></div>
        </div>

        {/* Soil Temperature */}
        <div className="glass-card p-5 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Soil Temperature</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-sensor-pulse"></span>
          </div>
          <div className="text-3xl font-black text-slate-900 font-heading">
            24.2°C
          </div>
          <div className="text-[11px] text-slate-500 mt-1">15 cm depth reading</div>
        </div>

        {/* Overhead Sump Tank */}
        <div className="glass-card p-5 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Water Tank Level</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-sensor-pulse"></span>
          </div>
          <div className="text-3xl font-black text-cyan-700 font-heading">
            84% <span className="text-xs font-semibold text-slate-400">(42,000 L)</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Borewell Sump Active</div>
        </div>

        {/* Sunlight Radiation */}
        <div className="glass-card p-5 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Solar Radiation</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-sensor-pulse"></span>
          </div>
          <div className="text-3xl font-black text-slate-900 font-heading">
            48,500 <span className="text-xs font-semibold text-slate-400">Lux</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">High Photosynthesis Index</div>
        </div>
      </div>

      {/* 2. CONNECTED DEVICES LIST & TELEMETRY TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 font-heading">
              Registered IoT Nodes & Probes ({iotDevices.length} Connected)
            </h3>
            <p className="text-xs text-slate-500">
              LoRaWAN gateway wireless signal coverage: 94% across all parcels.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {iotDevices.map((dev) => (
            <div
              key={dev.id}
              className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-400 transition-all flex flex-col justify-between space-y-4 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {dev.status}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                    <Battery className="w-4 h-4 text-emerald-600" />
                    <span>{dev.batteryLevel}%</span>
                    <span>•</span>
                    <Wifi className="w-4 h-4 text-blue-600" />
                    <span>{dev.signalStrength}%</span>
                  </div>
                </div>

                <h4 className="font-extrabold text-base text-slate-900 font-heading">
                  {dev.name}
                </h4>
                <div className="text-xs text-slate-500 mt-0.5">
                  Type: <strong>{dev.type}</strong> | Location: <strong>{dev.fieldLocation}</strong>
                </div>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-200/80 text-xs">
                  {dev.metrics.soilMoisture !== undefined && (
                    <div className="p-2 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-bold">Soil Moisture</div>
                      <div className="font-extrabold text-slate-900">{dev.metrics.soilMoisture}%</div>
                    </div>
                  )}
                  {dev.metrics.soilTemp !== undefined && (
                    <div className="p-2 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-bold">Soil Temp</div>
                      <div className="font-extrabold text-slate-900">{dev.metrics.soilTemp}°C</div>
                    </div>
                  )}
                  {dev.metrics.ambientTemp !== undefined && (
                    <div className="p-2 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-bold">Ambient Temp</div>
                      <div className="font-extrabold text-slate-900">{dev.metrics.ambientTemp}°C</div>
                    </div>
                  )}
                  {dev.metrics.waterLevel !== undefined && (
                    <div className="p-2 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-bold">Tank Level</div>
                      <div className="font-extrabold text-cyan-700">{dev.metrics.waterLevel}%</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>Node ID: {dev.id}</span>
                <span>Ping: {dev.lastPing}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONNECT DEVICE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 font-heading">
                Connect Wireless IoT Probe
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Device Nickname</label>
                <input
                  type="text"
                  value={devName}
                  onChange={(e) => setDevName(e.target.value)}
                  placeholder="e.g. Field C Sugarcane Probe"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sensor Type</label>
                <select
                  value={devType}
                  onChange={(e: any) => setDevType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  <option value="Soil Probe">Multi-Depth FDR Soil Moisture Probe</option>
                  <option value="Weather Node">Micro-Climate Farm Station</option>
                  <option value="Water Level Sensor">Ultrasonic Tank Level Sensor</option>
                  <option value="Pump Controller">Smart Starter Relay Unit</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Field Location</label>
                <input
                  type="text"
                  value={devLocation}
                  onChange={(e) => setDevLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all mt-2"
              >
                Pair IoT Node (+120 XP)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
