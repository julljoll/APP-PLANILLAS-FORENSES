const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Planillas Forenses SHA256.US",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // En producción, cargamos el index.html construido por Vite
  win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  
  // Ocultar el menú de navegación por defecto para que parezca app nativa
  win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
