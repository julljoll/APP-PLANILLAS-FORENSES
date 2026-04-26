import { useState, useCallback, memo } from 'react';
import { 
  FileText, Shield, Printer, Archive, Settings, Fingerprint, Plus, Trash2, ClipboardList, PenTool, LayoutTemplate, Smartphone
} from 'lucide-react';

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

const initialReport: ReportData = {
  motivo: "",
  descripcion: "",
  examenes: {
    andrillerVersion: "",
    aleappVersion: "",
    linuxVersion: "",
    tecnicas: "",
    valoresHashGrales: ""
  },
  resultados: [],
  conclusiones: "",
  consumoEvidencia: "",
  perito: { nombre: "", sello: "" }
};

const initialPRCC: PRCCData = {
  expediente: '', prcc: '', despachoInstruye: '', organismoInstruye: '', despachoInicia: '', organismoInicia: '',
  direccion: '', fechaHora: '', formaObtencion: '',
  fijacion: { nombre: '', ci: '' }, coleccion: { nombre: '', ci: '' }, 
  descripcion: '', motivoTransferencia: '',
  entrega: { nombre: '', organismo: '', despacho: '', ci: '' }, recibe: { nombre: '', organismo: '', despacho: '', ci: '' }, observaciones: ''
};

const initialActa: ActaData = {
  expediente: '', prcc: '', organismo: '', oficina: '', direccion: '', fecha: '', hora: '',
  coleccion: { nombre: '', ci: '' }, fijacion: { nombre: '', ci: '' }, consignante: { nombre: '', ci: '' },
  dispositivo: { marcaModelo: '', imei: '', numero: '', estadoFisico: '' },
  descripcion: '', observaciones: ''
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'acta' | 'prcc' | 'dictamen'>('acta');
  const [report, setReport] = useState<ReportData>(initialReport);
  const [prcc, setPrcc] = useState<PRCCData>(initialPRCC);
  const [acta, setActa] = useState<ActaData>(initialActa);
  const [isPrintMode, setIsPrintMode] = useState(false);

  const updateResult = useCallback((id: string, field: keyof ForensicResult, value: string) => {
    setReport(prev => ({ ...prev, resultados: prev.resultados.map(r => r.id === id ? { ...r, [field]: value } : r) }));
  }, []);

  const removeResult = useCallback((id: string) => {
    setReport(prev => ({ ...prev, resultados: prev.resultados.filter(r => r.id !== id) }));
  }, []);

  const addResult = useCallback(() => {
    setReport(prev => ({ ...prev, resultados: [...prev.resultados, { id: Math.random().toString(36).substr(2, 9), name: '', date: '', path: '', size: '', hash: '' }] }));
  }, []);

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
            <Shield className="text-amber-500" size={36} />
            <div>
              <h1 className="font-serif font-bold text-2xl tracking-widest text-white print:hidden">SHA256.US</h1>
            </div>
          </div>
          <p className="text-[10px] uppercase font-semibold tracking-widest text-amber-500/80 mb-10 leading-relaxed max-w-[200px]">
            Laboratorio de Informática Forense y Ciberseguridad
          </p>

          <nav className="flex flex-col gap-1.5">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 pl-3">Documentos Legales</h3>
            <SidebarButton active={activeTab === 'acta'} onClick={() => setActiveTab('acta')} icon={<PenTool size={18} />} label="Acta Consignación" />
            <SidebarButton active={activeTab === 'prcc'} onClick={() => setActiveTab('prcc')} icon={<LayoutTemplate size={18} />} label="Planilla PRCC" />
            <SidebarButton active={activeTab === 'dictamen'} onClick={() => setActiveTab('dictamen')} icon={<FileText size={18} />} label="Dictamen Pericial" />
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-slate-800/50">
          <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-widest">Acciones</p>
          <button 
            onClick={() => setIsPrintMode(true)}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-3 rounded-md text-sm font-semibold transition-all shadow-[0_4px_14px_0_rgba(217,119,6,0.39)] hover:shadow-[0_6px_20px_rgba(217,119,6,0.23)] hover:-translate-y-0.5"
          >
            <Printer size={18} /> <span>Generar PDF</span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 w-full bg-[#0a1122] flex justify-around p-2 z-50 border-t border-slate-800">
          <button onClick={() => setActiveTab('acta')} className={`p-3 rounded-lg flex-1 flex justify-center ${activeTab === 'acta' ? 'bg-amber-500/20 text-amber-500' : 'text-slate-400'}`}><PenTool size={20} /></button>
          <button onClick={() => setActiveTab('prcc')} className={`p-3 rounded-lg flex-1 flex justify-center ${activeTab === 'prcc' ? 'bg-amber-500/20 text-amber-500' : 'text-slate-400'}`}><LayoutTemplate size={20} /></button>
          <button onClick={() => setActiveTab('dictamen')} className={`p-3 rounded-lg flex-1 flex justify-center ${activeTab === 'dictamen' ? 'bg-amber-500/20 text-amber-500' : 'text-slate-400'}`}><FileText size={20} /></button>
          <button onClick={() => setIsPrintMode(true)} className="p-3 rounded-lg text-white bg-amber-600 flex-1 mx-1 shadow-md flex justify-center"><Printer size={20} /></button>
      </div>

      <div className="flex-1 overflow-y-auto relative pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto p-6 md:p-12 lg:p-16">
          
          <header className="mb-10 block md:hidden">
            <div className="flex items-center gap-3">
              <Shield className="text-amber-600" size={28} />
              <h1 className="font-serif font-bold text-xl tracking-widest text-[#0a1122]">SHA256.US</h1>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1">Lab. Informática Forense</p>
          </header>

          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#0a1122] tracking-tight mb-2">
              {activeTab === 'dictamen' && 'Dictamen Pericial de Extracción'}
              {activeTab === 'prcc' && 'Planilla de Registro de Cadena de Custodia (PRCC)'}
              {activeTab === 'acta' && 'Acta de Obtención por Consignación'}
            </h2>
            <div className="h-1 w-20 bg-amber-500 mb-4 rounded-full" />
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              Complete los campos a continuación para generar el documento oficial bajo el marco procesal penal y estándares internacionales.
            </p>
          </div>

          {/* Dictamen Form */}
          {activeTab === 'dictamen' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-6">
                <FormCard title="I-II. Contexto y Evidencia (Estructura Obligatoria)" icon={<FileText size={16} />}>
                  <TextareaField label="Motivo de la Peritación" placeholder="Ej: Investigación penal solicitada para la extracción..." value={report.motivo} onChange={(v) => setReport({...report, motivo: v})} />
                  <TextareaField label="Descripción de la Evidencia" placeholder="Ej: Dispositivo móvil incautado entregado en custodia..." value={report.descripcion} onChange={(v) => setReport({...report, descripcion: v})} />
                </FormCard>
                <FormCard title="III. Exámenes Practicados (ISO/IEC 27042:2015)" icon={<Settings size={16} />}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <InputField label="Versión Andriller" placeholder="Ej: v3.6.4" value={report.examenes.andrillerVersion} onChange={(v: string) => setReport({...report, examenes: {...report.examenes, andrillerVersion: v}})} />
                    <InputField label="Versión ALEAPP" placeholder="Ej: v3.1.2" value={report.examenes.aleappVersion} onChange={(v: string) => setReport({...report, examenes: {...report.examenes, aleappVersion: v}})} />
                    <InputField label="Versión Linux" placeholder="Ej: Ubuntu 22.04 LTS" value={report.examenes.linuxVersion} onChange={(v: string) => setReport({...report, examenes: {...report.examenes, linuxVersion: v}})} />
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
                  <TextareaField label="Conclusiones (Sin precalificación jurídica)" placeholder="Ej: Se determinó la existencia de registros..." value={report.conclusiones} onChange={v => setReport({...report, conclusiones: v})} className="mb-4" />
                  <TextareaField label="Consumo o alteración de Evidencia" placeholder="Ej: La evidencia NO fue consumida ni alterada..." value={report.consumoEvidencia} onChange={v => setReport({...report, consumoEvidencia: v})} />
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
                   <InputField label="Fecha y Hora" placeholder="DD/MM/AAAA HH:MM" value={prcc.fechaHora} onChange={v => setPrcc({...prcc, fechaHora: v})} />
                 </div>
               </FormCard>
               <FormCard title="II-IV. Forma y Operario (ISO/IEC 27037:2012)" icon={<FileText size={16} />}>
                 <InputField label="Forma de Obtención" placeholder="Ej: Obtención por Consignación" value={prcc.formaObtencion} onChange={v => setPrcc({...prcc, formaObtencion: v})} className="mb-4" />
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <InputField label="Fijación: Nombre" placeholder="Ej: Funcionario Receptor" value={prcc.fijacion.nombre} onChange={v => setPrcc({...prcc, fijacion: {...prcc.fijacion, nombre: v}})} />
                   <InputField label="Fijación: CI/Cred" placeholder="Ej: V-12345678" value={prcc.fijacion.ci} onChange={v => setPrcc({...prcc, fijacion: {...prcc.fijacion, ci: v}})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <InputField label="Colección: Nombre" placeholder="Ej: Funcionario Receptor" value={prcc.coleccion.nombre} onChange={v => setPrcc({...prcc, coleccion: {...prcc.coleccion, nombre: v}})} />
                   <InputField label="Colección: CI/Cred" placeholder="Ej: V-12345678" value={prcc.coleccion.ci} onChange={v => setPrcc({...prcc, coleccion: {...prcc.coleccion, ci: v}})} />
                 </div>
                 <TextareaField label="Descripción de la Evidencia (Empaque/Rotulado)" placeholder="Ej: Dispositivo móvil Android, color negro, en cadena de custodia..." value={prcc.descripcion} onChange={v => setPrcc({...prcc, descripcion: v})} />
               </FormCard>
             </div>
             <div className="space-y-6">
               <FormCard title="V. Actividad de Transferencia" icon={<Fingerprint size={16} />}>
                 <InputField label="Motivo (Resguardo/Peritaje/Traslado)" placeholder="Ej: 1. Traslado para Peritaje" value={prcc.motivoTransferencia} onChange={v => setPrcc({...prcc, motivoTransferencia: v})} className="mb-4" />
                 <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Entrega</h3>
                 <div className="grid grid-cols-2 gap-4 mb-2">
                   <InputField label="Nombre y Apellido" placeholder="Ej: Funcionario Receptor" value={prcc.entrega.nombre} onChange={v => setPrcc({...prcc, entrega: {...prcc.entrega, nombre: v}})} />
                   <InputField label="C.I / Cred" placeholder="Ej: V-12345678" value={prcc.entrega.ci} onChange={v => setPrcc({...prcc, entrega: {...prcc.entrega, ci: v}})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <InputField label="Organismo" placeholder="Ej: CICPC" value={prcc.entrega.organismo} onChange={v => setPrcc({...prcc, entrega: {...prcc.entrega, organismo: v}})} />
                   <InputField label="Despacho" placeholder="Ej: Sala de Evidencias" value={prcc.entrega.despacho} onChange={v => setPrcc({...prcc, entrega: {...prcc.entrega, despacho: v}})} />
                 </div>
                 
                 <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 border-t border-slate-200 pt-4">Recibe</h3>
                 <div className="grid grid-cols-2 gap-4 mb-2">
                   <InputField label="Nombre y Apellido" placeholder="Ej: Ing. Perito Forense" value={prcc.recibe.nombre} onChange={v => setPrcc({...prcc, recibe: {...prcc.recibe, nombre: v}})} />
                   <InputField label="C.I / Cred" placeholder="Ej: V-87654321" value={prcc.recibe.ci} onChange={v => setPrcc({...prcc, recibe: {...prcc.recibe, ci: v}})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <InputField label="Organismo" placeholder="Ej: CICPC" value={prcc.recibe.organismo} onChange={v => setPrcc({...prcc, recibe: {...prcc.recibe, organismo: v}})} />
                   <InputField label="Despacho" placeholder="Ej: Lab. Informática" value={prcc.recibe.despacho} onChange={v => setPrcc({...prcc, recibe: {...prcc.recibe, despacho: v}})} />
                 </div>

                 <TextareaField label="Observaciones (Ej. Integridad de los precintos)" placeholder="Ej: Evidencia ingresa correctamente embalada y precintada..." value={prcc.observaciones} onChange={v => setPrcc({...prcc, observaciones: v})} />
               </FormCard>
             </div>
           </div>
          )}

          {activeTab === 'acta' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <FormCard title="Datos Generales" icon={<ClipboardList size={16} />}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <InputField label="N° de Expediente" placeholder="Ej: MP-2024-12345" value={acta.expediente} onChange={v => setActa({...acta, expediente: v})} />
                    <InputField label="N° de PRCC" placeholder="Ej: PRCC-001" value={acta.prcc} onChange={v => setActa({...acta, prcc: v})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <InputField label="Organismo" placeholder="Ej: CICPC" value={acta.organismo} onChange={v => setActa({...acta, organismo: v})} />
                    <InputField label="Oficina que instruye" placeholder="Ej: Recepción de Denuncias" value={acta.oficina} onChange={v => setActa({...acta, oficina: v})} />
                  </div>
                  <InputField label="Dirección de Obtención" placeholder="Ej: Sede Principal" value={acta.direccion} onChange={v => setActa({...acta, direccion: v})} className="mb-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Fecha" placeholder="DD/MM/AAAA" value={acta.fecha} onChange={v => setActa({...acta, fecha: v})} />
                    <InputField label="Hora" placeholder="HH:MM" value={acta.hora} onChange={v => setActa({...acta, hora: v})} />
                  </div>
                </FormCard>
                <FormCard title="Operarios que Obtienen la Evidencia" icon={<Shield size={16} />}>
                  <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Colección / Recepción</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <InputField label="Nombre y Apellido" placeholder="Ej: Funcionario Receptor" value={acta.coleccion.nombre} onChange={v => setActa({...acta, coleccion: {...acta.coleccion, nombre: v}})} />
                    <InputField label="C.I. o Credencial" placeholder="Ej: V-12345678" value={acta.coleccion.ci} onChange={v => setActa({...acta, coleccion: {...acta.coleccion, ci: v}})} />
                  </div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 border-t border-slate-200 pt-4">Fijación Fotográfica / Escrita</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Nombre y Apellido" placeholder="Ej: Fotógrafo Forense" value={acta.fijacion.nombre} onChange={v => setActa({...acta, fijacion: {...acta.fijacion, nombre: v}})} />
                    <InputField label="C.I. o Credencial" placeholder="Ej: V-11223344" value={acta.fijacion.ci} onChange={v => setActa({...acta, fijacion: {...acta.fijacion, ci: v}})} />
                  </div>
                </FormCard>
              </div>
              <div className="space-y-6">
                <FormCard title="Persona que Consigna (Entrega voluntaria)" icon={<PenTool size={16} />}>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Nombre y Apellido" placeholder="Ej: Ciudadano Voluntario" value={acta.consignante.nombre} onChange={v => setActa({...acta, consignante: {...acta.consignante, nombre: v}})} />
                    <InputField label="Cédula de Identidad" placeholder="Ej: V-99887766" value={acta.consignante.ci} onChange={v => setActa({...acta, consignante: {...acta.consignante, ci: v}})} />
                  </div>
                </FormCard>
                <FormCard title="Detalles del Dispositivo Móvil" icon={<Smartphone size={16} />}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                     <InputField label="Marca y Modelo" placeholder="Ej: Samsung Galaxy S22" value={acta.dispositivo.marcaModelo} onChange={v => setActa({...acta, dispositivo: {...acta.dispositivo, marcaModelo: v}})} />
                     <InputField label="Número Telefónico" placeholder="Ej: +58 414 1234567" value={acta.dispositivo.numero} onChange={v => setActa({...acta, dispositivo: {...acta.dispositivo, numero: v}})} />
                  </div>
                  <InputField label="IMEI / IMEI2" placeholder="Ej: 358941230987123" fontMono className="mb-4" value={acta.dispositivo.imei} onChange={v => setActa({...acta, dispositivo: {...acta.dispositivo, imei: v}})} />
                  <TextareaField label="Estado Físico (Batería, Daños, Pantalla)" placeholder="Ej: Pantalla intacta, puertos limpios, batería al 80%..." value={acta.dispositivo.estadoFisico} onChange={v => setActa({...acta, dispositivo: {...acta.dispositivo, estadoFisico: v}})} />
                </FormCard>
                <FormCard title="Descripción y Observaciones M. Legal" icon={<FileText size={16} />}>
                  <TextareaField label="Descripción de la actuación" placeholder="Ej: Se recibe de forma voluntaria dispositivo móvil..." value={acta.descripcion} onChange={v => setActa({...acta, descripcion: v})} className="mb-4" />
                  <TextareaField label="Observaciones Finales" placeholder="Ej: Fijación fotográfica del estado del dispositivo..." value={acta.observaciones} onChange={v => setActa({...acta, observaciones: v})} />
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
        value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
});

// --- PRINT VIEWS ---

const PrintHeader = memo(({ onClose, title }: any) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-slate-800 flex items-center px-6 gap-4 z-50 text-white border-b border-black/20 shadow-lg print:hidden">
      <div className="flex items-center gap-2 mr-auto">
        <FileText size={18} className="text-teal-400" />
        <span className="text-sm font-sans font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-4">
          <span className="text-xs opacity-70 font-sans">8.5" x 11.0" (Carta)</span>
          <div className="w-[1px] h-4 bg-white/20" />
          <button onClick={() => window.print()} className="hover:bg-white/10 p-1.5 rounded-sm transition-colors" title="Imprimir"><Printer size={18} /></button>
        <button onClick={onClose} className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1 font-sans rounded transition-colors">Cerrar Visualizador</button>
      </div>
    </div>
  )
});

const PdfLogo = () => (
  <div className="flex flex-col mb-4 pb-2 border-b-2 border-slate-300">
    <div className="flex items-center gap-2 mb-1">
      <Shield size={32} className="text-black" />
      <div className="leading-tight text-black flex flex-col justify-center">
        <div className="font-black text-xl tracking-widest uppercase">SHA256.US</div>
        <div className="text-[9px] font-bold tracking-widest uppercase mt-0.5">Laboratorio de Informática Forense y Ciberseguridad SHA256.US</div>
      </div>
    </div>
    <div className="text-[8px] text-slate-500 uppercase tracking-widest pl-10">
      Avenida 6, con calle 7, Edificio Mercantil La Ceiba, primer piso, oficina Nº 8, Quibor, Municipio Jiménez del Estado Lara.
    </div>
  </div>
);

const PrintDictamen = memo(({ report, onClose }: any) => {
  return (
    <div className="pdf-viewer-bg" id="print-view">
      <PrintHeader onClose={onClose} title="DICTAMEN_PERICIAL.pdf" />
      <div className="pt-12 pb-12 w-full flex justify-center">
        <div className="document-page text-black font-serif">
          <PdfLogo />
          <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
            <div>
              <h1 className="text-lg font-bold uppercase tracking-widest leading-tight">DICTAMEN DE PERITACIÓN INFORMÁTICA</h1>
              <p className="text-xs font-bold mt-1">República Bolivariana de Venezuela - Ministerio Público</p>
            </div>
            <div className="text-right text-[10px] uppercase font-bold tracking-tighter">
              Control: {report.perito.sello}-{new Date().getFullYear()}
            </div>
          </div>
          <div className="space-y-4">
            <section>
              <h2 className="font-bold underline uppercase text-sm mb-1 italic">I. MOTIVO DE LA PERITACIÓN:</h2>
              <div className="text-sm leading-relaxed text-justify px-2">{report.motivo}</div>
            </section>
            <section>
              <h2 className="font-bold underline uppercase text-sm mb-1 italic">II. DESCRIPCIÓN DE LA EVIDENCIA:</h2>
              <div className="text-sm leading-relaxed text-justify px-2 p-2 bg-slate-50 border border-dotted border-slate-300">{report.descripcion}</div>
            </section>
            <section>
              <h2 className="font-bold underline uppercase text-sm mb-1 italic">III. EXÁMENES PRACTICADOS:</h2>
              <div className="grid grid-cols-1 gap-1 text-xs border border-black p-2 mx-2">
                <div><span className="font-bold">Sistema Operativo Linux:</span> {report.examenes.linuxVersion}</div>
                <div><span className="font-bold">Software de Extracción:</span> {report.examenes.andrillerVersion}</div>
                <div><span className="font-bold">Software de Análisis:</span> {report.examenes.aleappVersion}</div>
                <div><span className="font-bold">Técnicas Empleadas:</span> {report.examenes.tecnicas}</div>
                <div><span className="font-bold">Valores Hash Global:</span> <span className="font-mono">{report.examenes.valoresHashGrales}</span></div>
              </div>
            </section>
            <section>
              <h2 className="font-bold underline uppercase text-sm mb-1 italic">IV. RESULTADOS OBTENIDOS:</h2>
              <table className="w-full text-[10px] border-collapse border border-black mx-2">
                <thead>
                  <tr className="bg-slate-100 italic">
                    <th className="border border-black p-1 text-left">Archivo Nativo</th>
                    <th className="border border-black p-1 text-center">Fecha</th>
                    <th className="border border-black p-1 text-left">Ruta del Proceso</th>
                    <th className="border border-black p-1 text-center">Tamaño</th>
                    <th className="border border-black p-1 text-left">Hash Individual (MD5/SHA)</th>
                  </tr>
                </thead>
                <tbody>
                  {report.resultados.map((res) => (
                    <tr key={res.id}>
                      <td className="border border-black p-1 font-bold">{res.name}</td>
                      <td className="border border-black p-1 text-center">{res.date}</td>
                      <td className="border border-black p-1 break-all">{res.path}</td>
                      <td className="border border-black p-1 text-center whitespace-nowrap">{res.size}</td>
                      <td className="border border-black p-1 break-all font-mono text-[9px] uppercase">{res.hash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section>
              <h2 className="font-bold underline uppercase text-sm mb-1 italic">V. CONCLUSIONES:</h2>
              <div className="text-sm leading-relaxed text-justify px-2 font-medium bg-slate-50 py-2 border-l-4 border-black italic">"{report.conclusiones}"</div>
            </section>
            <section>
              <h2 className="font-bold underline uppercase text-sm mb-1 italic">VI. CONSUMO DE EVIDENCIA:</h2>
              <div className="text-sm leading-relaxed text-justify px-2 font-medium">{report.consumoEvidencia}</div>
            </section>

             <div className="pt-3 border-t border-slate-300 mt-6">
                <h3 className="font-bold text-[10px] uppercase mb-1">Fundamentación Legal y Estándares:</h3>
                <p className="text-[9px] leading-tight text-slate-600 italic">
                  • CRBV: Garantía de de debido proceso y privacidad de comunicaciones.<br/>
                  • COPP Art. 188: Resguardo de evidencias y régimen de licitud de prueba.<br/>
                  • Ley Especial contra Delitos Informáticos (2001) y Ley de Infogobierno.<br/>
                  • Ley sobre Mensajes de Datos y Firmas Electrónicas (Art. 4 y 8).<br/>
                  • Estándares Internacionales: ISO/IEC 27037:2012, ISO/IEC 27042:2015, NIST SP 800-101 r1.
                </p>
              </div>

          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-64 border-t-2 border-black pt-2 text-center">
              <p className="font-bold text-sm tracking-widest">{report.perito.nombre.toUpperCase()}</p>
              <p className="text-[9px] uppercase font-bold">Perito Forense Informático</p>
              <p className="text-[9px] uppercase">Sello: {report.perito.sello}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const PrintPRCC = memo(({ prcc, onClose }: any) => {
  return (
    <div className="pdf-viewer-bg" id="print-view">
      <PrintHeader onClose={onClose} title="PRCC.pdf" />
      <div className="pt-12 pb-12 w-full flex justify-center">
        <div className="document-page font-sans text-black">
          <PdfLogo />
          <div className="text-center font-bold underline mb-4 text-sm tracking-widest">
            PLANILLA DE REGISTRO DE CADENA DE CUSTODIA - (PRCC)
          </div>
          {/* I. Datos Generales */}
          <div className="border-[1.5px] border-black mb-2">
             <div className="bg-black text-white text-[10px] font-bold px-1 uppercase">I.- DATOS GENERALES</div>
             <div className="grid grid-cols-2 text-[10px]">
                <div className="p-1 border-r border-black border-b"><span className="text-slate-600">1. N° Expediente / Causa:</span> {prcc.expediente}</div>
                <div className="p-1 border-b border-black"><span className="text-slate-600">2. N° PRCC:</span> {prcc.prcc}</div>
                <div className="p-1 border-r border-black border-b"><span className="text-slate-600">3. Despacho que instruye:</span> {prcc.despachoInstruye}</div>
                <div className="p-1 border-b border-black"><span className="text-slate-600">4. Organismo que instruye:</span> {prcc.organismoInstruye}</div>
                <div className="p-1 border-r border-black border-b"><span className="text-slate-600">5. Despacho que inicia custodia:</span> {prcc.despachoInicia}</div>
                <div className="p-1 border-b border-black"><span className="text-slate-600">6. Organismo que custodia:</span> {prcc.organismoInicia}</div>
                <div className="p-1 border-r border-black"><span className="text-slate-600">7. Dirección de Obtención:</span> {prcc.direccion}</div>
                <div className="p-1"><span className="text-slate-600">8. Fecha y Hora:</span> {prcc.fechaHora}</div>
             </div>
          </div>
          {/* II. Formas */}
          <div className="border-[1.5px] border-black mb-2">
             <div className="bg-black text-white text-[10px] font-bold px-1 uppercase">II. FORMAS DE OBTENCIÓN DE LA EVIDENCIA</div>
             <div className="p-1 text-[10px] font-bold text-center py-2 bg-slate-100">{prcc.formaObtencion.toUpperCase()}</div>
          </div>
          {/* III. Operario */}
          <div className="border-[1.5px] border-black mb-2">
             <div className="bg-black text-white text-[10px] font-bold px-1 uppercase">III. OPERARIO QUE OBTIENE LA EVIDENCIA</div>
             <div className="grid grid-cols-2">
                <div className="border-r border-black p-1 flex">
                   <div className="writing-vertical font-bold text-[8px] bg-slate-200 uppercase w-4 text-center">a. FIJACIÓN</div>
                   <div className="flex-grow pl-2 text-[9px] space-y-1">
                      <div>1. Nombres: {prcc.fijacion.nombre}</div>
                      <div>2. C.I./Cred: {prcc.fijacion.ci}</div>
                      <div className="pt-3">3. Firma: ____________________</div>
                   </div>
                </div>
                <div className="p-1 flex">
                   <div className="writing-vertical font-bold text-[8px] bg-slate-200 uppercase w-4 text-center">b. COLECCIÓN</div>
                   <div className="flex-grow pl-2 text-[9px] space-y-1">
                      <div>1. Nombres: {prcc.coleccion.nombre}</div>
                      <div>2. C.I./Cred: {prcc.coleccion.ci}</div>
                      <div className="pt-3">3. Firma: ____________________</div>
                   </div>
                </div>
             </div>
          </div>
          {/* IV. Descripción */}
          <div className="border-[1.5px] border-black mb-2">
             <div className="bg-black text-white text-[10px] font-bold px-1 uppercase">IV. DESCRIPCIÓN DE LA EVIDENCIA</div>
             <div className="p-1 text-[10px] min-h-[60px] underline leading-relaxed decoration-slate-300 underline-offset-4 font-serif">
               {prcc.descripcion}
             </div>
          </div>
          {/* V. Transferencia */}
          <div className="border-[1.5px] border-black">
             <div className="bg-black text-white text-[10px] font-bold px-1 uppercase">V. TRANSFERENCIA DE LA EVIDENCIA</div>
             <div className="bg-slate-300 text-[9px] font-bold px-1 border-b border-black">a. MOTIVO: {prcc.motivoTransferencia}</div>
             <div className="grid grid-cols-2 text-[10px]">
                <div className="border-r border-black p-1">
                  <div className="bg-black text-white px-1 mb-1 font-bold inline-block">b. ENTREGA</div>
                  <div>1. Nombres: {prcc.entrega.nombre}</div><div>2. Org: {prcc.entrega.organismo}</div><div>3. Despacho: {prcc.entrega.despacho}</div>
                  <div>4. CI/Cred: {prcc.entrega.ci}</div><div className="mt-2">5. Firma: _________</div>
                </div>
                <div className="p-1">
                  <div className="bg-black text-white px-1 mb-1 font-bold inline-block">c. RECIBE</div>
                  <div>1. Nombres: {prcc.recibe.nombre}</div><div>2. Org: {prcc.recibe.organismo}</div><div>3. Despacho: {prcc.recibe.despacho}</div>
                  <div>4. CI/Cred: {prcc.recibe.ci}</div><div className="mt-2">5. Firma: _________</div>
                </div>
             </div>
             <div className="bg-black text-white text-[10px] font-bold px-1 border-t border-black uppercase">d. OBSERVACIONES</div>
             <div className="p-1 text-[10px] min-h-[30px] font-serif">{prcc.observaciones}</div>
          </div>
        </div>
      </div>
    </div>
  )
});

const PrintActa = memo(({ acta, onClose }: any) => {
  return (
    <div className="pdf-viewer-bg" id="print-view">
       <PrintHeader onClose={onClose} title="ACTA_CONSIGNACION.pdf" />
       <div className="pt-12 pb-12 w-full flex justify-center">
         <div className="document-page font-sans text-black">
            <PdfLogo />
            <div className="text-center font-bold text-sm bg-slate-200 py-1 mb-4 border-[1.5px] border-black uppercase tracking-widest">
               CADENA DE CUSTODIA DE EVIDENCIA FÍSICAS<br/>
               Acta de Obtención por Consignación
            </div>
            
            <div className="bg-slate-300 font-bold px-1 text-[10px] border border-black mb-1 uppercase">DATOS GENERALES</div>
            <div className="text-[10px] mb-4 space-y-1">
              <div className="flex"><span className="w-24 font-bold">N° expediente:</span> <span className="border-b border-black flex-grow bg-slate-50">{acta.expediente}</span></div>
              <div className="flex"><span className="w-24 font-bold">N° de PRCC:</span> <span className="border-b border-black flex-grow bg-slate-50">{acta.prcc}</span></div>
              <div className="flex"><span className="w-24 font-bold">Organismo:</span> <span className="border-b border-black flex-grow bg-slate-50">{acta.organismo}</span></div>
              <div className="flex"><span className="w-24 font-bold">Oficina que instruye:</span> <span className="border-b border-black flex-grow bg-slate-50">{acta.oficina}</span></div>
              <div className="flex"><span className="w-24 font-bold">Dir de Obtención:</span> <span className="border-b border-black flex-grow bg-slate-50">{acta.direccion}</span></div>
              <div className="flex"><span className="w-24 font-bold">Fecha / Hora:</span> <span className="border-b border-black flex-grow bg-slate-50">{acta.fecha} / {acta.hora}</span></div>
            </div>

            <div className="bg-slate-300 font-bold px-1 text-[10px] border border-black mb-1 uppercase">OPERARIOS QUE OBTIENEN LA EVIDENCIA</div>
            <table className="w-full border-collapse border border-black text-[10px] mb-4">
              <tbody>
                <tr>
                  <td className="border border-black p-1 w-1/2 bg-slate-50">
                     <span className="font-bold underline">Colección-Recepción:</span><br/>
                     Nombre: {acta.coleccion.nombre}<br/>
                     C.I o Credencial: {acta.coleccion.ci}
                  </td>
                  <td className="border border-black p-2 align-bottom h-16 w-1/2 text-center text-slate-400">Firma: ________________</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 bg-slate-50">
                     <span className="font-bold underline">Fijación (Escrita/Fotográfica):</span><br/>
                     Nombre: {acta.fijacion.nombre}<br/>
                     C.I o Credencial: {acta.fijacion.ci}
                  </td>
                  <td className="border border-black p-2 align-bottom h-16 w-1/2 text-center text-slate-400">Firma: ________________</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-slate-300 font-bold px-1 text-[10px] border border-black mb-1 uppercase">PERSONA QUE CONSIGNA LA EVIDENCIA</div>
            <div className="border border-black p-1 mb-4 flex text-[10px] bg-slate-50">
               <div className="w-2/3 space-y-2">
                 <div>Nombre y Apellido: <span className="underline decoration-dotted font-bold">{acta.consignante.nombre}</span></div>
                 <div>Cédula de Identidad: <span className="underline decoration-dotted font-bold">{acta.consignante.ci}</span></div>
               </div>
               <div className="w-1/3 flex items-end justify-center text-slate-400">Firma (Entrega): _________________</div>
            </div>

            <div className="bg-slate-300 font-bold px-1 text-[10px] border border-black mb-1 uppercase">DATOS DEL DISPOSITIVO MÓVIL</div>
            <div className="border border-black mb-4 p-1 text-[10px] grid grid-cols-2 gap-2 bg-slate-50">
               <div><span className="font-bold">Marca y Modelo:</span> {acta.dispositivo.marcaModelo}</div>
               <div><span className="font-bold">N° Telefónico:</span> {acta.dispositivo.numero}</div>
               <div className="col-span-2"><span className="font-bold">IMEI/IMEI2:</span> <span className="font-mono">{acta.dispositivo.imei}</span></div>
               <div className="col-span-2"><span className="font-bold">Estado Físico:</span> {acta.dispositivo.estadoFisico}</div>
            </div>

            <div className="bg-slate-300 font-bold px-1 text-[10px] border border-black mb-1 uppercase">DESCRIPCIÓN DE LA EVIDENCIA O ACTUACIÓN</div>
            <div className="border border-black min-h-[60px] mb-4 p-1 text-[10px] underline leading-relaxed decoration-slate-300 underline-offset-4 font-serif bg-slate-50">
               {acta.descripcion}
            </div>

            <div className="bg-slate-300 font-bold px-1 text-[10px] border border-black mb-1 uppercase">OBSERVACIONES</div>
            <div className="border border-black min-h-[40px] p-1 text-[10px] underline leading-relaxed decoration-slate-300 underline-offset-4 font-serif bg-slate-50">
               {acta.observaciones}
            </div>
         </div>
       </div>
    </div>
  )
});
