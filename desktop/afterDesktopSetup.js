// @flow

/**
 * This file is executed at the end of the Electron configuration.
 * Use it to set up your Electron app after all of the default setup (but before the main window).
 */
//imports

import { app, screen } from 'electron'
import path from 'path'
import os from 'os'
import cors from 'cors'
import {
  setupIpc as setupWindowIpc,
  showWindow,
  createWindow,
  hideWindow,
  destroyWindow
} from '@atomos/atomizer-desktop/window'
import { setupIpc as setupNativeModuleIpc } from '@atomos/atomizer-desktop/native-modules'
import { syncStores } from '@atomos/atomizer-desktop/stores'
import { subscribe as subscribeWithIpc } from '@atomos/atomizer-desktop/ipc'
import { getAppPath } from '@atomos/atomizer-desktop/utils'
import './menu'

import express from 'express'
import apiRoutes from './apiRoutes'
// *****************

// *****************
// Defaults
// =================
const HTTP_PORT = 3131
const ICON_PATH = path.resolve(
  process.cwd(),
  'resources/icons',
  process.platform === 'darwin' ? 'mac/icon.icns' : 'win/icon.ico'
)

// =================


// =================
// Init
// =================
syncStores()

setupWindowIpc()
setupNativeModuleIpc()


// =================
// Removes deprecation warning
app.allowRendererProcessReuse = true

app.on('will-finish-launching', (): void => {
  app.disableHardwareAcceleration()
})

app.on('window-all-closed', (): void => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', (): void => {
  start()
})


// =================
// Setting up HTTP server, to use with the routing systen and backend
// =================
const webServer = express()
webServer.use(express.urlencoded({ extended: true }))
webServer.use(express.static(`${getAppPath()}/build`))
webServer.listen(HTTP_PORT, () => {
  console.log(`Webserver listening on port ${HTTP_PORT}`)
})

webServer.use(cors())
// webServer.use(apiRoutes)
// =================
// =================
const handleRedirect = (windowInstance, event, url) => {
  if (
    windowInstance &&
    mainWindow &&
    url !== mainWindow.electronWindow.webContents.getURL()
  ) {
    event.preventDefault()
    require('electron').shell.openExternal(url)
  }
}
// =================

// =================
// MACOS Only
// =================
if (app.dock && process.env.NODE_ENV === 'development') {
  app.dock.setIcon(path.resolve(process.cwd(), 'resources/desktop-icon.png'))
  app.dock.setBadge('DEV!')
}
// =================
// =================
// Windows Declaration
// =================
// =================

// =================
// Splash Screen Window
// =================
const splashScreenWindow = createWindow('splashWindow', 'build.empty.html', {
  show: false,
  frame: false,
  transparent: false,
  width: 800,
  minWidth: 800,
  maxWidth: 800,
  height: 600,
  minHeight: 600,
  maxHeight: 600,
  icon: ICON_PATH,
  webPreferences: {
    nodeIntegration: true
  }
})
// =================
const {width, height} = screen.getPrimaryDisplay().workAreaSize

const mainScreenWindow = createWindow('mainWindow', 'build.empty.html',{
  show: false,
  resizable: true,
  transparent: false,
  width: width,
  height: height,
  icon: ICON_PATH,
  webPreferences:{
    nodeIntegration: true
  }
})

// Main Screen Window
// =================

// ================= 


// =================
// IPC Window Controller
// =================
subscribeWithIpc(
  'windowController',
  'open-window',
  ({ message, fromWindowId }) => {
    switch (message) {
      case 'mainWindow':
        showWindow('mainWindow')
        mainScreenWindow.electronWindow().loadURL(`http://localhost:${HTTP_PORT}#/main`)

        if (process.env.NODE_ENV === 'development') {
          mainScreenWindow.electronWindow.webContents.openDevTools()
        }

        break;

      default:
        break
    }
  }
)

subscribeWithIpc(
  'windowController',
  'hide-window',
  ({ message, fromWindowId }) => {
    switch (message) {

      case 'splashWindow':
        hideWindow('splashWindow')
        break;

      default:
        break
    }
  }
)
// =================

// ---#/splash


function start(): void {
  showWindow('splashWindow')
  splashScreenWindow.electronWindow.loadURL(`http://localhost:${HTTP_PORT}#/splash`)

  // if (process.env.NODE_ENV === 'development') {
  //   splashScreenWindow.electronWindow.webContents.openDevTools()
  // }
}

start()
