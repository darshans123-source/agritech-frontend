import { Request, Response } from 'express';
import { FinanceService } from '../services/finance.service.js';
import { FinancialAdvisorService } from '../services/ai/financialAdvisor.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class FinanceController {
  public static calculateProfit(req: Request, res: Response): Response {
    const { totalIncome, totalExpenses, cropCosts } = req.body;
    const result = FinancialAdvisorService.calculateProfit({ totalIncome, totalExpenses, cropCosts });
    return sendSuccess(res, result);
  }

  public static checkLoanEligibility(req: Request, res: Response): Response {
    const { landSizeAcres, annualGrossIncome, existingLoanEmi, creditScore } = req.body;
    if (landSizeAcres === undefined || annualGrossIncome === undefined) {
      return sendError(res, 'landSizeAcres and annualGrossIncome are required', 400);
    }
    const result = FinancialAdvisorService.checkLoanEligibility({
      landSizeAcres,
      annualGrossIncome,
      existingLoanEmi,
      creditScore
    });
    return sendSuccess(res, result);
  }

  public static getSummary(req: Request, res: Response): Response {
    const summary = FinanceService.getSummary();
    return sendSuccess(res, summary);
  }

  public static getExpenses(req: Request, res: Response): Response {
    const expenses = FinanceService.getExpenses();
    return sendSuccess(res, expenses);
  }

  public static addExpense(req: Request, res: Response): Response {
    const { category, amount, date, description, cropAssociated } = req.body;
    if (!amount || !category) {
      return sendError(res, 'amount and category are required', 400);
    }
    const tx = FinanceService.addTransaction({
      type: 'Expense',
      category,
      amount,
      date: date || new Date().toISOString().split('T')[0],
      description: description || 'Farm expense',
      cropAssociated
    });
    return sendSuccess(res, tx, 'Expense added successfully', 201);
  }

  public static getIncome(req: Request, res: Response): Response {
    const income = FinanceService.getIncome();
    return sendSuccess(res, income);
  }

  public static addIncome(req: Request, res: Response): Response {
    const { category, amount, date, description, cropAssociated } = req.body;
    if (!amount || !category) {
      return sendError(res, 'amount and category are required', 400);
    }
    const tx = FinanceService.addTransaction({
      type: 'Income',
      category,
      amount,
      date: date || new Date().toISOString().split('T')[0],
      description: description || 'Farm income',
      cropAssociated
    });
    return sendSuccess(res, tx, 'Income added successfully', 201);
  }

  public static getHealth(req: Request, res: Response): Response {
    const health = FinanceService.getFinancialHealth();
    return sendSuccess(res, health);
  }
}
