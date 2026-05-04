/**
 * Campo de texto multilínea reutilizable con etiqueta
 */

import { memo } from 'react';

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const TextareaField = memo(function TextareaField({
  label,
  value,
  onChange,
  className = '',
  placeholder,
}: TextareaFieldProps) {
  return (
    <div className={className}>
      <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-1.5">
        {label}
      </label>
      <textarea
        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-md py-2.5 px-3 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 hover:border-slate-300 outline-none h-24 resize-none transition-all text-slate-800"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
});

export default TextareaField;
