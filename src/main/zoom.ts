import { BrowserWindow } from 'electron';

let zoomCountDebug = 0;

const ZOOM_VAR = 0.1;
let currentZoomFactorPercentGlobal: number;

const getCurrentZoomPercent = (): number => currentZoomFactorPercentGlobal;

const currentZoomFactorPercent = (win: BrowserWindow): number =>
    win.webContents.zoomFactor * 100;

const setZoomFactor = (win: BrowserWindow, zoom: number) => {
    // zoom is a float (1.0 = 100%)
    win.webContents.zoomFactor = zoom;
    currentZoomFactorPercentGlobal = currentZoomFactorPercent(win);
    zoomCountDebug++;
    console.log(
        'Current zoom:',
        `${currentZoomFactorPercentGlobal.toFixed(
            0
        )}% (count: ${zoomCountDebug})`
    );
};

const setupZoom = (win: BrowserWindow) => setZoomFactor(win, 1.0);

const changeZoom = (win: BrowserWindow, zoomDirection: 'in' | 'out') => {
    const currentZoom = win.webContents.getZoomFactor();
    if (zoomDirection === 'in') {
        if (currentZoom <= 1.8) {
            setZoomFactor(win, currentZoom + ZOOM_VAR);
        }
    } else if (zoomDirection === 'out') {
        if (currentZoom >= 0.6) {
            setZoomFactor(win, currentZoom - ZOOM_VAR);
        }
    }
};

export { changeZoom, setupZoom, getCurrentZoomPercent };
