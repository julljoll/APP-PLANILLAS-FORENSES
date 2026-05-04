# 🏗️ Arquitectura — APP-PLANILLAS-FORENSES

> Documento técnico de referencia para desarrolladores.  
> Última actualización: 2026-05-04 | Versión 3.0 (Modular)

---

## Visión General

Aplicación de escritorio (Electron) + PWA para la gestión de planillas forenses
según el Manual Único de Cadena de Custodia de Venezuela (2017). Genera documentos
legales firmados con SHA-256 para garantizar la inalterabilidad de la evidencia.

```
┌─────────────────────────────────────────────────────────┐
│                    ELECTRON SHELL                       │
│  electron-main.cjs ──► better-sqlite3 (prcc.db)        │
│  preload.js ──► IPC Bridge (contextBridge)              │
├─────────────────────────────────────────────────────────┤
│                   VITE + REACT 19                       │
│                                                         │
│  App.tsx (Shell)                                        │
│    ├── pages/GestorPRCC      → Tab "Gestor de PRCC"     │
│    ├── pages/ActaPage        → Tab "Acta Consignación"  │
│    ├── pages/PRCCPage        → Tab "Planilla PRCC"      │
│    ├── pages/DictamenPage    → Tab "Dictamen Pericial"  │
│    ├── pages/SeguimientoPage → Tab "Seguimiento"        │
│    ├── ManualViewer          → Tab "Manual de Usuario"  │
│    └── PrintTemplates        → Vistas de impresión PDF  │
│                                                         │
│  ui/ ── SidebarButton, FormCard, InputField, Textarea   │
│  types/ ── Interfaces TypeScript compartidas            │
│  constants/ ── Estados iniciales de formularios         │
│  data/ ── manual-procedimiento.ts (datos del manual)    │
└─────────────────────────────────────────────────────────┘
```

---

## Estructura de Archivos

```
src/
├── App.tsx                          # Shell principal (~120 líneas)
├── main.tsx                         # Entry point React
├── UpdatePrompt.tsx                 # PWA auto-update
├── index.css                        # Tailwind v4 + estilos de impresión
│
├── types/
│   └── index.ts                     # Interfaces: PRCCRecord, ReportData, etc.
│
├── constants/
│   └── initial-states.ts            # Estados iniciales de formularios
│
├── components/
│   ├── ui/                          # Componentes atómicos reutilizables
│   │   ├── index.ts                 #   barrel export
│   │   ├── SidebarButton.tsx        #   botón de navegación lateral
│   │   ├── FormCard.tsx             #   tarjeta contenedora de sección
│   │   ├── InputField.tsx           #   input con label
│   │   └── TextareaField.tsx        #   textarea con label
│   │
│   ├── pages/                       # Páginas (una por tab/sección)
│   │   ├── index.ts                 #   barrel export
│   │   ├── GestorPRCC.tsx           #   gestión y búsqueda de planillas
│   │   ├── ActaPage.tsx             #   formulario de acta consignación
│   │   ├── PRCCPage.tsx             #   formulario de planilla PRCC
│   │   ├── DictamenPage.tsx         #   formulario de dictamen pericial
│   │   └── SeguimientoPage.tsx      #   dashboard + protocolo forense
│   │
│   ├── ForensicDashboard.tsx        # Dashboard interactivo de 10 pasos
│   ├── ManualViewer.tsx             # Visor del manual de procedimiento
│   └── PrintTemplates.tsx           # Vistas de impresión (PRCC, Acta, Dictamen)
│
└── data/
    └── manual-procedimiento.ts      # Datos del manual de cadena de custodia

electron-main.cjs                    # Proceso principal de Electron
preload.js                           # Puente IPC (contextBridge)
vite.config.ts                       # Configuración de Vite + CSP + PWA
```

---

## Cómo Modificar una Sección

Cada tab de la aplicación es un **componente independiente**. Para modificar
una sección específica, solo necesitas editar un archivo:

| Sección en la UI | Archivo a editar | Independiente |
|---|---|:---:|
| Gestor de PRCC | `src/components/pages/GestorPRCC.tsx` | ✅ |
| Acta de Consignación | `src/components/pages/ActaPage.tsx` | ✅ |
| Planilla PRCC | `src/components/pages/PRCCPage.tsx` | ✅ |
| Dictamen Pericial | `src/components/pages/DictamenPage.tsx` | ✅ |
| Seguimiento de Cadena | `src/components/pages/SeguimientoPage.tsx` | ✅ |
| Dashboard Forense (10 pasos) | `src/components/ForensicDashboard.tsx` | ✅ |
| Manual de Usuario | `src/components/ManualViewer.tsx` | ✅ |
| Vistas de Impresión | `src/components/PrintTemplates.tsx` | ✅ |
| Sidebar / Layout global | `src/App.tsx` | — |
| Componentes de formulario | `src/components/ui/*.tsx` | ✅ |
| Tipos TypeScript | `src/types/index.ts` | ✅ |
| Datos del manual | `src/data/manual-procedimiento.ts` | ✅ |

---

## Flujo de Datos

```
                    App.tsx (Shell)
                        │
          ┌─────────────┼─────────────┐
          │             │             │
     [report]       [prcc]        [acta]
     useState       useState      useState
          │             │             │
          ▼             ▼             ▼
    DictamenPage    PRCCPage     ActaPage
    (edita report)  (edita prcc) (edita acta)
          │             │             │
          └─────────────┼─────────────┘
                        │
                        ▼
                  PrintTemplates
                (renderiza PDF con datos)
```

- **GestorPRCC** y **SeguimientoPage** manejan su propio estado interno
- Los formularios de Dictamen, PRCC y Acta elevan su estado a `App.tsx`
  porque `PrintTemplates` necesita acceso a los datos para generar el PDF

---

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| **UI Framework** | React | 19.x |
| **Bundler** | Vite | 6.x |
| **Estilos** | TailwindCSS | 4.x |
| **Iconos** | lucide-react | 0.546+ |
| **Animaciones** | motion (framer) | 12.x |
| **Desktop** | Electron | 41.x |
| **Base de datos** | better-sqlite3 | 12.x |
| **Criptografía** | Node.js crypto | nativa |
| **PWA** | vite-plugin-pwa | 1.x |
| **TypeScript** | typescript | 5.8 |

---

## IPC Electron

El proceso principal (`electron-main.cjs`) expone 4 canales vía `preload.js`:

| Canal IPC | Función | Retorno |
|-----------|---------|---------|
| `generar-prcc` | Genera hash SHA-256, inserta en SQLite | `{ ok, hash }` |
| `buscar-por-cedula` | Consulta historial por cédula | `{ ok, data[] }` |
| `print-to-pdf` | Renderiza HTML → PDF vía Chromium | `{ ok, path }` |
| `open-html-file` | Abre plantilla HTML en ventana nueva | `{ ok }` |

---

## Plantillas HTML Legales

Tres documentos HTML autónomos ubicados en la raíz del proyecto y en `public/templates/`:

| Archivo | Documento |
|---------|-----------|
| `acta_obtencion_consignacion.html` | Acta de Obtención por Consignación |
| `planilla_prcc_derivacion.html` | Planilla PRCC de Derivación |
| `seguimiento.html` | Protocolo de Seguimiento "Cero Riesgo de Nulidad" |

---

## Seguridad

- **CSP** configurado en `index.html` y `vite.config.ts`
- **contextIsolation** habilitado en Electron
- **nodeIntegration** deshabilitado
- Cabeceras: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- API key de Gemini solo se inyecta en tiempo de compilación (no hardcodeada)
