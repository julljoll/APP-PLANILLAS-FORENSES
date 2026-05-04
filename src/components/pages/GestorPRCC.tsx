/**
 * Página: Sistema de Gestión de PRCC — Fluent Design
 */
import { useState, useCallback } from 'react';
import { Fingerprint, Plus, Search, History, Printer, LayoutTemplate } from 'lucide-react';
import { FormCard, InputField, TextareaField } from '../ui';
import type { PRCCRecord } from '../../types';

interface GestorPRCCProps {
  onOpenTemplate: (filename: string) => void;
}

export default function GestorPRCC({ onOpenTemplate }: GestorPRCCProps) {
  const [cedula, setCedula] = useState('');
  const [descInicial, setDescInicial] = useState('');
  const [descDerivada, setDescDerivada] = useState('');
  const [padreHash, setPadreHash] = useState('');
  const [searchResults, setSearchResults] = useState<PRCCRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleBuscar = useCallback(async () => {
    if (!cedula) return;
    setIsSearching(true);
    if (window.electronAPI) {
      const res = await window.electronAPI.buscarPorCedula(cedula);
      if (res.ok && res.data) setSearchResults(res.data);
    }
    setIsSearching(false);
  }, [cedula]);

  const handleGenerarInicial = useCallback(async () => {
    if (!cedula || !descInicial) { alert('Cédula y descripción son obligatorias'); return; }
    if (!window.electronAPI) { alert('Esta función solo está disponible en la versión de escritorio'); return; }
    const res = await window.electronAPI.generarPRCC({ cedula, tipo: 'inicial', descripcion: descInicial, extraData: { timestamp: Date.now() } });
    if (res.ok) { alert(`PRCC Inicial generado. Hash: ${res.hash?.substring(0, 10)}...`); setDescInicial(''); handleBuscar(); }
    else alert('Error: ' + res.error);
  }, [cedula, descInicial, handleBuscar]);

  const handleGenerarDerivada = useCallback(async () => {
    if (!cedula || !descDerivada) { alert('Cédula y descripción son obligatorias'); return; }
    if (!window.electronAPI) { alert('Esta función solo está disponible en la versión de escritorio'); return; }
    const res = await window.electronAPI.generarPRCC({ cedula, tipo: 'derivada', descripcion: descDerivada, padreHash: padreHash || null, extraData: { timestamp: Date.now() } });
    if (res.ok) { alert(`PRCC Derivada generado. Hash: ${res.hash?.substring(0, 10)}...`); setDescDerivada(''); setPadreHash(''); handleBuscar(); }
    else alert('Error: ' + res.error);
  }, [cedula, descDerivada, padreHash, handleBuscar]);

  const handlePrint = useCallback(async (record: PRCCRecord) => {
    if (window.electronAPI) await window.electronAPI.printToPDF({ html: record.html_generado, filename: `PRCC_${record.hash.substring(0, 8)}.pdf` });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-5">
        <FormCard title="Funcionario Responsable" icon={<Fingerprint size={15} />}>
          <div className="flex gap-3">
            <div className="flex-1">
              <InputField label="Cédula de Identidad" placeholder="Ej: V-12345678" value={cedula} onChange={setCedula} />
            </div>
            <div className="flex items-end">
              <button onClick={handleBuscar} className="fluent-btn-primary py-[9px]">
                <Search size={14} /> Buscar
              </button>
            </div>
          </div>
        </FormCard>

        <FormCard title="Generar PRCC Inicial" icon={<Plus size={15} />}>
          <TextareaField label="Descripción de la Evidencia Principal" placeholder="Ej: Dispositivo móvil Samsung, serial..., recolectado en..." value={descInicial} onChange={setDescInicial} className="mb-3" />
          <button onClick={handleGenerarInicial} className="fluent-btn-primary w-full py-2.5 text-[12px] tracking-wide uppercase">
            Generar Planilla Inicial
          </button>
        </FormCard>

        <FormCard title="Nueva Evidencia Derivada" icon={<Plus size={15} />}>
          <TextareaField label="Descripción del Hallazgo Derivado" placeholder="Ej: Archivo msgstore.db extraído de la evidencia principal..." value={descDerivada} onChange={setDescDerivada} className="mb-3" />
          <div className="mb-3">
            <label className="block text-[11px] font-semibold text-[#616161] mb-1.5 tracking-wide">Planilla Madre (Opcional)</label>
            <select className="fluent-input" value={padreHash} onChange={(e) => setPadreHash(e.target.value)}>
              <option value="">Seleccione una planilla previa</option>
              {searchResults.filter(r => r.tipo === 'inicial').map(r => (
                <option key={r.hash} value={r.hash}>{r.hash.substring(0, 12)}... ({r.evidencia_descripcion.substring(0, 20)}...)</option>
              ))}
            </select>
          </div>
          <button onClick={handleGenerarDerivada} className="fluent-btn-secondary w-full py-2.5 text-[12px] tracking-wide uppercase font-bold">
            Generar Planilla Derivada
          </button>
        </FormCard>

        <FormCard title="Plantilla Legal (HTML)" icon={<LayoutTemplate size={15} />}>
          <p className="text-[12px] text-[#616161] mb-3">Visualice la estructura legal base de la planilla de derivación.</p>
          <button onClick={() => onOpenTemplate('planilla_prcc_derivacion.html')} className="fluent-btn-secondary w-full text-[12px]">
            <LayoutTemplate size={14} /> Ver Plantilla PRCC Derivación
          </button>
        </FormCard>
      </div>

      <div className="space-y-5">
        <FormCard title="Historial de Planillas" icon={<History size={15} />}>
          {isSearching ? (
            <div className="text-center py-10 text-[#9E9E9E] text-[13px]">Buscando...</div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {searchResults.map((record) => (
                <div key={record.id} className="p-3.5 rounded-lg border border-[#E0E0E0] bg-white hover:border-[#0078D4]/40 transition-all group">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className={`fluent-badge ${record.tipo === 'inicial' ? 'bg-[#DEECF9] text-[#0078D4]' : 'bg-[#F0F0F0] text-[#616161]'}`}>
                      {record.tipo}
                    </span>
                    <span className="text-[10px] text-[#9E9E9E] font-mono">{new Date(record.fecha_generacion).toLocaleString()}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-[#1A1A1A] mb-0.5 font-mono break-all leading-tight">{record.hash}</p>
                  <p className="text-[11px] text-[#616161] line-clamp-2 mb-2.5">{record.evidencia_descripcion}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-[#9E9E9E]">
                      {record.prcc_padre_hash ? `Derivado de: ${record.prcc_padre_hash.substring(0, 8)}...` : 'Evidencia Inicial'}
                    </span>
                    <button onClick={() => handlePrint(record)} className="text-[#0078D4] hover:text-[#005A9E] flex items-center gap-1 text-[11px] font-semibold transition-colors">
                      <Printer size={13} /> PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#9E9E9E] text-[13px]">
              <Search size={32} className="mx-auto mb-3 text-[#E0E0E0]" />
              Ingrese una cédula y pulse buscar para ver el historial.
            </div>
          )}
        </FormCard>
      </div>
    </div>
  );
}
