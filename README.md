# 🛡️ Sistema de Gestión de Planillas Forenses SHA256

[![Versión](https://img.shields.io/badge/Versión-3.0--Modular-amber)](https://github.com/julljoll/APP-PLANILLAS-FORENSES)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-blue)](LICENSE)
[![Plataforma](https://img.shields.io/badge/Plataforma-Electron%2041%20%7C%20Ubuntu-white)](https://electronjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6)](https://www.typescriptlang.org)

> **Misión:** Transformar la gestión de evidencias físicas en Venezuela mediante una herramienta digital inmutable, intuitiva y alineada con los más altos estándares internacionales y nacionales.

---

## ✨ Características Destacadas

*   **📈 Línea de Tiempo de Investigación**: Visualice el ciclo de vida de la evidencia de forma gráfica (Recolección → Laboratorio → Análisis → Disposición).
*   **🔗 Integridad Criptográfica**: Cada documento genera una firma **SHA-256** única que garantiza la inalterabilidad de la cadena de custodia.
*   **📂 Gestión por Casos**: Organización centralizada mediante N° de Expediente para un seguimiento coherente de investigaciones complejas.
*   **⚖️ Alineación Legal 100%**: Sincronizado con el *Manual Único de Cadena de Custodia de Venezuela (2017)* y el *COPP*.
*   **🖥️ Interfaz Premium**: Diseño UX/UI optimizado para reducir la carga cognitiva con formularios por pasos y dashboards analíticos.
*   **🏗️ Arquitectura Modular**: Cada sección es un componente independiente — modifica una sin afectar las demás.
*   **📱 PWA**: Funciona offline como Progressive Web App con actualizaciones automáticas.
*   **💾 Persistencia Local**: SQLite (better-sqlite3) para almacenamiento inmutable en la versión de escritorio.

---

## 🧩 Módulos

| Módulo | Archivo | Función |
| :--- | :--- | :--- |
| **🕵️ Gestor de PRCC** | `pages/GestorPRCC.tsx` | Generación de planillas iniciales y derivadas con árbol de jerarquía SHA-256 |
| **📝 Acta Consignación** | `pages/ActaPage.tsx` | Documentación de entrega voluntaria con fijación técnica detallada |
| **📋 Planilla PRCC** | `pages/PRCCPage.tsx` | Registro de Cadena de Custodia con datos generales, operarios y transferencia |
| **🔬 Dictamen Pericial** | `pages/DictamenPage.tsx` | Informe técnico de peritación (Andriller/ALEAPP) con hashes individuales |
| **📊 Seguimiento** | `pages/SeguimientoPage.tsx` | Dashboard de auditoría, protocolo forense interactivo de 10 pasos |
| **📖 Manual** | `ManualViewer.tsx` | Visor del Manual Único de Cadena de Custodia con glosario y marco legal |

> Para modificar un módulo, edita **solo** su archivo. Ver [ARCHITECTURE.md](ARCHITECTURE.md) para la guía completa.

---

## 🏛️ Base Legal y Estándares

### Marco Legal Nacional
- **COPP Art. 188**: Obligatoriedad y resguardo de la Cadena de Custodia.
- **Ley de Delitos Informáticos (2001)**: Protocolos de manejo de evidencia digital.
- **Ley de Firmas Electrónicas**: Validez probatoria de los hashes generados (Art. 4 y 8).
- **CRBV Art. 48, 49**: Privacidad de comunicaciones y debido proceso.

### Estándares Internacionales
- **ISO/IEC 27037:2012**: Identificación, recolección y adquisición de evidencia.
- **ISO/IEC 27042:2015**: Análisis e interpretación forense.
- **NIST SP 800-101 r1**: Estándares técnicos para dispositivos móviles.

---

## 🚀 Guía de Inicio Rápido

### Requisitos
- Node.js 18+ (recomendado 20+)
- Ubuntu 24.04+ (para la versión `.deb`)

### Instalación para desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/julljoll/APP-PLANILLAS-FORENSES.git
cd APP-PLANILLAS-FORENSES

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (navegador)
npm run dev

# Ejecutar como app Electron
npm run electron:dev
```

### Instalación del paquete .deb

```bash
sudo dpkg -i planillas-forenses_1.0.0_amd64.deb
```

### Uso
1. **Identificación**: Ingresa la Cédula del funcionario responsable.
2. **Registro**: Completa el formulario por pasos (Contexto → Evidencia → Firma).
3. **Generación**: Pulsa "Generar y Guardar". El sistema guardará el registro en SQLite y generará el PDF oficial.
4. **Seguimiento**: Utiliza el módulo de Seguimiento para ver la línea de tiempo del caso.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | React + Vite + TailwindCSS v4 | 19 / 6 / 4 |
| Desktop | Electron | 41.x |
| Persistencia | SQLite (better-sqlite3) | 12.x |
| Criptografía | Node.js `crypto` (SHA-256) | nativa |
| Iconos | lucide-react | 0.546+ |
| PWA | vite-plugin-pwa | 1.x |
| TypeScript | typescript | 5.8 |

---

## 📁 Estructura del Proyecto

```
src/
├── App.tsx                    # Shell principal (sidebar + routing)
├── types/index.ts             # Interfaces TypeScript compartidas
├── constants/initial-states.ts # Estados iniciales de formularios
├── components/
│   ├── ui/                    # Componentes atómicos reutilizables
│   ├── pages/                 # Una página por cada tab/sección
│   ├── ForensicDashboard.tsx  # Dashboard interactivo de 10 pasos
│   ├── ManualViewer.tsx       # Visor del manual de procedimiento
│   └── PrintTemplates.tsx     # Vistas de impresión PDF
└── data/
    └── manual-procedimiento.ts # Datos del manual de custodia
```

> 📐 Arquitectura detallada: [ARCHITECTURE.md](ARCHITECTURE.md)

---

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor Vite en `localhost:3000` |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | Verificación de tipos TypeScript |
| `npm run electron:dev` | Ejecutar como app Electron |
| `npm run electron:build` | Build completo + empaquetado `.deb` |
| `npm run clean` | Limpiar directorio `dist/` |

---

## 👨‍💻 Autoría y Soporte

**Diseño UX/UI, Arquitectura de la Información y Programación:**
- **Autor**: julljoll
- **Correo**: julljoll@gmail.com
- **Web**: [sha256.us](https://sha256.us) | [siriusweb.us](https://siriusweb.us)

---

*Este proyecto es una herramienta forense profesional. Use bajo responsabilidad legal y siguiendo los protocolos institucionales.*
