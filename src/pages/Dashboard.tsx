import React from 'react';
import { useLeaseContext } from '../context/LeaseContext';
import { KPICard } from '../components/Dashboard/KPICard';
import { ChartCard } from '../components/Dashboard/ChartCard';
import { RecentActivity } from '../components/Dashboard/RecentActivity';
import { FileText, Calculator, DollarSign, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

export function Dashboard() {
  const { state } = useLeaseContext();
  const { calculations, leaseData } = state;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Overview of your IFRS 16 lease portfolio</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Contracts"
          value={leaseData.ContractID ? "1" : "0"}
          icon={FileText}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <KPICard
          title="Lease Liability"
          value={calculations ? `₦${(calculations.initialLiability / 1000000).toFixed(1)}M` : "₦0"}
          icon={DollarSign}
          color="green"
        />
        <KPICard
          title="ROU Assets"
          value={calculations ? `₦${(calculations.initialROU / 1000000).toFixed(1)}M` : "₦0"}
          icon={Calculator}
          color="purple"
        />
        <KPICard
          title="Active Leases"
          value={leaseData.ContractID ? "1" : "0"}
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Liability vs ROU Asset"
          description="Tracking the balance over time"
        >
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
            {calculations ? (
              <div className="text-center space-y-2">
                <TrendingUp className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-sm text-slate-600">
                  Initial Liability: ₦{(calculations.initialLiability / 1000000).toFixed(2)}M
                  <br />
                  Initial ROU: ₦{(calculations.initialROU / 1000000).toFixed(2)}M
                </div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm text-slate-600">Complete lease data to view charts</p>
              </div>
            )}
          </div>
        </ChartCard>
        
        <ChartCard
          title="Payment Schedule"
          description="Monthly payment breakdown"
        >
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
            {calculations ? (
              <div className="text-center space-y-2">
                <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-sm text-slate-600">
                  {calculations.cashflowSchedule.length} payment periods
                  <br />
                  ₦{((leaseData.FixedPaymentPerPeriod || 0) / 1000000).toFixed(2)}M per {leaseData.PaymentFrequency?.toLowerCase()}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm text-slate-600">Complete lease data to view schedule</p>
              </div>
            )}
          </div>
        </ChartCard>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}