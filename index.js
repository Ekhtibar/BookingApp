const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 650,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL('http://localhost:3000/');
}

app.whenReady().then(() => {
    Menu.setApplicationMenu(null); 
    createWindow(); 
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});