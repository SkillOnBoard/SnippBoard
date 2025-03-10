import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  listSnippetsResponse: (callback): unknown => ipcRenderer.on('list-snippets-response', callback),
  createSnippetResponse: (callback): unknown => ipcRenderer.on('create-snippet-response', callback),
  updateSnippetResponse: (callback): unknown => ipcRenderer.on('update-snippet-response', callback),
  deleteSnippetResponse: (callback): unknown => ipcRenderer.on('delete-snippet-response', callback),
  listTagsResponse: (callback): unknown => ipcRenderer.on('list-tags-response', callback)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
