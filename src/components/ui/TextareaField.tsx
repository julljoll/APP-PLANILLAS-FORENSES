/**
 * Campo de texto multilínea — Fluent Design Textarea
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
      <label className="block text-[11px] font-semibold text-[#616161] mb-1.5 tracking-wide">
        {label}
      </label>
      <textarea
        className="fluent-input h-24 resize-none"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
});

export default TextareaField;
