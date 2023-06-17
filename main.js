const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const myServer = require('./dbmgn.js');

let mainWindow;
let aboutWindow;
//const isDeveloper = process.env.NODE_ENV !== 'production';

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Financial Planning",
   // width: isDeveloper ? 1000 : 900,
    height: 550,
    //autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  Menu.setApplicationMenu(null);
/*
  if (isDeveloper) {
    mainWindow.webContents.openDevTools();
  }*/

  mainWindow.loadFile(path.join(__dirname, 'src/renderer/start.html'));

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    createMenu();
    // mainWindow.webContents.openDevTools();
  });

  ipcMain.on('final:breakdown', (event, data) => {
    const { text, idText } = data;
    myServer.insertText(text, idText);
  });

  ipcMain.on('retrieveID', async (event, message) => {
    const breakdown = await myServer.retrieveMessages(message);
    mainWindow.webContents.send("sendResponse", breakdown);
  });
}

function createMenu() {
 /* const template = [
    {
      label: 'Settings',
      submenu: [
        {
          label: 'About',
          click: createAboutWindow,
        },
        { role: 'quit' },
      ],
    },
  ];*/
  const template = [
    {
      
          label: 'About',
          click: createAboutWindow,
        },
        { role: 'quit' },
      ];
  
  

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    width: 500,
    height: 500,
    title: 'About',
  });

  aboutWindow.loadFile(path.join(__dirname, 'src/renderer/about.html'));
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Close the database connection
app.on('before-quit', () => {
  myServer.closeDatabaseConnection();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
