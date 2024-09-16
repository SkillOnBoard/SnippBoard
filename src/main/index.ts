/* eslint-disable prettier/prettier */
import { app, shell, BrowserWindow, ipcMain, globalShortcut, Tray, Menu, dialog } from 'electron'
import { join, dirname } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import trayIcon from '../../resources/logo.png?asset'
import seedsDataFile from '../../resources/data.json?commonjs-external&asset'
import { fork, ChildProcess } from 'child_process'
import { fileURLToPath } from 'url'
import * as fs from 'node:fs/promises'

// Ensure TypeScript can resolve __dirname correctly in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirnameLocal = dirname(__filename)

const seedDataPath = seedsDataFile
const defaultName = 'my_snipp-board-data.json'

let userDataPath: string = join(app.getPath('userData'), defaultName)

let tray: Tray | null = null
let serverProcess: ChildProcess | null = null

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
      }
    },
    {
      label: 'Change data path',
      click: (): void => {
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
      preload: join(__dirnameLocal, 'preload/index.js') // Use a preload script
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
app.whenReady().then(async () => {
  await initializeData();
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Start the server process with the user data path
  serverProcess = fork(join(__dirname, '../../server/server.mjs'), [userDataPath]);

  // Add error handling for the server process
  serverProcess.on('exit', (code, signal) => {
    console.log(`Server process exited with code ${code} and signal ${signal}`)
    serverProcess = null // Reset the process reference
  })
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

async function dataFileExists(): Promise<boolean> {
  try {
    await fs.access(userDataPath);
    return true;
  } catch (error) {
    return false;
  }
}

async function initializeData(): Promise<void> {
  try {
    // Check if the data file exists
    const dataExists = await dataFileExists()

    if (!dataExists) {
      // Load seed data from seed_data.json
      const seedData = await fs.readFile(seedDataPath, 'utf8');

      // Write seed data to userDataPath
      await fs.writeFile(userDataPath, seedData);
      console.log(`Seed data loaded into user data path ${userDataPath}`);
    }
  } catch (error) {
    console.error('Error initializing data:', error)
  }
}

// Function to let the user choose where to save their data
async function chooseDataPath(browserWindow: BrowserWindow | null): Promise<void> {
  if (!browserWindow) return

  // Check if the data file exists
  const dataExists = await dataFileExists()
  if (!dataExists) {
    dialog.showErrorBox('Error', 'Data file does not exist. Please restart the app.')
    return 
  }

  const result = dialog.showSaveDialogSync(browserWindow, {
    title: 'Choose where to save your data',
    defaultPath: join(app.getPath('documents'), defaultName ),
    filters: [{ name: 'JSON Files', extensions: ['json'] }]
  })

  if (result) {
    browserWindow.webContents.send('loading-start')

    try {
      const existingData =
        userDataPath && (await fs.readFile(userDataPath, 'utf8').catch(() => null))
      const options = ['Move existing data', 'Start fresh']
      const response = dialog.showMessageBoxSync(browserWindow, {
        type: 'question',
        buttons: options,
        defaultId: 0,
        cancelId: 1,
        title: 'Data Management',
        message: 'Do you want to move the existing data to the new location or start fresh?'
      })

      userDataPath = result

      if (response === 0 && existingData) {
        await fs.writeFile(userDataPath, existingData)
      } else {
        await fs.writeFile(userDataPath, '[]')
      }

      // Check if the server process is still running before sending a message
      if (serverProcess && !serverProcess.killed) {
        serverProcess.send({ type: 'data-path-chosen', path: userDataPath })
      } else {
        // Handle the case where the server process is no longer running
        console.error('Server process is not running. Cannot send the data path.')
      }
    } catch (error) {
      console.error('Error handling data file:', error)
      dialog.showErrorBox('Error', 'An error occurred while processing your data.')
    } finally {
      browserWindow.webContents.send('loading-end')
    }
  }
}
