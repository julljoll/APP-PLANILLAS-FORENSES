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
import { useState, useCallback, memo, useEffect } from 'react';
import { 
  FileText, Shield, Printer, Archive, Settings, Fingerprint, Plus, Trash2, ClipboardList, PenTool, LayoutTemplate, Smartphone, Download, Search, History, BookOpen
} from 'lucide-react';
import ManualViewer from './components/ManualViewer';
import ForensicDashboard from './components/ForensicDashboard';
import { PrintDictamen, PrintPRCC, PrintActa } from './components/PrintTemplates';


// --- TYPES ---

interface PRCCRecord {
  id: number;
  cedula: string;
  hash: string;
  tipo: 'inicial' | 'derivada';
  evidencia_descripcion: string;
  prcc_padre_hash: string | null;
  fecha_generacion: string;
  html_generado: string;
  datos_extra: string;
}

interface ForensicResult {
  id: string;
  name: string;
  date: string;
  path: string;
  size: string;
  hash: string;
}

interface ReportData {
  motivo: string;
  descripcion: string;
  examenes: { andrillerVersion: string; aleappVersion: string; linuxVersion: string; tecnicas: string; valoresHashGrales: string; };
  resultados: ForensicResult[];
  conclusiones: string;
  consumoEvidencia: string;
  perito: { nombre: string; sello: string; };
}

interface PRCCData {
  expediente: string;
  prcc: string;
  despachoInstruye: string;
  organismoInstruye: string;
  despachoInicia: string;
  organismoInicia: string;
  direccion: string;
  fechaHora: string;
  formaObtencion: string;
  fijacion: { nombre: string; ci: string };
  coleccion: { nombre: string; ci: string };
  descripcion: string;
  motivoTransferencia: string;
  entrega: { nombre: string; organismo: string; despacho: string; ci: string; };
  recibe: { nombre: string; organismo: string; despacho: string; ci: string; };
  observaciones: string;
}

interface ActaData {
  expediente: string;
  prcc: string;
  organismo: string;
  oficina: string;
  direccion: string;
  fecha: string;
  hora: string;
  coleccion: { nombre: string; ci: string };
  fijacion: { nombre: string; ci: string };
  consignante: { nombre: string; ci: string };
  dispositivo: { marcaModelo: string; imei: string; numero: string; estadoFisico: string };
  descripcion: string;
  observaciones: string;
}

// --- INITIAL STATES ---

const initialReport: ReportData = {
  motivo: "",
  descripcion: "",
  examenes: { andrillerVersion: "v3.6.4", aleappVersion: "v3.1.2", linuxVersion: "Ubuntu 24.04 LTS", tecnicas: "Extracción lógica y física (solo lectura)", valoresHashGrales: "" },
  resultados: [],
  conclusiones: "",
  consumoEvidencia: "La evidencia NO fue consumida ni alterada durante el proceso de peritación.",
  perito: { nombre: "", sello: "" }
};

const initialPRCC: PRCCData = {
  expediente: '', prcc: '', despachoInstruye: '', organismoInstruye: '', despachoInicia: '', organismoInicia: '',
  direccion: '', fechaHora: new Date().toLocaleString(), formaObtencion: 'Obtención por Consignación',
  fijacion: { nombre: '', ci: '' }, coleccion: { nombre: '', ci: '' }, 
  descripcion: '', motivoTransferencia: '',
  entrega: { nombre: '', organismo: '', despacho: '', ci: '' }, recibe: { nombre: '', organismo: '', despacho: '', ci: '' }, observaciones: ''
};

const initialActa: ActaData = {
  expediente: '', prcc: '', organismo: '', oficina: '', direccion: '', fecha: new Date().toLocaleDateString(), hora: new Date().toLocaleTimeString(),
  coleccion: { nombre: '', ci: '' }, fijacion: { nombre: '', ci: '' }, consignante: { nombre: '', ci: '' },
  dispositivo: { marcaModelo: '', imei: '', numero: '', estadoFisico: '' },
  descripcion: '', observaciones: ''
};

declare global {
  interface Window {
    electronAPI?: {
      generarPRCC: (data: any) => Promise<any>;
      buscarPorCedula: (cedula: string) => Promise<any>;
      printToPDF: (data: any) => Promise<any>;
    };
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'gestor-prcc' | 'acta' | 'prcc' | 'dictamen' | 'manual' | 'seguimiento'>('gestor-prcc');
  const [report, setReport] = useState<ReportData>(initialReport);
  const [prcc, setPrcc] = useState<PRCCData>(initialPRCC);
  const [acta, setActa] = useState<ActaData>(initialActa);
  const [isPrintMode, setIsPrintMode] = useState(false);
  
  // Gestor PRCC State
  const [cedula, setCedula] = useState('');
  const [descInicial, setDescInicial] = useState('');
  const [descDerivada, setDescDerivada] = useState('');
  const [padreHash, setPadreHash] = useState('');
  const [searchResults, setSearchResults] = useState<PRCCRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const updateResult = useCallback((id: string, field: keyof ForensicResult, value: string) => {
    setReport(prev => ({ ...prev, resultados: prev.resultados.map(r => r.id === id ? { ...r, [field]: value } : r) }));
  }, []);

  const removeResult = useCallback((id: string) => {
    setReport(prev => ({ ...prev, resultados: prev.resultados.filter(r => r.id !== id) }));
  }, []);

  const addResult = useCallback(() => {
    setReport(prev => ({ ...prev, resultados: [...prev.resultados, { id: Math.random().toString(36).substr(2, 9), name: '', date: '', path: '', size: '', hash: '' }] }));
  }, []);

  // --- BACKEND ACTIONS ---

  const handleGenerarInicial = async () => {
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
      extraData: { timestamp: Date.now() }
    });

    if (res.ok) {
      alert(`PRCC Inicial generado con éxito. Hash: ${res.hash.substring(0, 10)}...`);
      setDescInicial('');
      handleBuscar(); // Refresh results
    } else {
      alert('Error al generar: ' + res.error);
    }
  };

  const handleGenerarDerivada = async () => {
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
      extraData: { timestamp: Date.now() }
    });

    if (res.ok) {
      alert(`PRCC Derivada generado con éxito. Hash: ${res.hash.substring(0, 10)}...`);
      setDescDerivada('');
      setPadreHash('');
      handleBuscar(); // Refresh results
    } else {
      alert('Error al generar: ' + res.error);
    }
  };

  const handleBuscar = async () => {
    if (!cedula) return;
    setIsSearching(true);
    if (window.electronAPI) {
      const res = await window.electronAPI.buscarPorCedula(cedula);
      if (res.ok) {
        setSearchResults(res.data);
      }
    }
    setIsSearching(false);
  };

  const handlePrint = async (record: PRCCRecord) => {
    if (window.electronAPI) {
      await window.electronAPI.printToPDF({
        html: record.html_generado,
        filename: `PRCC_${record.hash.substring(0, 8)}.pdf`
      });
    }
  };

  if (activeTab === 'manual') {
    return <ManualViewer onClose={() => setActiveTab('gestor-prcc')} />;
  }

  if (isPrintMode) {
    if (activeTab === 'dictamen') return <PrintDictamen report={report} onClose={() => setIsPrintMode(false)} />;
    if (activeTab === 'prcc') return <PrintPRCC prcc={prcc} onClose={() => setIsPrintMode(false)} />;
    if (activeTab === 'acta') return <PrintActa acta={acta} onClose={() => setIsPrintMode(false)} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#fcfcfd] font-sans text-slate-900 overflow-hidden relative">
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
              disabled={activeTab === 'gestor-prcc'}
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

      <div className="flex-1 overflow-y-auto relative pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto p-6 md:p-12 lg:p-16">
          
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#0a1122] tracking-tight mb-2">
              {activeTab === 'gestor-prcc' && 'Sistema de Gestión de PRCC'}
              {activeTab === 'dictamen' && 'Dictamen Pericial de Extracción'}
              {activeTab === 'prcc' && 'Planilla de Registro de Cadena de Custodia (PRCC)'}
              {activeTab === 'acta' && 'Acta de Obtención por Consignación'}
              {activeTab === 'seguimiento' && 'Seguimiento y Auditoría de Evidencia'}
            </h2>
            <div className="h-1 w-20 bg-amber-500 mb-4 rounded-full" />
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              {activeTab === 'gestor-prcc' 
                ? 'Administre la generación de planillas iniciales y derivadas con firma electrónica SHA-256.'
                : activeTab === 'seguimiento'
                ? 'Monitoree el ciclo de vida, ubicación física e integridad de cada dispositivo móvil bajo custodia.'
                : 'Complete los campos a continuación para generar el documento oficial bajo el marco procesal penal.'}
          {activeTab === 'gestor-prcc' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <FormCard title="Funcionario Responsable" icon={<Fingerprint size={16} />}>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <InputField label="Cédula de Identidad" placeholder="Ej: V-12345678" value={cedula} onChange={setCedula} />
                    </div>
                    <div className="flex items-end">
                      <button onClick={handleBuscar} className="bg-slate-800 text-white px-4 py-2.5 rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-slate-700 transition-colors">
                        <Search size={16} /> Buscar
                      </button>
                    </div>
                  </div>
                </FormCard>

                <FormCard title="Generar PRCC Inicial" icon={<Plus size={16} />}>
                  <TextareaField label="Descripción de la Evidencia Principal" placeholder="Ej: Dispositivo móvil Samsung, serial..., recolectado en..." value={descInicial} onChange={setDescInicial} className="mb-4" />
                  <button onClick={handleGenerarInicial} className="w-full bg-amber-600 text-white py-3 rounded-md font-bold text-sm shadow-md hover:bg-amber-500 transition-all uppercase tracking-widest">
                    Generar Planilla Inicial
                  </button>
                </FormCard>

                <FormCard title="Nueva Evidencia Derivada" icon={<Plus size={16} />}>
                  <TextareaField label="Descripción del Hallazgo Derivado" placeholder="Ej: Archivo msgstore.db extraído de la evidencia principal..." value={descDerivada} onChange={setDescDerivada} className="mb-4" />
                  <div className="mb-4">
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-1.5">Planilla Madre (Opcional)</label>
                    <select 
                      className="w-full text-sm bg-slate-50 border border-slate-200 rounded-md py-2.5 px-3 focus:bg-white focus:border-amber-500 outline-none"
                      value={padreHash}
                      onChange={(e) => setPadreHash(e.target.value)}
                    >
                      <option value="">Seleccione una planilla previa</option>
                      {searchResults.filter(r => r.tipo === 'inicial').map(r => (
                        <option key={r.hash} value={r.hash}>{r.hash.substring(0, 12)}... ({r.evidencia_descripcion.substring(0, 20)}...)</option>
                      ))}
                    </select>
                  </div>
                  <button onClick={handleGenerarDerivada} className="w-full bg-slate-800 text-white py-3 rounded-md font-bold text-sm shadow-md hover:bg-slate-700 transition-all uppercase tracking-widest">
                    Generar Planilla Derivada
                  </button>
                </FormCard>
              </div>

              <div className="space-y-6">
                <FormCard title="Historial de Planillas" icon={<History size={16} />}>
                  {isSearching ? (
                    <div className="text-center py-10 text-slate-400">Buscando...</div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                      {searchResults.map((record) => (
                        <div key={record.id} className="p-4 rounded-lg border border-slate-200 bg-white hover:border-amber-300 transition-all group relative">
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${record.tipo === 'inicial' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                              {record.tipo}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{new Date(record.fecha_generacion).toLocaleString()}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-800 mb-1 font-mono break-all">{record.hash}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">{record.evidencia_descripcion}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 italic">
                              {record.prcc_padre_hash ? `Derivado de: ${record.prcc_padre_hash.substring(0, 8)}...` : 'Evidencia Inicial'}
                            </span>
                            <button onClick={() => handlePrint(record)} className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-[11px] font-bold uppercase">
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
          )}

          {/* SEGUIMIENTO DE CADENA */}
          {activeTab === 'seguimiento' && <ForensicDashboard />}

  </div>
            </div>
          )}

          {/* EXISTING MODULES */}
          {activeTab === 'dictamen' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-6">
                <FormCard title="I-II. Contexto y Evidencia (Estructura Obligatoria)" icon={<FileText size={16} />}>
                  <TextareaField label="Motivo de la Peritación" placeholder="Ej: Investigación penal solicitada para la extracción..." value={report.motivo} onChange={(v) => setReport({...report, motivo: v})} />
                  <TextareaField label="Descripción de la Evidencia" placeholder="Ej: Dispositivo móvil incautado entregado en custodia..." value={report.descripcion} onChange={(v) => setReport({...report, descripcion: v})} />
                </FormCard>
                <FormCard title="III. Exámenes Practicados (ISO/IEC 27042:2015)" icon={<Settings size={16} />}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <InputField label="Versión Andriller" value={report.examenes.andrillerVersion} onChange={(v: string) => setReport({...report, examenes: {...report.examenes, andrillerVersion: v}})} />
                    <InputField label="Versión ALEAPP" value={report.examenes.aleappVersion} onChange={(v: string) => setReport({...report, examenes: {...report.examenes, aleappVersion: v}})} />
                    <InputField label="Versión Linux" value={report.examenes.linuxVersion} onChange={(v: string) => setReport({...report, examenes: {...report.examenes, linuxVersion: v}})} />
                  </div>
                  <InputField label="Técnicas Empleadas" placeholder="Ej: Extracción lógica y física (solo lectura)..." className="mb-4" value={report.examenes.tecnicas} onChange={(v: string) => setReport({...report, examenes: {...report.examenes, tecnicas: v}})} />
                  <InputField label="Hash Global (Integridad)" placeholder="Ej: e3b0c44298fc1c149afbf..." fontMono value={report.examenes.valoresHashGrales} onChange={(v: string) => setReport({...report, examenes: {...report.examenes, valoresHashGrales: v}})} />
                </FormCard>
              </div>
              <div className="space-y-6">
                <FormCard 
                  title="IV. Resultados Obtenidos" 
                  icon={<Archive size={16} />} 
                  action={
                    <button onClick={addResult} className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-md transition-colors border border-amber-200/50">
                      <Plus size={14} /> Agregar
                    </button>
                  }
                >
                  <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                    {report.resultados.map((res) => (
                      <div key={res.id} className="bg-slate-100 p-3 rounded border border-slate-200 relative group">
                        <button onClick={() => removeResult(res.id)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <InputField label="Nombre Archivo Nativo" placeholder="Ej: msgstore.db" value={res.name} onChange={v => updateResult(res.id, 'name', v)} />
                          <InputField label="Tamaño" placeholder="Ej: 102.4 MB" value={res.size} onChange={v => updateResult(res.id, 'size', v)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <InputField label="Ruta" placeholder="Ej: /data/data/com.whatsapp/" fontMono value={res.path} onChange={v => updateResult(res.id, 'path', v)} />
                          <InputField label="Fecha de Modificación" placeholder="DD/MM/AAAA" value={res.date} onChange={v => updateResult(res.id, 'date', v)} />
                        </div>
                        <div><InputField label="Hash MD5/SHA Individual" placeholder="Ej: 5d41402abc4b2a76b9719d..." fontMono value={res.hash} onChange={v => updateResult(res.id, 'hash', v)} /></div>
                      </div>
                    ))}
                  </div>
                </FormCard>
                <FormCard title="V-VI. Conclusiones y Consumo de Evidencia" icon={<Fingerprint size={16} />}>
                  <TextareaField label="Conclusiones (Sin precalificación jurídica)" value={report.conclusiones} onChange={v => setReport({...report, conclusiones: v})} className="mb-4" />
                  <TextareaField label="Consumo o alteración de Evidencia" value={report.consumoEvidencia} onChange={v => setReport({...report, consumoEvidencia: v})} />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <InputField label="Perito Informático" placeholder="Ej: Ing. Perito Forense" value={report.perito.nombre} onChange={v => setReport({...report, perito: {...report.perito, nombre: v}})} />
                    <InputField label="Sello Institucional" placeholder="Ej: 001-VZ-FOR" fontMono value={report.perito.sello} onChange={v => setReport({...report, perito: {...report.perito, sello: v}})} />
                  </div>
                </FormCard>
              </div>
            </div>
          )}

          {activeTab === 'prcc' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="space-y-6">
               <FormCard title="I. Datos Generales" icon={<ClipboardList size={16} />}>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <InputField label="N° de Expediente / Causa" placeholder="Ej: MP-2024-12345" value={prcc.expediente} onChange={v => setPrcc({...prcc, expediente: v})} />
                   <InputField label="N° PRCC" placeholder="Ej: PRCC-001" value={prcc.prcc} onChange={v => setPrcc({...prcc, prcc: v})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <InputField label="Despacho Instruye" placeholder="Ej: Fiscalía 1ra" value={prcc.despachoInstruye} onChange={v => setPrcc({...prcc, despachoInstruye: v})} />
                   <InputField label="Organismo Instruye" placeholder="Ej: Ministerio Público" value={prcc.organismoInstruye} onChange={v => setPrcc({...prcc, organismoInstruye: v})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <InputField label="Despacho Inicia Custodia" placeholder="Ej: Lab. Informática" value={prcc.despachoInicia} onChange={v => setPrcc({...prcc, despachoInicia: v})} />
                   <InputField label="Organismo Inicia Custodia" placeholder="Ej: CICPC" value={prcc.organismoInicia} onChange={v => setPrcc({...prcc, organismoInicia: v})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <InputField label="Dirección Obtención" placeholder="Ej: Laboratorio Central" value={prcc.direccion} onChange={v => setPrcc({...prcc, direccion: v})} />
                   <InputField label="Fecha y Hora" value={prcc.fechaHora} onChange={v => setPrcc({...prcc, fechaHora: v})} />
                 </div>
               </FormCard>
               <FormCard title="II-IV. Forma y Operario (ISO/IEC 27037:2012)" icon={<FileText size={16} />}>
                 <InputField label="Forma de Obtención" value={prcc.formaObtencion} onChange={v => setPrcc({...prcc, formaObtencion: v})} className="mb-4" />
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <InputField label="Fijación: Nombre" value={prcc.fijacion.nombre} onChange={v => setPrcc({...prcc, fijacion: {...prcc.fijacion, nombre: v}})} />
                   <InputField label="Fijación: CI/Cred" value={prcc.fijacion.ci} onChange={v => setPrcc({...prcc, fijacion: {...prcc.fijacion, ci: v}})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <InputField label="Colección: Nombre" value={prcc.coleccion.nombre} onChange={v => setPrcc({...prcc, coleccion: {...prcc.coleccion, nombre: v}})} />
                   <InputField label="Colección: CI/Cred" value={prcc.coleccion.ci} onChange={v => setPrcc({...prcc, coleccion: {...prcc.coleccion, ci: v}})} />
                 </div>
                 <TextareaField label="Descripción de la Evidencia (Empaque/Rotulado)" value={prcc.descripcion} onChange={v => setPrcc({...prcc, descripcion: v})} />
               </FormCard>
             </div>
             <div className="space-y-6">
               <FormCard title="V. Actividad de Transferencia" icon={<Fingerprint size={16} />}>
                 <InputField label="Motivo (Resguardo/Peritaje/Traslado)" value={prcc.motivoTransferencia} onChange={v => setPrcc({...prcc, motivoTransferencia: v})} className="mb-4" />
                 <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Entrega</h3>
                 <div className="grid grid-cols-2 gap-4 mb-2">
                   <InputField label="Nombre y Apellido" value={prcc.entrega.nombre} onChange={v => setPrcc({...prcc, entrega: {...prcc.entrega, nombre: v}})} />
                   <InputField label="C.I / Cred" value={prcc.entrega.ci} onChange={v => setPrcc({...prcc, entrega: {...prcc.entrega, ci: v}})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <InputField label="Organismo" value={prcc.entrega.organismo} onChange={v => setPrcc({...prcc, entrega: {...prcc.entrega, organismo: v}})} />
                   <InputField label="Despacho" value={prcc.entrega.despacho} onChange={v => setPrcc({...prcc, entrega: {...prcc.entrega, despacho: v}})} />
                 </div>
                 
                 <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 border-t border-slate-200 pt-4">Recibe</h3>
                 <div className="grid grid-cols-2 gap-4 mb-2">
                   <InputField label="Nombre y Apellido" value={prcc.recibe.nombre} onChange={v => setPrcc({...prcc, recibe: {...prcc.recibe, nombre: v}})} />
                   <InputField label="C.I / Cred" value={prcc.recibe.ci} onChange={v => setPrcc({...prcc, recibe: {...prcc.recibe, ci: v}})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <InputField label="Organismo" value={prcc.recibe.organismo} onChange={v => setPrcc({...prcc, recibe: {...prcc.recibe, organismo: v}})} />
                   <InputField label="Despacho" value={prcc.recibe.despacho} onChange={v => setPrcc({...prcc, recibe: {...prcc.recibe, despacho: v}})} />
                 </div>

                 <TextareaField label="Observaciones (Ej. Integridad de los precintos)" value={prcc.observaciones} onChange={v => setPrcc({...prcc, observaciones: v})} />
               </FormCard>
             </div>
           </div>
          )}

          {activeTab === 'acta' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <FormCard title="Datos Generales" icon={<ClipboardList size={16} />}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <InputField label="N° de Expediente" value={acta.expediente} onChange={v => setActa({...acta, expediente: v})} />
                    <InputField label="N° de PRCC" value={acta.prcc} onChange={v => setActa({...acta, prcc: v})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <InputField label="Organismo" value={acta.organismo} onChange={v => setActa({...acta, organismo: v})} />
                    <InputField label="Oficina que instruye" value={acta.oficina} onChange={v => setActa({...acta, oficina: v})} />
                  </div>
                  <InputField label="Dirección de Obtención" value={acta.direccion} onChange={v => setActa({...acta, direccion: v})} className="mb-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Fecha" value={acta.fecha} onChange={v => setActa({...acta, fecha: v})} />
                    <InputField label="Hora" value={acta.hora} onChange={v => setActa({...acta, hora: v})} />
                  </div>
                </FormCard>
                <FormCard title="Operarios que Obtienen la Evidencia" icon={<Shield size={16} />}>
                  <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Colección / Recepción</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <InputField label="Nombre y Apellido" value={acta.coleccion.nombre} onChange={v => setActa({...acta, coleccion: {...acta.coleccion, nombre: v}})} />
                    <InputField label="C.I. o Credencial" value={acta.coleccion.ci} onChange={v => setActa({...acta, coleccion: {...acta.coleccion, ci: v}})} />
                  </div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 border-t border-slate-200 pt-4">Fijación Fotográfica / Escrita</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Nombre y Apellido" value={acta.fijacion.nombre} onChange={v => setActa({...acta, fijacion: {...acta.fijacion, nombre: v}})} />
                    <InputField label="C.I. o Credencial" value={acta.fijacion.ci} onChange={v => setActa({...acta, fijacion: {...acta.fijacion, ci: v}})} />
                  </div>
                </FormCard>
              </div>
              <div className="space-y-6">
                <FormCard title="Persona que Consigna" icon={<PenTool size={16} />}>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Nombre y Apellido" value={acta.consignante.nombre} onChange={v => setActa({...acta, consignante: {...acta.consignante, nombre: v}})} />
                    <InputField label="Cédula de Identidad" value={acta.consignante.ci} onChange={v => setActa({...acta, consignante: {...acta.consignante, ci: v}})} />
                  </div>
                </FormCard>
                <FormCard title="Detalles del Dispositivo Móvil" icon={<Smartphone size={16} />}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                     <InputField label="Marca y Modelo" value={acta.dispositivo.marcaModelo} onChange={v => setActa({...acta, dispositivo: {...acta.dispositivo, marcaModelo: v}})} />
                     <InputField label="Número Telefónico" value={acta.dispositivo.numero} onChange={v => setActa({...acta, dispositivo: {...acta.dispositivo, numero: v}})} />
                  </div>
                  <InputField label="IMEI / IMEI2" fontMono className="mb-4" value={acta.dispositivo.imei} onChange={v => setActa({...acta, dispositivo: {...acta.dispositivo, imei: v}})} />
                  <TextareaField label="Estado Físico" value={acta.dispositivo.estadoFisico} onChange={v => setActa({...acta, dispositivo: {...acta.dispositivo, estadoFisico: v}})} />
                </FormCard>
                <FormCard title="Descripción y Observaciones M. Legal" icon={<FileText size={16} />}>
                  <TextareaField label="Descripción de la actuación" value={acta.descripcion} onChange={v => setActa({...acta, descripcion: v})} className="mb-4" />
                  <TextareaField label="Observaciones Finales" value={acta.observaciones} onChange={v => setActa({...acta, observaciones: v})} />
                </FormCard>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- MICROCOMPONENTS ---

const SidebarButton = memo(({ active, icon, label, onClick }: any) => {
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

const TimelineItem = memo(({ status, date, activity, performer, last }: any) => (
  <div className="flex gap-4 relative">
    {!last && <div className="absolute left-[9px] top-7 bottom-0 w-0.5 bg-slate-200" />}
    <div className={`w-5 h-5 rounded-full mt-1.5 shrink-0 z-10 flex items-center justify-center ${
      status === 'completed' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
      status === 'current' ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'
    }`}>
      <div className="w-2 h-2 bg-white rounded-full" />
    </div>
    <div className="pb-8">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{date}</p>
      <h4 className="text-sm font-bold text-slate-800 leading-tight">{activity}</h4>
      <p className="text-xs text-slate-500 mt-1">Responsable: <span className="font-semibold text-slate-700">{performer}</span></p>
    </div>
  </div>
));

const FormCard = memo(({ title, icon, action, children }: any) => {
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
  )
});

const InputField = memo(({ label, value, onChange, fontMono, className = '', placeholder }: any) => {
  return (
    <div className={className}>
      <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-1.5">{label}</label>
      <input 
        className={`w-full text-sm bg-slate-50 border border-slate-200 rounded-md py-2.5 px-3 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 hover:border-slate-300 outline-none transition-all ${fontMono ? 'font-mono text-slate-600' : 'text-slate-800'}`}
        value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
});

const TextareaField = memo(({ label, value, onChange, className = '', placeholder }: any) => {
  return (
    <div className={className}>
      <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-1.5">{label}</label>
      <textarea 
        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-md py-2.5 px-3 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 hover:border-slate-300 outline-none h-24 resize-none transition-all text-slate-800"
       ed decoration-slate-300 underline-offset-4 font-serif bg-slate-50">
               {acta.observaciones}
            </div>
         </div>
       </div>
    </div>
  )
});
