const { app, BrowserWindow } = require("electron")
const Path = require('path')

//Ações de Minimizar, fechar, maximizar
//require("./header-actions-main.js")

function mainWindow() {

    const win = new BrowserWindow({
        //frame: false,
        //icon: Path.join(__dirname,"../assets/icon32.png"),
        webPreferences:{
            nodeIntegration: true,
            //preload: Path.join(__dirname, 'preload.js')
        }
    })
    //win.setMenu(null)
    win.setMenuBarVisibility(false)
    win.loadFile('index.html')
}

app.whenReady().then(mainWindow)

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