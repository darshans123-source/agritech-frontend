import React, { createContext, useContext, useState, useEffect } from 'react';
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
  CartItem,
  StoreOrder,
  NotificationItem,
  AchievementBadge
} from '../types';
import {
  INITIAL_USER,
  INITIAL_FARMS,
  INITIAL_CROPS,
  INITIAL_TASKS,
  INITIAL_WEATHER,
  INITIAL_MANDIS,
  INITIAL_SCHEMES,
  INITIAL_FINANCIAL_SUMMARY,
  INITIAL_TRANSACTIONS,
  INITIAL_IOT_DEVICES,
  INITIAL_SMART_PUMP,
  INITIAL_DRONE_PLANS,
  INITIAL_STORE_PRODUCTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACHIEVEMENTS
} from '../constants/mockData';
import { useToast } from './ToastContext';

interface FarmDataContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateUser: (updated: Partial<UserProfile>) => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;

  farms: Farm[];
  addFarm: (farm: Omit<Farm, 'id'>) => void;

  crops: Crop[];
  addCrop: (crop: Omit<Crop, 'id' | 'timeline'>) => void;
  advanceCropStage: (cropId: string, stageId: Crop['currentStage']) => void;
  deleteCrop: (cropId: string) => void;

  tasks: FarmTask[];
  toggleTask: (taskId: string) => void;
  addTask: (task: Omit<FarmTask, 'id' | 'completed'>) => void;

  weather: WeatherData;
  mandis: MandiItem[];
  schemes: GovernmentScheme[];
  applyForScheme: (schemeId: string) => void;

  financialSummary: FinancialSummary;
  transactions: FinancialTransaction[];
  addTransaction: (tx: Omit<FinancialTransaction, 'id'>) => void;

  iotDevices: IoTDevice[];
  addIoTDevice: (device: Omit<IoTDevice, 'id' | 'lastPing' | 'status'>) => void;

  smartPump: SmartPump;
  togglePumpStatus: (status?: 'ON' | 'OFF') => void;
  setPumpMode: (mode: 'MANUAL' | 'AUTO' | 'SCHEDULE') => void;
  updatePumpThreshold: (threshold: number) => void;

  dronePlans: DronePlan[];
  addDronePlan: (plan: Omit<DronePlan, 'id' | 'coverageProgress' | 'status'>) => void;
  executeDroneMission: (planId: string) => void;

  storeProducts: StoreProduct[];
  cart: CartItem[];
  addToCart: (product: StoreProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: StoreOrder[];
  placeOrder: (deliveryAddress: string, paymentMethod: string) => void;

  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  achievements: AchievementBadge[];
  addXP: (amount: number, reason?: string) => void;

  isProUnlocked: boolean;
  unlockProTier: () => void;
}

const FarmDataContext = createContext<FarmDataContextType | undefined>(undefined);

export const FarmDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('krishi_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [farms, setFarms] = useState<Farm[]>(() => {
    const saved = localStorage.getItem('krishi_farms');
    return saved ? JSON.parse(saved) : INITIAL_FARMS;
  });

  const [crops, setCrops] = useState<Crop[]>(() => {
    const saved = localStorage.getItem('krishi_crops');
    return saved ? JSON.parse(saved) : INITIAL_CROPS;
  });

  const [tasks, setTasks] = useState<FarmTask[]>(() => {
    const saved = localStorage.getItem('krishi_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [weather] = useState<WeatherData>(INITIAL_WEATHER);
  const [mandis] = useState<MandiItem[]>(INITIAL_MANDIS);

  const [schemes, setSchemes] = useState<GovernmentScheme[]>(() => {
    const saved = localStorage.getItem('krishi_schemes');
    return saved ? JSON.parse(saved) : INITIAL_SCHEMES;
  });

  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>(() => {
    const saved = localStorage.getItem('krishi_fin_summary');
    return saved ? JSON.parse(saved) : INITIAL_FINANCIAL_SUMMARY;
  });

  const [transactions, setTransactions] = useState<FinancialTransaction[]>(() => {
    const saved = localStorage.getItem('krishi_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [iotDevices, setIotDevices] = useState<IoTDevice[]>(() => {
    const saved = localStorage.getItem('krishi_iot');
    return saved ? JSON.parse(saved) : INITIAL_IOT_DEVICES;
  });

  const [smartPump, setSmartPump] = useState<SmartPump>(() => {
    const saved = localStorage.getItem('krishi_pump');
    return saved ? JSON.parse(saved) : INITIAL_SMART_PUMP;
  });

  const [dronePlans, setDronePlans] = useState<DronePlan[]>(() => {
    const saved = localStorage.getItem('krishi_drone_plans');
    return saved ? JSON.parse(saved) : INITIAL_DRONE_PLANS;
  });

  const [storeProducts] = useState<StoreProduct[]>(INITIAL_STORE_PRODUCTS);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('krishi_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<StoreOrder[]>(() => {
    const saved = localStorage.getItem('krishi_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-84920',
        date: '2026-08-12',
        items: [{ product: INITIAL_STORE_PRODUCTS[0], quantity: 2 }],
        totalAmount: 2700,
        deliveryAddress: 'Pandavapura Mandya Farm Gate 2',
        status: 'Out for Delivery',
        paymentMethod: 'UPI (Google Pay)',
        trackingSteps: [
          { title: 'Order Confirmed', date: 'Aug 12, 10:00 AM', completed: true },
          { title: 'Dispatched from Hub', date: 'Aug 13, 02:30 PM', completed: true },
          { title: 'Out for Delivery (Mandya Courier)', date: 'Aug 19, 08:00 AM', completed: true },
          { title: 'Delivered', date: 'Expected by 5 PM', completed: false }
        ]
      }
    ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('krishi_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [achievements, setAchievements] = useState<AchievementBadge[]>(() => {
    const saved = localStorage.getItem('krishi_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  // Save to localStorage
  useEffect(() => {
    if (user) localStorage.setItem('krishi_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('krishi_farms', JSON.stringify(farms));
  }, [farms]);

  useEffect(() => {
    localStorage.setItem('krishi_crops', JSON.stringify(crops));
  }, [crops]);

  useEffect(() => {
    localStorage.setItem('krishi_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('krishi_schemes', JSON.stringify(schemes));
  }, [schemes]);

  useEffect(() => {
    localStorage.setItem('krishi_fin_summary', JSON.stringify(financialSummary));
    localStorage.setItem('krishi_transactions', JSON.stringify(transactions));
  }, [financialSummary, transactions]);

  useEffect(() => {
    localStorage.setItem('krishi_iot', JSON.stringify(iotDevices));
  }, [iotDevices]);

  useEffect(() => {
    localStorage.setItem('krishi_pump', JSON.stringify(smartPump));
  }, [smartPump]);

  useEffect(() => {
    localStorage.setItem('krishi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('krishi_orders', JSON.stringify(orders));
  }, [orders]);

  // Gamification XP Handler
  const addXP = (amount: number, reason?: string) => {
    if (!user) return;
    const newXP = user.xp + amount;
    const newLevel = Math.floor(newXP / 1000) + 1;
    const leveledUp = newLevel > user.level;

    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        xp: newXP,
        level: newLevel
      };
    });

    if (leveledUp) {
      showToast(`🎉 Level Up! You are now Level ${newLevel} Agri-Master!`, 'success');
    } else if (reason) {
      showToast(`+${amount} XP: ${reason}`, 'success');
    }
  };

  // User Auth & Onboarding
  const login = (email: string, name?: string) => {
    const updatedUser: UserProfile = {
      ...INITIAL_USER,
      email,
      name: name || INITIAL_USER.name
    };
    setUser(updatedUser);
    showToast(`Welcome back, ${updatedUser.name}! 🌱`, 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('krishi_user');
    showToast('Signed out successfully', 'info');
  };

  const updateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
    showToast('Profile updated successfully', 'success');
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      ...INITIAL_USER,
      ...data,
      level: 1,
      xp: 250,
      streakDays: 1,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    addXP(100, 'Completed Onboarding');
    showToast('Welcome to KrishiSmart AI! Your personalized farm is ready.', 'success');
  };

  // Farms
  const addFarm = (farmData: Omit<Farm, 'id'>) => {
    const newFarm: Farm = {
      ...farmData,
      id: `farm-${Date.now()}`
    };
    setFarms((prev) => [...prev, newFarm]);
    addXP(150, 'Registered New Farm');
    showToast(`Farm "${newFarm.name}" registered successfully!`, 'success');
  };

  // Crops
  const addCrop = (cropData: Omit<Crop, 'id' | 'timeline'>) => {
    const newCrop: Crop = {
      ...cropData,
      id: `crop-${Date.now()}`,
      timeline: [
        { id: 'seed', name: 'Seed Treatment & Nursery', status: 'completed', progress: 100, estimatedDate: 'Day 1-15', notes: 'Sowing started', tasks: ['Seed treatment'] },
        { id: 'germination', name: 'Germination & Early Sprout', status: 'active', progress: 50, estimatedDate: 'Day 16-30', notes: 'Sprouting observed', tasks: ['First light irrigation'] },
        { id: 'growth', name: 'Vegetative Growth', status: 'upcoming', progress: 0, estimatedDate: 'Day 31-75', notes: 'Tillering & branching', tasks: ['Nutrient top dressing'] },
        { id: 'flowering', name: 'Flowering & Grain/Fruit Formation', status: 'upcoming', progress: 0, estimatedDate: 'Day 76-110', notes: 'Maintain moisture', tasks: ['Pest check'] },
        { id: 'harvest', name: 'Harvesting & Grading', status: 'upcoming', progress: 0, estimatedDate: 'Day 111+', notes: 'Final harvest', tasks: ['Mandi dispatch'] }
      ]
    };
    setCrops((prev) => [...prev, newCrop]);
    addXP(200, `Added crop ${newCrop.name}`);
    showToast(`Added ${newCrop.name} (${newCrop.variety}) to your active farm portfolio!`, 'success');
  };

  const advanceCropStage = (cropId: string, stageId: Crop['currentStage']) => {
    setCrops((prev) =>
      prev.map((crop) => {
        if (crop.id !== cropId) return crop;
        const stageOrder: Array<Crop['currentStage']> = ['seed', 'germination', 'growth', 'flowering', 'harvest'];
        const targetIndex = stageOrder.indexOf(stageId);

        const newTimeline = crop.timeline.map((stg) => {
          const stgIndex = stageOrder.indexOf(stg.id);
          if (stgIndex < targetIndex) {
            return { ...stg, status: 'completed' as const, progress: 100 };
          } else if (stgIndex === targetIndex) {
            return { ...stg, status: 'active' as const, progress: 60 };
          } else {
            return { ...stg, status: 'upcoming' as const, progress: 0 };
          }
        });

        return {
          ...crop,
          currentStage: stageId,
          timeline: newTimeline
        };
      })
    );
    addXP(80, 'Updated Crop Growth Stage');
    showToast(`Crop growth stage updated to ${stageId.toUpperCase()}`, 'success');
  };

  const deleteCrop = (cropId: string) => {
    setCrops((prev) => prev.filter((c) => c.id !== cropId));
    showToast('Crop record removed', 'info');
  };

  // Tasks
  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const willComplete = !t.completed;
          if (willComplete) {
            addXP(t.xpReward, `Completed task: ${t.title}`);
          }
          return { ...t, completed: willComplete };
        }
        return t;
      })
    );
  };

  const addTask = (taskData: Omit<FarmTask, 'id' | 'completed'>) => {
    const newTask: FarmTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      completed: false
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast('New farm task scheduled!', 'success');
  };

  // Schemes
  const applyForScheme = (schemeId: string) => {
    setSchemes((prev) =>
      prev.map((s) => (s.id === schemeId ? { ...s, appliedStatus: 'In Progress' } : s))
    );
    addXP(100, 'Applied for Government Scheme');
    showToast('Scheme application initiated! Track status in your Scheme Finder.', 'success');
  };

  // Finance
  const addTransaction = (txData: Omit<FinancialTransaction, 'id'>) => {
    const newTx: FinancialTransaction = {
      ...txData,
      id: `tx-${Date.now()}`
    };
    setTransactions((prev) => [newTx, ...prev]);

    setFinancialSummary((prev) => {
      const isInc = newTx.type === 'Income';
      const newInc = isInc ? prev.totalIncome + newTx.amount : prev.totalIncome;
      const newExp = !isInc ? prev.totalExpenses + newTx.amount : prev.totalExpenses;
      const newNet = newInc - newExp;
      return {
        ...prev,
        totalIncome: newInc,
        totalExpenses: newExp,
        netProfit: newNet,
        profitMargin: Number(((newNet / (newInc || 1)) * 100).toFixed(1))
      };
    });

    addXP(30, 'Recorded Financial Entry');
    showToast(`Recorded ${newTx.type} of ₹${newTx.amount.toLocaleString('en-IN')}`, 'success');
  };

  // IoT Devices
  const addIoTDevice = (devData: Omit<IoTDevice, 'id' | 'lastPing' | 'status'>) => {
    const newDev: IoTDevice = {
      ...devData,
      id: `iot-${Date.now()}`,
      status: 'Normal',
      lastPing: 'Just now'
    };
    setIotDevices((prev) => [...prev, newDev]);
    addXP(120, 'Connected New IoT Device');
    showToast(`Connected IoT node "${newDev.name}"`, 'success');
  };

  // Smart Pump
  const togglePumpStatus = (status?: 'ON' | 'OFF') => {
    setSmartPump((prev) => {
      const newStatus = status || (prev.status === 'ON' ? 'OFF' : 'ON');
      const newFlow = newStatus === 'ON' ? 85 : 0;
      return {
        ...prev,
        status: newStatus,
        currentFlowLpm: newFlow,
        dailyWaterLitres: newStatus === 'ON' ? prev.dailyWaterLitres + 500 : prev.dailyWaterLitres
      };
    });
    showToast(`Smart Pump turned ${status || (smartPump.status === 'ON' ? 'OFF' : 'ON')}`, 'info');
  };

  const setPumpMode = (mode: 'MANUAL' | 'AUTO' | 'SCHEDULE') => {
    setSmartPump((prev) => ({ ...prev, mode }));
    showToast(`Smart Irrigation mode set to ${mode}`, 'success');
  };

  const updatePumpThreshold = (soilMoistureThreshold: number) => {
    setSmartPump((prev) => ({ ...prev, soilMoistureThreshold }));
    showToast(`Auto-pump trigger threshold updated to ${soilMoistureThreshold}%`, 'success');
  };

  // Drone Plans
  const addDronePlan = (planData: Omit<DronePlan, 'id' | 'coverageProgress' | 'status'>) => {
    const newPlan: DronePlan = {
      ...planData,
      id: `drone-${Date.now()}`,
      status: 'Scheduled',
      coverageProgress: 0
    };
    setDronePlans((prev) => [newPlan, ...prev]);
    addXP(100, 'Created DroneSpray Mission Plan');
    showToast(`Drone flight plan for ${newPlan.fieldName} created!`, 'success');
  };

  const executeDroneMission = (planId: string) => {
    setDronePlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, status: 'In Flight', coverageProgress: 25 } : p))
    );
    showToast('Drone mission launched! Live telemetry streaming...', 'info');

    setTimeout(() => {
      setDronePlans((prev) =>
        prev.map((p) => (p.id === planId ? { ...p, status: 'Completed', coverageProgress: 100 } : p))
      );
      addXP(150, 'Completed Drone Spray Mission');
      showToast('Drone mission finished successfully! 100% field canopy covered.', 'success');
    }, 4500);
  };

  // Krishi Store E-Commerce
  const addToCart = (product: StoreProduct, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to Cart`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (deliveryAddress: string, paymentMethod: string) => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const newOrder: StoreOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      totalAmount: total,
      deliveryAddress,
      status: 'Processing',
      paymentMethod,
      trackingSteps: [
        { title: 'Order Confirmed', date: 'Just now', completed: true },
        { title: 'Dispatched from Warehouse', date: 'Expected Tomorrow', completed: false },
        { title: 'Out for Delivery', date: 'In 2 days', completed: false },
        { title: 'Delivered to Farm Gate', date: 'In 3 days', completed: false }
      ]
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addXP(100, 'Placed Krishi Store Order');
    showToast(`Order #${newOrder.id} placed successfully! Doorstep delivery to ${deliveryAddress}`, 'success');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Premium Tier
  const isProUnlocked = !!user?.isPremium;
  const unlockProTier = () => {
    if (!user) return;
    setUser((prev) => (prev ? { ...prev, isPremium: true, tier: 'Pro' } : null));
    addXP(500, 'Upgraded to KrishiSmart Pro');
    showToast('🌟 Welcome to KrishiSmart Pro! All AI & IoT features unlocked.', 'success');
  };

  return (
    <FarmDataContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
        completeOnboarding,
        farms,
        addFarm,
        crops,
        addCrop,
        advanceCropStage,
        deleteCrop,
        tasks,
        toggleTask,
        addTask,
        weather,
        mandis,
        schemes,
        applyForScheme,
        financialSummary,
        transactions,
        addTransaction,
        iotDevices,
        addIoTDevice,
        smartPump,
        togglePumpStatus,
        setPumpMode,
        updatePumpThreshold,
        dronePlans,
        addDronePlan,
        executeDroneMission,
        storeProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        orders,
        placeOrder,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        achievements,
        addXP,
        isProUnlocked,
        unlockProTier
      }}
    >
      {children}
    </FarmDataContext.Provider>
  );
};

export const useFarmData = () => {
  const context = useContext(FarmDataContext);
  if (!context) {
    throw new Error('useFarmData must be used within a FarmDataProvider');
  }
  return context;
};
