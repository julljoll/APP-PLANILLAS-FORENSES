/**
 * Campo de entrada reutilizable con etiqueta
 */

import { memo } from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  fontMono?: boolean;
  className?: string;
  placeholder?: string;
}

const InputField = memo(function InputField({
  label,
  value,
  onChange,
  fontMono = false,
  className = '',
  placeholder,
}: InputFieldProps) {
  return (
    <div className={className}>
      <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-1.5">
        {label}
      </label>
      <input
        className={`w-full text-sm bg-slate-50 border border-slate-200 rounded-md py-2.5 px-3 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 hover:border-slate-300 outline-none transition-all ${
          fontMono ? 'font-mono text-slate-600' : 'text-slate-800'
        }`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
});

export default InputField;
