/**
 * Página: Acta de Obtención por Consignación
 * Formulario según el Manual Único de Cadena de Custodia (2017)
 */
import { ClipboardList, Shield, PenTool, Smartphone, FileText, LayoutTemplate } from 'lucide-react';
import { FormCard, InputField, TextareaField } from '../ui';
import type { ActaData } from '../../types';

interface ActaPageProps {
  acta: ActaData;
  onActaChange: (acta: ActaData) => void;
  onOpenTemplate: (filename: string) => void;
}

export default function ActaPage({ acta, onActaChange, onOpenTemplate }: ActaPageProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <FormCard title="Datos Generales" icon={<ClipboardList size={16} />}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="N° de Expediente" value={acta.expediente} onChange={v => onActaChange({...acta, expediente: v})} />
            <InputField label="N° de PRCC" value={acta.prcc} onChange={v => onActaChange({...acta, prcc: v})} />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="Organismo" value={acta.organismo} onChange={v => onActaChange({...acta, organismo: v})} />
            <InputField label="Oficina que instruye" value={acta.oficina} onChange={v => onActaChange({...acta, oficina: v})} />
          </div>
          <InputField label="Dirección de Obtención" value={acta.direccion} onChange={v => onActaChange({...acta, direccion: v})} className="mb-4" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Fecha" value={acta.fecha} onChange={v => onActaChange({...acta, fecha: v})} />
            <InputField label="Hora" value={acta.hora} onChange={v => onActaChange({...acta, hora: v})} />
          </div>
        </FormCard>
        <FormCard title="Operarios que Obtienen la Evidencia" icon={<Shield size={16} />}>
          <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Colección / Recepción</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="Nombre y Apellido" value={acta.coleccion.nombre} onChange={v => onActaChange({...acta, coleccion: {...acta.coleccion, nombre: v}})} />
            <InputField label="C.I. o Credencial" value={acta.coleccion.ci} onChange={v => onActaChange({...acta, coleccion: {...acta.coleccion, ci: v}})} />
          </div>
          <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 border-t border-slate-200 pt-4">Fijación Fotográfica / Escrita</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Nombre y Apellido" value={acta.fijacion.nombre} onChange={v => onActaChange({...acta, fijacion: {...acta.fijacion, nombre: v}})} />
            <InputField label="C.I. o Credencial" value={acta.fijacion.ci} onChange={v => onActaChange({...acta, fijacion: {...acta.fijacion, ci: v}})} />
          </div>
        </FormCard>
      </div>
      <div className="space-y-6">
        <FormCard title="Persona que Consigna" icon={<PenTool size={16} />}>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Nombre y Apellido" value={acta.consignante.nombre} onChange={v => onActaChange({...acta, consignante: {...acta.consignante, nombre: v}})} />
            <InputField label="Cédula de Identidad" value={acta.consignante.ci} onChange={v => onActaChange({...acta, consignante: {...acta.consignante, ci: v}})} />
          </div>
        </FormCard>
        <FormCard title="Detalles del Dispositivo Móvil" icon={<Smartphone size={16} />}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="Marca y Modelo" value={acta.dispositivo.marcaModelo} onChange={v => onActaChange({...acta, dispositivo: {...acta.dispositivo, marcaModelo: v}})} />
            <InputField label="Número Telefónico" value={acta.dispositivo.numero} onChange={v => onActaChange({...acta, dispositivo: {...acta.dispositivo, numero: v}})} />
          </div>
          <InputField label="IMEI / IMEI2" fontMono className="mb-4" value={acta.dispositivo.imei} onChange={v => onActaChange({...acta, dispositivo: {...acta.dispositivo, imei: v}})} />
          <TextareaField label="Estado Físico" value={acta.dispositivo.estadoFisico} onChange={v => onActaChange({...acta, dispositivo: {...acta.dispositivo, estadoFisico: v}})} />
        </FormCard>
        <FormCard title="Descripción y Observaciones M. Legal" icon={<FileText size={16} />}>
          <TextareaField label="Descripción de la actuación" value={acta.descripcion} onChange={v => onActaChange({...acta, descripcion: v})} className="mb-4" />
          <TextareaField label="Observaciones Finales" value={acta.observaciones} onChange={v => onActaChange({...acta, observaciones: v})} />
        </FormCard>
        <FormCard title="Plantilla Legal (HTML)" icon={<LayoutTemplate size={16} />}>
          <p className="text-[11px] text-slate-500 mb-4">Visualice el Acta de Obtención por Consignación original en formato HTML.</p>
          <button onClick={() => onOpenTemplate('acta_obtencion_consignacion.html')} className="w-full flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-2.5 rounded-md font-bold text-xs hover:bg-slate-50 transition-all uppercase tracking-wider">
            <LayoutTemplate size={14} /> Abrir Acta de Consignación
          </button>
        </FormCard>
      </div>
    </div>
  );
}
