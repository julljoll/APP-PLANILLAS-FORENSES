/**
 * Tarjeta contenedora para secciones de formulario
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/60 ring-1 ring-slate-900/5 transition-all hover:shadow-md">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
        <h2 className="text-sm font-bold text-[#0a1122] flex items-center gap-2 uppercase tracking-wide">
          <span className="text-amber-500">{icon}</span> {title}
        </h2>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
});

export default FormCard;
