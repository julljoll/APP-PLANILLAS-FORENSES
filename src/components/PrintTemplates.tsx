import { memo } from 'react';
import { Printer, FileText } from 'lucide-react';

// --- SHARED COMPONENTS ---

export const PrintHeader = memo(({ onClose, title }: any) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-slate-800 flex items-center px-6 gap-4 z-50 text-white border-b border-black/20 shadow-lg print:hidden">
      <div className="flex items-center gap-2 mr-auto">
        <FileText size={18} className="text-teal-400" />
        <span className="text-sm font-sans font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-4">
          <span className="text-xs opacity-70 font-sans">8.5" x 11.0" (Carta)</span>
          <div className="w-[1px] h-4 bg-white/20" />
          <button type="button" onClick={() => window.print()} className="hover:bg-white/10 p-1.5 rounded-sm transition-colors" title="Imprimir"><Printer size={18} /></button>
        <button type="button" onClick={onClose} className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1 font-sans rounded transition-colors">Cerrar Visualizador</button>
      </div>
    </div>
  )
});

export const PdfLogo = () => (
  <div className="flex flex-col mb-4 pb-2 border-b-2 border-[#0078D4]">
    <div className="flex items-center gap-2 mb-1">
      <img src="./favicon.svg" alt="Logo" className="w-9 h-9" />
      <div className="leading-tight text-black flex flex-col justify-center font-sans">
        <div className="font-black text-2xl tracking-widest uppercase text-[#0078D4]">SHA256.US</div>
        <div className="text-[10px] font-bold tracking-widest uppercase mt-0.5 text-[#444]">Laboratorio de Informática Forense y Ciberseguridad</div>
      </div>
    </div>
    <div className="text-[8px] text-slate-500 uppercase tracking-widest pl-11 font-sans leading-tight">
      Avenida 6, con calle 7, Edificio Mercantil La Ceiba, primer piso, oficina Nº 8, Quibor, Municipio Jiménez del Estado Lara.
    </div>
  </div>
);

// --- PRINT PRCC (Based on professional template) ---

export const PrintPRCC = memo(({ prcc, onClose }: any) => {
  const isDerivada = prcc.tipo === 'derivada';
  
  return (
    <div className="pdf-viewer-bg" id="print-view">
      <PrintHeader onClose={onClose} title={`PRCC_${prcc.hash?.substring(0,8) || 'TEMPLATE'}.pdf`} />
      <div className="pt-12 pb-12 w-full flex justify-center">
        <div className="document-page font-sans text-[#1a1a1a] relative">
          {isDerivada && (
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-[80px] font-black text-[#0078D4]/[0.03] pointer-events-none select-none z-0">
              DERIVACIÓN
            </div>
          )}
          
          <PdfLogo />
          
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1" />
            <div className="text-right">
              <h1 className="text-sm font-bold uppercase text-[#0078D4]">Planilla de Cadena de Custodia</h1>
              <div className="font-mono text-sm mt-1 flex items-center justify-end">
                N° PRCC: <span className="ml-2 border-b border-black min-w-[120px] inline-block text-center">{prcc.prcc || prcc.hash?.substring(0, 12)}</span>
              </div>
            </div>
          </div>

          <section className="mb-4">
            <div className="bg-[#f8f9fa] border-l-4 border-[#0078D4] px-3 py-1.5 text-[10px] font-bold uppercase mb-3">
              I. Datos Generales {isDerivada ? '(Obtención por Derivación)' : '(Obtención Inicial)'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-slate-200 p-2 rounded">
                <div className="text-[7px] font-bold text-slate-500 uppercase mb-1">N° de Expediente / Causa</div>
                <div className="text-xs min-h-[16px]">{prcc.expediente}</div>
              </div>
              <div className="border border-slate-200 p-2 rounded bg-amber-50/30">
                <div className="text-[7px] font-bold text-slate-500 uppercase mb-1">Nueva PRCC (Correlativo)</div>
                <div className="text-xs min-h-[16px] font-mono">{prcc.hash}</div>
              </div>
              <div className="border border-slate-200 p-2 rounded col-span-2">
                <div className="text-[7px] font-bold text-slate-500 uppercase mb-1">Organismo / Despacho que Instruye</div>
                <div className="text-xs min-h-[16px]">{prcc.organismoInstruye || prcc.despachoInstruye}</div>
              </div>
              <div className="border border-slate-200 p-2 rounded">
                <div className="text-[7px] font-bold text-slate-500 uppercase mb-1">Despacho que inicia custodia</div>
                <div className="text-xs min-h-[16px]">LAB. FORENSE SHA256.US</div>
              </div>
              <div className="border border-slate-200 p-2 rounded">
                <div className="text-[7px] font-bold text-slate-500 uppercase mb-1">Fecha / Hora de Obtención</div>
                <div className="text-xs min-h-[16px]">{prcc.fecha_generacion || prcc.fechaHora}</div>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <div className="bg-[#f8f9fa] border-l-4 border-[#0078D4] px-3 py-1.5 text-[10px] font-bold uppercase mb-3">II. Forma de Obtención</div>
            <div className="border border-slate-200 p-3 rounded">
               <div className="flex gap-6">
                  {['TÉCNICA', 'ASEGURAMIENTO', 'CONSIGNACIÓN', 'DERIVACIÓN'].map(forma => (
                    <div key={forma} className="flex items-center gap-2 text-[9px] font-bold">
                      <div className={`w-3.5 h-3.5 border-1.5 border-black flex items-center justify-center ${
                        (prcc.formaObtencion?.toUpperCase() === forma || (isDerivada && forma === 'DERIVACIÓN')) ? 'bg-blue-50 text-[#0078D4]' : ''
                      }`}>
                        {(prcc.formaObtencion?.toUpperCase() === forma || (isDerivada && forma === 'DERIVACIÓN')) ? 'X' : ''}
                      </div>
                      <span className={(prcc.formaObtencion?.toUpperCase() === forma || (isDerivada && forma === 'DERIVACIÓN')) ? 'underline decoration-[#0078D4] underline-offset-2' : ''}>
                        {forma}
                      </span>
                    </div>
                  ))}
               </div>
            </div>
          </section>

          <section className="mb-4">
            <div className="bg-[#f8f9fa] border-l-4 border-[#0078D4] px-3 py-1.5 text-[10px] font-bold uppercase mb-3">III. Operarios (Perito Informático)</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-slate-200 p-3 rounded">
                <div className="text-[7px] font-bold text-slate-500 uppercase mb-2">A. Fijación (Nombre y Credencial)</div>
                <div className="text-[10px] mb-3 font-medium">{prcc.fijacion?.nombre} {prcc.fijacion?.ci ? `- ${prcc.fijacion.ci}` : ''}</div>
                <div className="flex gap-2">
                  <div className="flex-1 h-12 border border-dashed border-slate-300 relative flex items-center justify-center">
                    <span className="absolute bottom-1 text-[6px] text-slate-300 uppercase">Firma</span>
                  </div>
                  <div className="w-10 h-14 border border-dashed border-slate-300 flex items-center justify-center text-center text-[6px] text-slate-300 leading-tight">
                    PULGAR<br/>DER.
                  </div>
                </div>
              </div>
              <div className="border border-slate-200 p-3 rounded">
                <div className="text-[7px] font-bold text-slate-500 uppercase mb-2">B. Colección (Nombre y Credencial)</div>
                <div className="text-[10px] mb-3 font-medium">{prcc.coleccion?.nombre} {prcc.coleccion?.ci ? `- ${prcc.coleccion.ci}` : ''}</div>
                <div className="flex gap-2">
                  <div className="flex-1 h-12 border border-dashed border-slate-300 relative flex items-center justify-center">
                    <span className="absolute bottom-1 text-[6px] text-slate-300 uppercase">Firma</span>
                  </div>
                  <div className="w-10 h-14 border border-dashed border-slate-300 flex items-center justify-center text-center text-[6px] text-slate-300 leading-tight">
                    PULGAR<br/>DER.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <div className="bg-[#f8f9fa] border-l-4 border-[#0078D4] px-3 py-1.5 text-[10px] font-bold uppercase mb-3">IV. Descripción de la Evidencia Digital {isDerivada ? 'Derivada' : ''}</div>
            <div className="border border-slate-200 p-3 rounded min-h-[100px] text-[11px] leading-relaxed font-serif">
              {prcc.evidencia_descripcion || prcc.descripcion}
              {isDerivada && !prcc.evidencia_descripcion && (
                <div className="text-slate-400 italic text-[10px] mt-2">
                  Indicar: Nombre nativo, Ruta lógica (ALEAPP/Andriller), Tamaño y Hash SHA-256...
                </div>
              )}
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-[#f8f9fa] border-l-4 border-[#0078D4] px-3 py-1.5 text-[10px] font-bold uppercase mb-3">V. Transferencia de la Evidencia</div>
            <table className="w-full border-collapse border border-slate-200 text-[10px]">
              <tbody>
                <tr>
                  <td className="border border-slate-200 p-3 w-[30%]">
                    <div className="text-[7px] font-bold text-slate-500 uppercase mb-2">Motivo</div>
                    <div className="flex flex-col gap-1.5">
                      {['TRASLADO', 'PERITAJE', 'RESGUARDO'].map(motivo => (
                        <div key={motivo} className="flex items-center gap-2">
                          <div className={`w-3 h-3 border border-black flex items-center justify-center text-[8px] ${prcc.motivoTransferencia?.toUpperCase() === motivo ? 'bg-slate-100' : ''}`}>
                            {prcc.motivoTransferencia?.toUpperCase() === motivo ? 'X' : ''}
                          </div>
                          <span className="text-[8px] font-bold">{motivo}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="border border-slate-200 p-3 w-[35%]">
                    <div className="text-[7px] font-bold text-slate-500 uppercase mb-2">Entrega</div>
                    <div className="text-[9px] mb-2">Nombre/C.I.: <span className="font-bold">{prcc.entrega?.nombre} {prcc.entrega?.ci}</span></div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 border border-dashed border-slate-300 relative flex items-center justify-center">
                        <span className="absolute bottom-1 text-[6px] text-slate-300 uppercase">Firma</span>
                      </div>
                      <div className="w-9 h-12 border border-dashed border-slate-300 flex items-center justify-center text-center text-[5px] text-slate-300 leading-tight">
                        HUELLA
                      </div>
                    </div>
                  </td>
                  <td className="border border-slate-200 p-3 w-[35%]">
                    <div className="text-[7px] font-bold text-slate-500 uppercase mb-2">Recibe</div>
                    <div className="text-[9px] mb-2">Nombre/C.I.: <span className="font-bold">{prcc.recibe?.nombre} {prcc.recibe?.ci}</span></div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 border border-dashed border-slate-300 relative flex items-center justify-center">
                        <span className="absolute bottom-1 text-[6px] text-slate-300 uppercase">Firma</span>
                      </div>
                      <div className="w-9 h-12 border border-dashed border-slate-300 flex items-center justify-center text-center text-[5px] text-slate-300 leading-tight">
                        HUELLA
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <footer className="text-center text-[8px] text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-100 absolute bottom-0 left-12 right-12">
            Documento generado bajo los estándares del Manual Único de Cadena de Custodia de Evidencias (V. 2017) | SHA256 Forensic Lab
          </footer>
        </div>
      </div>
    </div>
  )
});

// --- PRINT ACTA (Based on professional template) ---

export const PrintActa = memo(({ acta, onClose }: any) => {
  return (
    <div className="pdf-viewer-bg" id="print-view">
       <PrintHeader onClose={onClose} title="ACTA_CONSIGNACION.pdf" />
       <div className="pt-12 pb-12 w-full flex justify-center">
         <div className="document-page font-sans text-[#1a1a1a]">
            <PdfLogo />
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1" />
              <div className="text-right">
                <h1 className="text-sm font-bold uppercase text-[#0078D4]">Acta de Obtención por Consignación</h1>
                <div className="font-mono text-sm mt-1 flex items-center justify-end">
                  N° EXPEDIENTE: <span className="ml-2 border-b border-black min-w-[120px] inline-block text-center">{acta.expediente}</span>
                </div>
              </div>
            </div>

            <section className="mb-4">
              <div className="bg-[#f8f9fa] border-l-4 border-[#0078D4] px-3 py-1.5 text-[10px] font-bold uppercase mb-3">I. Datos del Consignante (Propietario/Poseedor)</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-slate-200 p-2 rounded">
                  <div className="text-[7px] font-bold text-slate-500 uppercase mb-1">Apellidos y Nombres</div>
                  <div className="text-xs min-h-[16px]">{acta.consignante?.nombre}</div>
                </div>
                <div className="border border-slate-200 p-2 rounded">
                  <div className="text-[7px] font-bold text-slate-500 uppercase mb-1">Cédula de Identidad</div>
                  <div className="text-xs min-h-[16px]">{acta.consignante?.ci}</div>
                </div>
                <div className="border border-slate-200 p-2 rounded">
                  <div className="text-[7px] font-bold text-slate-500 uppercase mb-1">Teléfono</div>
                  <div className="text-xs min-h-[16px]">{acta.consignante?.telefono || ''}</div>
                </div>
                <div className="border border-slate-200 p-2 rounded">
                  <div className="text-[7px] font-bold text-slate-500 uppercase mb-1">Dirección</div>
                  <div className="text-xs min-h-[16px]">{acta.direccion}</div>
                </div>
              </div>
            </section>

            <section className="mb-4">
              <div className="bg-[#f8f9fa] border-l-4 border-[#0078D4] px-3 py-1.5 text-[10px] font-bold uppercase mb-3">II. Descripción Técnica del Dispositivo (Android)</div>
              <table className="w-full border-collapse border border-slate-200 text-[10px]">
                <tbody>
                  <tr><td className="border border-slate-200 p-2 w-[30%] font-bold uppercase bg-slate-50/50">Marca / Modelo</td><td className="border border-slate-200 p-2">{acta.dispositivo?.marcaModelo}</td></tr>
                  <tr><td className="border border-slate-200 p-2 font-bold uppercase bg-slate-50/50">IMEI 1 / Serial</td><td className="border border-slate-200 p-2 font-mono">{acta.dispositivo?.imei}</td></tr>
                  <tr><td className="border border-slate-200 p-2 font-bold uppercase bg-slate-50/50">Nro. de Línea / Operadora</td><td className="border border-slate-200 p-2">{acta.dispositivo?.numero}</td></tr>
                  <tr>
                    <td className="border border-slate-200 p-2 font-bold uppercase bg-slate-50/50">Estado Físico</td>
                    <td className="border border-slate-200 p-2">
                       <div className="flex gap-4">
                          {['Operativo', 'Daños Pantalla', 'Sin Batería'].map(estado => (
                            <div key={estado} className="flex items-center gap-1.5">
                              <div className={`w-3 h-3 border border-black flex items-center justify-center text-[8px] ${acta.dispositivo?.estadoFisico?.includes(estado) ? 'bg-slate-100' : ''}`}>
                                {acta.dispositivo?.estadoFisico?.includes(estado) ? 'X' : ''}
                              </div>
                              <span>{estado}</span>
                            </div>
                          ))}
                       </div>
                       <div className="mt-1">{acta.dispositivo?.estadoFisico}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="mb-4">
              <div className="bg-[#f8f9fa] border-l-4 border-[#0078D4] px-3 py-1.5 text-[10px] font-bold uppercase mb-3">III. Autorización y Alcance de la Consignación</div>
              <div className="text-[9px] text-justify bg-slate-50/50 p-3 border border-slate-200 rounded leading-relaxed">
                Yo, el arriba identificado, en pleno uso de mis facultades, hago entrega material voluntaria del dispositivo descrito (Obtención por Consignación) según el <strong>Manual Único de Cadena de Custodia (2017)</strong>. 
                <strong>AUTORIZO EXPRESA Y VOLUNTARIAMENTE</strong> al experto informático de SHA256 para que aplique herramientas forenses (Andriller, ALEAPP o similares) con el fin de realizar la extracción lógica/física de "Mensajes de Datos" (Art. 4, Ley sobre Mensajes de Datos y Firmas Electrónicas), renunciando temporalmente a la privacidad de las comunicaciones (Art. 48 CRBV) bajo los límites de esta autorización.
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-[#f8f9fa] border-l-4 border-[#0078D4] px-3 py-1.5 text-[10px] font-bold uppercase mb-3">IV. Firmas</div>
              <div className="grid grid-cols-2 gap-20 pt-10">
                <div className="text-center border-t border-black pt-2">
                  <div className="text-[10px] font-bold">EL CONSIGNANTE</div>
                  <div className="text-[9px] mt-1">Nombre: {acta.consignante?.nombre}</div>
                  <div className="text-[9px]">C.I.: {acta.consignante?.ci}</div>
                </div>
                <div className="text-center border-t border-black pt-2">
                  <div className="text-[10px] font-bold">PERITO RECEPTOR</div>
                  <div className="text-[9px] mt-1">SHA256 Forensic Lab</div>
                  <div className="text-[9px]">Credencial: {acta.coleccion?.ci}</div>
                </div>
              </div>
            </section>

            <footer className="text-center text-[8px] text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-100">
              SHA256 Forensic Lab - Tecnología al servicio de la justicia. | Estándar MUCCEF 2017
            </footer>
         </div>
       </div>
    </div>
  )
});

// --- PRINT DICTAMEN ---

export const PrintDictamen = memo(({ report, onClose }: any) => {
  return (
    <div className="pdf-viewer-bg" id="print-view">
      <PrintHeader onClose={onClose} title="DICTAMEN_PERICIAL.pdf" />
      <div className="pt-12 pb-12 w-full flex justify-center">
        <div className="document-page text-black font-serif">
          <PdfLogo />
          <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
            <div>
              <h1 className="text-lg font-bold uppercase tracking-widest leading-tight">DICTAMEN DE PERITACIÓN INFORMÁTICA</h1>
              <p className="text-xs font-bold mt-1">República Bolivariana de Venezuela</p>
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
                  {report.resultados.map((res: any) => (
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
              <p className="font-bold text-sm tracking-widest">{(report.perito.nombre || '').toUpperCase()}</p>
              <p className="text-[9px] uppercase font-bold">Perito Forense Informático</p>
              <p className="text-[9px] uppercase">Sello: {report.perito.sello}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
