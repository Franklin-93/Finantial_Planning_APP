const { ipcRenderer } = require('electron');

// Getting final breakdown
const finalResult = document.querySelector(".results-part-2");
const text = finalResult.textContent;
console.log(text);

// Send the text content to the main process
ipcRenderer.send('retrieve-messages', text);