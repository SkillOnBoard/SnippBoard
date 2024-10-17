import { app, shell, BrowserWindow, ipcMain, globalShortcut, Tray, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import trayIcon from '../../resources/logo.png?asset'

import * as fs from 'node:fs/promises'
import * as path from 'path'

const userDataPath = app.getPath('userData');
const datafile = path.join(userDataPath, 'data.json');

let tray: Tray | null = null

const createTrayMenu = (): void => {
  tray = new Tray(trayIcon)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'About SnippBoard',
      click: (): void => {
        console.log('About SnippBoard clicked')
      }
    },
    {
      label: 'Check for Updates',
      click: (): void => {
        console.log('Check for Updates clicked')
      }
    },
    {
      label: 'Settings',
      click: (): void => {
        console.log('Settings clicked')
      }
    },
    {
      label: 'Quit',
      click: (): void => {
        app.exit()
      }
    }
  ])

  tray.setToolTip('SnippBoard')
  tray.setContextMenu(contextMenu)
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 750,
    height: 100,
    show: false,
    frame: false,
    resizable: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  const openShortcut = globalShortcut.register('Control+Space', () => {
    mainWindow.show()
  })

  const closeShortcut = globalShortcut.register('Escape', () => {
    mainWindow.hide()
  })

  if (!openShortcut || !closeShortcut) {
    console.log('Registration failed.')
  }

  mainWindow.on('close', (event) => {
    event.preventDefault()
    mainWindow.hide()
  })

  ipcMain.on('resize-window', (_event, size) => {
    switch (size) {
      case 'small': {
        mainWindow.setSize(750, 100)
        break
      }
      case 'big': {
        mainWindow.setSize(750, 400)
        break
      }
      default: {
        mainWindow.setSize(750, 100)
      }
    }
  })

  createTrayMenu()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.exit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('list-snippets', async (event) => {
  try {
    const data = JSON.parse(await fs.readFile(datafile, 'utf8'))
    console.log(datafile)
    event.reply('list-snippets-response', { status: 'success', message: data })
  } catch (error) {
    event.reply('list-snippets-response', { status: 'error', message: error })
  }
})

ipcMain.on('create-snippet', async (event, snippet) => {
  try {
    await fs.access(datafile)
  } catch {
    await fs.writeFile(datafile, '[]')
  }
  try {
    const data = JSON.parse(await fs.readFile(datafile, 'utf8'))
    data.push(snippet)
    await fs.writeFile(datafile, JSON.stringify(data, null, 2))
    event.reply('create-snippet-response', { status: 'success', message: data })
  } catch (error) {
    event.reply('create-snippet-response', { status: 'error', message: error })
  }
})
