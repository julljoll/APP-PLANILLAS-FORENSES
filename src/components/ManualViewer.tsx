/**
 * Componente para visualizar el Manual de Procedimiento
 * Muestra información estructurada del manual de cadena de custodia
 */

import { useState } from 'react';
import { Book, FileText, Shield, Scale, Wrench, Award, Info } from 'lucide-react';
import { SidebarButton } from './ui';
import { 
  manualProcedimiento, 
  getFases, 
  getFormasObtencion, 
  getHerramientasForenses,
  getEstandaresInternacionales,
  getMarcoLegalCompleto,
  getGlosario
} from '../data/manual-procedimiento';

interface ManualViewerProps {
  onClose?: () => void;
}

export default function ManualViewer({ onClose }: ManualViewerProps) {
  const [activeSection, setActiveSection] = useState<'fases' | 'glosario' | 'herramientas' | 'legal' | 'estandares'>('fases');

  const fases = getFases();
  const formasObtencion = getFormasObtencion();
  const herramientas = getHerramientasForenses();
  const estandares = getEstandaresInternacionales();
  const marcoLegal = getMarcoLegalCompleto();
  const glosario = getGlosario();

  return (
    <div className="flex h-screen w-full bg-[#F5F5F5] font-sans text-[#1A1A1A] overflow-hidden">
      {/* Sidebar — Fluent Dark */}
      <aside className="hidden md:flex w-64 fluent-sidebar flex-col shrink-0">
        <div className="px-5 pt-6 pb-2">
          <div className="flex items-center gap-2.5 mb-1">
            <img src="./favicon.svg" alt="SHA256.US" className="w-8 h-8" />
            <h1 className="font-bold text-[16px] tracking-wider text-white">Manual v{manualProcedimiento.metadata.version}</h1>
          </div>
          <p className="text-[9px] uppercase font-medium tracking-[0.15em] text-[#9E9E9E] leading-relaxed pl-[42px]">
            Cadena de Custodia
          </p>
        </div>

        <nav className="flex-1 px-3 pt-6 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#616161] mb-2 px-3">Secciones</p>
          <SidebarButton active={activeSection === 'fases'} onClick={() => setActiveSection('fases')} icon={<Book size={16} />} label="Fases del Proceso" />
          <SidebarButton active={activeSection === 'glosario'} onClick={() => setActiveSection('glosario')} icon={<Info size={16} />} label="Glosario" />
          <SidebarButton active={activeSection === 'herramientas'} onClick={() => setActiveSection('herramientas')} icon={<Wrench size={16} />} label="Herramientas" />
          <SidebarButton active={activeSection === 'legal'} onClick={() => setActiveSection('legal')} icon={<Scale size={16} />} label="Marco Legal" />
          <SidebarButton active={activeSection === 'estandares'} onClick={() => setActiveSection('estandares')} icon={<Award size={16} />} label="Estándares" />
        </nav>

        <div className="px-3 pb-4">
          <button onClick={onClose} className="w-full flex items-center justify-center gap-2 bg-[#0078D4] hover:bg-[#106EBE] text-white px-4 py-2.5 rounded-md text-[13px] font-semibold transition-all">
            <FileText size={15} /> Volver a la Aplicación
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto px-6 py-8 md:px-10 md:py-10">
          
          <header className="mb-8 block md:hidden">
            <div className="flex items-center gap-2.5">
              <img src="./favicon.svg" alt="SHA256.US" className="w-7 h-7" />
              <h1 className="font-bold text-[16px] tracking-wider text-[#1A1A1A]">Manual v{manualProcedimiento.metadata.version}</h1>
            </div>
          </header>

          <div className="mb-8">
            <h2 className="text-[22px] md:text-[26px] font-bold text-[#1A1A1A] tracking-tight leading-tight mb-1">
              {manualProcedimiento.titulo}
            </h2>
            <div className="flex items-center gap-3 mt-2 mb-3">
              <div className="w-8 h-[3px] bg-[#0078D4] rounded-full" />
              <p className="text-[13px] text-[#616161] leading-relaxed">
                {manualProcedimiento.descripcion}
              </p>
            </div>
            <div className="flex gap-4 text-[11px] text-[#9E9E9E]">
              <span>Actualización: {manualProcedimiento.metadata.ultimo_actualizado}</span>
              <span>·</span>
              <span>Autor: {manualProcedimiento.metadata.autor}</span>
              <span>·</span>
              <span>Estado: {manualProcedimiento.metadata.estado}</span>
            </div>
          </div>

          {/* Fases Section */}
          {activeSection === 'fases' && (
            <div className="space-y-8">
              {fases.map((fase, idx) => (
                <section key={fase.id} className="fluent-card overflow-hidden">
                  <div className="bg-[#1B1B1F] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0078D4] text-white font-bold text-[12px]">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-white">{fase.nombre}</h3>
                        <p className="text-[11px] text-[#9E9E9E]">{fase.definicion}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="mb-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r">
                      <p className="text-sm font-semibold text-amber-900">Objetivo:</p>
                      <p className="text-sm text-amber-800 mt-1">{fase.objetivo}</p>
                    </div>

                    {'formas_obtencion' in fase && fase.formas_obtencion && (
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-600 mb-4">Formas de Obtención</h4>
                        <div className="space-y-4">
                          {fase.formas_obtencion.map((forma) => (
                            <div key={forma.id} className="border border-slate-200 rounded-lg p-4 hover:border-amber-300 transition-colors">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h5 className="font-bold text-[#0a1122]">{forma.tipo}</h5>
                                  <p className="text-xs text-slate-500 mt-1">{forma.definicion}</p>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                  {forma.id}
                                </span>
                              </div>
                              
                              {forma.escenarios && (
                                <div className="mt-3">
                                  <p className="text-xs font-semibold text-slate-600 mb-1">Escenarios:</p>
                                  <ul className="text-xs text-slate-500 list-disc list-inside space-y-0.5">
                                    {forma.escenarios.map((escenario, i) => (
                                      <li key={i}>{escenario}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {forma.procedimiento?.pasos && (
                                <div className="mt-3">
                                  <p className="text-xs font-semibold text-slate-600 mb-2">Procedimiento:</p>
                                  <ol className="text-xs text-slate-500 space-y-1">
                                    {forma.procedimiento.pasos.map((paso) => (
                                      <li key={paso.orden} className="flex gap-2">
                                        <span className="font-bold text-amber-600 min-w-[20px]">{paso.orden}.</span>
                                        <span>{paso.accion}</span>
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                              )}
                              
                              {forma.documentos_asociados && (
                                <div className="mt-3 pt-3 border-t border-slate-100">
                                  <p className="text-xs font-semibold text-slate-600 mb-1">Documentos Asociados:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {forma.documentos_asociados.map((doc, i) => (
                                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                                        {doc}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {'proceso_peritacion' in fase && fase.proceso_peritacion && (
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-600 mb-4">Proceso de Peritación</h4>
                        <div className="space-y-4">
                          {fase.proceso_peritacion.map((proceso) => (
                            <div key={proceso.paso_id} className="border border-slate-200 rounded-lg p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-bold text-[#0a1122]">{proceso.paso}</h5>
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                  {proceso.paso_id}
                                </span>
                              </div>
                              
                              {proceso.acciones && (
                                <ol className="text-xs text-slate-500 space-y-1 mb-3">
                                  {proceso.acciones.map((accion) => (
                                    <li key={accion.orden} className="flex gap-2">
                                      <span className="font-bold text-amber-600 min-w-[20px]">{accion.orden}.</span>
                                      <span>{accion.accion}</span>
                                    </li>
                                  ))}
                                </ol>
                              )}
                              
                              {proceso.etapas && (
                                <div className="mt-3">
                                  <p className="text-xs font-semibold text-slate-600 mb-2">Etapas:</p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {proceso.etapas.map((etapa, i) => (
                                      <div key={i} className="text-xs bg-slate-50 p-2 rounded">
                                        <span className="font-bold text-amber-700">{etapa.nombre}:</span> {etapa.descripcion}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {proceso.normativa && (
                                <div className="mt-3 pt-3 border-t border-slate-100">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Normativa: </span>
                                  <span className="text-xs text-slate-600">{proceso.normativa}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {'procesos' in fase && fase.procesos && (
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-600 mb-4">Procesos</h4>
                        <div className="space-y-3">
                          {fase.procesos.map((proceso) => (
                            <div key={proceso.proceso_id} className="bg-slate-50 p-4 rounded-lg">
                              <h5 className="font-bold text-[#0a1122] text-sm mb-1">{proceso.nombre}</h5>
                              <p className="text-xs text-slate-500">{proceso.descripcion}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {'formas_cierre' in fase && fase.formas_cierre && (
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-600 mb-4">Formas de Cierre</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {fase.formas_cierre.map((forma, i) => (
                            <div key={i} className="border border-slate-200 rounded-lg p-3">
                              <h5 className="font-bold text-[#0a1122] text-sm mb-1">{forma.tipo}</h5>
                              <p className="text-xs text-slate-500 mb-2">{forma.descripcion}</p>
                              <p className="text-[10px] text-amber-700 font-semibold">Requisito: {forma.requisito}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* Glosario Section */}
          {activeSection === 'glosario' && (
            <div className="fluent-card overflow-hidden">
              <div className="bg-[#1B1B1F] px-5 py-4">
                <h3 className="text-lg font-bold text-white">Glosario de Términos</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {glosario.map((item, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-amber-300 transition-colors">
                      <h4 className="font-bold text-[#0a1122] mb-2">{item.termino}</h4>
                      <p className="text-sm text-slate-600">{item.definicion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Herramientas Section */}
          {activeSection === 'herramientas' && (
            <div className="space-y-6">
              {herramientas.map((herramienta) => (
                <div key={herramienta.id} className="fluent-card overflow-hidden">
                  <div className="bg-[#1B1B1F] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Wrench className="text-[#0078D4]" size={24} />
                      <div>
                        <h3 className="text-lg font-bold text-white">{herramienta.uso.split(' ')[0]}</h3>
                        <p className="text-xs text-slate-300">{herramienta.id}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-slate-600 mb-4">{herramienta.uso}</p>
                    
                    {herramienta.funcion && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-slate-600 mb-1">Función:</p>
                        <p className="text-sm text-slate-500">{herramienta.funcion}</p>
                      </div>
                    )}
                    
                    {herramienta.caracteristicas && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-slate-600 mb-2">Características:</p>
                        <ul className="text-sm text-slate-500 list-disc list-inside space-y-1">
                          {herramienta.caracteristicas.map((caract, i) => (
                            <li key={i}>{caract}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {herramienta.artefactos_soportados && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-slate-600 mb-2">Artefactos Soportados:</p>
                        <div className="flex flex-wrap gap-1">
                          {herramienta.artefactos_soportados.map((artefacto, i) => (
                            <span key={i} className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
                              {artefacto}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-500">
                        <span className="font-semibold">Compatibilidad:</span> {herramienta.compatibilidad || 'N/A'}
                      </p>
                      <p className="text-xs text-amber-700 mt-1 font-semibold">
                        ⚠ {herramienta.version_requerida}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Marco Legal Section */}
          {activeSection === 'legal' && (
            <div className="space-y-8">
              <div className="fluent-card overflow-hidden">
                <div className="bg-[#1B1B1F] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Shield className="text-[#0078D4]" size={24} />
                    <h3 className="text-lg font-bold text-white">Constitución de la República</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {marcoLegal.constitucion.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded">
                        <span className="text-xs font-bold text-amber-600 min-w-[80px]">{item.articulo}</span>
                        <span className="text-sm text-slate-600">{item.principio}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="fluent-card overflow-hidden">
                <div className="bg-[#1B1B1F] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Scale className="text-[#0078D4]" size={24} />
                    <h3 className="text-lg font-bold text-white">Leyes Orgánicas y Especiales</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {marcoLegal.leyes.map((ley, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-lg p-4">
                        <h4 className="font-bold text-[#0a1122] mb-2">{ley.nombre}</h4>
                        <p className="text-sm text-slate-600 mb-3">{ley.descripcion}</p>
                        
                        {ley.ambito && (
                          <p className="text-xs text-slate-500 mb-3">
                            <span className="font-semibold">Ámbito:</span> {ley.ambito}
                          </p>
                        )}
                        
                        {ley.articulos && (
                          <div>
                            <p className="text-xs font-semibold text-slate-600 mb-2">Artículos Relevantes:</p>
                            <div className="space-y-2">
                              {ley.articulos.map((art, i) => (
                                <div key={i} className="text-xs bg-slate-50 p-2 rounded flex gap-2">
                                  <span className="font-bold text-amber-600 min-w-[60px]">{art.numero}</span>
                                  <span className="text-slate-600">{art.descripcion}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Estándares Section */}
          {activeSection === 'estandares' && (
            <div className="fluent-card overflow-hidden">
              <div className="bg-[#1B1B1F] px-5 py-4">
                <div className="flex items-center gap-3">
                  <Award className="text-[#0078D4]" size={24} />
                  <h3 className="text-lg font-bold text-white">Estándares Internacionales</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {estandares.map((estandar) => (
                    <div key={estandar.id} className="border border-slate-200 rounded-lg p-4 hover:border-amber-300 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-[#0a1122]">{estandar.norma}</h4>
                          <p className="text-sm text-slate-600 mt-1">{estandar.titulo}</p>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          {estandar.id}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Aplicación: </span>
                        <span className="text-xs text-slate-600">{estandar.aplicacion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



