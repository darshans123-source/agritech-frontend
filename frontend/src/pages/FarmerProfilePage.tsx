import React, { useState } from 'react';
import {
  User,
  MapPin,
  Phone,
  Mail,
  Sprout,
  Coins,
  Award,
  Crown,
  Edit,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';

export const FarmerProfilePage: React.FC = () => {
  const { user, farms, crops, financialSummary, logout, updateUser } = useFarmData();
  const { t, language, setLanguage } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Darshan Patil');
  const [village, setVillage] = useState(user?.village || 'Pandavapura');
  const [district, setDistrict] = useState(user?.district || 'Mandya');
  const [phone, setPhone] = useState(user?.phone || '+91 98452 34120');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, village, district, phone });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {t('profile')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Farmer credentials, land ownership records, active parcels, and telemetry settings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2.5 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all flex items-center gap-1.5 border border-rose-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>

      {/* 1. PRIMARY PROFILE CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-24 h-24 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-3xl border-2 border-emerald-300 overflow-hidden shadow-sm shrink-0">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user?.name?.charAt(0) || 'F'
            )}
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900 font-heading">
                {user?.name || 'Farmer'}
              </h2>
              {user?.isPremium && (
                <span className="px-2.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black rounded-md uppercase tracking-wider shadow-xs">
                  PRO FARMER
                </span>
              )}
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                Level {user?.level || 4}
              </span>
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{user?.village}, {user?.district}, {user?.state}</span>
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {user?.phone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {user?.email}
              </span>
            </div>
          </div>
        </div>

        {/* Farm Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 font-medium">Total Cultivable Land</div>
            <div className="text-lg font-black text-slate-900 mt-0.5 font-heading">
              {user?.landSize || 6.5} Acres
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 font-medium">Farming Practice</div>
            <div className="text-lg font-black text-emerald-700 mt-0.5 font-heading">
              {user?.farmingType || 'Precision Tech'}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 font-medium">Farming Experience</div>
            <div className="text-lg font-black text-slate-900 mt-0.5 font-heading">
              {user?.experienceYears || 8} Years
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 font-medium">KrishiSmart Member Since</div>
            <div className="text-lg font-black text-slate-900 mt-0.5 font-heading">
              {user?.joinedDate || 'Jun 2025'}
            </div>
          </div>
        </div>
      </div>

      {/* 2. PARCELS & ACTIVE CROPS SNAPSHOT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 font-heading">
            Registered Farm Parcels ({farms.length})
          </h3>
          <div className="space-y-3">
            {farms.map((f) => (
              <div key={f.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{f.name}</div>
                  <div className="text-[11px] text-slate-500">{f.location}</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-emerald-700">{f.totalArea} Acres</div>
                  <div className="text-[10px] text-slate-400">{f.waterSource}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 font-heading">
            Active Crop Portfolio ({crops.length})
          </h3>
          <div className="space-y-3">
            {crops.map((c) => (
              <div key={c.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{c.name}</div>
                  <div className="text-[11px] text-slate-500">{c.variety} ({c.area} Acres)</div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 font-heading">
                Update Farmer Profile
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Farmer Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Village / Taluk</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all mt-2"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
