/**
 * Página: Sistema de Gestión de PRCC
 *
 * Permite generar planillas iniciales/derivadas, buscar por cédula
 * y visualizar el historial de registros con firma SHA-256.
 */

import { useState, useCallback } from 'react';
import {
  Fingerprint,
  Plus,
  Search,
  History,
  Printer,
  LayoutTemplate,
} from 'lucide-react';
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

  // ── Handlers ──

  const handleBuscar = useCallback(async () => {
    if (!cedula) return;
    setIsSearching(true);
    if (window.electronAPI) {
      const res = await window.electronAPI.buscarPorCedula(cedula);
      if (res.ok && res.data) {
        setSearchResults(res.data);
      }
    }
    setIsSearching(false);
  }, [cedula]);

  const handleGenerarInicial = useCallback(async () => {
    if (!cedula || !descInicial) {
      alert('Cédula y descripción son obligatorias');
      return;
    }
    if (!window.electronAPI) {
      alert('Esta función solo está disponible en la versión de escritorio');
      return;
    }
    const res = await window.electronAPI.generarPRCC({
      cedula,
      tipo: 'inicial',
      descripcion: descInicial,
      extraData: { timestamp: Date.now() },
    });
    if (res.ok) {
      alert(
        `PRCC Inicial generado con éxito. Hash: ${res.hash?.substring(0, 10)}...`
      );
      setDescInicial('');
      handleBuscar();
    } else {
      alert('Error al generar: ' + res.error);
    }
  }, [cedula, descInicial, handleBuscar]);

  const handleGenerarDerivada = useCallback(async () => {
    if (!cedula || !descDerivada) {
      alert('Cédula y descripción son obligatorias');
      return;
    }
    if (!window.electronAPI) {
      alert('Esta función solo está disponible en la versión de escritorio');
      return;
    }
    const res = await window.electronAPI.generarPRCC({
      cedula,
      tipo: 'derivada',
      descripcion: descDerivada,
      padreHash: padreHash || null,
      extraData: { timestamp: Date.now() },
    });
    if (res.ok) {
      alert(
        `PRCC Derivada generado con éxito. Hash: ${res.hash?.substring(0, 10)}...`
      );
      setDescDerivada('');
      setPadreHash('');
      handleBuscar();
    } else {
      alert('Error al generar: ' + res.error);
    }
  }, [cedula, descDerivada, padreHash, handleBuscar]);

  const handlePrint = useCallback(async (record: PRCCRecord) => {
    if (window.electronAPI) {
      await window.electronAPI.printToPDF({
        html: record.html_generado,
        filename: `PRCC_${record.hash.substring(0, 8)}.pdf`,
      });
    }
  }, []);

  // ── Render ──

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        {/* Funcionario */}
        <FormCard
          title="Funcionario Responsable"
          icon={<Fingerprint size={16} />}
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <InputField
                label="Cédula de Identidad"
                placeholder="Ej: V-12345678"
                value={cedula}
                onChange={setCedula}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleBuscar}
                className="bg-slate-800 text-white px-4 py-2.5 rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-slate-700 transition-colors"
              >
                <Search size={16} /> Buscar
              </button>
            </div>
          </div>
        </FormCard>

        {/* Generar Inicial */}
        <FormCard title="Generar PRCC Inicial" icon={<Plus size={16} />}>
          <TextareaField
            label="Descripción de la Evidencia Principal"
            placeholder="Ej: Dispositivo móvil Samsung, serial..., recolectado en..."
            value={descInicial}
            onChange={setDescInicial}
            className="mb-4"
          />
          <button
            onClick={handleGenerarInicial}
            className="w-full bg-amber-600 text-white py-3 rounded-md font-bold text-sm shadow-md hover:bg-amber-500 transition-all uppercase tracking-widest"
          >
            Generar Planilla Inicial
          </button>
        </FormCard>

        {/* Generar Derivada */}
        <FormCard title="Nueva Evidencia Derivada" icon={<Plus size={16} />}>
          <TextareaField
            label="Descripción del Hallazgo Derivado"
            placeholder="Ej: Archivo msgstore.db extraído de la evidencia principal..."
            value={descDerivada}
            onChange={setDescDerivada}
            className="mb-4"
          />
          <div className="mb-4">
            <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-1.5">
              Planilla Madre (Opcional)
            </label>
            <select
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-md py-2.5 px-3 focus:bg-white focus:border-amber-500 outline-none"
              value={padreHash}
              onChange={(e) => setPadreHash(e.target.value)}
            >
              <option value="">Seleccione una planilla previa</option>
              {searchResults
                .filter((r) => r.tipo === 'inicial')
                .map((r) => (
                  <option key={r.hash} value={r.hash}>
                    {r.hash.substring(0, 12)}... (
                    {r.evidencia_descripcion.substring(0, 20)}...)
                  </option>
                ))}
            </select>
          </div>
          <button
            onClick={handleGenerarDerivada}
            className="w-full bg-slate-800 text-white py-3 rounded-md font-bold text-sm shadow-md hover:bg-slate-700 transition-all uppercase tracking-widest"
          >
            Generar Planilla Derivada
          </button>
        </FormCard>

        {/* Plantilla HTML */}
        <FormCard
          title="Plantilla Legal (HTML)"
          icon={<LayoutTemplate size={16} />}
        >
          <p className="text-[11px] text-slate-500 mb-4">
            Visualice la estructura legal base de la planilla de derivación
            antes de generarla.
          </p>
          <button
            onClick={() => onOpenTemplate('planilla_prcc_derivacion.html')}
            className="w-full flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-2.5 rounded-md font-bold text-xs hover:bg-slate-50 transition-all uppercase tracking-wider"
          >
            <LayoutTemplate size={14} /> Ver Plantilla PRCC Derivación
          </button>
        </FormCard>
      </div>

      {/* Historial */}
      <div className="space-y-6">
        <FormCard title="Historial de Planillas" icon={<History size={16} />}>
          {isSearching ? (
            <div className="text-center py-10 text-slate-400">Buscando...</div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {searchResults.map((record) => (
                <div
                  key={record.id}
                  className="p-4 rounded-lg border border-slate-200 bg-white hover:border-amber-300 transition-all group relative"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        record.tipo === 'inicial'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {record.tipo}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(record.fecha_generacion).toLocaleString()}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1 font-mono break-all">
                    {record.hash}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
                    {record.evidencia_descripcion}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 italic">
                      {record.prcc_padre_hash
                        ? `Derivado de: ${record.prcc_padre_hash.substring(0, 8)}...`
                        : 'Evidencia Inicial'}
                    </span>
                    <button
                      onClick={() => handlePrint(record)}
                      className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-[11px] font-bold uppercase"
                    >
                      <Printer size={14} /> PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400 italic text-sm">
              Ingrese una cédula y pulse buscar para ver el historial.
            </div>
          )}
        </FormCard>
      </div>
    </div>
  );
}
