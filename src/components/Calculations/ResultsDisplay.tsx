import React, { useState } from 'react';
import { useLeaseContext } from '../../context/LeaseContext';
import { KPICard } from '../Dashboard/KPICard';
import { DataTable } from '../UI/DataTable';
import { Button } from '../UI/Button';
import { DollarSign, TrendingDown, FileText, Download } from 'lucide-react';

export function ResultsDisplay() {
  const { state } = useLeaseContext();
  const { calculations, leaseData } = state;
  const [activeTab, setActiveTab] = useState('summary');

  if (!calculations) return null;

  const tabs = [
    { id: 'summary', name: 'Summary', icon: DollarSign },
    { id: 'cashflow', name: 'Cashflow', icon: TrendingDown },
    { id: 'amortization', name: 'Amortization', icon: FileText },
    { id: 'journals', name: 'Journal Entries', icon: FileText },
  ];

  const exportToExcel = () => {
    // Mock export functionality
    console.log('Exporting to Excel...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Calculation Results</h3>
        <Button
          variant="outline"
          onClick={exportToExcel}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export to Excel
        </Button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Initial Liability"
          value={`${leaseData.Currency} ${(calculations.initialLiability / 1000000).toFixed(2)}M`}
          icon={DollarSign}
          color="blue"
        />
        <KPICard
          title="Initial ROU Asset"
          value={`${leaseData.Currency} ${(calculations.initialROU / 1000000).toFixed(2)}M`}
          icon={FileText}
          color="green"
        />
        <KPICard
          title="Total Interest"
          value={`${leaseData.Currency} ${(calculations.totalInterest / 1000000).toFixed(2)}M`}
          icon={TrendingDown}
          color="purple"
        />
        <KPICard
          title="Total Depreciation"
          value={`${leaseData.Currency} ${(calculations.totalDepreciation / 1000000).toFixed(2)}M`}
          icon={TrendingDown}
          color="orange"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Calculation Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Initial Lease Liability:</span>
                  <span className="font-medium">{leaseData.Currency} {calculations.initialLiability.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Initial ROU Asset:</span>
                  <span className="font-medium">{leaseData.Currency} {calculations.initialROU.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Lease Term:</span>
                  <span className="font-medium">{leaseData.NonCancellableYears} years</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Interest Expense:</span>
                  <span className="font-medium">{leaseData.Currency} {calculations.totalInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Depreciation:</span>
                  <span className="font-medium">{leaseData.Currency} {calculations.totalDepreciation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Payment Frequency:</span>
                  <span className="font-medium">{leaseData.PaymentFrequency}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cashflow' && (
          <DataTable
            title="Cashflow Schedule"
            data={calculations.cashflowSchedule}
            columns={[
              { key: 'period', label: 'Period' },
              { key: 'date', label: 'Date' },
              { key: 'rent', label: 'Rent Amount', format: (val) => `${leaseData.Currency} ${val.toLocaleString()}` },
            ]}
          />
        )}

        {activeTab === 'amortization' && (
          <DataTable
            title="Liability Amortization Schedule"
            data={calculations.amortizationSchedule}
            columns={[
              { key: 'period', label: 'Period' },
              { key: 'opening', label: 'Opening Balance', format: (val) => `${leaseData.Currency} ${val.toLocaleString()}` },
              { key: 'interest', label: 'Interest', format: (val) => `${leaseData.Currency} ${val.toLocaleString()}` },
              { key: 'payment', label: 'Payment', format: (val) => `${leaseData.Currency} ${val.toLocaleString()}` },
              { key: 'closing', label: 'Closing Balance', format: (val) => `${leaseData.Currency} ${val.toLocaleString()}` },
            ]}
          />
        )}

        {activeTab === 'journals' && (
          <DataTable
            title="Journal Entries"
            data={calculations.journalEntries}
            columns={[
              { key: 'date', label: 'Date' },
              { key: 'account', label: 'Account' },
              { key: 'dr', label: 'Debit', format: (val) => val > 0 ? `${leaseData.Currency} ${val.toLocaleString()}` : '' },
              { key: 'cr', label: 'Credit', format: (val) => val > 0 ? `${leaseData.Currency} ${val.toLocaleString()}` : '' },
              { key: 'memo', label: 'Memo' },
            ]}
          />
        )}
      </div>
    </div>
  );
}