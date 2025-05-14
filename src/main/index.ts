import {
  app,
  clipboard,
  shell,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  Tray,
  Menu,
  nativeImage,
  screen
} from 'electron'
import { keyboard, Key, sleep } from '@nut-tree-fork/nut-js'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import trayIcon from '../../resources/icon.ico?asset'

import { runMigrations } from './migrator'
import { Snippet, Label } from './models'
import { exec } from 'child_process'

type SnippetFields = {
  title: string
  content: string
  labels: Label[]
}

let tray: Tray | null = null
let toastWindow: BrowserWindow | null = null
const createTrayMenu = (mainWindow: BrowserWindow): void => {
  const image = nativeImage.createFromPath(trayIcon)
  const resizedImage = image.resize({ width: 16 })
  resizedImage.setTemplateImage(true)
  tray = new Tray(resizedImage)

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
    // {
    //   label: 'Check for Updates',
    //   click: (): void => {
    //     console.log('Check for Updates clicked')
    //   }
    // },
    // {
    //   label: 'Settings',
    //   click: (): void => {
    //     console.log('Settings clicked')
    //   }
    // },
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

function createToast(message: string): void {
  // If toast already exists, destroy it
  if (toastWindow) {
    toastWindow.close()
    toastWindow = null
  }

  // Get position near tray icon
  const { bounds } = screen.getPrimaryDisplay()
  const x = bounds.width - 300 - 20 // Right margin
  const y = 40 // Top margin (can adjust)

  toastWindow = new BrowserWindow({
    width: 300,
    height: 60,
    x,
    y,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    transparent: true,
    resizable: false,
    show: false,
    focusable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  toastWindow.loadURL(
    `data:text/html;charset=utf-8,${encodeURIComponent(`
    <html>
      <body style="margin:0;padding:0;font-family:sans-serif;background:rgba(30,30,30,0.85);color:white;display:flex;align-items:center;justify-content:center;height:100%;border-radius:8px;">
        <div>${message}</div>
      </body>
    </html>
  `)}`
  )

  toastWindow.once('ready-to-show', () => {
    toastWindow?.show()
  })

  // Auto-hide after 10 seconds
  setTimeout(() => {
    toastWindow?.close()
    toastWindow = null
  }, 10000)
}

function createWindow(): BrowserWindow {
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

  globalShortcut.register('Control+Shift+C', async () => {
    // Simulate Cmd+C in the active app
    await keyboard.pressKey(Key.LeftSuper, Key.C)
    await keyboard.releaseKey(Key.LeftSuper, Key.C)

    const copiedText = clipboard.readText('selection')

    const snippetData = {
      title: 'Untitled snippet ' + new Date().toISOString(),
      content: copiedText,
      labels: [] // TODO: Add labels using AI
    }
    await createSnippet(snippetData).then(() => {
      createToast(`✅ Snippet was saved!`)
    })
  })

  if (!openShortcut) {
    console.log('Registration failed.')
  }

  mainWindow.on('close', (event) => {
    event.preventDefault()
    app.exit()
  })

  mainWindow.on('blur', () => {
    if (!is.dev) mainWindow.hide()
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

ipcMain.on('close-and-paste', async () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win) {
    win.hide()
    exec(`osascript -e 'tell application "System Events" to key code 48 using {command down}'`)
    await sleep(300)
    await keyboard.pressKey(Key.LeftSuper, Key.V)
    await keyboard.releaseKey(Key.LeftSuper, Key.V)
  }
})

ipcMain.on('list-snippets', async (event, searchData) => {
  try {
    const ids = searchData?.ids
    const snippets = await Snippet.findAll({
      where: ids && ids.length > 0 ? { id: ids } : undefined,
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

const createSnippet = async (snippetData: SnippetFields): Promise<Snippet> => {
  const promiseLabels = snippetData.labels.map(async (label) => {
    if (label.id === null || label.id === undefined) {
      return Label.create({ title: label.title })
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

  return newSnippet.toJSON()
}

ipcMain.on('create-snippet', async (event, snippetData) => {
  try {
    const serializedData = await createSnippet(snippetData)
    event.reply('create-snippet-response', { status: 'success', message: serializedData })
  } catch (error) {
    event.reply('create-snippet-response', { status: 'error', message: error })
  }
})

ipcMain.on('update-snippet', async (event, snippetData) => {
  try {
    const snippet = await Snippet.findByPk(snippetData.id)
    if (snippet) {
      const promiseLabels = snippetData.labels.map(async (label) => {
        if (label.id === null || label.id === undefined) {
          return Label.create(label)
        } else {
          return Label.findByPk(label.id)
        }
      })

      const labels = await Promise.all(promiseLabels)

      // This any is because .setLabels() is not typed
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newSnippet: any = await snippet.update({
        title: snippetData.title,
        content: snippetData.content
      })

      await newSnippet.setLabels(labels)

      const serializedData = newSnippet.toJSON()
      event.reply('update-snippet-response', { status: 'success', message: serializedData })
    } else {
      throw new Error('Snippet not found')
    }
  } catch (error) {
    event.reply('update-snippet-response', { status: 'error', message: error })
  }
})

ipcMain.on('delete-snippet', async (event, snippetId) => {
  try {
    const snippet = await Snippet.findByPk(snippetId)
    if (snippet) {
      await snippet.destroy()
    } else {
      throw new Error('Snippet not found')
    }
    event.reply('delete-snippet-response', { status: 'success', message: 'Snippet deleted' })
  } catch (error) {
    event.reply('delete-snippet-response', { status: 'error', message: error })
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
