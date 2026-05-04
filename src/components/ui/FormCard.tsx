/**
 * Tarjeta contenedora — Fluent Design Card
 */
import { memo, type ReactNode } from 'react';

interface FormCardProps {
  title: string;
  icon: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}

const FormCard = memo(function FormCard({
  title,
  icon,
  action,
  children,
}: FormCardProps) {
  return (
    <div className="fluent-card p-5 animate-fluent-in">
      <div className="flex justify-between items-center pb-3 mb-4 border-b border-[#F0F0F0]">
        <h2 className="text-[13px] font-semibold text-[#1A1A1A] flex items-center gap-2">
          <span className="text-[#0078D4]">{icon}</span>
          {title}
        </h2>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
});

export default FormCard;
