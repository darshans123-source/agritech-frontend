import { Router } from 'express';
import { FinanceController } from '../controllers/finance.controller.js';

const router = Router();

router.post('/profit', FinanceController.calculateProfit);
router.post('/loan-eligibility', FinanceController.checkLoanEligibility);
router.get('/summary', FinanceController.getSummary);
router.get('/expenses', FinanceController.getExpenses);
router.post('/expenses', FinanceController.addExpense);
router.get('/income', FinanceController.getIncome);
router.post('/income', FinanceController.addIncome);
router.get('/health', FinanceController.getHealth);

export default router;
