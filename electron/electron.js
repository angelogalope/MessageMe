const path = require('path');
const { app, BrowserWindow } = require('electron');
 
const isDev = process.env.IS_DEV == "true" ? true : false;
 
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 950,
    height: 695,
    autoHideMenuBar: true,
    resizable: false,
    frame: true,
    icon: path.join(__dirname, './public/images/MessageMeLogo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  const secWindow = new BrowserWindow({
    width: 950,
    height: 695,
    autoHideMenuBar: true,
    resizable: false,
    frame: true,
    icon: path.join(__dirname, './public/images/MessageMeLogo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  const thirdWindow = new BrowserWindow({
    width: 950,
    height: 695,
    autoHideMenuBar: true,
    resizable: false,
    frame: true,
    icon: path.join(__dirname, './public/images/MessageMeLogo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
  });
 
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  secWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  thirdWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });
 
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );

  secWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );

  thirdWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );

  // // Open the DevTools.
  // if (isDev) {
  //   //mainWindow.webContents.openDevTools();
  // }
 
}
 
 
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});
 
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});