import {
  UserProfile,
  Farm,
  Crop,
  FarmTask,
  WeatherData,
  MandiItem,
  GovernmentScheme,
  FinancialSummary,
  FinancialTransaction,
  IoTDevice,
  SmartPump,
  DronePlan,
  StoreProduct,
  StoreOrder,
  NotificationItem,
  AchievementBadge,
  DiseaseDetectionResult,
  SoilAnalysisReport,
  KrishiBhavishyaForecast,
  Language
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<{ success: boolean; data: T; message?: string }> {
  const token = localStorage.getItem('krishi_auth_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP Error ${response.status}`);
    }

    return data;
  } catch (error: any) {
    console.warn(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
}

export const api = {
  // Auth & Profile
  auth: {
    login: (email: string, name?: string) =>
      request<{ user: UserProfile; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, name }),
      }),
    register: (userData: Partial<UserProfile>) =>
      request<{ user: UserProfile; token: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    logout: () =>
      request<{ loggedOut: boolean }>('/auth/logout', { method: 'POST' }),
    getProfile: () =>
      request<UserProfile>('/auth/profile'),
    updateProfile: (data: Partial<UserProfile>) =>
      request<UserProfile>('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  // Farms
  farms: {
    getAll: () => request<Farm[]>('/farms'),
    getById: (id: string) => request<Farm>(`/farms/${id}`),
    create: (farm: Omit<Farm, 'id'>) =>
      request<Farm>('/farms', {
        method: 'POST',
        body: JSON.stringify(farm),
      }),
    update: (id: string, farm: Partial<Farm>) =>
      request<Farm>(`/farms/${id}`, {
        method: 'PUT',
        body: JSON.stringify(farm),
      }),
    delete: (id: string) =>
      request<{ deleted: boolean }>(`/farms/${id}`, { method: 'DELETE' }),
  },

  // Crops & Tasks
  crops: {
    getAll: (farmId?: string) =>
      request<Crop[]>(`/crops${farmId ? `?farmId=${farmId}` : ''}`),
    getById: (id: string) => request<Crop>(`/crops/${id}`),
    create: (crop: Omit<Crop, 'id' | 'timeline'>) =>
      request<Crop>('/crops', {
        method: 'POST',
        body: JSON.stringify(crop),
      }),
    advanceStage: (id: string, stageId: Crop['currentStage']) =>
      request<Crop>(`/crops/${id}/advance-stage`, {
        method: 'POST',
        body: JSON.stringify({ stageId }),
      }),
    delete: (id: string) =>
      request<{ deleted: boolean }>(`/crops/${id}`, { method: 'DELETE' }),

    // Tasks
    getTasks: () => request<FarmTask[]>('/crops/tasks'),
    addTask: (task: Omit<FarmTask, 'id' | 'completed'>) =>
      request<FarmTask>('/crops/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
      }),
    toggleTask: (id: string) =>
      request<FarmTask>(`/crops/tasks/${id}/toggle`, { method: 'PUT' }),
  },

  // AI Hub Services
  ai: {
    diagnoseDisease: (payload: { image?: string; sampleId?: string; cropHint?: string }) =>
      request<DiseaseDetectionResult>('/ai/diagnose', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    getDiagnosticSamples: () =>
      request<any[]>('/ai/samples'),
    analyzeSoil: (params: {
      ph: number;
      nitrogen: number;
      phosphorus: number;
      potassium: number;
      organicCarbon?: number;
      salinityEc?: number;
    }) =>
      request<SoilAnalysisReport>('/ai/soil-analysis', {
        method: 'POST',
        body: JSON.stringify(params),
      }),
    predictYield: (params: {
      crop: string;
      areaAcres: number;
      soilHealthRating?: number;
      irrigationHealth?: number;
      climateRiskFactor?: number;
    }) =>
      request<any>('/ai/yield-prediction', {
        method: 'POST',
        body: JSON.stringify(params),
      }),
    recommendCrops: (params: {
      state: string;
      district?: string;
      season?: string;
      soilType?: string;
      waterSource?: string;
    }) =>
      request<any>('/ai/crop-recommendation', {
        method: 'POST',
        body: JSON.stringify(params),
      }),
    chat: (query: string, language: Language = 'en', context?: any) =>
      request<any>('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ query, language, context }),
      }),
  },

  // Disease endpoint
  disease: {
    analyze: (payload: { image?: string; sampleId?: string; crop?: string }) =>
      request<DiseaseDetectionResult>('/disease/analyze', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    getSamples: () => request<any[]>('/disease/samples'),
  },

  // Soil endpoint
  soil: {
    analyze: (params: any) =>
      request<SoilAnalysisReport>('/soil/analyze', {
        method: 'POST',
        body: JSON.stringify(params),
      }),
  },

  // Finance / KrishiNidhi
  finance: {
    calculateProfit: (params: { totalIncome?: number; totalExpenses?: number }) =>
      request<any>('/finance/profit', {
        method: 'POST',
        body: JSON.stringify(params),
      }),
    checkLoanEligibility: (params: {
      landSizeAcres: number;
      annualGrossIncome: number;
      existingLoanEmi?: number;
      creditScore?: number;
    }) =>
      request<any>('/finance/loan-eligibility', {
        method: 'POST',
        body: JSON.stringify(params),
      }),
    getSummary: () => request<FinancialSummary>('/finance/summary'),
    getExpenses: () => request<FinancialTransaction[]>('/finance/expenses'),
    addExpense: (expense: Omit<FinancialTransaction, 'id' | 'type'>) =>
      request<FinancialTransaction>('/finance/expenses', {
        method: 'POST',
        body: JSON.stringify(expense),
      }),
    getIncome: () => request<FinancialTransaction[]>('/finance/income'),
    addIncome: (income: Omit<FinancialTransaction, 'id' | 'type'>) =>
      request<FinancialTransaction>('/finance/income', {
        method: 'POST',
        body: JSON.stringify(income),
      }),
    getHealth: () => request<any>('/finance/health'),
  },

  // Schemes
  schemes: {
    getAll: (category?: string) =>
      request<GovernmentScheme[]>(`/schemes${category ? `?category=${category}` : ''}`),
    getById: (id: string) => request<GovernmentScheme>(`/schemes/${id}`),
    apply: (id: string, applicantData?: any) =>
      request<GovernmentScheme>(`/schemes/${id}/apply`, {
        method: 'POST',
        body: JSON.stringify(applicantData || {}),
      }),
  },

  // Market & KrishiBhavishya
  market: {
    getMandiRates: (state?: string, district?: string, commodity?: string) => {
      const params = new URLSearchParams();
      if (state) params.append('state', state);
      if (district) params.append('district', district);
      if (commodity) params.append('commodity', commodity);
      return request<MandiItem[]>(`/market?${params.toString()}`);
    },
    getBestMarket: (commodity = 'Tomato') =>
      request<MandiItem>(`/market/best?commodity=${commodity}`),
    predictFuturePrice: (params: {
      crop: string;
      quantity: number;
      harvestDate?: string;
      location?: string;
    }) =>
      request<KrishiBhavishyaForecast>('/market/future-price', {
        method: 'POST',
        body: JSON.stringify(params),
      }),
  },

  // Weather
  weather: {
    getCurrent: (location?: string) =>
      request<WeatherData>(`/weather${location ? `?location=${location}` : ''}`),
    getSprayingAdvisory: () => request<any>('/weather/spraying'),
    getIrrigationAdvisory: () => request<any>('/weather/irrigation'),
    getForecast: () => request<any[]>('/weather/forecast'),
  },

  // IoT
  iot: {
    getDevices: () => request<IoTDevice[]>('/iot/devices'),
    getDeviceById: (id: string) => request<IoTDevice>(`/iot/devices/${id}`),
    createDevice: (device: Omit<IoTDevice, 'id' | 'lastPing' | 'status'>) =>
      request<IoTDevice>('/iot/devices', {
        method: 'POST',
        body: JSON.stringify(device),
      }),
    getReadings: (id: string) => request<any>(`/iot/devices/${id}/readings`),
  },

  // Smart Pump
  pumps: {
    getAll: () => request<SmartPump[]>('/pumps'),
    getById: (id: string) => request<SmartPump>(`/pumps/${id}`),
    control: (id: string, action: { status?: 'ON' | 'OFF'; mode?: 'MANUAL' | 'AUTO' | 'SCHEDULE'; threshold?: number }) =>
      request<any>(`/pumps/${id}/control`, {
        method: 'POST',
        body: JSON.stringify(action),
      }),
    setSchedule: (id: string, schedule: any) =>
      request<any>(`/pumps/${id}/schedule`, {
        method: 'POST',
        body: JSON.stringify(schedule),
      }),
    getHistory: (id: string) => request<any[]>(`/pumps/${id}/history`),
  },

  // Drone
  drone: {
    getPlans: () => request<DronePlan[]>('/drone/plans'),
    createPlan: (planInput: any) =>
      request<any>('/drone/plan', {
        method: 'POST',
        body: JSON.stringify(planInput),
      }),
    executeMission: (id: string) =>
      request<DronePlan>(`/drone/plans/${id}/execute`, { method: 'POST' }),
  },

  // Store
  store: {
    getProducts: (category?: string, search?: string) => {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (search) params.append('search', search);
      return request<StoreProduct[]>(`/store/products?${params.toString()}`);
    },
    getProductById: (id: string) => request<StoreProduct>(`/store/products/${id}`),
    getOrders: () => request<StoreOrder[]>('/store/orders'),
    createOrder: (items: any[], deliveryAddress: string, paymentMethod: string) =>
      request<StoreOrder>('/store/orders', {
        method: 'POST',
        body: JSON.stringify({ items, deliveryAddress, paymentMethod }),
      }),
  },

  // Notifications & Achievements
  notifications: {
    getAll: () => request<NotificationItem[]>('/notifications'),
    markRead: (id: string) =>
      request<NotificationItem>(`/notifications/${id}/read`, { method: 'PUT' }),
    markAllRead: () =>
      request<{ markedAll: boolean }>('/notifications/mark-all-read', { method: 'POST' }),
    getAchievements: () =>
      request<AchievementBadge[]>('/notifications/achievements'),
  },

  // Premium
  premium: {
    getTiers: () => request<any[]>('/premium/tiers'),
    unlockPro: () => request<UserProfile>('/premium/unlock', { method: 'POST' }),
  },

  // Assistant
  assistant: {
    query: (query: string, language: Language = 'en', context?: any) =>
      request<any>('/assistant/query', {
        method: 'POST',
        body: JSON.stringify({ query, language, context }),
      }),
  }
};
