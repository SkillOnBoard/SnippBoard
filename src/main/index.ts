import { app, shell, BrowserWindow, ipcMain, globalShortcut, Tray, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import trayIcon from '../../resources/icon.ico?asset'

import { runMigrations } from './migrator'
import { Snippet, Label } from './models'

let tray: Tray | null = null

const createTrayMenu = (mainWindow: BrowserWindow): void => {
  tray = new Tray(trayIcon)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Commands',
      submenu: [
        {
          label: 'Open searchbar',
          accelerator: 'Control+Space',
          click: (): void => mainWindow.show()
        },
        {
          label: 'Hide searchbar',
          accelerator: 'Control+Space',
          click: (): void => mainWindow.hide()
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: (): void => app.exit()
        }
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'About SnippBoard',
      role: 'about'
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
    alwaysOnTop: true,
    width: 750,
    height: 100,
    show: false,
    frame: false,
    resizable: false,
    icon: icon,
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
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })

  if (!openShortcut) {
    console.log('Registration failed.')
  }

  mainWindow.on('close', (event) => {
    event.preventDefault()
    app.exit()
  })

  mainWindow.on('blur', () => {
    mainWindow.hide()
  })

  ipcMain.on('hide-window', () => {
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
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  app.dock.setIcon(icon)
  app.dock.hide()

  await runMigrations()

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  app.setLoginItemSettings({
    openAtLogin: true
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    } else {
      BrowserWindow.getAllWindows().forEach((win) => {
        win.show()
      })
    }
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
    const snippets = await Snippet.findAll({
      include: [
        {
          model: Label,
          as: 'labels'
        }
      ]
    })
    const serializedData = snippets.map((snippet) => snippet.toJSON())
    event.reply('list-snippets-response', { status: 'success', message: serializedData })
  } catch (error) {
    event.reply('list-snippets-response', { status: 'error', message: error })
  }
})

ipcMain.on('create-snippet', async (event, snippetData) => {
  try {
    const promiseLabels = snippetData.labels.map(async (label) => {
      if (label.id === null || label.id === undefined) {
        return Label.create(label)
      } else {
        return Label.findByPk(label.id)
      }
    })

    const labels = await Promise.all(promiseLabels)

    // This any is because .addLabels() is not typed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newSnippet: any = await Snippet.create({
      title: snippetData.title,
      content: snippetData.content
    })

    newSnippet.addLabels(labels)

    const serializedData = newSnippet.toJSON()
    event.reply('create-snippet-response', { status: 'success', message: serializedData })
  } catch (error) {
    event.reply('create-snippet-response', { status: 'error', message: error })
  }
})

ipcMain.on('list-tags', async (event) => {
  try {
    const labels = await Label.findAll()
    const serializedData = labels.map((label) => label.toJSON())
    event.reply('list-tags-response', { status: 'success', message: serializedData })
  } catch (error) {
    event.reply('list-tags-response', { status: 'error', message: error })
  }
})
