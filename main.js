const path = require('path');
const { menubar } = require('menubar');
const { app, BrowserWindow, globalShortcut, Tray } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });

  const mb = menubar({
    icon: path.join(__dirname, 'icon.png'),
  });

  mb.on('ready', () => {
    console.log('app is ready');
  });
  mainWindow = new BrowserWindow({
    width: 700,
    height: 150,
    frame: false,
  });

  mainWindow.loadFile('index.html');

  const openShortcut = globalShortcut.register('Control+Space', () => {
    mainWindow.show();
  });

  const closeShortcut = globalShortcut.register('Escape', () => {
    mainWindow.hide();
  });

  if (!openShortcut || !closeShortcut) {
    console.log('Registration failed.');
  }

  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });
});

app.on('window-all-closed', (event) => {
  event.preventDefault();
});
