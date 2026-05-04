/**
 * Dashboard Forense Interactivo — Fluent Design
 * Protocolo de 10 pasos para peritaje Android
 */
import { useState } from 'react';
import { CheckCircle2, Circle, CheckCircle, ShieldCheck, Lock } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  action: string;
  phase: string;
  docs: string[];
  howTo: string;
  tutorials: string[];
}

const steps: Step[] = [
  { id: 1, phase: "Fase 1: Obtención", title: "Recepción, Entrevista y Consignación", action: "Recibir el dispositivo y levantar actas preliminares.", docs: ["Acta de Entrevista", "Acta de Obtención por Consignación"], howTo: "Redactar en tercera persona, tiempo presente, de manera clara, secuencial y precisa. Firmadas por el consignatario y funcionario receptor.", tutorials: ["Realiza una entrevista estructurada a quien entrega el equipo.", "Levanta el Acta de Entrevista.", "Levanta el Acta de Obtención por Consignación."] },
  { id: 2, phase: "Fase 1: Obtención", title: "Fijación In Situ y Aislamiento", action: "Fijar fotográficamente el dispositivo y aislarlo de la red.", docs: ["Fijación fotográfica (Reseñada en Acta de Obtención)"], howTo: "Describir marca, modelo, IMEI, SIMCard, y estado de la pantalla.", tutorials: ["Fija fotográficamente la pantalla.", "Aísla el equipo (Modo Avión o Bolsa de Faraday).", "Documenta datos individualizantes del móvil."] },
  { id: 3, phase: "Fase 1: Obtención", title: "Adquisición Digital Forense", action: "Extracción física/lógica y sellado hash.", docs: ["Documentación para el Dictamen Pericial"], howTo: "Anotar versiones exactas del software y algoritmos Hash.", tutorials: ["Conecta el dispositivo asegurando inalterabilidad.", "Ejecuta Andriller para adquisición no destructiva.", "Calcula Hash SHA-256 de la imagen extraída."] },
  { id: 4, phase: "Fase 1: Obtención", title: "Cadena de Custodia y Rotulado", action: "Ingresar la evidencia al sistema de protección.", docs: ["Planilla PRCC", "Rótulo de Evidencia"], howTo: "PRCC: Tinta negra/azul, letra de molde, firma manuscrita e impresión dactilar.", tutorials: ["Abre la PRCC con los datos del móvil.", "Embala el dispositivo con precintos de seguridad.", "Fija el Rótulo con la información."] },
  { id: 5, phase: "Fase 2: Peritaje", title: "Recepción y Verificación", action: "Ingreso al laboratorio forense.", docs: ["PRCC (Transferencia: Recibe)", "Libro de Registro"], howTo: "Firma y pulgar derecho tras verificar precintos.", tutorials: ["Comprueba integridad del embalaje.", "Recalcula Hash y compara.", "El perito acepta formalmente el caso."] },
  { id: 6, phase: "Fase 2: Peritaje", title: "Procesamiento con ALEAPP", action: "Parsear logs y bases de datos SQLite.", docs: ["Logs y Tablas de salida de ALEAPP"], howTo: "Garantizar que el reporte liste nombres nativos, fechas, rutas y Hashes.", tutorials: ["Carga la imagen forense en ALEAPP.", "Procesa msgstore.db, audios y screenshots.", "Reconstruye el Timeline (ISO 27042)."] },
  { id: 7, phase: "Fase 2: Peritaje", title: "Obtención por Derivación", action: "Aislar chats, audios o archivos clave.", docs: ["Nueva PRCC", "Acta de Obtención por Derivación"], howTo: "NUEVA PRCC con número correlativo propio. Indicar ruta de aislamiento.", tutorials: ["Aísla transcripciones, imágenes y audios.", "Genera Acta de Obtención por Derivación.", "Abre Nueva PRCC describiendo archivos y hashes."] },
  { id: 8, phase: "Fase 3: Dictamen & Cierre", title: "Elaboración del Dictamen Pericial", action: "Estructuración y blindaje legal.", docs: ["Dictamen Pericial"], howTo: "Estructura: Motivo, Descripción, Exámenes, Resultados, Conclusiones. Firmado y sellado.", tutorials: ["Redacta resultados con tabla de datos.", "Fundamenta con Ley de Mensajes de Datos.", "Declara que la evidencia no fue alterada."] },
  { id: 9, phase: "Fase 3: Dictamen & Cierre", title: "Re-embalaje y Remisión", action: "Preparar dispositivo para salida.", docs: ["PRCC (Transferencia: Entrega)"], howTo: "Motivo: Traslado o Resguardo. Firma y huella.", tutorials: ["Coloca el dispositivo en embalaje original.", "Coloca nuevos precintos de seguridad.", "Remite a Resguardo Judicial."] },
  { id: 10, phase: "Fase 3: Dictamen & Cierre", title: "Cierre y Disposición Final", action: "Culminación del ciclo de custodia.", docs: ["Acta de Disposición Final", "PRCC (Observaciones)"], howTo: "Observaciones con forma de cierre. Detallar número de oficio.", tutorials: ["Recibe la orden judicial de cierre.", "Llena el Acta de Disposición Final.", "Cierra definitivamente la PRCC."] },
];

const phases = ["Fase 1: Obtención", "Fase 2: Peritaje", "Fase 3: Dictamen & Cierre"];
const phaseColors: Record<string, string> = {
  "Fase 1: Obtención": "#0078D4",
  "Fase 2: Peritaje": "#107C10",
  "Fase 3: Dictamen & Cierre": "#5C2D91",
};

export default function ForensicDashboard() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number>(1);

  const toggleStep = (id: number) => {
    setCompletedSteps(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const progress = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="flex gap-5 min-h-[600px]">
      {/* Sidebar Navigation */}
      <aside className="w-72 fluent-card p-4 shrink-0 self-start sticky top-0">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[13px] font-bold text-[#1A1A1A]">Progreso</h2>
            <span className="text-[12px] font-semibold text-[#0078D4]">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
            <div className="h-full bg-[#0078D4] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <nav className="space-y-4">
          {phases.map(phase => (
            <div key={phase}>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-1.5 px-2" style={{ color: phaseColors[phase] }}>
                {phase}
              </p>
              <div className="space-y-0.5">
                {steps.filter(s => s.phase === phase).map(step => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`flex items-center gap-2.5 w-full p-2 rounded-md text-[12px] font-medium transition-all text-left ${
                      activeStep === step.id
                        ? 'bg-[#DEECF9] text-[#0078D4]'
                        : 'text-[#616161] hover:bg-[#F5F5F5]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                      completedSteps.includes(step.id) ? 'bg-[#107C10] text-white' :
                      activeStep === step.id ? 'bg-[#0078D4] text-white' : 'bg-[#E0E0E0] text-[#616161]'
                    }`}>
                      {completedSteps.includes(step.id) ? <CheckCircle size={11} /> : step.id}
                    </div>
                    <span className="truncate">{step.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="fluent-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="fluent-badge bg-[#DEECF9] text-[#0078D4]">República Bolivariana de Venezuela</div>
          </div>
          <h1 className="text-[20px] font-bold text-[#1A1A1A] mb-1">Protocolo de Peritaje Forense Android</h1>
          <div className="flex gap-5 text-[12px] text-[#616161]">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#0078D4]" /> Cero Riesgo de Nulidad</span>
            <span className="flex items-center gap-1.5"><Lock size={14} className="text-[#616161]" /> MUCCEF 2017 · ISO 27037/27042</span>
          </div>
        </div>

        {/* Steps */}
        {steps.map(step => {
          const isActive = activeStep === step.id;
          const isCompleted = completedSteps.includes(step.id);
          const color = phaseColors[step.phase];

          return (
            <div
              key={step.id}
              className={`fluent-card p-5 cursor-pointer transition-all ${
                isActive ? 'ring-2 ring-[#0078D4]/30 border-[#0078D4]/40' : 'opacity-75 hover:opacity-100'
              }`}
              onClick={() => setActiveStep(step.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="fluent-badge" style={{ backgroundColor: `${color}15`, color }}>{step.phase}</span>
                  </div>
                  <h2 className="text-[15px] font-bold text-[#1A1A1A]">Paso {step.id}: {step.title}</h2>
                  <p className="text-[12px] text-[#0078D4] font-medium mt-0.5">{step.action}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleStep(step.id); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${
                    isCompleted
                      ? 'bg-[#107C10]/10 text-[#107C10] border border-[#107C10]/20'
                      : 'fluent-btn-secondary text-[11px] py-1.5 px-3'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                  {isCompleted ? 'COMPLETADO' : 'COMPLETAR'}
                </button>
              </div>

              {isActive && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fluent-in">
                  <div className="bg-[#FAFAFA] border border-[#E0E0E0] p-4 rounded-lg">
                    <h3 className="text-[10px] uppercase font-bold tracking-[0.1em] mb-2.5" style={{ color }}>Documentación Obligatoria</h3>
                    <ul className="space-y-1.5 text-[12px] text-[#1A1A1A]">
                      {step.docs.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
                          {doc}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-3 border-t border-[#E0E0E0] text-[11px] text-[#616161] italic">
                      <strong className="text-[#1A1A1A] not-italic">Instrucciones:</strong> {step.howTo}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-[10px] uppercase font-bold text-[#616161] tracking-[0.1em] mb-1">Pasos a seguir</h3>
                    {step.tutorials.map((tut, idx) => (
                      <div key={idx} className="flex gap-3 p-2.5 bg-[#FAFAFA] border border-[#E0E0E0] rounded-lg text-[12px] items-start">
                        <div className="w-5 h-5 shrink-0 rounded bg-[#E0E0E0] text-[#616161] flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </div>
                        <span className="text-[#1A1A1A]">{tut}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <footer className="text-center text-[10px] text-[#9E9E9E] uppercase tracking-[0.15em] py-6">
          SHA256 Forensic Laboratory · Protocolo MUCCEF 2017 · Ley sobre Mensajes de Datos y Firmas Electrónicas
        </footer>
      </div>
    </div>
  );
}
