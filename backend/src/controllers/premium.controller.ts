import { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export class PremiumController {
  public static getTiers(req: Request, res: Response): Response {
    const tiers = [
      {
        id: 'free',
        name: 'Krishi Free Starter',
        priceMonthly: 0,
        priceAnnual: 0,
        features: [
          'Basic AI Crop Doctor (3 scans/week)',
          'Local APMC Mandi price tracking',
          'Standard weather forecast (3 days)',
          'Single farm and crop management',
          'Community discussion forum'
        ]
      },
      {
        id: 'pro',
        name: 'KrishiSmart Pro AI',
        priceMonthly: 299,
        priceAnnual: 2499,
        badge: 'Most Popular',
        features: [
          'Unlimited AI Crop Doctor instant scans',
          'KrishiBhavishya 60-Day Mandi Price Predictions',
          'Smart Pump Automated telemetry & threshold control',
          'Autonomous Drone Spray Mission Planner',
          '24/7 AI Audio & Text Advisor in Kannada, Hindi & English',
          'Govt Scheme fast-track document pre-check',
          'Priority Kisan Credit Score booster reports'
        ]
      },
      {
        id: 'enterprise',
        name: 'FPO / Enterprise Fleet',
        priceMonthly: 1499,
        priceAnnual: 12999,
        features: [
          'Everything in Pro for up to 50 farmer members',
          'Multi-field IoT sensor mesh integration',
          'Custom mill & exporter bulk contracts',
          'Dedicated agronomist video consult',
          'Satellite NDVI multispectral imagery'
        ]
      }
    ];
    return sendSuccess(res, tiers);
  }

  public static unlockPro(req: AuthenticatedRequest, res: Response): Response {
    const userId = req.user?.id || 'usr-001';
    const updated = UserService.unlockPro(userId);
    if (!updated) return sendError(res, 'User not found', 404);
    return sendSuccess(res, updated, 'Upgraded to KrishiSmart Pro successfully!');
  }
}
