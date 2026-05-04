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
    <div className="flex h-screen w-full bg-[#fcfcfd] font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex w-72 bg-[#0a1122] flex-col shrink-0 shadow-2xl">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <img src="./favicon.svg" alt="SHA256.US Logo" className="w-9 h-9" />
            <div>
              <h1 className="font-serif font-bold text-2xl tracking-widest text-white">MANUAL v{manualProcedimiento.metadata.version}</h1>
            </div>
          </div>
          <p className="text-[10px] uppercase font-semibold tracking-widest text-amber-500/80 mb-10 leading-relaxed max-w-[200px]">
            Cadena de Custodia Forense
          </p>

          <nav className="flex flex-col gap-1.5">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 pl-3">Secciones</h3>
            <SidebarButton 
              active={activeSection === 'fases'} 
              onClick={() => setActiveSection('fases')} 
              icon={<Book size={18} />} 
              label="Fases del Proceso" 
            />
            <SidebarButton 
              active={activeSection === 'glosario'} 
              onClick={() => setActiveSection('glosario')} 
              icon={<Info size={18} />} 
              label="Glosario" 
            />
            <SidebarButton 
              active={activeSection === 'herramientas'} 
              onClick={() => setActiveSection('herramientas')} 
              icon={<Wrench size={18} />} 
              label="Herramientas" 
            />
            <SidebarButton 
              active={activeSection === 'legal'} 
              onClick={() => setActiveSection('legal')} 
              icon={<Scale size={18} />} 
              label="Marco Legal" 
            />
            <SidebarButton 
              active={activeSection === 'estandares'} 
              onClick={() => setActiveSection('estandares')} 
              icon={<Award size={18} />} 
              label="Estándares" 
            />
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-slate-800/50">
          <button 
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-3 rounded-md text-sm font-semibold transition-all shadow-[0_4px_14px_0_rgba(217,119,6,0.39)]"
          >
            <FileText size={18} /> <span>Volver a la Aplicación</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto p-6 md:p-12 lg:p-16">
          
          <header className="mb-10 block md:hidden">
            <div className="flex items-center gap-3">
              <img src="./favicon.svg" alt="SHA256.US Logo" className="w-7 h-7" />
              <h1 className="font-serif font-bold text-xl tracking-widest text-[#0a1122]">MANUAL v{manualProcedimiento.metadata.version}</h1>
            </div>
          </header>

          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#0a1122] tracking-tight mb-2">
              {manualProcedimiento.titulo}
            </h2>
            <div className="h-1 w-20 bg-amber-500 mb-4 rounded-full" />
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed mb-2">
              {manualProcedimiento.descripcion}
            </p>
            <div className="flex gap-4 text-xs text-slate-400">
              <span>Última actualización: {manualProcedimiento.metadata.ultimo_actualizado}</span>
              <span>•</span>
              <span>Autor: {manualProcedimiento.metadata.autor}</span>
              <span>•</span>
              <span>Estado: {manualProcedimiento.metadata.estado}</span>
            </div>
          </div>

          {/* Fases Section */}
          {activeSection === 'fases' && (
            <div className="space-y-12">
              {fases.map((fase, idx) => (
                <section key={fase.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0a1122] to-slate-800 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{fase.nombre}</h3>
                        <p className="text-xs text-slate-300">{fase.definicion}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
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
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#0a1122] to-slate-800 px-6 py-4">
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
                <div key={herramienta.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0a1122] to-slate-800 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Wrench className="text-amber-500" size={24} />
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
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-[#0a1122] to-slate-800 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Shield className="text-amber-500" size={24} />
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

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-[#0a1122] to-slate-800 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Scale className="text-amber-500" size={24} />
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
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#0a1122] to-slate-800 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Award className="text-amber-500" size={24} />
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



