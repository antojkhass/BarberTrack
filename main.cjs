// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
// detectamos si estamos en dev con esta pequeña librería:
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  if (isDev) {
    // Modo desarrollo: cargamos desde el servidor de Vite
    win.loadURL('http://localhost:5173');
  } else {
    // Modo producción: cargamos los archivos estáticos
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});