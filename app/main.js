const path = require('path');
const { menubar } = require('menubar');
const { app, BrowserWindow, globalShortcut } = require('electron');

let mainWindow = null;

const createWindow = () => {
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
    opacity: 0.9,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  console.log('NODE_ENV:', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode');
    mainWindow.loadURL('http://localhost:5173'); // Cambia el puerto si es necesario
  } else {
    console.log('Dist');
    mainWindow.loadFile('src/dist/index.html');
  }

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
};

app.on('ready', createWindow);

app.on('window-all-closed', (event) => {
  event.preventDefault();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
