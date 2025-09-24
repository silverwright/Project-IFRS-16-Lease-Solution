import React, { useState } from 'react';
import { useLeaseContext } from '../context/LeaseContext';
import { BarChart3, FileText, Download, Calendar } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Select } from '../components/UI/Select';

const reportTypes = [
  'Maturity Analysis',
  'Journal Entries Summary',
  'Lease Portfolio Summary',
  'Depreciation Schedule',
  'Interest Expense Report'
];

const periods = ['Current Month', 'Current Quarter', 'Current Year', 'Custom Range'];

export function Reports() {
  const { state } = useLeaseContext();
  const { calculations, leaseData } = state;
  const [selectedReport, setSelectedReport] = useState('Maturity Analysis');
  const [selectedPeriod, setSelectedPeriod] = useState('Current Year');

  const generateReport = () => {
    console.log(`Generating ${selectedReport} for ${selectedPeriod}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Disclosures</h1>
          <p className="text-slate-600">Generate IFRS 16 compliant reports and disclosures</p>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Report Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Select
            label="Report Type"
            value={selectedReport}
            options={reportTypes}
            onChange={setSelectedReport}
          />
          
          <Select
            label="Period"
            value={selectedPeriod}
            options={periods}
            onChange={setSelectedPeriod}
          />
          
          <div className="flex items-end">
            <Button
              onClick={generateReport}
              disabled={!calculations}
              className="w-full flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      {calculations && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">{selectedReport} Preview</h3>
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>

          {selectedReport === 'Maturity Analysis' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800">Lease Liability Maturity Analysis</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Period
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Undiscounted Cashflow
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Present Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-slate-900">Year 1</td>
                      <td className="px-4 py-3 text-sm text-slate-900">
                        {leaseData.Currency} {((leaseData.FixedPaymentPerPeriod || 0) * 12).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">
                        {leaseData.Currency} {(calculations.initialLiability * 0.3).toLocaleString()}
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-900">Years 2-5</td>
                      <td className="px-4 py-3 text-sm text-slate-900">
                        {leaseData.Currency} {((leaseData.FixedPaymentPerPeriod || 0) * 48).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">
                        {leaseData.Currency} {(calculations.initialLiability * 0.7).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedReport === 'Journal Entries Summary' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800">Journal Entries Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-slate-700 mb-2">Initial Recognition</h5>
                  <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-sm">
                    <div>Dr. Right-of-use Asset: {leaseData.Currency} {calculations.initialROU.toLocaleString()}</div>
                    <div>Cr. Lease Liability: {leaseData.Currency} {calculations.initialLiability.toLocaleString()}</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-slate-700 mb-2">Annual Impact (Estimated)</h5>
                  <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-sm">
                    <div>Interest Expense: {leaseData.Currency} {(calculations.totalInterest / (leaseData.NonCancellableYears || 1)).toLocaleString()}</div>
                    <div>Depreciation Expense: {leaseData.Currency} {(calculations.totalDepreciation / (leaseData.NonCancellableYears || 1)).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}