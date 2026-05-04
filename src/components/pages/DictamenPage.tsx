/**
 * Página: Dictamen Pericial — Fluent Design
 */
import { useCallback } from 'react';
import { FileText, Settings, Archive, Fingerprint, Plus, Trash2 } from 'lucide-react';
import { FormCard, InputField, TextareaField } from '../ui';
import type { ReportData, ForensicResult } from '../../types';

interface DictamenPageProps {
  report: ReportData;
  onReportChange: (report: ReportData) => void;
}

export default function DictamenPage({ report, onReportChange }: DictamenPageProps) {
  const updateResult = useCallback((id: string, field: keyof ForensicResult, value: string) => {
    onReportChange({ ...report, resultados: report.resultados.map(r => r.id === id ? { ...r, [field]: value } : r) });
  }, [report, onReportChange]);

  const removeResult = useCallback((id: string) => {
    onReportChange({ ...report, resultados: report.resultados.filter(r => r.id !== id) });
  }, [report, onReportChange]);

  const addResult = useCallback(() => {
    onReportChange({ ...report, resultados: [...report.resultados, { id: Math.random().toString(36).substring(2, 11), name: '', date: '', path: '', size: '', hash: '' }] });
  }, [report, onReportChange]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <div className="space-y-5">
        <FormCard title="I-II. Contexto y Evidencia" icon={<FileText size={15} />}>
          <TextareaField label="Motivo de la Peritación" placeholder="Ej: Investigación penal solicitada..." value={report.motivo} onChange={(v) => onReportChange({...report, motivo: v})} className="mb-3" />
          <TextareaField label="Descripción de la Evidencia" placeholder="Ej: Dispositivo móvil incautado..." value={report.descripcion} onChange={(v) => onReportChange({...report, descripcion: v})} />
        </FormCard>
        <FormCard title="III. Exámenes Practicados (ISO 27042)" icon={<Settings size={15} />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <InputField label="Versión Andriller" value={report.examenes.andrillerVersion} onChange={(v) => onReportChange({...report, examenes: {...report.examenes, andrillerVersion: v}})} />
            <InputField label="Versión ALEAPP" value={report.examenes.aleappVersion} onChange={(v) => onReportChange({...report, examenes: {...report.examenes, aleappVersion: v}})} />
            <InputField label="Versión Linux" value={report.examenes.linuxVersion} onChange={(v) => onReportChange({...report, examenes: {...report.examenes, linuxVersion: v}})} />
          </div>
          <InputField label="Técnicas Empleadas" placeholder="Ej: Extracción lógica y física..." className="mb-3" value={report.examenes.tecnicas} onChange={(v) => onReportChange({...report, examenes: {...report.examenes, tecnicas: v}})} />
          <InputField label="Hash Global (Integridad)" placeholder="Ej: e3b0c44298fc1c149afbf..." fontMono value={report.examenes.valoresHashGrales} onChange={(v) => onReportChange({...report, examenes: {...report.examenes, valoresHashGrales: v}})} />
        </FormCard>
      </div>
      <div className="space-y-5">
        <FormCard title="IV. Resultados Obtenidos" icon={<Archive size={15} />} action={
          <button onClick={addResult} className="fluent-btn-primary text-[11px] px-3 py-1.5"><Plus size={13} /> Agregar</button>
        }>
          <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
            {report.resultados.map((res) => (
              <div key={res.id} className="bg-[#FAFAFA] p-3 rounded-lg border border-[#E0E0E0] relative group">
                <button onClick={() => removeResult(res.id)} className="absolute top-2 right-2 text-[#9E9E9E] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={13} /></button>
                <div className="grid grid-cols-2 gap-2.5 mb-2">
                  <InputField label="Nombre Archivo" placeholder="Ej: msgstore.db" value={res.name} onChange={v => updateResult(res.id, 'name', v)} />
                  <InputField label="Tamaño" placeholder="Ej: 102.4 MB" value={res.size} onChange={v => updateResult(res.id, 'size', v)} />
                </div>
                <div className="grid grid-cols-2 gap-2.5 mb-2">
                  <InputField label="Ruta" placeholder="Ej: /data/data/com.whatsapp/" fontMono value={res.path} onChange={v => updateResult(res.id, 'path', v)} />
                  <InputField label="Fecha Modificación" placeholder="DD/MM/AAAA" value={res.date} onChange={v => updateResult(res.id, 'date', v)} />
                </div>
                <InputField label="Hash MD5/SHA" placeholder="Ej: 5d41402abc4b2a76b9719d..." fontMono value={res.hash} onChange={v => updateResult(res.id, 'hash', v)} />
              </div>
            ))}
          </div>
        </FormCard>
        <FormCard title="V-VI. Conclusiones y Consumo" icon={<Fingerprint size={15} />}>
          <TextareaField label="Conclusiones (Sin precalificación jurídica)" value={report.conclusiones} onChange={v => onReportChange({...report, conclusiones: v})} className="mb-3" />
          <TextareaField label="Consumo o alteración de Evidencia" value={report.consumoEvidencia} onChange={v => onReportChange({...report, consumoEvidencia: v})} className="mb-3" />
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Perito Informático" placeholder="Ej: Ing. Perito" value={report.perito.nombre} onChange={v => onReportChange({...report, perito: {...report.perito, nombre: v}})} />
            <InputField label="Sello Institucional" placeholder="Ej: 001-VZ-FOR" fontMono value={report.perito.sello} onChange={v => onReportChange({...report, perito: {...report.perito, sello: v}})} />
          </div>
        </FormCard>
      </div>
    </div>
  );
}
