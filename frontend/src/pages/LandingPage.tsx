import React from 'react';
import {
  Sprout,
  BrainCircuit,
  TrendingUp,
  Landmark,
  CloudSun,
  Plane,
  Activity,
  Droplets,
  ShoppingBag,
  ShieldCheck,
  Award,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Smartphone,
  Zap,
  Globe,
  Star
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreApp: () => void;
  onSelectModule: (moduleId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onExploreApp,
  onSelectModule
}) => {
  const { t } = useLanguage();

  const corePillars = [
    {
      id: 'aiHub',
      title: 'AI Crop Doctor & Soil Labs',
      description: 'Upload crop photos to detect 120+ diseases with 95%+ accuracy. Get organic & chemical prescriptions instantly.',
      icon: BrainCircuit,
      color: 'from-emerald-500 to-teal-600',
      badge: '95%+ Accuracy'
    },
    {
      id: 'krishiBhavishya',
      title: 'KrishiBhavishya AI ("Time Machine")',
      description: 'Predict mandi prices 7, 15, 30, and 60 days ahead. Identify the highest-profit selling window before harvesting.',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-600',
      badge: '+38% Profit Lift'
    },
    {
      id: 'govtSchemes',
      title: 'Government Scheme Finder',
      description: 'Find matching subsidies for PM-KISAN, KCC, PMFBY, and PMKSY Drip kits based on your land size and state.',
      icon: Landmark,
      color: 'from-blue-500 to-indigo-600',
      badge: '100% Direct DBT'
    },
    {
      id: 'drone',
      title: 'DroneSpray AI Planner',
      description: 'Automate precision spraying flight paths. Cover 1 acre in 7 minutes with zero crop trampling and 95% uniform coverage.',
      icon: Plane,
      color: 'from-purple-500 to-violet-600',
      badge: 'Autonomous Mission'
    },
    {
      id: 'iot',
      title: 'SmartFarm IoT & Telemetry',
      description: 'Continuous real-time monitoring of soil moisture, N-P-K levels, temperature, and overhead sump tanks via wireless probes.',
      icon: Activity,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Live Telemetry'
    },
    {
      id: 'pump',
      title: 'Smart Automated Irrigation',
      description: 'Automatic pump activation based on real-time soil moisture thresholds and upcoming 7-day rainfall forecasts.',
      icon: Droplets,
      color: 'from-sky-500 to-teal-600',
      badge: 'Saves 60% Water'
    }
  ];

  const testimonials = [
    {
      name: 'Ramesh Patil',
      role: 'Tomato & Sugarcane Farmer',
      location: 'Mandya, Karnataka',
      quote: 'KrishiBhavishya AI predicted the exact tomato price surge in August. I held my harvest by 10 days and made ₹92,000 extra profit!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    {
      name: 'Gurpreet Singh',
      role: 'Wheat & Paddy Cultivator',
      location: 'Ludhiana, Punjab',
      quote: 'The AI Crop Doctor diagnosed leaf blast in my paddy before it spread to the whole 8-acre field. The organic remedy worked in 4 days.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
    },
    {
      name: 'Pravin Deshmukh',
      role: 'Onion & Pomegranate Grower',
      location: 'Nashik, Maharashtra',
      quote: 'Smart Irrigation auto-pump saved me 45% electricity and water. I can monitor my borewell and drip zones right from my mobile.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden gradient-mesh-bg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Next-Gen Indian AgriTech SaaS 2.0</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-heading">
                {t('landingHeroTitle')}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t('landingHeroSub')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onGetStarted}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-base shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2.5 group"
                >
                  <span>{t('getStarted')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onExploreApp}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 text-slate-800 font-bold text-base border border-slate-300 shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('exploreApp')}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-left">
                <div>
                  <div className="text-2xl font-black text-emerald-700 font-heading">50,000+</div>
                  <div className="text-xs text-slate-500 font-medium">Farmers Empowered</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-700 font-heading">94.8%</div>
                  <div className="text-xs text-slate-500 font-medium">Disease AI Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-700 font-heading">₹2.4 Cr+</div>
                  <div className="text-xs text-slate-500 font-medium">Extra Value Realized</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Illustration Dashboard Mock */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Floating Backdrop Glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-2xl opacity-25"></div>

                {/* Interactive Hero Card */}
                <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4">
                  {/* Top Status */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                        🌱
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">Cauvery Valley Field 2</div>
                        <div className="text-[10px] text-emerald-600 font-semibold">Active: Tomato Hybrid (Arka Rakshak)</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Health: 94%
                    </span>
                  </div>

                  {/* Live Metrics Quad */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Soil Moisture</div>
                      <div className="text-lg font-bold text-slate-900 mt-0.5">58% Optimal</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">Pump in Auto-Standby</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Predicted Price</div>
                      <div className="text-lg font-bold text-amber-600 mt-0.5">₹3,120 / qtl</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">+38% Peak in 25 days</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Weather AI</div>
                      <div className="text-lg font-bold text-slate-900 mt-0.5">29.4°C Calm</div>
                      <div className="text-[10px] text-slate-500 font-medium">Spraying window: 4:30 PM</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Drone Status</div>
                      <div className="text-lg font-bold text-purple-700 mt-0.5">Ready for Mission</div>
                      <div className="text-[10px] text-slate-500 font-medium">14 min spray flight</div>
                    </div>
                  </div>

                  {/* Quick Action Simulator */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <BrainCircuit className="w-5 h-5 text-emerald-300 animate-pulse" />
                      <div className="text-xs">
                        <div className="font-bold">AI Diagnostics Engine</div>
                        <div className="text-[10px] text-emerald-200">Zero crop loss protocol active</div>
                      </div>
                    </div>
                    <button
                      onClick={onExploreApp}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-[11px] transition-colors"
                    >
                      Open Live
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE FEATURES GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Farm Operating System</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Everything an Indian Farmer Needs to Prosper
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Engineered specifically for Indian agricultural realities—from mandi price volatility to drip water conservation and government subsidies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  onClick={() => onSelectModule(pillar.id)}
                  className="glass-card rounded-3xl p-7 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-heading mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                    <span>Explore Module</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. KRISHIBHAVISHYA SPOTLIGHT */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Proprietary Agri-Commodity Engine</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-heading leading-tight">
                KrishiBhavishya AI: <br />
                <span className="text-amber-400">The Farm Time Machine</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Never sell at distress prices again. Our AI models predict wholesale APMC price trajectories for Tomato, Paddy, Onion, Cotton, and Wheat up to 60 days into the future.
              </p>

              <div className="space-y-3">
                {[
                  'Historical APMC arrivals & seasonal supply forecasting',
                  'Festival demand spike indexing across major metro consumption hubs',
                  'Real-time transport cost vs distance arbitrage calculator'
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onSelectModule('krishiBhavishya')}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-xl transition-all flex items-center gap-2"
              >
                <span>Launch KrishiBhavishya AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase">Sample Forecast</div>
                    <div className="text-lg font-bold text-white font-heading">Tomato (Hybrid F1) - 60 Day Outlook</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    Bullish (+38.6%)
                  </span>
                </div>

                {/* Timeline Step Bar */}
                <div className="grid grid-cols-5 gap-2 text-center my-6">
                  {[
                    { label: 'Today', price: '₹2,250', status: 'Current' },
                    { label: 'Day 7', price: '₹2,480', status: 'Rising' },
                    { label: 'Day 15', price: '₹2,760', status: 'Strong' },
                    { label: 'Day 30', price: '₹3,120', status: 'PEAK ⭐', isPeak: true },
                    { label: 'Day 60', price: '₹2,150', status: 'Normal' },
                  ].map((st, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-2xl border ${
                        st.isPeak
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold text-slate-400">{st.label}</div>
                      <div className="text-xs sm:text-sm font-extrabold mt-1">{st.price}</div>
                      <div className="text-[9px] font-bold mt-0.5">{st.status}</div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-emerald-300">Recommended Selling Window:</div>
                    <div className="text-xs text-slate-200 font-medium">Day 25 to Day 35 (Kolar & Bengaluru Mandi)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Potential Extra Profit</div>
                    <div className="text-sm font-black text-emerald-400">+₹87,000 / 100 Qtl</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
              Loved by Farmers Across India
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Real results from grassroots agricultural innovators and progressive farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-3 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-300"
                  />
                  <div>
                    <div className="font-bold text-xs text-slate-900">{t.name}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">{t.role}</div>
                    <div className="text-[10px] text-slate-400">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA FOOTER SECTION */}
      <section className="py-16 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
            Transform Your Farm With AI Today
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto">
            Join thousands of smart farmers using KrishiSmart AI to protect crops, optimize water, and maximize harvest profit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold text-base shadow-xl transition-all"
            >
              Get Started for Free
            </button>
            <button
              onClick={onExploreApp}
              className="px-8 py-4 rounded-2xl bg-emerald-900/60 hover:bg-emerald-900 text-white font-bold text-base border border-white/20 transition-all"
            >
              View Live Demo Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
