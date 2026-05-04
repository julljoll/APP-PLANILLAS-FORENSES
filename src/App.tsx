/**
 * @copyright Copyright (c) 2026 julljoll
 *
 * Diseño UX/UI, Arquitectura de la Información y Programación:
 *   Autor:   julljoll
 *   Correo:  julljoll@gmail.com
 *   Web:     https://sha256.us | https://siriusweb.us
 *
 * Este software se distribuye bajo la Licencia MIT.
 * Se permite su uso, copia, modificación y distribución con la condición
 * de mantener este aviso de copyright en todas las copias.
 *
 * SPDX-License-Identifier: MIT
 */
import { useState, useCallback } from 'react';
import {
  FileText, Shield, Printer, History, ClipboardList,
  PenTool, LayoutTemplate, BookOpen,
} from 'lucide-react';

// Tipos y constantes
import type { AppTab, ReportData, PRCCData, ActaData } from './types';
import { initialReport, initialPRCC, initialActa } from './constants/initial-states';

// Componentes UI compartidos
import { SidebarButton } from './components/ui';

// Páginas (cada tab es un módulo independiente)
import { GestorPRCC, DictamenPage, PRCCPage, ActaPage, SeguimientoPage } from './components/pages';
import ManualViewer from './components/ManualViewer';
import { PrintDictamen, PrintPRCC, PrintActa } from './components/PrintTemplates';

export default function App() {
  // ── Navegación ──
  const [activeTab, setActiveTab] = useState<AppTab>('gestor-prcc');
  const [isPrintMode, setIsPrintMode] = useState(false);

  // ── Estado de formularios (elevado para impresión) ──
  const [report, setReport] = useState<ReportData>(initialReport);
  const [prcc, setPrcc] = useState<PRCCData>(initialPRCC);
  const [acta, setActa] = useState<ActaData>(initialActa);

  // ── Abrir plantilla HTML (Electron IPC) ──
  const handleOpenTemplate = useCallback(async (filename: string) => {
    if (window.electronAPI?.openHTMLFile) {
      await window.electronAPI.openHTMLFile(filename);
    } else {
      alert('Esta función solo está disponible en la versión de escritorio');
    }
  }, []);

  // ── Manual (full-screen overlay) ──
  if (activeTab === 'manual') {
    return <ManualViewer onClose={() => setActiveTab('gestor-prcc')} />;
  }

  // ── Modo impresión ──
  if (isPrintMode) {
    if (activeTab === 'dictamen') return <PrintDictamen report={report} onClose={() => setIsPrintMode(false)} />;
    if (activeTab === 'prcc') return <PrintPRCC prcc={prcc} onClose={() => setIsPrintMode(false)} />;
    if (activeTab === 'acta') return <PrintActa acta={acta} onClose={() => setIsPrintMode(false)} />;
  }

  // ── Título y descripción por tab ──
  const tabMeta: Record<Exclude<AppTab, 'manual'>, { title: string; desc: string }> = {
    'gestor-prcc': { title: 'Sistema de Gestión de PRCC', desc: 'Administre la generación de planillas iniciales y derivadas con firma electrónica SHA-256.' },
    acta: { title: 'Acta de Obtención por Consignación', desc: 'Complete los campos a continuación para generar el documento oficial bajo el marco procesal penal.' },
    prcc: { title: 'Planilla de Registro de Cadena de Custodia (PRCC)', desc: 'Complete los campos a continuación para generar el documento oficial bajo el marco procesal penal.' },
    dictamen: { title: 'Dictamen Pericial de Extracción', desc: 'Complete los campos a continuación para generar el documento oficial bajo el marco procesal penal.' },
    seguimiento: { title: 'Seguimiento y Auditoría de Evidencia', desc: 'Monitoree el ciclo de vida, ubicación física e integridad de cada dispositivo móvil bajo custodia.' },
  };

  const meta = tabMeta[activeTab as Exclude<AppTab, 'manual'>];

  return (
    <div className="flex h-screen w-full bg-[#fcfcfd] font-sans text-slate-900 overflow-hidden relative">
      {/* ═══ SIDEBAR ═══ */}
      <div className="hidden md:flex w-72 bg-[#0a1122] flex-col shrink-0 relative z-20 shadow-2xl">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <img src="./favicon.svg" alt="SHA256.US Logo" className="w-9 h-9" />
            <div>
              <h1 className="font-serif font-bold text-2xl tracking-widest text-white print:hidden">SHA256.US</h1>
            </div>
          </div>
          <p className="text-[10px] uppercase font-semibold tracking-widest text-amber-500/80 mb-10 leading-relaxed max-w-[200px]">
            Laboratorio de Informática Forense y Ciberseguridad
          </p>

          <nav className="flex flex-col gap-1.5">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 pl-3">Módulos</h3>
            <SidebarButton active={activeTab === 'gestor-prcc'} onClick={() => setActiveTab('gestor-prcc')} icon={<History size={18} />} label="Gestor de PRCC" />
            <SidebarButton active={activeTab === 'acta'} onClick={() => setActiveTab('acta')} icon={<PenTool size={18} />} label="Acta Consignación" />
            <SidebarButton active={activeTab === 'prcc'} onClick={() => setActiveTab('prcc')} icon={<LayoutTemplate size={18} />} label="Planilla PRCC" />
            <SidebarButton active={activeTab === 'dictamen'} onClick={() => setActiveTab('dictamen')} icon={<FileText size={18} />} label="Dictamen Pericial" />
            <SidebarButton active={activeTab === 'seguimiento'} onClick={() => setActiveTab('seguimiento')} icon={<ClipboardList size={18} />} label="Seguimiento de Cadena" />
            <div className="h-4" />
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 pl-3">Ayuda</h3>
            <SidebarButton active={activeTab === 'manual'} onClick={() => setActiveTab('manual')} icon={<BookOpen size={18} />} label="Manual de Usuario" />
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-slate-800/50 flex flex-col gap-6">
          <div>
            <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-widest">Acciones Rápidas</p>
            <button
              onClick={() => setIsPrintMode(true)}
              disabled={activeTab === 'gestor-prcc' || activeTab === 'seguimiento'}
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-3 rounded-md text-sm font-semibold transition-all shadow-[0_4px_14px_0_rgba(217,119,6,0.39)] hover:shadow-[0_6px_20px_rgba(217,119,6,0.23)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Printer size={18} /> <span>Imprimir Vista</span>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-800/50 print:hidden">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-700/50 bg-slate-800/30">
              <div className="p-2 bg-slate-800/80 rounded-md text-amber-500">
                <Shield size={18} />
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-widest">Firma SHA-256</h4>
                <p className="text-[9px] text-slate-400 leading-tight">Integridad Garantizada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CONTENIDO PRINCIPAL ═══ */}
      <div className="flex-1 overflow-y-auto relative pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto p-6 md:p-12 lg:p-16">
          {/* Header del tab activo */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#0a1122] tracking-tight mb-2">
              {meta.title}
            </h2>
            <div className="h-1 w-20 bg-amber-500 mb-4 rounded-full" />
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">{meta.desc}</p>
          </div>

          {/* Renderizado de la página activa */}
          {activeTab === 'gestor-prcc' && <GestorPRCC onOpenTemplate={handleOpenTemplate} />}
          {activeTab === 'dictamen' && <DictamenPage report={report} onReportChange={setReport} />}
          {activeTab === 'prcc' && <PRCCPage prcc={prcc} onPrccChange={setPrcc} onOpenTemplate={handleOpenTemplate} />}
          {activeTab === 'acta' && <ActaPage acta={acta} onActaChange={setActa} onOpenTemplate={handleOpenTemplate} />}
          {activeTab === 'seguimiento' && <SeguimientoPage onOpenTemplate={handleOpenTemplate} />}
        </div>
      </div>
    </div>
  );
}
