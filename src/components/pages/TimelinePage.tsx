/**
 * Página: Timeline Forense — ISO 27042:2015
 * Reconstrucción cronológica de eventos para impresión en PDF
 */
import { useState, useCallback } from 'react';
import { Clock, Plus, Trash2, Printer, Download, Calendar, Smartphone, MessageCircle, MapPin, Phone, Image, FileText, Shield } from 'lucide-react';
import { FormCard, InputField } from '../ui';

interface TimelineEvent {
  id: string;
  timestamp: string;
  category: string;
  source: string;
  description: string;
  artifact: string;
  hash: string;
  relevance: 'alta' | 'media' | 'baja';
}

const categories = [
  { value: 'mensaje', label: 'Mensaje', icon: MessageCircle, color: '#0078D4' },
  { value: 'llamada', label: 'Llamada', icon: Phone, color: '#107C10' },
  { value: 'ubicacion', label: 'Ubicación', icon: MapPin, color: '#D83B01' },
  { value: 'multimedia', label: 'Multimedia', icon: Image, color: '#5C2D91' },
  { value: 'sistema', label: 'Sistema', icon: Smartphone, color: '#616161' },
  { value: 'archivo', label: 'Archivo', icon: FileText, color: '#CA5010' },
];

const sources = ['WhatsApp', 'SMS', 'Llamadas', 'GPS', 'Cámara', 'Navegador', 'Contacts.db', 'Sistema Android', 'ALEAPP', 'Andriller', 'CAINE', 'Tsurugi', 'Santoku', 'Kali Linux'];

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [caseNumber, setCaseNumber] = useState('');
  const [expertName, setExpertName] = useState('');
  const [deviceInfo, setDeviceInfo] = useState('');
  const [hashOriginal, setHashOriginal] = useState('');
  const [hashCopy, setHashCopy] = useState('');
  const [distroUsed, setDistroUsed] = useState('CAINE');

  const addEvent = useCallback(() => {
    setEvents(prev => [...prev, {
      id: Math.random().toString(36).substring(2, 11),
      timestamp: '',
      category: 'mensaje',
      source: 'WhatsApp',
      description: '',
      artifact: '',
      hash: '',
      relevance: 'media',
    }]);
  }, []);

  const updateEvent = useCallback((id: string, field: keyof TimelineEvent, value: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  }, []);

  const removeEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }, []);

  const sortByTimestamp = useCallback(() => {
    setEvents(prev => [...prev].sort((a, b) => a.timestamp.localeCompare(b.timestamp)));
  }, []);

  const handlePrint = useCallback(() => {
    const sorted = [...events].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Timeline Forense — ${caseNumber}</title>
<style>
  @page { size: letter; margin: 15mm; }
  body { font-family: 'Segoe UI', 'Inter', sans-serif; font-size: 10px; color: #1a1a1a; margin: 0; padding: 20mm; }
  .header { border-bottom: 2px solid #0078D4; padding-bottom: 10px; margin-bottom: 15px; }
  .header h1 { font-size: 16px; margin: 0 0 4px; color: #0078D4; }
  .header h2 { font-size: 12px; margin: 0 0 8px; font-weight: normal; }
  .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 9px; }
  .meta span { display: block; }
  .meta strong { color: #616161; }
  .badge { display: inline-block; padding: 1px 6px; border-radius: 3px; font-size: 8px; font-weight: 700; text-transform: uppercase; }
  .badge-alta { background: #FDE7E9; color: #A80000; }
  .badge-media { background: #DEECF9; color: #0078D4; }
  .badge-baja { background: #F0F0F0; color: #616161; }
  table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  th { background: #1B1B1F; color: white; padding: 6px 8px; text-align: left; font-size: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
  td { border: 1px solid #E0E0E0; padding: 5px 8px; font-size: 9px; vertical-align: top; }
  tr:nth-child(even) { background: #FAFAFA; }
  .hash { font-family: 'Cascadia Code', monospace; font-size: 7px; color: #616161; word-break: break-all; }
  .footer { margin-top: 20px; border-top: 1px solid #E0E0E0; padding-top: 10px; font-size: 8px; color: #616161; }
  .sig-line { border-top: 1px solid #1a1a1a; width: 200px; margin-top: 40px; padding-top: 4px; font-size: 9px; }
  .iso-box { margin-top: 10px; padding: 8px; border: 1px solid #0078D4; border-radius: 4px; font-size: 8px; }
  .platform { background: #DEECF9; padding: 4px 8px; border-radius: 3px; display: inline-block; font-size: 9px; font-weight: 600; color: #0078D4; margin-top: 8px; }
</style></head><body>
<div class="header">
  <h1>⏱ RECONSTRUCCIÓN DE TIMELINE FORENSE</h1>
  <h2>Conforme a ISO/IEC 27042:2015 — Análisis e Interpretación de Evidencia Digital</h2>
  <div class="meta">
    <span><strong>Caso N°:</strong> ${caseNumber || 'N/A'}</span>
    <span><strong>Perito:</strong> ${expertName || 'N/A'}</span>
    <span><strong>Dispositivo:</strong> ${deviceInfo || 'N/A'}</span>
    <span><strong>Fecha del Informe:</strong> ${new Date().toLocaleDateString('es-VE')}</span>
    <span><strong>Hash Original (SHA-256):</strong> <span class="hash">${hashOriginal || 'N/A'}</span></span>
    <span><strong>Hash Copia (SHA-256):</strong> <span class="hash">${hashCopy || 'N/A'}</span></span>
  </div>
  <div class="platform">🐧 Plataforma: ${distroUsed} Linux</div>
  <p style="font-size:9px; margin-top:6px; color:#616161;">Herramientas: Andriller (extracción) · ALEAPP (análisis) · ${distroUsed} (entorno forense)</p>
</div>

<div class="iso-box">
  <strong>ISO/IEC 27042:2015 §7.3 — Reconstrucción de Eventos:</strong> Esta línea de tiempo documenta los eventos digitales extraídos del dispositivo, ordenados cronológicamente, para la reconstrucción histórica del hecho investigado. Los hashes garantizan la integridad de cada artefacto.
</div>

<table>
  <thead><tr>
    <th style="width:12%">Fecha/Hora</th>
    <th style="width:8%">Categoría</th>
    <th style="width:10%">Fuente</th>
    <th style="width:30%">Descripción del Evento</th>
    <th style="width:15%">Artefacto</th>
    <th style="width:18%">Hash SHA-256</th>
    <th style="width:7%">Relevancia</th>
  </tr></thead>
  <tbody>
    ${sorted.map((e, i) => `<tr>
      <td>${e.timestamp || '—'}</td>
      <td>${categories.find(c => c.value === e.category)?.label || e.category}</td>
      <td>${e.source}</td>
      <td>${e.description}</td>
      <td style="font-size:8px">${e.artifact}</td>
      <td class="hash">${e.hash || '—'}</td>
      <td><span class="badge badge-${e.relevance}">${e.relevance}</span></td>
    </tr>`).join('')}
  </tbody>
</table>
<p style="font-size:8px; color:#616161; margin-top:4px;">Total de eventos registrados: ${sorted.length}</p>

<div class="footer">
  <p><strong>Nota:</strong> La presente reconstrucción de timeline fue elaborada mediante análisis forense no destructivo. La evidencia digital NO fue alterada ni consumida durante el proceso.</p>
  <p><strong>Fundamentación:</strong> ISO/IEC 27037:2012, ISO/IEC 27042:2015, NIST SP 800-101 r1, MUCCEF 2017, Ley sobre Mensajes de Datos y Firmas Electrónicas.</p>
  <div class="sig-line">Perito Informático — Firma y Sello</div>
</div>
</body></html>`;

    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  }, [events, caseNumber, expertName, deviceInfo, hashOriginal, hashCopy, distroUsed]);

  return (
    <div className="space-y-5">
      {/* Metadata del Caso */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <FormCard title="Datos del Caso" icon={<Shield size={15} />}>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <InputField label="N° de Caso / Expediente" placeholder="Ej: MP-2024-001234" value={caseNumber} onChange={setCaseNumber} />
            <InputField label="Perito Informático" placeholder="Ej: Ing. J. Rodríguez" value={expertName} onChange={setExpertName} />
          </div>
          <InputField label="Dispositivo Analizado" placeholder="Ej: Samsung Galaxy A52, IMEI: 35..." value={deviceInfo} onChange={setDeviceInfo} />
        </FormCard>

        <FormCard title="Integridad y Plataforma" icon={<Shield size={15} />}>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <InputField label="Hash Original (SHA-256)" placeholder="Ej: e3b0c44298fc1c..." fontMono value={hashOriginal} onChange={setHashOriginal} />
            <InputField label="Hash Copia (SHA-256)" placeholder="Debe coincidir con el original" fontMono value={hashCopy} onChange={setHashCopy} />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#616161] mb-1.5 tracking-wide">Distribución Linux Forense Utilizada</label>
            <select className="fluent-input" value={distroUsed} onChange={(e) => setDistroUsed(e.target.value)}>
              <option value="CAINE">CAINE (Computer Aided INvestigative Environment)</option>
              <option value="Tsurugi">Tsurugi Linux (DFIR / Incident Response)</option>
              <option value="Santoku">Santoku Linux (Mobile Forensics)</option>
              <option value="Kali Linux">Kali Linux (Advanced Penetration Testing & Forensics)</option>
            </select>
          </div>
        </FormCard>
      </div>

      {/* Controles de Timeline */}
      <FormCard
        title="Línea de Tiempo — ISO/IEC 27042:2015"
        icon={<Clock size={15} />}
        action={
          <div className="flex gap-2">
            <button onClick={sortByTimestamp} className="fluent-btn-secondary text-[11px] px-3 py-1.5">
              <Calendar size={13} /> Ordenar
            </button>
            <button onClick={addEvent} className="fluent-btn-primary text-[11px] px-3 py-1.5">
              <Plus size={13} /> Evento
            </button>
          </div>
        }
      >
        {events.length === 0 ? (
          <div className="text-center py-14">
            <Clock size={40} className="mx-auto mb-3 text-[#E0E0E0]" />
            <p className="text-[13px] text-[#9E9E9E] mb-1">No hay eventos en el timeline</p>
            <p className="text-[11px] text-[#9E9E9E]">Pulse "+ Evento" para agregar un hallazgo cronológico.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {events.map((event, idx) => {
              const cat = categories.find(c => c.value === event.category);
              const CatIcon = cat?.icon || FileText;
              return (
                <div key={event.id} className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-lg p-3.5 relative group hover:border-[#0078D4]/30 transition-all">
                  <button
                    onClick={() => removeEvent(event.id)}
                    className="absolute top-2 right-2 text-[#9E9E9E] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={13} />
                  </button>

                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: cat?.color || '#616161' }}>
                      <CatIcon size={12} />
                    </div>
                    <span className="text-[11px] font-semibold text-[#1A1A1A]">Evento #{idx + 1}</span>
                    <span className={`fluent-badge ml-auto ${
                      event.relevance === 'alta' ? 'bg-red-100 text-red-700' :
                      event.relevance === 'media' ? 'bg-[#DEECF9] text-[#0078D4]' :
                      'bg-[#F0F0F0] text-[#616161]'
                    }`}>{event.relevance}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2.5 mb-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#9E9E9E] mb-1">Fecha/Hora</label>
                      <input
                        type="datetime-local"
                        className="fluent-input text-[11px]"
                        value={event.timestamp}
                        onChange={(e) => updateEvent(event.id, 'timestamp', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#9E9E9E] mb-1">Categoría</label>
                      <select className="fluent-input text-[11px]" value={event.category} onChange={(e) => updateEvent(event.id, 'category', e.target.value)}>
                        {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#9E9E9E] mb-1">Fuente</label>
                      <select className="fluent-input text-[11px]" value={event.source} onChange={(e) => updateEvent(event.id, 'source', e.target.value)}>
                        {sources.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#9E9E9E] mb-1">Relevancia</label>
                      <select className="fluent-input text-[11px]" value={event.relevance} onChange={(e) => updateEvent(event.id, 'relevance', e.target.value as 'alta'|'media'|'baja')}>
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="col-span-1">
                      <label className="block text-[10px] font-semibold text-[#9E9E9E] mb-1">Artefacto</label>
                      <input className="fluent-input text-[11px]" placeholder="Ej: msgstore.db" value={event.artifact} onChange={(e) => updateEvent(event.id, 'artifact', e.target.value)} />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-[10px] font-semibold text-[#9E9E9E] mb-1">Hash SHA-256</label>
                      <input className="fluent-input text-[11px] font-mono text-[#616161]" placeholder="5d41402abc4b2a..." value={event.hash} onChange={(e) => updateEvent(event.id, 'hash', e.target.value)} />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-[10px] font-semibold text-[#9E9E9E] mb-1">Descripción</label>
                      <input className="fluent-input text-[11px]" placeholder="Ej: Mensaje enviado a contacto X" value={event.description} onChange={(e) => updateEvent(event.id, 'description', e.target.value)} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </FormCard>

      {/* Print Actions */}
      {events.length > 0 && (
        <div className="fluent-card p-4 flex items-center justify-between animate-fluent-in">
          <div>
            <p className="text-[13px] font-semibold text-[#1A1A1A]">{events.length} evento(s) registrados</p>
            <p className="text-[11px] text-[#616161]">El timeline se imprimirá en formato legal con encabezado ISO 27042.</p>
          </div>
          <button onClick={handlePrint} className="fluent-btn-primary py-2.5 px-6">
            <Printer size={15} /> Imprimir Timeline en PDF
          </button>
        </div>
      )}
    </div>
  );
}
