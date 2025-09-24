import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

export function Select({ label, value, options, onChange, required, placeholder }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="
            w-full px-3 py-2 border border-slate-300 rounded-lg appearance-none
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-colors bg-white
          "
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}