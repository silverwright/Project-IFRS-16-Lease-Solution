import React from 'react';
import { useLeaseContext } from '../context/LeaseContext';
import { CalculationEngine } from '../components/Calculations/CalculationEngine';
import { ResultsDisplay } from '../components/Calculations/ResultsDisplay';
import { Calculator, AlertTriangle } from 'lucide-react';

export function LeaseCalculations() {
  const { state } = useLeaseContext();
  const { leaseData, calculations } = state;

  const hasRequiredData = !!(
    leaseData.ContractID &&
    leaseData.CommencementDate &&
    leaseData.NonCancellableYears &&
    leaseData.FixedPaymentPerPeriod &&
    leaseData.IBR_Annual
  );

  return (
    <div className="w-full min-h-screen p-6 space-y-6 bg-slate-100">

      {/* Header Box */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 flex items-center gap-3 shadow">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <Calculator className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lease Liability & ROU Engine</h1>
          <p className="text-slate-600">IFRS 16 calculations and amortization schedules</p>
        </div>
      </div>

      {/* Missing Data Warning Box */}
      {!hasRequiredData && (
        <div className="bg-amber-50 rounded-lg border border-amber-200 shadow p-6 flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-800 text-lg">Missing Required Data</h4>
            <p className="text-amber-700 mt-1">
              Please complete the contract initiation form with required fields to perform calculations.
            </p>
          </div>
        </div>
      )}

      {/* Calculation Engine Box */}
      {hasRequiredData && !calculations && (
        <div className="bg-white rounded-lg border border-slate-200 shadow p-6">
          <CalculationEngine />
        </div>
      )}

      {/* Results Display Box */}
      {calculations && (
        <div className="bg-white rounded-lg border border-slate-200 shadow p-6">
          <ResultsDisplay />
        </div>
      )}

    </div>
  );
}
