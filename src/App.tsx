/**
 * @copyright Copyright (c) 2026 julljoll
 *
 * Diseño UX/UI, Arquitectura de la Información y Programación:
 *   Autor:   julljoll
 *   Correo:  julljoll@gmail.com
 *   Web:     https://sha256.us | https://siriusweb.us
 *
 * Este software se distribuye bajo la Licencia MIT.
 * SPDX-License-Identifier: MIT
 */
import { useState, useCallback } from 'react';
import {
  FileText, Shield, Printer, History, ClipboardList,
  PenTool, LayoutTemplate, BookOpen, Lock, Clock,
} from 'lucide-react';

import type { AppTab, ReportData, PRCCData, ActaData } from './types';
import { initialReport, initialPRCC, initialActa } from './constants/initial-states';
import { SidebarButton } from './components/ui';
import { GestorPRCC, DictamenPage, PRCCPage, ActaPage, SeguimientoPage, TimelinePage } from './components/pages';
import ManualViewer from './components/ManualViewer';
import { PrintDictamen, PrintPRCC, PrintActa } from './components/PrintTemplates';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('gestor-prcc');
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [report, setReport] = useState<ReportData>(initialReport);
  const [prcc, setPrcc] = useState<PRCCData>(initialPRCC);
  const [acta, setActa] = useState<ActaData>(initialActa);

  const handleOpenTemplate = useCallback(async (filename: string) => {
    if (window.electronAPI?.openHTMLFile) {
      await window.electronAPI.openHTMLFile(filename);
    } else {
      alert('Esta función solo está disponible en la versión de escritorio');
    }
  }, []);

  if (activeTab === 'manual') {
    return <ManualViewer onClose={() => setActiveTab('gestor-prcc')} />;
  }

  if (isPrintMode) {
    if (activeTab === 'dictamen') return <PrintDictamen report={report} onClose={() => setIsPrintMode(false)} />;
    if (activeTab === 'prcc') return <PrintPRCC prcc={prcc} onClose={() => setIsPrintMode(false)} />;
    if (activeTab === 'acta') return <PrintActa acta={acta} onClose={() => setIsPrintMode(false)} />;
  }

  const tabMeta: Record<Exclude<AppTab, 'manual'>, { title: string; desc: string }> = {
    'gestor-prcc': { title: 'Sistema de Gestión de PRCC', desc: 'Administre la generación de planillas iniciales y derivadas con firma electrónica SHA-256.' },
    acta: { title: 'Acta de Obtención por Consignación', desc: 'Complete los campos a continuación para generar el documento oficial bajo el marco procesal penal.' },
    prcc: { title: 'Planilla de Registro de Cadena de Custodia', desc: 'Complete los campos a continuación para generar el documento oficial bajo el marco procesal penal.' },
    dictamen: { title: 'Dictamen Pericial de Extracción', desc: 'Complete los campos a continuación para generar el documento oficial bajo el marco procesal penal.' },
    seguimiento: { title: 'Seguimiento y Auditoría de Evidencia', desc: 'Monitoree el ciclo de vida, ubicación física e integridad de cada dispositivo móvil bajo custodia.' },
    timeline: { title: 'Timeline Forense — ISO/IEC 27042:2015', desc: 'Reconstruya la línea de tiempo de eventos extraídos del dispositivo para su impresión legal en PDF.' },
  };

  const meta = tabMeta[activeTab as Exclude<AppTab, 'manual'>];

  return (
    <div className="flex h-screen w-full bg-[#F5F5F5] font-sans text-[#1A1A1A] overflow-hidden">
      {/* ═══ SIDEBAR — Fluent Dark ═══ */}
      <aside className="hidden md:flex w-64 fluent-sidebar flex-col shrink-0 relative z-20">
        {/* Brand */}
        <div className="px-5 pt-6 pb-2">
          <div className="flex items-center gap-2.5 mb-1">
            <img src="./favicon.svg" alt="SHA256.US" className="w-8 h-8" />
            <h1 className="font-bold text-[18px] tracking-wider text-white">SHA256.US</h1>
          </div>
          <p className="text-[9px] uppercase font-medium tracking-[0.15em] text-[#9E9E9E] leading-relaxed pl-[42px]">
            Informática Forense
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 pt-6 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#616161] mb-2 px-3">
            Módulos
          </p>
          <SidebarButton active={activeTab === 'gestor-prcc'} onClick={() => setActiveTab('gestor-prcc')} icon={<History size={16} />} label="Gestor de PRCC" />
          <SidebarButton active={activeTab === 'acta'} onClick={() => setActiveTab('acta')} icon={<PenTool size={16} />} label="Acta Consignación" />
          <SidebarButton active={activeTab === 'prcc'} onClick={() => setActiveTab('prcc')} icon={<LayoutTemplate size={16} />} label="Planilla PRCC" />
          <SidebarButton active={activeTab === 'dictamen'} onClick={() => setActiveTab('dictamen')} icon={<FileText size={16} />} label="Dictamen Pericial" />
          <SidebarButton active={activeTab === 'seguimiento'} onClick={() => setActiveTab('seguimiento')} icon={<ClipboardList size={16} />} label="Seguimiento" />
          <SidebarButton active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} icon={<Clock size={16} />} label="Timeline ISO 27042" />

          <div className="h-px bg-white/[0.06] my-4 mx-3" />

          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#616161] mb-2 px-3">
            Referencia
          </p>
          <SidebarButton active={activeTab === 'manual'} onClick={() => setActiveTab('manual')} icon={<BookOpen size={16} />} label="Manual de Usuario" />
        </nav>

        {/* Bottom actions */}
        <div className="px-3 pb-4 space-y-3">
          <button
            onClick={() => setIsPrintMode(true)}
            disabled={activeTab === 'gestor-prcc' || activeTab === 'seguimiento' || activeTab === 'timeline'}
            className="w-full flex items-center justify-center gap-2 bg-[#0078D4] hover:bg-[#106EBE] active:bg-[#005A9E] text-white px-4 py-2.5 rounded-md text-[13px] font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Printer size={15} /> Imprimir Vista
          </button>

          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
            <div className="p-1.5 rounded bg-[#0078D4]/20 text-[#4DA3E0]">
              <Lock size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-[#E0E0E0] leading-tight">SHA-256</p>
              <p className="text-[9px] text-[#616161] leading-tight">Integridad Garantizada</p>
            </div>
            <Shield size={14} className="text-[#616161] shrink-0" />
          </div>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 md:px-10 md:py-10">
          {/* Page Header */}
          <header className="mb-8">
            <h2 className="text-[22px] md:text-[26px] font-bold text-[#1A1A1A] tracking-tight leading-tight mb-1">
              {meta.title}
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-8 h-[3px] bg-[#0078D4] rounded-full" />
              <p className="text-[13px] text-[#616161] leading-relaxed">{meta.desc}</p>
            </div>
          </header>

          {/* Active page */}
          <div className="animate-fluent-in">
            {activeTab === 'gestor-prcc' && <GestorPRCC onOpenTemplate={handleOpenTemplate} />}
            {activeTab === 'dictamen' && <DictamenPage report={report} onReportChange={setReport} />}
            {activeTab === 'prcc' && <PRCCPage prcc={prcc} onPrccChange={setPrcc} onOpenTemplate={handleOpenTemplate} />}
            {activeTab === 'acta' && <ActaPage acta={acta} onActaChange={setActa} onOpenTemplate={handleOpenTemplate} />}
            {activeTab === 'seguimiento' && <SeguimientoPage onOpenTemplate={handleOpenTemplate} />}
            {activeTab === 'timeline' && <TimelinePage />}
          </div>
        </div>
      </main>
    </div>
  );
}
