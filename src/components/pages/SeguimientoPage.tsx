/**
 * Página: Seguimiento y Auditoría — Fluent Design
 */
import { BookOpen, ExternalLink } from 'lucide-react';
import ForensicDashboard from '../ForensicDashboard';

interface SeguimientoPageProps {
  onOpenTemplate: (filename: string) => void;
}

export default function SeguimientoPage({ onOpenTemplate }: SeguimientoPageProps) {
  return (
    <div className="space-y-6">
      {/* Fluent info banner */}
      <div className="fluent-card p-4 flex items-center justify-between bg-[#DEECF9] border-[#B4D6F0]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-[#0078D4] text-white">
            <BookOpen size={18} />
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-[#1A1A1A]">Protocolo Forense Interactivo</h3>
            <p className="text-[11px] text-[#616161] mt-0.5">Guía paso a paso con "Cero Riesgo de Nulidad" para el procesamiento de evidencias.</p>
          </div>
        </div>
        <button
          onClick={() => onOpenTemplate('seguimiento.html')}
          className="fluent-btn-primary text-[12px] shrink-0"
        >
          <ExternalLink size={14} /> Ver Protocolo
        </button>
      </div>

      <ForensicDashboard />
    </div>
  );
}
