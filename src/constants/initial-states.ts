/**
 * @copyright Copyright (c) 2026 julljoll
 * SPDX-License-Identifier: MIT
 *
 * Estados iniciales para los formularios del sistema
 */

import type { ReportData, PRCCData, ActaData } from '../types';

export const initialReport: ReportData = {
  motivo: '',
  descripcion: '',
  examenes: {
    andrillerVersion: 'v3.6.4',
    aleappVersion: 'v3.1.2',
    linuxVersion: 'Ubuntu 24.04 LTS',
    tecnicas: 'Extracción lógica y física (solo lectura)',
    valoresHashGrales: '',
  },
  resultados: [],
  conclusiones: '',
  consumoEvidencia:
    'La evidencia NO fue consumida ni alterada durante el proceso de peritación.',
  perito: { nombre: '', sello: '' },
};

export const initialPRCC: PRCCData = {
  expediente: '',
  prcc: '',
  despachoInstruye: '',
  organismoInstruye: '',
  despachoInicia: '',
  organismoInicia: '',
  direccion: '',
  fechaHora: new Date().toLocaleString(),
  formaObtencion: 'Obtención por Consignación',
  fijacion: { nombre: '', ci: '' },
  coleccion: { nombre: '', ci: '' },
  descripcion: '',
  motivoTransferencia: '',
  entrega: { nombre: '', organismo: '', despacho: '', ci: '' },
  recibe: { nombre: '', organismo: '', despacho: '', ci: '' },
  observaciones: '',
};

export const initialActa: ActaData = {
  expediente: '',
  prcc: '',
  organismo: '',
  oficina: '',
  direccion: '',
  fecha: new Date().toLocaleDateString(),
  hora: new Date().toLocaleTimeString(),
  coleccion: { nombre: '', ci: '' },
  fijacion: { nombre: '', ci: '' },
  consignante: { nombre: '', ci: '' },
  dispositivo: { marcaModelo: '', imei: '', numero: '', estadoFisico: '' },
  descripcion: '',
  observaciones: '',
};
