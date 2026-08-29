import { Request, Response } from 'express';
import { AssistantService } from '../services/ai/assistant.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class AssistantController {
  public static async query(req: Request, res: Response): Promise<Response> {
    const { query, language, context } = req.body;
    if (!query) {
      return sendError(res, 'query is required', 400);
    }
    const result = await AssistantService.generateResponse(query, language, context);
    return sendSuccess(res, result);
  }
}
