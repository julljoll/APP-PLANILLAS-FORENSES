# Planillas Forenses SHA256 - v1.0.0 (Lanzamiento Inicial)

🚀 **Aplicación de Escritorio Nativa (Offline) para el Laboratorio de Informática Forense y Ciberseguridad.**

Esta es la primera versión oficial empaquetada como software de escritorio independiente. Está **optimizada para Linux Ubuntu 26.04** (compatible con Kernel Linux 6.x y superiores).

## 📥 Descarga e Instalación

1. Descarga el archivo `planillas-forenses_1.0.0_amd64.deb` desde la sección de **Assets** al final de esta página.
2. Haz doble clic sobre el archivo descargado para instalarlo a través del Centro de Software de Ubuntu, o instálalo por terminal ejecutando:
   ```bash
   sudo dpkg -i planillas-forenses_1.0.0_amd64.deb
   sudo apt-get install -f
   ```
3. Búscala en tu menú de aplicaciones como **Planillas Forenses SHA256**. ¡No requiere conexión a internet para funcionar!

---

## ⚖️ Conformidad Técnico-Legal

Esta herramienta ha sido diseñada arquitectónicamente para cumplir de forma estricta con el **Manual Único de Cadena de Custodia de Evidencias Físicas** y el **Marco Legal Venezolano** (COPP Art. 188, Ley Especial contra Delitos Informáticos, Ley sobre Mensajes de Datos y Firmas Electrónicas).

Además, aplica rigurosamente los estándares internacionales **ISO/IEC 27037:2012** (Identificación, colección y preservación), **ISO/IEC 27042:2015** (Análisis de pruebas digitales) y **NIST SP 800-101 r1**.

### Características Forenses Integradas:

#### 1. Fase Inicial: Obtención
El sistema automatiza la redacción del **Acta de Obtención por Consignación** (prioridad del manual), guiando al funcionario receptor a documentar elementos vitales como: identidad del consignante, IMEI, modelo, número telefónico y el estado físico de la batería/pantalla.

#### 2. Fase de Laboratorio: Peritaje
El módulo de **Dictamen Pericial** obliga metodológicamente al perito a estructurar el informe bajo estándares internacionales:
*   **Trazabilidad de Herramientas:** Registro obligatorio de las versiones exactas del Sistema Operativo de la Estación Forense (Ej. Ubuntu 22.04), software de extracción (*Andriller*) y software de parseo/análisis (*ALEAPP*).
*   **Integridad Criptográfica:** Campos estrictos en formato monoespaciado para documentar el **Hash Global** de la extracción y los **Hashes Individuales** (MD5/SHA-256) de los artefactos nativos analizados (ej. `msgstore.db`).
*   **Juicio Técnico:** Formato blindado para separar las conclusiones técnicas de cualquier precalificación jurídica, incluyendo una declaración obligatoria sobre el consumo o alteración de la evidencia.

#### 3. Transferencia y Trazabilidad (PRCC)
El módulo de **Planilla de Registro de Cadena de Custodia (PRCC)** permite levantar toda la ruta de la evidencia, documentando las firmas, organismos e identidades en los procesos de Colección, Fijación, Entrega y Recepción, asegurando la inalterabilidad procedimental antes de las Fases de Disposición Judicial y Final.
