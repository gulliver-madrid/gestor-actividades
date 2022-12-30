import { app, BrowserWindow } from 'electron';
import log4js from 'log4js';

import { isProduction } from '../helpers';
import { logger } from '../logging';
import './mainActions';
import { changeZoom, setupZoom } from './zoom';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = (): void => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.maximize();
    mainWindow.removeMenu();
    if (!isProduction()) mainWindow.webContents.openDevTools();

    mainWindow.webContents.on('dom-ready', () => {
        // console.log('dom-ready');
        if (!mainWindow) return;
        setupZoom(mainWindow);
    });
    mainWindow.webContents.on('zoom-changed', (_event, zoomDirection) => {
        console.log('zoom-changed');
        if (!mainWindow) return;
        changeZoom(mainWindow, zoomDirection);
    });

    // mainWindow.on('closed', () => {
    //     mainWindow = null;
    // });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        logger.info('Stopping log');
        log4js.shutdown();
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});