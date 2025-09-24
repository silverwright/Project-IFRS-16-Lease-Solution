import React from 'react';
import { Clock, FileText, Calculator, CheckCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'contract',
    title: 'New lease contract created',
    description: 'LSE-2025-001 - Office equipment lease',
    time: '2 hours ago',
    icon: FileText,
    color: 'blue'
  },
  {
    id: 2,
    type: 'calculation',
    title: 'IFRS 16 calculations completed',
    description: 'Liability: ₦2.1B, ROU: ₦2.7B',
    time: '3 hours ago',
    icon: Calculator,
    color: 'green'
  },
  {
    id: 3,
    type: 'approval',
    title: 'Contract approved',
    description: 'CFO approval for LSE-2025-001',
    time: '1 day ago',
    icon: CheckCircle,
    color: 'purple'
  }
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center
              ${activity.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
              ${activity.color === 'green' ? 'bg-green-100 text-green-600' : ''}
              ${activity.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
            `}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{activity.title}</p>
              <p className="text-sm text-slate-600">{activity.description}</p>
              <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}