/**
 * Manual Único de Cadena de Custodia de Evidencias Físicas
 * Versión 2.0 - Optimizada y Estandarizada
 * 
 * Basado en el manual-procedimiento.yaml
 * Aplicado al proyecto completo de Planillas Forenses SHA256
 */

export interface GlosarioTermino {
  termino: string;
  definicion: string;
}

export interface PasoProcedimiento {
  orden: number;
  accion: string;
}

export interface DocumentoAsociado {
  id: string;
  nombre: string;
  fase: string;
  prioridad?: string;
  obligatorio?: boolean;
}

export interface HerramientaForense {
  id: string;
  uso: string;
  caracteristicas: string[];
  version_requerida: string;
  compatibilidad?: string;
  funcion?: string;
  artefactos_soportados?: string[];
}

export interface EstandarInternacional {
  id: string;
  norma: string;
  titulo: string;
  aplicacion: string;
}

export interface ArticuloLegal {
  numero: string;
  descripcion: string;
}

export interface Ley {
  nombre: string;
  descripcion: string;
  articulos?: ArticuloLegal[];
  ambito?: string;
}

export interface MarcoLegal {
  constitucion: Array<{
    principio: string;
    articulo: string;
  }>;
  leyes: Ley[];
}

export interface FormaObtencion {
  id: string;
  tipo: string;
  prioridad: number;
  definicion: string;
  escenarios?: string[];
  procedimiento?: {
    recepcion?: {
      pasos: PasoProcedimiento[];
    };
    fijacion?: {
      medios: string[];
      datos_requeridos: string[];
    };
    pasos?: PasoProcedimiento[];
    hash?: {
      algoritmos: string[];
      objetivos: string[];
    };
  };
  requisito_legal?: string;
  tipos?: Array<{
    nombre: string;
    descripcion: string;
  }>;
  documentos_asociados: string[];
}

export interface FaseInicial {
  id: string;
  nombre: string;
  definicion: string;
  objetivo: string;
  formas_obtencion: FormaObtencion[];
}

export interface PasoLaboratorio {
  paso_id: string;
  paso: string;
  acciones?: PasoProcedimiento[];
  etapas?: Array<{
    nombre: string;
    descripcion: string;
  }>;
  herramientas?: Array<{
    nombre: string;
    funcion: string;
    caracteristicas?: string[];
    requisito?: string;
    descripcion?: string;
  }>;
  normativa?: string;
  documentos_asociados: string[];
}

export interface FaseLaboratorio {
  id: string;
  nombre: string;
  definicion: string;
  objetivo: string;
  proceso_peritacion: PasoLaboratorio[];
}

export interface ProcesoJudicial {
  proceso_id: string;
  nombre: string;
  descripcion: string;
}

export interface FaseDisposicionJudicial {
  id: string;
  nombre: string;
  definicion: string;
  objetivo: string;
  procesos: ProcesoJudicial[];
  documento_asociado: string;
}

export interface FormaCierre {
  tipo: string;
  descripcion: string;
  requisito: string;
}

export interface FaseDisposicionFinal {
  id: string;
  nombre: string;
  definicion: string;
  objetivo: string;
  formas_cierre: FormaCierre[];
  procedimientos: PasoProcedimiento[];
  documento_asociado: string;
}

export interface ProcesoContinuo {
  id: string;
  nombre: string;
  definicion?: string;
  lineamientos?: string[];
  etapas?: Array<{
    nombre: string;
    acciones: string[];
  }>;
}

export interface FigurasContinuas {
  definicion: string;
  procesos: ProcesoContinuo[];
}

export interface SeccionDictamen {
  orden: number;
  seccion: string;
  descripcion: string;
}

export interface DictamenPericial {
  estructura_obligatoria: SeccionDictamen[];
  formalidades: string[];
}

export interface ControlVersion {
  version: string;
  fecha: string;
  cambios: string | string[];
}

export interface ManualProcedimiento {
  metadata: {
    version: string;
    fecha_creacion: string;
    ultimo_actualizado: string;
    autor: string;
    pais: string;
    estado: string;
    idioma: string;
  };
  titulo: string;
  descripcion: string;
  alcance: string;
  glosario: GlosarioTermino[];
  fase_inicial: FaseInicial;
  fase_laboratorio: FaseLaboratorio;
  fase_disposicion_judicial: FaseDisposicionJudicial;
  fase_disposicion_final: FaseDisposicionFinal;
  figuras_continuas: FigurasContinuas;
  documentos_asociados: DocumentoAsociado[];
  dictamen_pericial: DictamenPericial;
  marco_legal: MarcoLegal;
  estandares: EstandarInternacional[];
  herramientas: {
    andriller: HerramientaForense;
    aleapp: HerramientaForense;
  };
  control_versiones: ControlVersion[];
}

/**
 * Datos completos del Manual de Procedimiento v2.0
 */
export const manualProcedimiento: ManualProcedimiento = {
  metadata: {
    version: "2.0",
    fecha_creacion: "2024",
    ultimo_actualizado: "2024-01-15",
    autor: "Organismo de Investigación Penal",
    pais: "Venezuela",
    estado: "Vigente",
    idioma: "es"
  },
  
  titulo: "Manual Único de Cadena de Custodia de Evidencias Físicas",
  descripcion: "Procedimiento estandarizado para extracción y análisis de dispositivos Android (WhatsApp) siguiendo el Manual de Cadena de Custodia Venezolano",
  alcance: "Aplicable a todos los organismos de investigación penal en Venezuela",
  
  glosario: [
    {
      termino: "PRCC",
      definicion: "Planilla de Registro de Cadena de Custodia"
    },
    {
      termino: "Hash",
      definicion: "Valor criptográfico (MD5/SHA-256) que garantiza integridad de la evidencia"
    },
    {
      termino: "Write-blocker",
      definicion: "Dispositivo hardware/software que previene escritura en evidencia digital"
    },
    {
      termino: "Bolsa Faraday",
      definicion: "Contenedor que bloquea señales electromagnéticas para aislar dispositivos"
    }
  ],
  
  fase_inicial: {
    id: "FASE-01",
    nombre: "Fase Inicial - Obtención",
    definicion: "Fase donde se obtienen las evidencias físicas para iniciar la cadena de custodia",
    objetivo: "Garantizar la correcta identificación, documentación y preservación inicial de la evidencia",
    
    formas_obtencion: [
      {
        id: "OBT-001",
        tipo: "Obtención por Consignación",
        prioridad: 1,
        definicion: "Cuando el propietario o poseedor entrega voluntariamente la evidencia al organismo de investigación",
        escenarios: [
          "Entrega voluntaria del dispositivo móvil",
          "Consignación de evidencia digital por ciudadanos"
        ],
        procedimiento: {
          recepcion: {
            pasos: [
              { orden: 1, accion: "Verificar identidad de quien consigna (cédula de identidad)" },
              { orden: 2, accion: "Documentar motivo de la consignación" },
              { orden: 3, accion: "Registrar datos del dispositivo (marca, modelo, IMEI, IMEI2, número telefónico)" },
              { orden: 4, accion: "Verificar estado físico del dispositivo" }
            ]
          },
          fijacion: {
            medios: [
              "Fijación escrita: Acta de Obtención por Consignación",
              "Fijación fotográfica: estado del dispositivo, IMEI, pantalla, puertos"
            ],
            datos_requeridos: [
              "Marca y modelo",
              "IMEI y IMEI2",
              "Número de teléfono/línea",
              "Estado de la batería",
              "Daños físicos",
              "Estado de la pantalla (encendido/apagado)"
            ]
          }
        },
        documentos_asociados: [
          "Acta de Obtención por Consignación",
          "PRCC"
        ]
      },
      
      {
        id: "OBT-002",
        tipo: "Obtención Técnica",
        prioridad: 2,
        definicion: "Cuando el personal especializado acude al sitio del suceso o lugar de ubicación de la evidencia",
        procedimiento: {
          pasos: [
            { orden: 1, accion: "Protección: Aislar dispositivo (Modo Avión o Bolsa Faraday)" },
            { orden: 2, accion: "Observación Preliminar: Verificar estado del dispositivo" },
            { orden: 3, accion: "Fijación: Fotografías y actas" },
            { orden: 4, accion: "Colección: Uso de write-blockers y extracción con Andriller" },
            { orden: 5, accion: "Embalaje y Rotulación" },
            { orden: 6, accion: "Registro en PRCC" },
            { orden: 7, accion: "Traslado" }
          ],
          hash: {
            algoritmos: ["MD5", "SHA-256"],
            objetivos: [
              "Calcular hash inicial",
              "Garantizar inalterabilidad"
            ]
          }
        },
        documentos_asociados: [
          "Acta de Obtención Técnica",
          "PRCC"
        ]
      },
      
      {
        id: "OBT-003",
        tipo: "Obtención por Aseguramiento",
        prioridad: 3,
        definicion: "Cuando se requiere asegurar evidencias en poder de terceros mediante procedimientos legales",
        requisito_legal: "Orden judicial o autorización fiscal",
        procedimiento: {
          pasos: [
            { orden: 1, accion: "Verificar documentación legal (orden judicial/fiscal)" },
            { orden: 2, accion: "Identificar personas presentes" },
            { orden: 3, accion: "Proteger y aislar evidencia" },
            { orden: 4, accion: "Fijación fotográfica y escrita" },
            { orden: 5, accion: "Colección con protocolos forenses" },
            { orden: 6, accion: "Embalaje, rotulación y registro en PRCC" }
          ]
        },
        documentos_asociados: [
          "Acta de Obtención por Aseguramiento",
          "PRCC",
          "Orden judicial/fiscal"
        ]
      },
      
      {
        id: "OBT-004",
        tipo: "Obtención por Derivación",
        prioridad: 4,
        definicion: "Cuando del análisis de una evidencia principal se obtiene una nueva evidencia",
        tipos: [
          { nombre: "Por Separación", descripcion: "Diferente naturaleza a la evidencia principal" },
          { nombre: "Por Segmentación", descripcion: "División de la evidencia principal" },
          { nombre: "Por Selección", descripcion: "Discriminación para peritaje especializado" }
        ],
        documentos_asociados: [
          "Acta de Obtención por Derivación",
          "PRCC"
        ]
      }
    ]
  },
  
  fase_laboratorio: {
    id: "FASE-02",
    nombre: "Fase de Laboratorio - Peritación",
    definicion: "Fase intermedia destinada a la peritación de evidencias previamente obtenidas",
    objetivo: "Realizar análisis técnico-científico de la evidencia digital preservando su integridad",
    
    proceso_peritacion: [
      {
        paso_id: "LAB-001",
        paso: "Recepción en Laboratorio",
        acciones: [
          { orden: 1, accion: "Verificar precintos de seguridad" },
          { orden: 2, accion: "Recalcular Hash para confirmar integridad" },
          { orden: 3, accion: "Cotejar PRCC con el embalaje" },
          { orden: 4, accion: "Verificar correspondencia con oficio de remisión" }
        ],
        normativa: "ISO/IEC 27042:2015",
        documentos_asociados: ["PRCC", "Acta de Recepción"]
      },
      
      {
        paso_id: "LAB-002",
        paso: "Designación",
        acciones: [
          { orden: 1, accion: "Registrar en sistema manual o automatizado" },
          { orden: 2, accion: "Asignar perito responsable" },
          { orden: 3, accion: "Firmar controles y PRCC" }
        ],
        documentos_asociados: ["PRCC", "Registro de Designación"]
      },
      
      {
        paso_id: "LAB-003",
        paso: "Peritaje",
        etapas: [
          { nombre: "Valoración", descripcion: "Apreciar contexto y planificar técnicas" },
          { nombre: "Descripción", descripcion: "Detallar características de la evidencia" },
          { nombre: "Análisis", descripcion: "Aplicar métodos y técnicas (ALEAPP y Andriller)" },
          { nombre: "Interpretación", descripcion: "Evaluar datos resultantes" },
          { nombre: "Conclusión", descripcion: "Juicio de valor técnico-científico" }
        ],
        herramientas: [
          {
            nombre: "Andriller",
            funcion: "Extracción lógica y física",
            caracteristicas: ["Solo lectura (no destructivo)", "Forensemente sólido"],
            requisito: "Documentar versión exacta usada"
          },
          {
            nombre: "ALEAPP",
            funcion: "Android Logs Events And Protobuf Parser",
            descripcion: "Parseo de SQLite, Protobuf, reconstrucción de eventos WhatsApp",
            requisito: "Documentar versión exacta usada"
          }
        ],
        documentos_asociados: ["Acta Pericial", "Reporte de Análisis"]
      },
      
      {
        paso_id: "LAB-004",
        paso: "Remisión",
        acciones: [
          { orden: 1, accion: "Entregar dictamen pericial" },
          { orden: 2, accion: "Remitir evidencias y PRCC al despacho solicitante" },
          { orden: 3, accion: "Acotar en PRCC la remisión" }
        ],
        documentos_asociados: ["Dictamen Pericial", "PRCC", "Oficio de Remisión"]
      }
    ]
  },
  
  fase_disposicion_judicial: {
    id: "FASE-03",
    nombre: "Fase de Disposición Judicial",
    definicion: "Momento en que la evidencia pasa a disposición del Poder Judicial tras admitirse la acusación",
    objetivo: "Garantizar la disponibilidad de la evidencia durante el proceso judicial",
    
    procesos: [
      {
        proceso_id: "JUD-001",
        nombre: "Resguardo Judicial",
        descripcion: "Almacenamiento en áreas especializadas del Poder Judicial"
      },
      {
        proceso_id: "JUD-002",
        nombre: "Exhibición en Audiencia",
        descripcion: "Cumplir procedimiento de traslado y transferencia"
      }
    ],
    documento_asociado: "Acta de Exhibición de Evidencias"
  },
  
  fase_disposicion_final: {
    id: "FASE-04",
    nombre: "Fase de Disposición Final - Cierre",
    definicion: "Fase final que pone fin al tratamiento de las evidencias",
    objetivo: "Cerrar formalmente la cadena de custodia según disposición legal",
    
    formas_cierre: [
      {
        tipo: "Devolución",
        descripcion: "Restituir a quien tenga legítimo derecho",
        requisito: "Autorización judicial"
      },
      {
        tipo: "Entrega",
        descripcion: "Otorgar a persona jurídica autorizada",
        requisito: "Autorización judicial"
      },
      {
        tipo: "Destrucción",
        descripcion: "Inutilizar evidencia sin interés",
        requisito: "Autorización judicial"
      },
      {
        tipo: "Consumida en Peritaje",
        descripcion: "Agotada durante análisis",
        requisito: "Documentar en acta pericial"
      }
    ],
    procedimientos: [
      { orden: 1, accion: "Ejecución: materializar devolución, entrega o destrucción" },
      { orden: 2, accion: "Cierre de PRCC: dejar constancia en observaciones y remitir al expediente" }
    ],
    documento_asociado: "Acta de Disposición Final de Evidencias"
  },
  
  figuras_continuas: {
    definicion: "Procesos y procedimientos que se cumplen en cualquier fase del sistema",
    procesos: [
      {
        id: "CONT-001",
        nombre: "Proceso de Resguardo",
        definicion: "Protección y conservación en espacios especializados",
        etapas: [
          {
            nombre: "Ingreso",
            acciones: ["Verificar PRCC", "Verificar identidad", "Verificar condiciones de la evidencia"]
          },
          {
            nombre: "Depósito",
            acciones: ["Almacenamiento bajo condiciones óptimas"]
          },
          {
            nombre: "Egreso",
            acciones: ["Disposición expresa y por escrito del Fiscal o Tribunal"]
          }
        ],
        lineamientos: [
          "Solo personal autorizado",
          "Control de temperatura, humedad, seguridad",
          "Inventario periódico (máximo un año)"
        ]
      },
      {
        id: "CONT-002",
        nombre: "Procedimiento de Traslado",
        lineamientos: [
          "Verificar condiciones de evidencia y embalaje",
          "Seleccionar medio que minimice riesgos",
          "Asentar datos en PRCC"
        ]
      },
      {
        id: "CONT-003",
        nombre: "Actividad de Transferencia",
        lineamientos: [
          "Verificar condiciones físicas y precintos",
          "Verificar PRCC con rotulado",
          "Asentar datos de quien entrega y recibe"
        ]
      }
    ]
  },
  
  documentos_asociados: [
    { id: "DOC-001", nombre: "Acta Policial", fase: "Inicial" },
    { id: "DOC-002", nombre: "Acta de Investigación Penal", fase: "Inicial" },
    { id: "DOC-003", nombre: "Acta de Obtención Técnica", fase: "Inicial" },
    { id: "DOC-004", nombre: "Acta de Obtención por Aseguramiento", fase: "Inicial" },
    { id: "DOC-005", nombre: "Acta de Obtención por Consignación", fase: "Inicial", prioridad: "Alta" },
    { id: "DOC-006", nombre: "Acta de Obtención por Derivación", fase: "Inicial" },
    { id: "DOC-007", nombre: "Acta de Disposición Final", fase: "Disposición Final" },
    { id: "DOC-008", nombre: "Acta de Levantamiento de Cadáver", fase: "Inicial" },
    { id: "DOC-009", nombre: "Acta de Inspección", fase: "Inicial" },
    { id: "DOC-010", nombre: "Acta Pericial", fase: "Laboratorio" },
    { id: "DOC-011", nombre: "Planilla de Registro de Cadena de Custodia (PRCC)", fase: "Transversal", obligatorio: true },
    { id: "DOC-012", nombre: "Dictamen Pericial", fase: "Laboratorio" },
    { id: "DOC-013", nombre: "Memorandos y Oficios", fase: "Transversal" }
  ],
  
  dictamen_pericial: {
    estructura_obligatoria: [
      { orden: 1, seccion: "Motivo", descripcion: "Razón por la cual se practica la peritación" },
      { orden: 2, seccion: "Descripción", descripcion: "Estado en que se halló y recibió la evidencia" },
      { orden: 3, seccion: "Exámenes Practicados", descripcion: "Detalle de softwares (versiones Andriller y ALEAPP), técnicas y valores Hash" },
      { orden: 4, seccion: "Resultados", descripcion: "Tabla con nombre nativo, fechas, ruta, tamaño y Hash individual" },
      { orden: 5, seccion: "Conclusiones", descripcion: "Juicio de valor técnico-científico sin precalificación jurídica" },
      { orden: 6, seccion: "Consumo de Evidencia", descripcion: "Constancia si fue consumida o alterada" }
    ],
    formalidades: [
      "Presentación por escrito",
      "Firma del Perito Informático",
      "Sello del perito",
      "Versión exacta de herramientas usadas"
    ]
  },
  
  marco_legal: {
    constitucion: [
      { principio: "Debido proceso", articulo: "CRBV Art. 49" },
      { principio: "Tutela judicial efectiva", articulo: "CRBV Art. 26" },
      { principio: "Privacidad de las comunicaciones", articulo: "CRBV Art. 48" }
    ],
    leyes: [
      {
        nombre: "COPP (Código Orgánico Procesal Penal)",
        descripcion: "Regula el proceso penal venezolano",
        articulos: [
          { numero: "Art. 188", descripcion: "Resguardo de evidencias" },
          { numero: "Art. 178", descripcion: "Régimen de licitud de la prueba" },
          { numero: "Art. 283", descripcion: "Obligatoriedad de cadena de custodia" }
        ]
      },
      {
        nombre: "Ley Especial contra Delitos Informáticos (2001)",
        descripcion: "Tipifica delitos cibernéticos",
        ambito: "Delitos informáticos y relacionados"
      },
      {
        nombre: "Ley de Infogobierno",
        descripcion: "Validez y seguridad de tecnologías de información",
        ambito: "Tecnologías de información en el sector público"
      },
      {
        nombre: "Ley sobre Mensajes de Datos y Firmas Electrónicas",
        descripcion: "Reconocimiento legal de documentos electrónicos",
        articulos: [
          { numero: "Art. 4", descripcion: "Eficacia probatoria de mensajes de datos" },
          { numero: "Art. 8", descripcion: "Misma eficacia que documento escrito" }
        ]
      }
    ]
  },
  
  estandares: [
    {
      id: "STD-001",
      norma: "ISO/IEC 27037:2012",
      titulo: "Identificación, colección, adquisición y preservación de evidencia digital",
      aplicacion: "Fase Inicial"
    },
    {
      id: "STD-002",
      norma: "ISO/IEC 27042:2015",
      titulo: "Análisis e interpretación de pruebas digitales",
      aplicacion: "Fase de Laboratorio"
    },
    {
      id: "STD-003",
      norma: "NIST SP 800-101 r1",
      titulo: "Guía para forensia de dispositivos móviles",
      aplicacion: "Dispositivos móviles"
    }
  ],
  
  herramientas: {
    andriller: {
      id: "HERR-001",
      uso: "Extracción lógica y física en dispositivos Android",
      caracteristicas: [
        "Solo lectura (no destructivo)",
        "Forensemente sólido",
        "Código abierto"
      ],
      version_requerida: "Documentar versión exacta usada",
      compatibilidad: "Android 4.0+"
    },
    aleapp: {
      id: "HERR-002",
      uso: "Android Logs Events And Protobuf Parser",
      funcion: "Parseo de SQLite, Protobuf, reconstrucción de eventos WhatsApp",
      caracteristicas: [
        "Parseo de bases de datos SQLite",
        "Reconstrucción de mensajes de WhatsApp",
        "Generación de reportes HTML",
        "Soporte para múltiples artefactos Android"
      ],
      version_requerida: "Documentar versión exacta usada",
      artefactos_soportados: [
        "WhatsApp",
        "SMS",
        "Llamadas",
        "Ubicaciones",
        "Aplicaciones instaladas"
      ]
    }
  },
  
  control_versiones: [
    {
      version: "1.0",
      fecha: "2023-01-01",
      cambios: "Versión inicial"
    },
    {
      version: "2.0",
      fecha: "2024-01-15",
      cambios: [
        "Estandarización de estructura YAML",
        "Adición de IDs únicos para trazabilidad",
        "Inclusión de glosario de términos",
        "Mejora en documentación de procedimientos",
        "Optimización de metadatos",
        "Corrección de acentos y caracteres especiales"
      ]
    }
  ]
};

/**
 * Helpers para acceder a datos específicos del manual
 */
export const getFases = () => [
  manualProcedimiento.fase_inicial,
  manualProcedimiento.fase_laboratorio,
  manualProcedimiento.fase_disposicion_judicial,
  manualProcedimiento.fase_disposicion_final
];

export const getFormasObtencion = () => manualProcedimiento.fase_inicial.formas_obtencion;

export const getDocumentosByFase = (fase: string) => 
  manualProcedimiento.documentos_asociados.filter(doc => doc.fase === fase);

export const getHerramientasForenses = () => [
  manualProcedimiento.herramientas.andriller,
  manualProcedimiento.herramientas.aleapp
];

export const getMarcoLegalCompleto = () => manualProcedimiento.marco_legal;

export const getEstandaresInternacionales = () => manualProcedimiento.estandares;

export const getVersionActual = () => manualProcedimiento.metadata.version;

export const getGlosario = () => manualProcedimiento.glosario;
