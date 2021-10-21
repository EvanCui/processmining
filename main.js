const { app, BrowserWindow } = require('electron')
const path = require('path')

function initialize() {
    function createWindow() {
        const { screen } = require('electron')
        const { width, height } = screen.getPrimaryDisplay().workAreaSize

        const win = new BrowserWindow({
            width: width,
            height: height,
        })

        const startUrl = path.join(__dirname, "/build/index.html");

        win.loadURL(startUrl)
    }

    app.whenReady().then(() => {
        createWindow()
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow()
            }
        })
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
}

initialize()
