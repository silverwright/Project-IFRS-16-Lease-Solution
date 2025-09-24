import React, { ReactNode } from 'react';
import { MoreHorizontal } from 'lucide-react';

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {description && (
            <p className="text-sm text-slate-600">{description}</p>
          )}
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <MoreHorizontal className="w-4 h-4 text-slate-600" />
        </button>
      </div>
      {children}
    </div>
  );
}