import { db } from '../../models/database.js';

export class FinancialAdvisorService {
  public static calculateProfit(params: {
    totalIncome?: number;
    totalExpenses?: number;
    cropCosts?: Array<{ crop: string; seedCost: number; fertilizerCost: number; laborCost: number; revenue: number }>;
  }) {
    const summary = db.financialSummary;
    const income = params.totalIncome ?? summary.totalIncome;
    const expenses = params.totalExpenses ?? summary.totalExpenses;
    const netProfit = income - expenses;
    const profitMargin = Number(((netProfit / (income || 1)) * 100).toFixed(1));
    const roi = Number(((netProfit / (expenses || 1)) * 100).toFixed(1));

    return {
      totalIncome: income,
      totalExpenses: expenses,
      netProfit,
      profitMargin,
      roi,
      financialHealthScore: profitMargin > 40 ? 'Excellent' : profitMargin > 20 ? 'Good' : 'Needs Optimization',
      recommendations: [
        'Shift 30% chemical nitrogen spend to IFFCO Nano Urea to reduce input expenditure by Rs 8,500/acre.',
        'Use PMKSY 90% Drip Irrigation subsidy to reduce monthly power and labor watering costs by 45%.'
      ]
    };
  }

  public static checkLoanEligibility(params: {
    landSizeAcres: number;
    annualGrossIncome: number;
    existingLoanEmi?: number;
    creditScore?: number;
  }) {
    const { landSizeAcres, annualGrossIncome, existingLoanEmi = 0, creditScore = 750 } = params;

    // Scale scale of finance ~ Rs 1,00,000 per acre for mixed cropping
    const maxKccLimit = Math.min(300000, Math.round(landSizeAcres * 85000));
    const maxMachineryLoan = Math.round(annualGrossIncome * 1.8 - existingLoanEmi * 12);
    const goldLoanLimit = Math.round(landSizeAcres * 120000);

    const eligibleLoans = [
      {
        schemeName: 'Kisan Credit Card (KCC) Short Term Crop Loan',
        eligibleAmount: maxKccLimit,
        subsidizedInterestRate: '4.0% p.a. (with prompt repayment incentive)',
        tenureMonths: 12,
        collateralRequired: maxKccLimit <= 160000 ? 'Zero Collateral Required' : 'Hypothecation of Standing Crops',
        status: 'Highly Recommended'
      },
      {
        schemeName: 'Agri Infrastructure & Farm Mechanization Loan',
        eligibleAmount: Math.max(200000, maxMachineryLoan),
        subsidizedInterestRate: '7.2% p.a.',
        tenureMonths: 60,
        collateralRequired: 'Charge on purchased equipment + Land hypothecation',
        status: 'Eligible'
      },
      {
        schemeName: 'Agricultural Gold Loan / Micro-Credit',
        eligibleAmount: goldLoanLimit,
        subsidizedInterestRate: '7.0% p.a.',
        tenureMonths: 12,
        collateralRequired: 'Pledge of Gold Ornaments',
        status: 'Instant Approval'
      }
    ];

    return {
      kisanCreditScore: creditScore,
      totalEligibilityAmount: maxKccLimit + Math.max(200000, maxMachineryLoan),
      eligibleLoans,
      advisoryNote: 'With a credit score of ' + creditScore + ', you are eligible for 100% interest subvention benefits under NABARD KCC guidelines.'
    };
  }
}
