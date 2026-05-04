/**
 * @copyright Copyright (c) 2026 julljoll
 * SPDX-License-Identifier: MIT
 *
 * Tipos compartidos del Sistema de Planillas Forenses SHA256
 */

// ── Registros de base de datos ──

export interface PRCCRecord {
  id: number;
  cedula: string;
  hash: string;
  tipo: 'inicial' | 'derivada';
  evidencia_descripcion: string;
  prcc_padre_hash: string | null;
  fecha_generacion: string;
  html_generado: string;
  datos_extra: string;
}

// ── Resultados forenses ──

export interface ForensicResult {
  id: string;
  name: string;
  date: string;
  path: string;
  size: string;
  hash: string;
}

// ── Dictamen Pericial ──

export interface ReportData {
  motivo: string;
  descripcion: string;
  examenes: {
    andrillerVersion: string;
    aleappVersion: string;
    linuxVersion: string;
    tecnicas: string;
    valoresHashGrales: string;
  };
  resultados: ForensicResult[];
  conclusiones: string;
  consumoEvidencia: string;
  perito: { nombre: string; sello: string };
}

// ── Planilla PRCC ──

export interface PRCCData {
  expediente: string;
  prcc: string;
  despachoInstruye: string;
  organismoInstruye: string;
  despachoInicia: string;
  organismoInicia: string;
  direccion: string;
  fechaHora: string;
  formaObtencion: string;
  fijacion: { nombre: string; ci: string };
  coleccion: { nombre: string; ci: string };
  descripcion: string;
  motivoTransferencia: string;
  entrega: { nombre: string; organismo: string; despacho: string; ci: string };
  recibe: { nombre: string; organismo: string; despacho: string; ci: string };
  observaciones: string;
}

// ── Acta de Consignación ──

export interface ActaData {
  expediente: string;
  prcc: string;
  organismo: string;
  oficina: string;
  direccion: string;
  fecha: string;
  hora: string;
  coleccion: { nombre: string; ci: string };
  fijacion: { nombre: string; ci: string };
  consignante: { nombre: string; ci: string };
  dispositivo: {
    marcaModelo: string;
    imei: string;
    numero: string;
    estadoFisico: string;
  };
  descripcion: string;
  observaciones: string;
}

// ── Tabs de navegación ──

export type AppTab =
  | 'gestor-prcc'
  | 'acta'
  | 'prcc'
  | 'dictamen'
  | 'manual'
  | 'seguimiento';

// ── Electron API (preload bridge) ──

export interface ElectronAPI {
  generarPRCC: (data: Record<string, unknown>) => Promise<{ ok: boolean; hash?: string; error?: string }>;
  buscarPorCedula: (cedula: string) => Promise<{ ok: boolean; data?: PRCCRecord[]; error?: string }>;
  printToPDF: (data: { html: string; filename: string }) => Promise<{ ok: boolean; path?: string; error?: string }>;
  openHTMLFile: (filename: string) => Promise<{ ok: boolean; error?: string }>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}
