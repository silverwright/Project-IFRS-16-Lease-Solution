import React from 'react';
import { FileText, File } from 'lucide-react';

interface ModeSelectorProps {
  currentMode: 'MINIMAL' | 'FULL';
  onModeChange: (mode: 'MINIMAL' | 'FULL') => void;
}

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Contract Mode</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onModeChange('MINIMAL')}
          className={`
            p-6 rounded-lg border-2 text-left transition-all hover:shadow-md
            ${currentMode === 'MINIMAL' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-slate-200 hover:border-slate-300'
            }
          `}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              currentMode === 'MINIMAL' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
            }`}>
              <File className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-slate-900">Minimal Mode</h4>
          </div>
          <p className="text-sm text-slate-600 mb-3">
            Core IFRS 16 inputs with concise contract generation. Perfect for standard leases.
          </p>
        </button>

        <button
          onClick={() => onModeChange('FULL')}
          className={`
            p-6 rounded-lg border-2 text-left transition-all hover:shadow-md
            ${currentMode === 'FULL' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-slate-200 hover:border-slate-300'
            }
          `}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              currentMode === 'FULL' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
            }`}>
              <FileText className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-slate-900">Full Mode</h4>
          </div>
          <p className="text-sm text-slate-600 mb-3">
            Comprehensive commercial and legal dataset with robust contract features.
          </p>
        </button>
      </div>
    </div>
  );
}