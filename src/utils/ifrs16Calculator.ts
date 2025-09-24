import { LeaseData, CalculationResults } from '../context/LeaseContext';

export function calculateIFRS16(leaseData: Partial<LeaseData>): CalculationResults {
  // Mock calculation - in a real implementation, this would contain the actual IFRS 16 logic
  const paymentPerPeriod = leaseData.FixedPaymentPerPeriod || 0;
  const periods = Math.round((leaseData.NonCancellableYears || 0) * getPeriodsPerYear(leaseData.PaymentFrequency || 'Monthly'));
  const ibrAnnual = leaseData.IBR_Annual || 0.14;
  const ratePerPeriod = Math.pow(1 + ibrAnnual, 1 / getPeriodsPerYear(leaseData.PaymentFrequency || 'Monthly')) - 1;

  // Calculate PV of lease payments (simplified)
  let pv = 0;
  const isAdvance = leaseData.PaymentTiming === 'Advance';
  
  for (let i = 1; i <= periods; i++) {
    const discountFactor = isAdvance ? 
      1 / Math.pow(1 + ratePerPeriod, i - 1) : 
      1 / Math.pow(1 + ratePerPeriod, i);
    pv += paymentPerPeriod * discountFactor;
  }

  const initialLiability = Math.round(pv * 100) / 100;
  const idc = leaseData.InitialDirectCosts || 0;
  const prepayments = leaseData.PrepaymentsBeforeCommencement || 0;
  const incentives = leaseData.LeaseIncentives || 0;
  const initialROU = initialLiability + idc + prepayments - incentives;

  // Generate schedules
  const cashflowSchedule = generateCashflowSchedule(leaseData, periods);
  const amortizationSchedule = generateAmortizationSchedule(initialLiability, paymentPerPeriod, ratePerPeriod, periods);
  const depreciationSchedule = generateDepreciationSchedule(initialROU, periods);
  const journalEntries = generateJournalEntries(leaseData, initialLiability, initialROU, amortizationSchedule, depreciationSchedule);

  const totalInterest = amortizationSchedule.reduce((sum, row) => sum + row.interest, 0);
  const totalDepreciation = depreciationSchedule.reduce((sum, row) => sum + row.depreciation, 0);

  return {
    initialLiability,
    initialROU,
    totalInterest,
    totalDepreciation,
    cashflowSchedule,
    amortizationSchedule,
    depreciationSchedule,
    journalEntries
  };
}

function getPeriodsPerYear(frequency: string): number {
  const map: { [key: string]: number } = {
    'Monthly': 12,
    'Quarterly': 4,
    'Semiannual': 2,
    'Annual': 1
  };
  return map[frequency] || 12;
}

function generateCashflowSchedule(leaseData: Partial<LeaseData>, periods: number) {
  const schedule = [];
  const startDate = new Date(leaseData.CommencementDate || '2025-01-01');
  const paymentAmount = leaseData.FixedPaymentPerPeriod || 0;
  const monthsPerPeriod = 12 / getPeriodsPerYear(leaseData.PaymentFrequency || 'Monthly');

  for (let i = 1; i <= periods; i++) {
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(startDate.getMonth() + (i - 1) * monthsPerPeriod);
    
    schedule.push({
      period: i,
      date: paymentDate.toISOString().split('T')[0],
      rent: paymentAmount
    });
  }

  return schedule;
}

function generateAmortizationSchedule(initialLiability: number, payment: number, rate: number, periods: number) {
  const schedule = [];
  let opening = initialLiability;

  for (let i = 1; i <= periods; i++) {
    const interest = opening * rate;
    const principal = payment - interest;
    const closing = opening - principal;

    schedule.push({
      period: i,
      opening: Math.round(opening * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      payment: payment,
      principal: Math.round(principal * 100) / 100,
      closing: Math.round(closing * 100) / 100
    });

    opening = closing;
  }

  return schedule;
}

function generateDepreciationSchedule(initialROU: number, periods: number) {
  const depreciationPerPeriod = initialROU / periods;
  const schedule = [];

  for (let i = 1; i <= periods; i++) {
    schedule.push({
      period: i,
      depreciation: Math.round(depreciationPerPeriod * 100) / 100
    });
  }

  return schedule;
}

function generateJournalEntries(leaseData: Partial<LeaseData>, liability: number, rou: number, amort: any[], dep: any[]) {
  const entries = [];
  const commenceDate = leaseData.CommencementDate || '2025-01-01';

  // Initial recognition
  entries.push(
    {
      date: commenceDate,
      account: 'Right-of-use asset',
      dr: rou,
      cr: 0,
      memo: 'Initial recognition'
    },
    {
      date: commenceDate,
      account: 'Lease liability',
      dr: 0,
      cr: liability,
      memo: 'Initial recognition'
    }
  );

  // Add first few periodic entries as examples
  if (amort.length > 0) {
    const firstPeriod = amort[0];
    entries.push(
      {
        date: commenceDate,
        account: 'Interest expense (lease)',
        dr: firstPeriod.interest,
        cr: 0,
        memo: 'Interest expense'
      },
      {
        date: commenceDate,
        account: 'Cash',
        dr: 0,
        cr: firstPeriod.payment,
        memo: 'Lease payment'
      }
    );
  }

  return entries;
}