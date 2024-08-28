import { app, shell, BrowserWindow, ipcMain, globalShortcut, Tray, Menu, dialog } from 'electron'
import { join } from 'path'
import path from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import trayIcon from '../../resources/logo.png?asset'
import { fork, ChildProcess } from 'child_process'
import fs from 'fs'

// Ensure TypeScript can resolve __dirname correctly in ES modules
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirnameLocal = dirname(__filename)

let tray: Tray | null = null
let serverProcess: ChildProcess | null = null
let userDataPath: string | null = null

const createTrayMenu = (browserWindow: BrowserWindow): void => {
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
        chooseDataPath(browserWindow)
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
    opacity: 0.9,
    show: false,
    frame: false,
    resizable: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: false, // Disable Node.js integration in the renderer
      contextIsolation: true, // Enforce context isolation
      preload: path.join(__dirnameLocal, 'preload/index.js') // Use a preload script
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
    mainWindow.loadFile(join(__dirnameLocal, '../renderer/index.html'))
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

  createTrayMenu(mainWindow)
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

  // Server Data
  // userDataPath = chooseDataPath() || path.join(app.getPath('userData'), 'data.json')
  // serverProcess = fork(path.join(__dirnameLocal, '../../server/server.mjs'), [userDataPath])

  userDataPath = path.join(app.getPath('userData'), 'data.json')

  // Start the server process
  serverProcess = fork(path.join(__dirnameLocal, '../../server/server.mjs'), [userDataPath])
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('before-quit', () => {
  if (serverProcess) serverProcess.kill()
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

// Function to let the user choose where to save their data
function chooseDataPath(browserWindow: BrowserWindow): void {
  const result = dialog.showSaveDialogSync(browserWindow, {
    title: 'Choose where to save your data',
    defaultPath: path.join(app.getPath('documents'), 'my-electron-app-data.json'),
    filters: [{ name: 'JSON Files', extensions: ['json'] }]
  })

  if (result) {
    userDataPath = result
    fs.writeFileSync(userDataPath, '[]') // Initialize with an empty array

    // Inform the renderer process about the new path
    browserWindow.webContents.send('data-path-chosen', userDataPath)

    // If the server is already running, you might need to restart it with the new path
    if (serverProcess) {
      serverProcess.kill()
      serverProcess = fork(path.join(__dirnameLocal, '../../server/server.js'), [userDataPath])
    } else {
      serverProcess = fork(path.join(__dirnameLocal, '../../server/server.js'), [userDataPath])
    }
  }
}
