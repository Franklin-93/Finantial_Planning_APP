const retrieveBtn = document.querySelector(".btn");
const inputID = document.getElementById("input-id");
const retrieveContainer = document.querySelector(".retrieve-container");
const retrievedData = document.querySelector(".retrieved-data");

/**
 * Sends request to the Main process by providing ID from the DOM 
 * If ID is true will return the desired message from Main to here
 * Appends the data to the DOM
 * Hides (ALL) from the retrieve.html and display data Retrieved when button is clicked
 */
function retrieveBreakdown() {
  const IDdata = inputID.value;

  // Sending a message from the renderer to the main process
  ipcRenderer.send('retrieveID', IDdata);
  console.log(IDdata);

  // Receiving a message from the main process
  window.indexBridge.fromMain((event, breakdown)=> {
    const retrievedData = document.querySelector(".data");
    retrievedData.innerHTML = "something happened " + breakdown;
  //console.log(breakdown);
});
};

retrieveBtn.addEventListener('click', function() {
  retrieveBreakdown();
  hideAndShowElements();
});

function hideAndShowElements(){
  retrieveContainer.style.display = "none"; // It hides the retrieve container when button clicked
  retrievedData.style.display = "block"; // It shows the retrieved container when button clicked
};




 


