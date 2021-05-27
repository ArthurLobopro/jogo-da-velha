const { app, BrowserWindow } = require("electron")
const Path = require('path')

//Ações de Minimizar, fechar, maximizar
require("./header/header-actions-main.js")

function mainWindow() {

    const win = new BrowserWindow({
        minHeight: 380,
        minWidth: 330,
        width:370,
        height: 440,
        frame: false,
        icon: Path.join(__dirname,"../assets/icon.png"),
        webPreferences:{
            nodeIntegration: true,
            preload: Path.join(__dirname, 'preload.js')
        }
    })
    //win.setMenu(null)
    win.setMenuBarVisibility(false)
    win.loadFile('index.html')
}

const isUnicInstance = app.requestSingleInstanceLock() //Verifica se o app já foi iniciado

if (!isUnicInstance) {
    app.quit() // Caso o app já tiver sido aberto ele é fechado
}else{
    app.whenReady().then(createWindow)
}

app.on('second-instance', () => {
    const win = BrowserWindow.getAllWindows()[0]
    if(win.isMinimized()) win.restore()
    win.center()
    win.focus()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow()
    }
})

// Faz com que o programa não inicie várias vezes durante a instalação
if (require('electron-squirrel-startup')){
    return app.quit();
}