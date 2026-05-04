/**
 * Página: Planilla de Registro de Cadena de Custodia (PRCC)
 * Formulario completo según el Manual Único de Cadena de Custodia (2017)
 */
import { ClipboardList, FileText, Fingerprint, LayoutTemplate } from 'lucide-react';
import { FormCard, InputField, TextareaField } from '../ui';
import type { PRCCData } from '../../types';

interface PRCCPageProps {
  prcc: PRCCData;
  onPrccChange: (prcc: PRCCData) => void;
  onOpenTemplate: (filename: string) => void;
}

export default function PRCCPage({ prcc, onPrccChange, onOpenTemplate }: PRCCPageProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <FormCard title="I. Datos Generales" icon={<ClipboardList size={16} />}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="N° de Expediente / Causa" placeholder="Ej: MP-2024-12345" value={prcc.expediente} onChange={v => onPrccChange({...prcc, expediente: v})} />
            <InputField label="N° PRCC" placeholder="Ej: PRCC-001" value={prcc.prcc} onChange={v => onPrccChange({...prcc, prcc: v})} />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="Despacho Instruye" placeholder="Ej: Fiscalía 1ra" value={prcc.despachoInstruye} onChange={v => onPrccChange({...prcc, despachoInstruye: v})} />
            <InputField label="Organismo Instruye" placeholder="Ej: Ministerio Público" value={prcc.organismoInstruye} onChange={v => onPrccChange({...prcc, organismoInstruye: v})} />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="Despacho Inicia Custodia" placeholder="Ej: Lab. Informática" value={prcc.despachoInicia} onChange={v => onPrccChange({...prcc, despachoInicia: v})} />
            <InputField label="Organismo Inicia Custodia" placeholder="Ej: CICPC" value={prcc.organismoInicia} onChange={v => onPrccChange({...prcc, organismoInicia: v})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Dirección Obtención" placeholder="Ej: Laboratorio Central" value={prcc.direccion} onChange={v => onPrccChange({...prcc, direccion: v})} />
            <InputField label="Fecha y Hora" value={prcc.fechaHora} onChange={v => onPrccChange({...prcc, fechaHora: v})} />
          </div>
        </FormCard>
        <FormCard title="II-IV. Forma y Operario (ISO/IEC 27037:2012)" icon={<FileText size={16} />}>
          <InputField label="Forma de Obtención" value={prcc.formaObtencion} onChange={v => onPrccChange({...prcc, formaObtencion: v})} className="mb-4" />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="Fijación: Nombre" value={prcc.fijacion.nombre} onChange={v => onPrccChange({...prcc, fijacion: {...prcc.fijacion, nombre: v}})} />
            <InputField label="Fijación: CI/Cred" value={prcc.fijacion.ci} onChange={v => onPrccChange({...prcc, fijacion: {...prcc.fijacion, ci: v}})} />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="Colección: Nombre" value={prcc.coleccion.nombre} onChange={v => onPrccChange({...prcc, coleccion: {...prcc.coleccion, nombre: v}})} />
            <InputField label="Colección: CI/Cred" value={prcc.coleccion.ci} onChange={v => onPrccChange({...prcc, coleccion: {...prcc.coleccion, ci: v}})} />
          </div>
          <TextareaField label="Descripción de la Evidencia (Empaque/Rotulado)" value={prcc.descripcion} onChange={v => onPrccChange({...prcc, descripcion: v})} />
        </FormCard>
      </div>
      <div className="space-y-6">
        <FormCard title="V. Actividad de Transferencia" icon={<Fingerprint size={16} />}>
          <InputField label="Motivo (Resguardo/Peritaje/Traslado)" value={prcc.motivoTransferencia} onChange={v => onPrccChange({...prcc, motivoTransferencia: v})} className="mb-4" />
          <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Entrega</h3>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <InputField label="Nombre y Apellido" value={prcc.entrega.nombre} onChange={v => onPrccChange({...prcc, entrega: {...prcc.entrega, nombre: v}})} />
            <InputField label="C.I / Cred" value={prcc.entrega.ci} onChange={v => onPrccChange({...prcc, entrega: {...prcc.entrega, ci: v}})} />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="Organismo" value={prcc.entrega.organismo} onChange={v => onPrccChange({...prcc, entrega: {...prcc.entrega, organismo: v}})} />
            <InputField label="Despacho" value={prcc.entrega.despacho} onChange={v => onPrccChange({...prcc, entrega: {...prcc.entrega, despacho: v}})} />
          </div>
          <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 border-t border-slate-200 pt-4">Recibe</h3>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <InputField label="Nombre y Apellido" value={prcc.recibe.nombre} onChange={v => onPrccChange({...prcc, recibe: {...prcc.recibe, nombre: v}})} />
            <InputField label="C.I / Cred" value={prcc.recibe.ci} onChange={v => onPrccChange({...prcc, recibe: {...prcc.recibe, ci: v}})} />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="Organismo" value={prcc.recibe.organismo} onChange={v => onPrccChange({...prcc, recibe: {...prcc.recibe, organismo: v}})} />
            <InputField label="Despacho" value={prcc.recibe.despacho} onChange={v => onPrccChange({...prcc, recibe: {...prcc.recibe, despacho: v}})} />
          </div>
          <TextareaField label="Observaciones (Ej. Integridad de los precintos)" value={prcc.observaciones} onChange={v => onPrccChange({...prcc, observaciones: v})} />
        </FormCard>
        <FormCard title="Plantilla Legal (HTML)" icon={<LayoutTemplate size={16} />}>
          <p className="text-[11px] text-slate-500 mb-4">Acceda al formato oficial HTML de la Planilla de Registro de Cadena de Custodia.</p>
          <button onClick={() => onOpenTemplate('planilla_prcc_derivacion.html')} className="w-full flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-2.5 rounded-md font-bold text-xs hover:bg-slate-50 transition-all uppercase tracking-wider">
            <LayoutTemplate size={14} /> Abrir Formato Legal PRCC
          </button>
        </FormCard>
      </div>
    </div>
  );
}
