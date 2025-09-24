import React from 'react';

interface FormFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'date' | 'email';
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}

export function FormField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  multiline,
  min,
  max,
  step
}: FormFieldProps) {
  const baseClasses = `
    w-full px-3 py-2 border border-slate-300 rounded-lg
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-colors placeholder:text-slate-400
  `;

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={3}
          className={baseClasses}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
          className={baseClasses}
        />
      )}
    </div>
  );
}