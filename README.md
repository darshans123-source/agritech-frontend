# 🌾 KrishiSmart AI - Full-Stack Precision Agriculture Platform

KrishiSmart AI is a full-stack, AI-powered agricultural intelligence and IoT precision farming platform designed to empower farmers with real-time decision support, automated irrigation, AI crop doctor diagnostics, 60-day mandi price forecasting (**KrishiBhavishya**), drone mission planning, financial advisory (**KrishiNidhi**), and government scheme assistance.

---

## 🏗️ Full-Stack Project Structure

```
krishismart-ai/
│
├── frontend/                     # React + TypeScript + Vite + Tailwind CSS UI
│   ├── src/
│   │   ├── assets/               # Static assets & icons
│   │   ├── components/           # Reusable UI & Layout components
│   │   │   ├── ai/               # Floating 24/7 AI Assistant
│   │   │   └── layout/           # Navbar, Sidebar
│   │   ├── pages/                # 18 Full Feature Pages
│   │   ├── context/              # Language, Toast, and Live FarmDataContext
│   │   ├── services/             # Centralized REST API Client (api.ts)
│   │   ├── constants/            # Translations (English, Kannada, Hindi), Mock Data
│   │   ├── types/                # TypeScript Interfaces
│   │   ├── utils/                # Utility helpers (cn)
│   │   ├── App.tsx               # Main App Routing & Shell
│   │   ├── main.tsx              # React Root Entrypoint
│   │   └── index.css             # Design System & Tailwind theme
│   ├── public/                   # Static assets
│   ├── package.json              # Frontend dependencies & scripts
│   ├── tsconfig.json             # Frontend TypeScript configuration
│   ├── vite.config.ts            # Vite bundler & API proxy configuration
│   └── .env.example              # Frontend environment variables
│
├── backend/                      # Node.js + Express + TypeScript REST API
│   ├── src/
│   │   ├── config/               # Environment & Server configuration
│   │   ├── controllers/          # Request handlers for all domain entities
│   │   ├── routes/               # Modular Express API routes
│   │   ├── services/             # Core business logic & Services
│   │   │   └── ai/               # Dedicated AI Micro-Services:
│   │   │       ├── cropDoctor.service.ts
│   │   │       ├── soilAnalysis.service.ts
│   │   │       ├── yieldPrediction.service.ts
│   │   │       ├── cropRecommendation.service.ts
│   │   │       ├── financialAdvisor.service.ts
│   │   │       ├── marketPrediction.service.ts
│   │   │       ├── krishiBhavishya.service.ts
│   │   │       └── assistant.service.ts
│   │   ├── models/               # Model interfaces & Database repository store
│   │   ├── middleware/           # Auth, Error Handling, and Validation
│   │   ├── utils/                # Standardized API response formatters
│   │   ├── types/                # Shared domain types
│   │   ├── app.ts                # Express app setup & CORS configuration
│   │   └── server.ts             # Server entrypoint (Port 5000)
│   ├── package.json              # Backend dependencies & scripts
│   ├── tsconfig.json             # Backend TypeScript configuration
│   └── .env.example              # Backend environment variables
│
├── package.json                  # Root orchestrator scripts
├── README.md                     # Documentation
└── .gitignore                    # Git ignore configuration
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or newer)
- npm

### 1. Run Frontend & Backend Concurrently
From the root directory, simply run:

```bash
npm run dev
```

This starts:
- **Backend API**: [http://localhost:5000](http://localhost:5000) (API Base: `/api`)
- **Frontend App**: [http://localhost:5173](http://localhost:5173)

### 2. Run Independently
To run each part separately:

```bash
# Run Backend only
npm run backend

# Run Frontend only
npm run frontend
```

### 3. Build for Production
```bash
npm run build
```

---

## 📡 Backend REST API Endpoints

| Category | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/login` | User login & token generation |
| | `POST` | `/api/auth/register` | Register new farmer profile |
| | `GET` | `/api/auth/profile` | Get current farmer profile |
| **Farms** | `GET` | `/api/farms` | List all registered farms |
| | `POST` | `/api/farms` | Create new farm |
| **Crops** | `GET` | `/api/crops` | List active crop portfolios |
| | `POST` | `/api/crops` | Register new crop |
| | `POST` | `/api/crops/:id/advance-stage` | Advance crop growth stage |
| **AI Hub** | `POST` | `/api/ai/diagnose` | AI Crop Doctor disease scanner |
| | `POST` | `/api/ai/soil-analysis` | NPK & pH chemical soil analysis |
| | `POST` | `/api/ai/yield-prediction` | Multi-factor crop yield forecaster |
| | `POST` | `/api/ai/crop-recommendation` | Climate & soil based recommendations |
| | `POST` | `/api/ai/chat` | 24/7 Multilingual AI Farm Advisor |
| **Finance** | `POST` | `/api/finance/profit` | Net profit & ROI calculator |
| | `POST` | `/api/finance/loan-eligibility` | KCC & farm loan eligibility check |
| | `GET` | `/api/finance/summary` | Financial summary & credit score |
| **Market** | `GET` | `/api/market` | Live APMC Mandi rates & arrivals |
| | `POST` | `/api/market/future-price` | **KrishiBhavishya** 60-day price trend forecaster |
| **Weather** | `GET` | `/api/weather` | 7-day forecast & spraying advisory |
| **IoT** | `GET` | `/api/iot/devices` | Connected telemetry sensor nodes |
| | `GET` | `/api/iot/devices/:id/readings`| Real-time multi-depth sensor readings |
| **Pump** | `GET` | `/api/pumps` | Smart pump controllers |
| | `POST` | `/api/pumps/:id/control` | Auto/Manual pump toggle trigger |
| **Drone** | `POST` | `/api/drone/plan` | Autonomous spray flight planner |
| **Store** | `GET` | `/api/store/products` | Agri marketplace products & inputs |
| | `POST` | `/api/store/orders` | Place direct input delivery order |

---

## 🌐 Multilingual Support
KrishiSmart AI supports 3 languages seamlessly across all screens:
1. **English (EN)**
2. **ಕನ್ನಡ (Kannada - KN)**
3. **हिंदी (Hindi - HI)**
