/**
 * Botón de navegación lateral — Fluent Design
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
      className={`group w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-150 relative ${
        active
          ? 'bg-white/[0.08] text-white'
          : 'text-[#9E9E9E] hover:text-[#E0E0E0] hover:bg-white/[0.04]'
      }`}
    >
      {/* Fluent active indicator — left bar */}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#0078D4] rounded-r-full" />
      )}
      <span className={`transition-colors ${active ? 'text-[#0078D4]' : 'group-hover:text-[#E0E0E0]'}`}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
});

export default SidebarButton;
