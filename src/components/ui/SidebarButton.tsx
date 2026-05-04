/**
 * Botón de navegación lateral reutilizable
 */

import { memo, type ReactNode } from 'react';

interface SidebarButtonProps {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const SidebarButton = memo(function SidebarButton({
  active,
  icon,
  label,
  onClick,
}: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
        active
          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
          : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'
      }`}
    >
      {icon} {label}
    </button>
  );
});

export default SidebarButton;
