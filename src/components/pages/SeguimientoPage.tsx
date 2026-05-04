/**
 * Página: Seguimiento y Auditoría de Evidencia
 * Incluye acceso al protocolo HTML y el dashboard forense interactivo
 */
import { BookOpen } from 'lucide-react';
import ForensicDashboard from '../ForensicDashboard';

interface SeguimientoPageProps {
  onOpenTemplate: (filename: string) => void;
}

export default function SeguimientoPage({ onOpenTemplate }: SeguimientoPageProps) {
  return (
    <div className="space-y-8">
      <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl flex items-center justify-between shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wide flex items-center gap-2">
            <BookOpen size={18} /> Protocolo Forense Interactivo (HTML)
          </h3>
          <p className="text-xs text-amber-700 mt-1">
            Acceda a la guía paso a paso con "Cero Riesgo de Nulidad" para el procesamiento de evidencias.
          </p>
        </div>
        <button
          onClick={() => onOpenTemplate('seguimiento.html')}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md"
        >
          Ver Protocolo Completo
        </button>
      </div>
      <ForensicDashboard />
    </div>
  );
}
