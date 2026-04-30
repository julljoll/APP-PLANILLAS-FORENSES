const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  generarPRCC: (data) => ipcRenderer.invoke('generar-prcc', data),
  buscarPorCedula: (cedula) => ipcRenderer.invoke('buscar-por-cedula', cedula),
  printToPDF: (data) => ipcRenderer.invoke('print-to-pdf', data),
  openHTMLFile: (filename) => ipcRenderer.invoke('open-html-file', filename)
});
