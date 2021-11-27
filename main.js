const { app, BrowserWindow } = require('electron')
const path = require('path');

function initialize() {
    function createWindow() {
        const { screen } = require('electron')
        const { width, height } = screen.getPrimaryDisplay().workAreaSize

        const win = new BrowserWindow({
            width: parseInt(width / 1.2),
            height: parseInt(height / 1.2),
            frame: false,
            darkTheme: true
        })

        const startUrl = path.join(__dirname, "/build/index.html");

        win.loadURL(startUrl)

        //        win.webContents.openDevTools({ mode: 'detach' })
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
