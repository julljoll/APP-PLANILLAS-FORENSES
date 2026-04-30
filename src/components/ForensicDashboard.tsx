import { useState, memo, useEffect } from 'react';
import { 
  CheckCircle2, Circle, Smartphone, ClipboardCheck, Lock, ShieldCheck, 
  FileSearch, Network, FileOutput, Archive, CheckCircle
} from 'lucide-react';

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
  {
    id: 1,
    phase: "Fase 1: Obtención",
    title: "Recepción, Entrevista y Consignación",
    action: "Acción: Recibir el dispositivo y levantar actas preliminares.",
    docs: ["Acta de Entrevista", "Acta de Obtención por Consignación"],
    howTo: "Deben redactarse en tercera persona, tiempo presente, de manera clara, secuencial y precisa. Indicar circunstancias de modo, tiempo y lugar. Firmadas por el consignatario y funcionario receptor.",
    tutorials: [
      "Realiza una entrevista estructurada a quien entrega el equipo.",
      "Levanta el Acta de Entrevista para dejar constancia de cómo obtuvo los chats/audios.",
      "Levanta el Acta de Obtención por Consignación recibiendo formalmente la evidencia."
    ]
  },
  {
    id: 2,
    phase: "Fase 1: Obtención",
    title: "Fijación In Situ y Aislamiento",
    action: "Acción: Fijar fotográficamente el dispositivo en vivo y aislarlo de la red.",
    docs: ["Fijación fotográfica (Reseñada en Acta de Obtención)"],
    howTo: "En el Acta de Obtención se debe describir el dispositivo: marca, modelo, IMEI, SIMCard, y estado de la pantalla.",
    tutorials: [
      "Fija fotográficamente la pantalla mostrando la actividad sin intervenir en su funcionalidad.",
      "Aísla el equipo poniéndolo en Modo Avión o usando Bolsa de Faraday para evitar borrado remoto.",
      "Documenta los datos individualizantes del móvil."
    ]
  },
  {
    id: 3,
    phase: "Fase 1: Obtención",
    title: "Adquisición Digital Forense",
    action: "Acción: Extracción física/lógica y sellado hash.",
    docs: ["Documentación para el Dictamen Pericial"],
    howTo: "Anotar las versiones exactas del software (Andriller) y los algoritmos Hash utilizados.",
    tutorials: [
      "Conecta el dispositivo asegurando inalterabilidad (write-blockers).",
      "Ejecuta 'Andriller' para realizar una adquisición de solo lectura, no destructiva.",
      "Calcula inmediatamente el Hash (SHA-256 o MD5) de la imagen extraída para sellar la data."
    ]
  },
  {
    id: 4,
    phase: "Fase 1: Obtención",
    title: "Apertura de Cadena de Custodia, Embalaje y Rotulado",
    action: "Acción: Ingresar la evidencia matriz al sistema de protección.",
    docs: ["Planilla de Registro de Cadena de Custodia (PRCC)", "Rótulo de Evidencia"],
    howTo: "PRCC: Tinta negra/azul, letra de molde, firma manuscrita e impresión dactilar del pulgar derecho. RÓTULO: Tinta indeleble. Incluir Oficina, Expediente, PRCC, descripción y observaciones.",
    tutorials: [
      "Abre la PRCC y completa la Fase de Obtención con los datos del móvil.",
      "Embala el dispositivo usando bolsa antiestática o papel y coloca precintos de seguridad físicos.",
      "Fija el Rótulo con la información correspondiente."
    ]
  },
  {
    id: 5,
    phase: "Fase 2: Peritaje",
    title: "Recepción, Verificación y Designación",
    action: "Acción: Ingreso al laboratorio forense y asignación de perito.",
    docs: ["PRCC (Transferencia: Recibe)", "Libro de Registro Interno de Laboratorio"],
    howTo: "PRCC: Firma y pulgar derecho tras verificar precintos. LIBRO: Foliado, asentar fecha, hora y datos del perito que acepta el caso.",
    tutorials: [
      "Comprueba la integridad del embalaje y rótulos.",
      "Recalcula el Hash de la imagen y compáralo con el de extracción.",
      "El perito firma los controles internos aceptando formalmente el caso."
    ]
  },
  {
    id: 6,
    phase: "Fase 2: Peritaje",
    title: "Procesamiento Estructurado con ALEAPP",
    action: "Acción: Parsear logs y bases de datos SQLite.",
    docs: ["Logs y Tablas de salida de ALEAPP"],
    howTo: "Garantizar que el reporte liste nombres nativos, fechas, rutas y Hashes individuales.",
    tutorials: [
      "Carga la imagen forense en ALEAPP.",
      "Procesa msgstore.db (WhatsApp), audios (.opus) y screenshots.",
      "Reconstruye el Timeline (ISO 27042)."
    ]
  },
  {
    id: 7,
    phase: "Fase 2: Peritaje",
    title: "Obtención por Derivación (Nueva Evidencia)",
    action: "Acción: Aislar chats, audios o archivos clave detectados.",
    docs: ["NUEVA PRCC (Para data derivada)", "Acta de Obtención por Derivación"],
    howTo: "NUEVA PRCC: Propio número correlativo, tinta negra/azul, firma y huella. ACTA: Indicar ruta específica de aislamiento desde la evidencia principal.",
    tutorials: [
      "Aísla las transcripciones, imágenes y audios relevantes.",
      "Genera el Acta de Obtención por Derivación.",
      "Abre la Nueva PRCC describiendo archivos y sus hashes."
    ]
  },
  {
    id: 8,
    phase: "Fase 3: Dictamen & Cierre",
    title: "Elaboración del Dictamen Pericial",
    action: "Acción: Estructuración y blindaje legal de los resultados.",
    docs: ["Dictamen Pericial"],
    howTo: "Estructura: Motivo, Descripción, Exámenes, Resultados, Conclusiones y Consumo. Firmado y sellado.",
    tutorials: [
      "Redacta resultados con tabla de: Nombre, fechas, ruta, tamaño y Hash.",
      "Fundamenta con Ley de Mensajes de Datos (Art. 4 y 8).",
      "Declara que la evidencia original no fue consumida ni alterada."
    ]
  },
  {
    id: 9,
    phase: "Fase 3: Dictamen & Cierre",
    title: "Re-embalaje y Remisión",
    action: "Acción: Preparar el dispositivo y la data para su salida.",
    docs: ["PRCC (Transferencia: Entrega)"],
    howTo: "Renglón 'Entrega', Motivo: 'Traslado' o 'Resguardo'. Firma y huella del perito.",
    tutorials: [
      "Coloca el dispositivo en su embalaje original.",
      "Coloca nuevos precintos de seguridad del laboratorio.",
      "Remite a Resguardo Judicial o despacho fiscal."
    ]
  },
  {
    id: 10,
    phase: "Fase 3: Dictamen & Cierre",
    title: "Formalidades de Cierre y Disposición Final",
    action: "Acción: Culminación del ciclo de la cadena de custodia.",
    docs: ["Acta de Disposición Final de Evidencias", "PRCC (Observaciones)"],
    howTo: "PRCC: Observaciones con forma de cierre (Devolución/Destrucción). ACTA: Detallar número de oficio del tribunal.",
    tutorials: [
      "Recibe la orden judicial de cierre.",
      "Llena el Acta de Disposición Final.",
      "Cierra definitivamente la PRCC en Observaciones."
    ]
  }
];

export default function ForensicDashboard() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number>(1);

  const toggleStep = (id: number) => {
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-full bg-[#0d1117] text-[#c9d1d9] font-sans">
      {/* Sidebar de Navegación */}
      <aside className="w-80 bg-[#010409] border-r border-[#30363d] p-6 flex flex-col gap-6 overflow-y-auto shrink-0">
        <div className="mb-4">
          <h2 className="text-[#58a6ff] font-extrabold text-xl tracking-tight">SHA256.US</h2>
          <p className="text-[10px] uppercase tracking-widest text-[#8b949e]">Cero Riesgo de Nulidad</p>
        </div>

        <nav className="flex flex-col gap-4">
          {["Fase 1: Obtención", "Fase 2: Peritaje", "Fase 3: Dictamen & Cierre"].map(phase => (
            <div key={phase} className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-[#8b949e] border-b border-[#30363d] pb-1 mb-2">{phase}</span>
              {steps.filter(s => s.phase === phase).map(step => (
                <button 
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-3 p-2.5 rounded-lg text-xs font-medium transition-all text-left ${
                    activeStep === step.id 
                      ? 'bg-[#1f6feb]/10 text-[#58a6ff] border border-[#1f6feb]/30' 
                      : 'text-[#c9d1d9] hover:bg-[#161b22]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                    completedSteps.includes(step.id) ? 'bg-[#238636] text-white' : 
                    activeStep === step.id ? 'bg-[#1f6feb] text-white' : 'bg-[#30363d] text-[#8b949e]'
                  }`}>
                    {completedSteps.includes(step.id) ? <CheckCircle size={12} /> : step.id}
                  </div>
                  <span className="truncate">{step.title}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10 border-b border-[#30363d] pb-6">
          <div className="bg-[#1f6feb] text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-wider">
            República Bolivariana de Venezuela
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Protocolo de Peritaje Forense Android</h1>
          <div className="flex gap-6 text-sm text-[#8b949e]">
            <span className="flex items-center gap-2"><ShieldCheck size={16} /> <strong>Objetivo:</strong> Cero Riesgo de Nulidad</span>
            <span className="flex items-center gap-2"><Lock size={16} /> <strong>Normas:</strong> MUCCEF 2017, ISO 27037/27042</span>
          </div>
        </header>

        {steps.map(step => (
          <section 
            key={step.id}
            id={`step-${step.id}`}
            className={`mb-8 p-8 rounded-xl border transition-all ${
              activeStep === step.id 
                ? 'bg-[#161b22] border-[#1f6feb] shadow-[0_0_20px_rgba(31,111,235,0.1)] scale-[1.01]' 
                : 'bg-[#161b22]/50 border-[#30363d] opacity-80 hover:opacity-100'
            }`}
            onClick={() => setActiveStep(step.id)}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Paso {step.id}: {step.title}</h2>
                <span className="text-[#58a6ff] text-sm font-semibold">{step.action}</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); toggleStep(step.id); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  completedSteps.includes(step.id)
                    ? 'bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40'
                    : 'bg-[#30363d] text-[#c9d1d9] hover:bg-[#484f58]'
                }`}
              >
                {completedSteps.includes(step.id) ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                {completedSteps.includes(step.id) ? 'COMPLETADO' : 'MARCAR COMPLETADO'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-[#1f6feb]/5 border border-[#1f6feb]/20 p-5 rounded-lg">
                  <h3 className="text-[10px] uppercase font-bold text-[#58a6ff] tracking-widest mb-3">Documentación Obligatoria</h3>
                  <ul className="space-y-2 text-sm">
                    {step.docs.map((doc, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <ClipboardCheck size={16} className="text-[#58a6ff]" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-[#1f6feb]/10 text-sm italic text-[#8b949e]">
                    <strong className="text-[#c9d1d9] not-italic">Cómo llenarlas:</strong> {step.howTo}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] uppercase font-bold text-[#8b949e] tracking-widest mb-2">Pasos a seguir</h3>
                {step.tutorials.map((tut, idx) => (
                  <div key={idx} className="flex gap-4 p-3 bg-white/5 rounded-lg text-sm items-start">
                    <div className="w-6 h-6 shrink-0 rounded bg-[#30363d] text-[#8b949e] flex items-center justify-center font-bold text-xs mt-0.5">
                      {idx + 1}
                    </div>
                    <span>{tut}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <footer className="mt-20 pt-10 border-t border-[#30363d] text-center text-[10px] text-[#8b949e] uppercase tracking-widest">
          SHA256 Forensic Laboratory | Protocolo MUCCEF 2017 | Ley sobre Mensajes de Datos y Firmas Electrónicas
        </footer>
      </main>
    </div>
  );
}
