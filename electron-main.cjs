const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const Database = require('better-sqlite3');

// Database initialization
const dbPath = path.join(app.getPath('userData'), 'prcc.db');
const db = new Database(dbPath);

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS prcc (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cedula TEXT NOT NULL,
    hash TEXT UNIQUE NOT NULL,
    tipo TEXT NOT NULL,
    evidencia_descripcion TEXT,
    prcc_padre_hash TEXT,
    fecha_generacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    html_generado TEXT,
    datos_extra TEXT
  );
`);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Sistema de Gestión de PRCC - SHA256.US",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
  
  win.setMenuBarVisibility(false);
}

// IPC Handlers
ipcMain.handle('generar-prcc', async (event, data) => {
  const { cedula, tipo, descripcion, padreHash, extraData } = data;
  const timestamp = Date.now();
  const random = crypto.randomBytes(4).toString('hex');
  
  // SHA256(cedula + tipo + descripcion + timestamp + random [+ padreHash])
  const hashInput = `${cedula}${tipo}${descripcion}${timestamp}${random}${padreHash || ''}`;
  const hash = crypto.createHash('sha256').update(hashInput).digest('hex');
  
  // Logic for building HTML would normally be here or in a template
  // For now, we'll assume the frontend sends the HTML or we use a basic one
  const html = data.html || `<h1>PRCC ${tipo.toUpperCase()}</h1><p>Hash: ${hash}</p>`;

  try {
    const stmt = db.prepare(`
      INSERT INTO prcc (cedula, hash, tipo, evidencia_descripcion, prcc_padre_hash, html_generado, datos_extra)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(cedula, hash, tipo, descripcion, padreHash || null, html, JSON.stringify(extraData || {}));
    
    return { ok: true, hash, timestamp };
  } catch (error) {
    console.error('Error saving to DB:', error);
    return { ok: false, error: error.message };
  }
});

ipcMain.handle('buscar-por-cedula', async (event, cedula) => {
  try {
    const stmt = db.prepare('SELECT * FROM prcc WHERE cedula = ? ORDER BY fecha_generacion DESC');
    const rows = stmt.all(cedula);
    return { ok: true, data: rows };
  } catch (error) {
    return { ok: false, error: error.message };
  }
});

ipcMain.handle('print-to-pdf', async (event, { html, filename }) => {
  const win = new BrowserWindow({ show: false });
  await win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
  
  const { filePath } = await dialog.showSaveDialog({
    title: 'Guardar Planilla PRCC',
    defaultPath: path.join(app.getPath('documents'), filename),
    filters: [{ name: 'Adobe PDF', extensions: ['pdf'] }]
  });

  if (filePath) {
    const data = await win.webContents.printToPDF({
      pageSize: 'A4',
      printBackground: true
    });
    fs.writeFileSync(filePath, data);
    win.close();
    return { ok: true, path: filePath };
  }
  
  win.close();
  return { ok: false, error: 'Cancelled' };
});

ipcMain.handle('open-html-file', async (event, filename) => {
  const filePath = path.join(__dirname, filename);
  const win = new BrowserWindow({
    width: 1000,
    height: 900,
    title: `Visualizador de Plantilla - ${filename}`,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  
  win.loadFile(filePath);
  win.setMenuBarVisibility(false);
  return { ok: true };
});

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
