# Manual Único de Cadena de Custodia de Evidencias Físicas

> **Descripción:** Procedimiento para la extracción y análisis de dispositivos Android (WhatsApp) siguiendo el Manual de Cadena de Custodia Venezolano.

---

## 1. Fase Inicial - Obtención
Fase donde se obtienen las evidencias físicas para iniciar la cadena de custodia.

### Formas de Obtención:
*   **Obtención por Consignación (PRIORIDAD):** Cuando el propietario o poseedor entrega voluntariamente la evidencia al organismo de investigación.
    *   *Escenarios:* Entrega voluntaria del dispositivo, consignación de evidencia digital por ciudadanos.
    *   *Procedimientos:* Recepción (verificación de identidad, motivo, registro de datos y estado físico) y Fijación (escrita y fotográfica de IMEI, pantalla, puertos, daños, etc.).
*   **Obtención Técnica:** Cuando personal especializado acude al sitio del suceso o lugar de ubicación de la evidencia.
    *   *Procedimientos:* Protección (Modo Avión/Bolsa Faraday), observación, fijación, colección (write-blockers, Andriller), embalaje, rotulación, registro en PRCC y traslado. Implica el cálculo de Hash (MD5 o SHA-256).
*   **Obtención por Aseguramiento:** Cuando se requiere asegurar evidencias en poder de terceros mediante procedimientos legales.
*   **Obtención por Derivación:** Cuando del análisis de una evidencia principal se obtiene una nueva.
    *   *Escenarios:* Por Separación, Segmentación o Selección.

---

## 2. Fase de Laboratorio - Peritación
Fase intermedia destinada a la peritación de evidencias previamente obtenidas.

1.  **Recepción en Laboratorio:** Verificación de precintos, recalcular hash (ISO/IEC 27042:2015), cotejar PRCC y oficio.
2.  **Designación:** Registro, asignación de perito responsable y firmas de controles.
3.  **Peritaje:**
    *   *Etapas:* Valoración, descripción, análisis (usando ALEAPP y Andriller), interpretación y conclusión.
    *   *Herramientas:* Andriller (extracción lógica/física) y ALEAPP (parseo SQLite/Protobuf).
4.  **Remisión:** Entrega de dictamen pericial, remisión de evidencias y actualización de PRCC.

---

## 3. Fase de Disposición Judicial
Momento en que la evidencia pasa a disposición del Poder Judicial tras admitirse la acusación.

*   **Procesos:** Resguardo Judicial en áreas especializadas y Exhibición en Audiencia.
*   **Documento Asociado:** Acta de Exhibición de Evidencias.

---

## 4. Fase de Disposición Final - Cierre
Fase final que pone fin al tratamiento de las evidencias.

*   **Formas de Cierre:** Devolución, Entrega a persona jurídica, Destrucción (todas con autorización judicial) o Consumida en peritaje.
*   **Procedimientos:** Ejecución y cierre en PRCC.
*   **Documento Asociado:** Acta de Disposición Final de Evidencias.

---

## Figuras de Carácter Continuo
Procesos y procedimientos que se cumplen en cualquier fase del sistema.

*   **Proceso de Resguardo:** Protección y conservación en espacios especializados (ingreso, depósito bajo condiciones óptimas, y egreso por disposición Fiscal/Tribunal).
*   **Procedimiento de Traslado:** Verificación de condiciones y selección del medio más seguro.
*   **Actividad de Transferencia:** Verificación de condiciones físicas, precintos y PRCC entre quien entrega y quien recibe.

---

## Documentos Asociados
- Acta Policial
- Acta de Investigación Penal
- Acta de Obtención Técnica
- Acta de Obtención por Aseguramiento
- Acta de Obtención por Consignación
- Acta de Obtención por Derivacion
- Acta de Disposición Final
- Acta de Levantamiento de Cadáver
- Acta de Inspección
- Acta Pericial
- Planilla de Registro de Cadena de Custodia (PRCC)
- Dictamen Pericial
- Memorandos y Oficios

---

## Estructura del Dictamen Pericial
*   **Estructura Obligatoria:** Motivo, Descripción, Exámenes Practicados (herramientas y Hash), Resultados (tablas detalladas), Conclusiones (sin precalificación jurídica) y Constancia de Consumo de Evidencia.
*   **Formalidades:** Presentación por escrito, firma y sello del Perito Informático, e inclusión de versiones exactas de las herramientas.

---

## Marco Legal Venezolano
*   **Constitución:** Debido proceso, tutela judicial efectiva, privacidad de las comunicaciones.
*   **Leyes:**
    *   *COPP:* Art. 188, licitud de prueba, obligatoriedad de cadena de custodia.
    *   *Ley Especial contra Delitos Informáticos (2001).*
    *   *Ley de Infogobierno.*
    *   *Ley sobre Mensajes de Datos y Firmas Electrónicas:* Art. 4 y 8 (eficacia probatoria).

---

## Estándares Internacionales y Herramientas Autorizadas

### Estándares
*   **ISO/IEC 27037:2012:** Identificación, colección, adquisición y preservación.
*   **ISO/IEC 27042:2015:** Análisis e interpretación de pruebas digitales.
*   **NIST SP 800-101 r1:** Guía para forensia de dispositivos móviles.

### Herramientas
*   **Andriller:** Extracción lógica y física en Android (Solo lectura, forensemente sólido).
*   **ALEAPP (Android Logs Events And Protobuf Parser):** Parseo de SQLite, Protobuf, reconstrucción de eventos de WhatsApp.
*(Nota: Siempre se debe documentar la versión exacta de la herramienta utilizada en los informes).*
