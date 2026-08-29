import { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export class AuthController {
  public static async login(req: Request, res: Response): Promise<Response> {
    const { email, name } = req.body;
    if (!email) {
      return sendError(res, 'Email is required', 400);
    }
    const result = UserService.login(email, name);
    return sendSuccess(res, result, 'Login successful');
  }

  public static async register(req: Request, res: Response): Promise<Response> {
    const result = UserService.register(req.body);
    return sendSuccess(res, result, 'Registration successful', 201);
  }

  public static async getProfile(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const userId = req.user?.id || 'usr-001';
    const user = UserService.getCurrentUser(userId);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    return sendSuccess(res, user);
  }

  public static async updateProfile(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const userId = req.user?.id || 'usr-001';
    const updated = UserService.updateUser(userId, req.body);
    return sendSuccess(res, updated, 'Profile updated successfully');
  }

  public static async logout(req: Request, res: Response): Promise<Response> {
    return sendSuccess(res, { loggedOut: true }, 'Logout successful');
  }
}
