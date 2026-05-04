/**
 * Campo de entrada — Fluent Design Input
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
      <label className="block text-[11px] font-semibold text-[#616161] mb-1.5 tracking-wide">
        {label}
      </label>
      <input
        className={`fluent-input ${fontMono ? 'font-mono text-[#616161]' : ''}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
});

export default InputField;
