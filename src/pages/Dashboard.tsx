import React from 'react';
import { useLeaseContext } from '../context/LeaseContext';
import { KPICard } from '../components/Dashboard/KPICard';
import { ChartCard } from '../components/Dashboard/ChartCard';
import { 
  FileText, 
  Calculator, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  PieChart,
  BarChart3,
  Clock,
  Target,
  Activity,
  Zap
} from 'lucide-react';

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

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <ChartCard
          title="Liability vs ROU Asset"
          description="Tracking the balance over time"
        >
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-200">
            {calculations ? (
              <div className="text-center space-y-2">
                <TrendingUp className="w-8 h-8 text-blue-500 mx-auto" />
                <div className="text-sm text-blue-700">
                  Initial Liability: ₦{(calculations.initialLiability / 1000000).toFixed(2)}M
                  <br />
                  Initial ROU: ₦{(calculations.initialROU / 1000000).toFixed(2)}M
                </div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-blue-400 mx-auto" />
                <p className="text-sm text-blue-600">Complete lease data to view charts</p>
              </div>
            )}
          </div>
        </ChartCard>
        
        <ChartCard
          title="Monthly Depreciation"
          description="ROU asset depreciation over time"
        >
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg border-2 border-dashed border-green-200">
            {calculations ? (
              <div className="text-center space-y-2">
                <BarChart3 className="w-8 h-8 text-green-500 mx-auto" />
                <div className="text-sm text-green-700">
                  Monthly Depreciation: ₦{((calculations.totalDepreciation / (leaseData.NonCancellableYears || 1) / 12) / 1000000).toFixed(2)}M
                  <br />
                  Total: ₦{(calculations.totalDepreciation / 1000000).toFixed(2)}M
                </div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-green-400 mx-auto" />
                <p className="text-sm text-green-600">Complete lease data to view depreciation</p>
              </div>
            )}
          </div>
        </ChartCard>

        <ChartCard
          title="Interest Expense Trend"
          description="Monthly interest expense over lease term"
        >
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg border-2 border-dashed border-purple-200">
            {calculations ? (
              <div className="text-center space-y-2">
                <Activity className="w-8 h-8 text-purple-500 mx-auto" />
                <div className="text-sm text-purple-700">
                  Avg Monthly Interest: ₦{((calculations.totalInterest / (leaseData.NonCancellableYears || 1) / 12) / 1000000).toFixed(2)}M
                  <br />
                  Total Interest: ₦{(calculations.totalInterest / 1000000).toFixed(2)}M
                </div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-purple-400 mx-auto" />
                <p className="text-sm text-purple-600">Complete lease data to view interest</p>
              </div>
            )}
          </div>
        </ChartCard>
      </div>

      {/* Secondary Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <ChartCard
          title="Portfolio Composition"
          description="Leases by asset class"
        >
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg border-2 border-dashed border-orange-200">
            <div className="text-center space-y-2">
              <PieChart className="w-8 h-8 text-orange-500 mx-auto" />
              <div className="text-sm text-orange-700">
                {leaseData.AssetClass || 'Equipment'}: 100%
                <br />
                <span className="text-xs">1 Active Contract</span>
              </div>
            </div>
          </div>
        </ChartCard>
              </div>
            )}
          </div>
        </ChartCard>
      </div>

        <ChartCard
          title="Payment Schedule"
          description="Upcoming payment timeline"
        >
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-100 rounded-lg border-2 border-dashed border-cyan-200">
            {calculations ? (
              <div className="text-center space-y-2">
                <Calendar className="w-8 h-8 text-cyan-500 mx-auto" />
                <div className="text-sm text-cyan-700">
                  Next Payment: ₦{((leaseData.FixedPaymentPerPeriod || 0) / 1000000).toFixed(2)}M
                  <br />
                  {leaseData.PaymentFrequency} payments
                </div>
              </div>
        <ChartCard
          title="Contract Maturities"
          description="Upcoming lease expirations"
        >
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 rounded-lg border-2 border-dashed border-red-200">
            <div className="text-center space-y-2">
              <Clock className="w-8 h-8 text-red-500 mx-auto" />
              <div className="text-sm text-red-700">
                {leaseData.EndDateOriginal ? (
                  <>
                    Expires: {new Date(leaseData.EndDateOriginal).toLocaleDateString()}
                    <br />
                    <span className="text-xs">
                      {Math.ceil((new Date(leaseData.EndDateOriginal).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                    </span>
                  </>
                ) : (
                  <>
                    No active contracts
                    <br />
                    <span className="text-xs">Set up contracts to track</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </ChartCard>
            ) : (
        <ChartCard
          title="Lease Performance"
          description="Key performance indicators"
        >
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-teal-50 to-green-100 rounded-lg border-2 border-dashed border-teal-200">
            <div className="text-center space-y-2">
              <Target className="w-8 h-8 text-teal-500 mx-auto" />
              <div className="text-sm text-teal-700">
                {calculations ? (
                  <>
                    Effective Rate: {((leaseData.IBR_Annual || 0) * 100).toFixed(1)}%
                    <br />
                    <span className="text-xs">Lease-to-Asset: {((calculations.initialLiability / calculations.initialROU) * 100).toFixed(0)}%</span>
                  </>
                ) : (
                  <>
                    Performance metrics
                    <br />
                    <span className="text-xs">Complete setup to view</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
              <div className="text-center space-y-2">
      {/* Monthly Trends Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Monthly Cash Flow Trends"
          description="Payment obligations over time"
        >
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg border-2 border-dashed border-indigo-200">
            {calculations ? (
              <div className="text-center space-y-4">
                <Zap className="w-8 h-8 text-indigo-500 mx-auto" />
                <div className="space-y-2">
                  <div className="text-sm text-indigo-700">
                    <strong>Monthly Payment:</strong> ₦{((leaseData.FixedPaymentPerPeriod || 0) / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-sm text-indigo-600">
                    <strong>Annual Total:</strong> ₦{(((leaseData.FixedPaymentPerPeriod || 0) * 12) / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-xs text-indigo-500">
                    {calculations.cashflowSchedule.length} total payments scheduled
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-indigo-400 mx-auto" />
                <p className="text-sm text-indigo-600">Complete lease data to view trends</p>
                <AlertCircle className="w-8 h-8 text-cyan-400 mx-auto" />
                <p className="text-sm text-cyan-600">Complete lease data</p>
              </div>
            )}

        <ChartCard
          title="Liability Amortization"
          description="Outstanding liability reduction over time"
        >
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-rose-50 to-red-100 rounded-lg border-2 border-dashed border-rose-200">
            {calculations ? (
              <div className="text-center space-y-4">
                <TrendingUp className="w-8 h-8 text-rose-500 mx-auto" />
                <div className="space-y-2">
                  <div className="text-sm text-rose-700">
                    <strong>Current Liability:</strong> ₦{(calculations.initialLiability / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-sm text-rose-600">
                    <strong>Monthly Reduction:</strong> ₦{((calculations.initialLiability / (calculations.amortizationSchedule.length || 1)) / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-xs text-rose-500">
                    {calculations.amortizationSchedule.length} periods remaining
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
                <p className="text-sm text-rose-600">Complete lease data to view amortization</p>
              </div>
            )}
          </div>
        </ChartCard>
          </div>
        </ChartCard>
    </div>
  );
}