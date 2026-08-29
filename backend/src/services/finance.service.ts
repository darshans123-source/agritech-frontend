import { db } from '../models/database.js';
import { FinancialSummary, FinancialTransaction } from '../types/index.js';

export class FinanceService {
  public static getSummary(): FinancialSummary {
    return db.financialSummary;
  }

  public static getTransactions(): FinancialTransaction[] {
    return Array.from(db.transactions.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  public static getExpenses(): FinancialTransaction[] {
    return Array.from(db.transactions.values()).filter((t) => t.type === 'Expense');
  }

  public static getIncome(): FinancialTransaction[] {
    return Array.from(db.transactions.values()).filter((t) => t.type === 'Income');
  }

  public static addTransaction(data: Omit<FinancialTransaction, 'id'>): FinancialTransaction {
    const id = `tx-${Date.now()}`;
    const tx: FinancialTransaction = { ...data, id };
    db.transactions.set(id, tx);

    // Update summary
    if (tx.type === 'Income') {
      db.financialSummary.totalIncome += tx.amount;
    } else {
      db.financialSummary.totalExpenses += tx.amount;
    }
    db.financialSummary.netProfit = db.financialSummary.totalIncome - db.financialSummary.totalExpenses;
    db.financialSummary.profitMargin = Number(
      ((db.financialSummary.netProfit / db.financialSummary.totalIncome) * 100).toFixed(1)
    );

    return tx;
  }

  public static getFinancialHealth() {
    const summary = db.financialSummary;
    return {
      kisanCreditScore: summary.kisanCreditScore,
      loanEligibilityAmount: summary.loanEligibilityAmount,
      profitMargin: summary.profitMargin,
      netProfit: summary.netProfit,
      rating: summary.kisanCreditScore >= 750 ? 'Grade A+' : 'Grade B',
      eligibilityStatus: 'Instant Pre-Approved under NABARD Priority Lending'
    };
  }
}
