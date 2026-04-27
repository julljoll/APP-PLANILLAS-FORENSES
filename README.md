# Manual Único de Cadena de Custodia de Evidencias Físicas

> **Descripción:** Procedimiento estandarizado para extracción y análisis de dispositivos Android (WhatsApp) siguiendo el Manual de Cadena de Custodia Venezolano.
> 
> **Versión:** 2.0 (Optimizada y Estandarizada)
> 
> **Desarrollo:** Esta aplicación fue desarrollada con la ayuda de Inteligencia Artificial (Claude, Google y Qwen).

---

## 📋 Resumen Ejecutivo

Este proyecto implementa digitalmente el **Manual Único de Cadena de Custodia de Evidencias Físicas** de Venezuela, proporcionando herramientas para generar:
- ✅ Actas de Obtención por Consignación
- ✅ Planillas de Registro de Cadena de Custodia (PRCC)
- ✅ Dictámenes Periciales

**Alcance:** Aplicable a todos los organismos de investigación penal en Venezuela.

---

## 🏛️ Estructura del Manual (4 Fases)

### 1. Fase Inicial - Obtención (FASE-01)
Fase donde se obtienen las evidencias físicas para iniciar la cadena de custodia.

#### Formas de Obtención:
| ID | Tipo | Prioridad | Descripción |
|----|------|-----------|-------------|
| OBT-001 | **Obtención por Consignación** | 1 (PRIORIDAD) | Entrega voluntaria del propietario/poseedor |
| OBT-002 | Obtención Técnica | 2 | Personal especializado en sitio del suceso |
| OBT-003 | Obtención por Aseguramiento | 3 | Con orden judicial/fiscal |
| OBT-004 | Obtención por Derivación | 4 | Nueva evidencia de análisis principal |

**Procedimiento OBT-001 (Prioritario):**
1. Verificar identidad de quien consigna (cédula)
2. Documentar motivo de la consignación
3. Registrar datos del dispositivo (marca, modelo, IMEI, IMEI2, número telefónico)
4. Verificar estado físico del dispositivo

**Fijación requerida:**
- Escrita: Acta de Obtención por Consignación
- Fotográfica: Estado del dispositivo, IMEI, pantalla, puertos, daños

---

### 2. Fase de Laboratorio - Peritación (FASE-02)
Fase intermedia destinada a la peritación de evidencias previamente obtenidas.

#### Proceso de Peritación:
| Paso ID | Paso | Acciones Principales | Normativa |
|---------|------|---------------------|-----------|
| LAB-001 | Recepción | Verificar precintos, recalcular Hash, cotejar PRCC | ISO/IEC 27042:2015 |
| LAB-002 | Designación | Registrar, asignar perito, firmar controles | - |
| LAB-003 | Peritaje | 5 etapas (Ver abajo) | - |
| LAB-004 | Remisión | Entregar dictamen, remitir evidencias | - |

#### Etapas del Peritaje (LAB-003):
1. **Valoración:** Apreciar contexto y planificar técnicas
2. **Descripción:** Detallar características de la evidencia
3. **Análisis:** Aplicar métodos (ALEAPP y Andriller)
4. **Interpretación:** Evaluar datos resultantes
5. **Conclusión:** Juicio técnico-científico

#### Herramientas Forenses Autorizadas:
| Herramienta | ID | Función Principal | Características |
|-------------|----|------------------|-----------------|
| **Andriller** | HERR-001 | Extracción lógica/física Android | Solo lectura, forensemente sólido, código abierto |
| **ALEAPP** | HERR-002 | Parseo SQLite/Protobuf WhatsApp | Reconstrucción de eventos, múltiples artefactos |

⚠️ **Requisito crítico:** Documentar versión exacta de cada herramienta usada.

---

### 3. Fase de Disposición Judicial (FASE-03)
Momento en que la evidencia pasa a disposición del Poder Judicial.

| Proceso ID | Nombre | Descripción |
|------------|--------|-------------|
| JUD-001 | Resguardo Judicial | Almacenamiento en áreas especializadas |
| JUD-002 | Exhibición en Audiencia | Traslado y transferencia controlada |

**Documento:** Acta de Exhibición de Evidencias

---

### 4. Fase de Disposición Final - Cierre (FASE-04)
Fase final que pone fin al tratamiento de las evidencias.

| Forma | Descripción | Requisito |
|-------|-------------|-----------|
| Devolución | Restituir a legítimo derecho | Autorización judicial |
| Entrega | Otorgar a persona jurídica autorizada | Autorización judicial |
| Destrucción | Inutilizar evidencia sin interés | Autorización judicial |
| Consumida en Peritaje | Agotada durante análisis | Documentar en acta |

---

## 🔄 Figuras de Carácter Continuo

Procesos transversales aplicables en cualquier fase:

| ID | Nombre | Lineamientos Clave |
|----|--------|-------------------|
| CONT-001 | **Proceso de Resguardo** | Solo personal autorizado, control ambiental, inventario anual |
| CONT-002 | **Procedimiento de Traslado** | Minimizar riesgos, asentar en PRCC |
| CONT-003 | **Actividad de Transferencia** | Verificar precintos, registrar entrega/recepción |

---

## 📄 Documentos Asociados (13 Tipos)

### Fase Inicial:
- DOC-001: Acta Policial
- DOC-002: Acta de Investigación Penal
- DOC-003: Acta de Obtención Técnica
- DOC-004: Acta de Obtención por Aseguramiento
- **DOC-005: Acta de Obtención por Consignación** ⭐ (Prioridad Alta)
- DOC-006: Acta de Obtención por Derivación
- DOC-008: Acta de Levantamiento de Cadáver
- DOC-009: Acta de Inspección

### Fase Laboratorio:
- DOC-010: Acta Pericial
- DOC-012: Dictamen Pericial

### Transversales:
- **DOC-011: Planilla de Registro de Cadena de Custodia (PRCC)** ⭐ (Obligatorio)
- DOC-013: Memorandos y Oficios

### Fase Disposición Final:
- DOC-007: Acta de Disposición Final

---

## 📝 Estructura del Dictamen Pericial

### Secciones Obligatorias:
1. **Motivo:** Razón de la peritación
2. **Descripción:** Estado de recepción de la evidencia
3. **Exámenes Practicados:** Softwares (versiones), técnicas, valores Hash
4. **Resultados:** Tabla con nombre nativo, fechas, ruta, tamaño y Hash individual
5. **Conclusiones:** Juicio técnico-científico (sin precalificación jurídica)
6. **Consumo de Evidencia:** Constancia de alteración o no alteración

### Formalidades:
- ✅ Presentación por escrito
- ✅ Firma del Perito Informático
- ✅ Sello del perito
- ✅ Versión exacta de herramientas usadas

---

## ⚖️ Marco Legal Venezolano

### Constitución (CRBV):
| Artículo | Principio |
|----------|-----------|
| Art. 49 | Debido proceso |
| Art. 26 | Tutela judicial efectiva |
| Art. 48 | Privacidad de las comunicaciones |

### Leyes:
#### COPP (Código Orgánico Procesal Penal):
- **Art. 188:** Resguardo de evidencias
- **Art. 178:** Régimen de licitud de la prueba
- **Art. 283:** Obligatoriedad de cadena de custodia

#### Otras Leyes:
- **Ley Especial contra Delitos Informáticos (2001):** Tipifica delitos cibernéticos
- **Ley de Infogobierno:** Validez y seguridad de TI en sector público
- **Ley sobre Mensajes de Datos y Firmas Electrónicas:**
  - Art. 4: Eficacia probatoria de mensajes de datos
  - Art. 8: Misma eficacia que documento escrito

---

## 🌍 Estándares Internacionales

| ID | Norma | Título | Aplicación |
|----|-------|--------|------------|
| STD-001 | **ISO/IEC 27037:2012** | Identificación, colección, adquisición y preservación | Fase Inicial |
| STD-002 | **ISO/IEC 27042:2015** | Análisis e interpretación de pruebas digitales | Fase Laboratorio |
| STD-003 | **NIST SP 800-101 r1** | Guía para forensia de dispositivos móviles | Dispositivos móviles |

---

## 📚 Glosario de Términos

| Término | Definición |
|---------|------------|
| **PRCC** | Planilla de Registro de Cadena de Custodia |
| **Hash** | Valor criptográfico (MD5/SHA-256) que garantiza integridad |
| **Write-blocker** | Dispositivo que previene escritura en evidencia digital |
| **Bolsa Faraday** | Contenedor que bloquea señales electromagnéticas |

---

## 🛠️ Control de Versiones del Manual

| Versión | Fecha | Cambios Principales |
|---------|-------|---------------------|
| 1.0 | 2023-01-01 | Versión inicial |
| **2.0** | 2024-01-15 | Estandarización YAML, IDs únicos, glosario, metadatos optimizados |

---

## 💻 Uso de la Aplicación

1. **Seleccionar tipo de documento:** Acta, PRCC o Dictamen
2. **Completar campos:** Seguir estructura del manual
3. **Generar PDF:** Botón "Generar PDF" para documento oficial

## 📥 Descarga

Disponible como paquete `.DEB` para Ubuntu 26.04+ (Kernel Linux 6.x+)

[Descargar última versión](https://github.com/julljoll/APP-PLANILLAS-FORENSES/releases/latest)

---

## 👨‍💻 Autoría

**Diseño UX/UI, Arquitectura de la Información y Programación:**
- Autor: julljoll
- Correo: julljoll@gmail.com
- Web: [sha256.us](https://sha256.us) | [siriusweb.us](https://siriusweb.us)

**Licencia:** MIT*
