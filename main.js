

// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const pdf = require('jspdf');

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
      // Create the browser window
      title: "Finantial Planning",
      width: 900, height: 550,
       // width: isDeveloper ? 1000: 6000, // if in dev mode will open widht with 1000px
        ///height : 600,
        autoHideMenuBar: true, // it will hide the default menu

        // it will only diaplay the page when all is loaded to avoid falshes
        show: false, 
        
        // adding node (Integration) 
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: true,
          preload: path.join(__dirname, '/preload.js'),
        },
    })

  

// mainWindow.loadURL("https://www.electronjs.org/docs/latest/api/browser-view");loading a URL for testing purposes
mainWindow.loadFile(path.join(__dirname, '/src/renderer/start.html')); // file path where my folder is located

// call back function that will load the page if is TRUE (LOADED)
mainWindow.on("ready-to-show", mainWindow.show) 
}

//when the app is ready will load the file from the renderer
// function that calls the CreateMainWindow
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(()=>{

    createMainWindow();
       app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  });


  ipcMain.on("msg",(event,data)=>{
    console.warn(data);
    });


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

module.exports ={
  jspdf,
}
/*

const {app, BrowserWindow} = require("electron");
const {join} = require("path");

app.whenReady().then(createWindow);

function createWindow () {
  const mainWindow = new BrowserWindow({
    	width: 800, height: 700,
	show: false,
  });

window.loadFile(join(__dirname, "../myHtmlIndex.html"));

// will show the window only when is fully loaded in the back -end to voiding falshes
window.on("ready-to-show", window.show);

}*/