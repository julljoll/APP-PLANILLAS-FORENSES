# 🛡️ Sistema de Gestión de Planillas Forenses SHA256

[![Versión](https://img.shields.io/badge/Versi%C3%B3n-2.5--Premium-amber)](https://github.com/julljoll/APP-PLANILLAS-FORENSES)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-blue)](LICENSE)
[![Plataforma](https://img.shields.io/badge/Plataforma-Electron%20%7C%20Ubuntu-white)](https://electronjs.org)

> **Misión:** Transformar la gestión de evidencias físicas en Venezuela mediante una herramienta digital inmutable, intuitiva y alineada con los más altos estándares internacionales y nacionales.

---

## ✨ Características Destacadas (Estilo Kanvas)

Inspirado en las mejores prácticas de herramientas de Respuesta a Incidentes (IR) como **Kanvas**, este sistema ofrece una experiencia visual y técnica superior:

*   **📈 Línea de Tiempo de Investigación**: Visualice el ciclo de vida de la evidencia de forma gráfica (Recolección → Laboratorio → Análisis → Disposición).
*   **🔗 Integridad Criptográfica**: Cada documento genera una firma **SHA-256** única que garantiza la inalterabilidad de la cadena de custodia (Ley de Firmas Electrónicas).
*   **📂 Gestión por Casos (IR Focus)**: Organización centralizada mediante N° de Expediente para un seguimiento coherente de investigaciones complejas.
*   **⚖️ Alineación RAG 100%**: Sincronizado con el *Manual Único de Cadena de Custodia de Venezuela (2017)* y el *COPP*.
*   **🖥️ Interfaz Premium**: Diseño UX/UI optimizado para reducir la carga cognitiva mediante formularios por pasos (Wizards) y dashboards analíticos.

---

## 🏛️ Base Legal y Estándares

La aplicación no solo genera documentos; asegura que cada paso cumpla con el marco legal vigente en la República Bolivariana de Venezuela:

### Marco Legal Nacional
- **COPP Art. 188**: Obligatoriedad y resguardo de la Cadena de Custodia.
- **Ley de Delitos Informáticos**: Protocolos de manejo de evidencia digital.
- **Ley de Firmas Electrónicas**: Validez probatoria de los hashes generados.

### Estándares Internacionales
- **ISO/IEC 27037:2012**: Guía para la identificación, recolección y adquisición de evidencia.
- **ISO/IEC 27042:2015**: Análisis e interpretación forense.
- **NIST SP 800-101 r1**: Estándares técnicos para dispositivos móviles.

---

## 🧩 Módulos Principales

| Módulo | Función | Normativa |
| :--- | :--- | :--- |
| **🕵️ Gestor de PRCC** | Generación de planillas iniciales y derivadas con árbol de jerarquía. | Fase Inicial / Derivación |
| **📝 Acta Consignación** | Documentación de entrega voluntaria con fijación técnica detallada. | DOC-005 |
| **📊 Seguimiento** | Dashboard de auditoría, ubicación física y estados de resguardo. | Figuras Continuas |
| **🔬 Dictamen Pericial** | Informe técnico de peritación (Andriller/ALEAPP) con hashes individuales. | DOC-012 |

---

## 🚀 Guía de Inicio Rápido

### Instalación
La aplicación está optimizada para **Ubuntu 24.04+** y se distribuye en formato `.deb`.

1. Descarga el paquete desde [Releases](https://github.com/julljoll/APP-PLANILLAS-FORENSES/releases).
2. Instala usando tu gestor de paquetes favorito:
   ```bash
   sudo dpkg -i planillas-forenses_1.0.0_amd64.deb
   ```

### Uso
1. **Identificación**: Ingresa la Cédula del funcionario responsable.
2. **Registro**: Completa el formulario por pasos (Contexto → Evidencia → Firma).
3. **Generación**: Pulsa "Generar y Guardar". El sistema guardará el registro en la base de datos local (SQLite) y generará el PDF oficial.
4. **Seguimiento**: Utiliza el módulo de Seguimiento para ver la línea de tiempo del caso en tiempo real.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + Vite + TailwindCSS (Diseño Premium).
- **Backend**: Electron 41 (Desktop Native).
- **Persistencia**: SQLite (Better-SQLite3) para auditoría inmutable.
- **Criptografía**: Librería `crypto` de Node.js para hashes SHA-256.
- **PDF**: Motor de renderizado Chromium para documentos de alta fidelidad.

---

## 👨‍💻 Autoría y Soporte

**Diseño UX/UI, Arquitectura de la Información y Programación:**
- **Autor**: julljoll
- **Correo**: julljoll@gmail.com
- **Web**: [sha256.us](https://sha256.us) | [siriusweb.us](https://siriusweb.us)

---
*Este proyecto es una herramienta forense profesional. Use bajo responsabilidad legal y siguiendo los protocolos institucionales.*
