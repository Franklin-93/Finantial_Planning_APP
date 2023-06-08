
const { contextBridge, ipcRenderer } = require('electron');

// API from Renderer.js to Main.js (sending final Breakdown)
const rendererToMain = {
  send: (channel, data) => ipcRenderer.send(channel, data), // send
  on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)), // receives
};

// API from main.js to Renderer.js (REQUESTING final Breakdown back to RENDERER )
const mainToRenderer = {
  fromMain: (callBack)=> ipcRenderer.on("sendResponse", (callBack))
};

// Expose indexBridge and ipcRenderer in the main world
contextBridge.exposeInMainWorld("ipcRenderer", rendererToMain);
contextBridge.exposeInMainWorld("indexBridge", mainToRenderer);