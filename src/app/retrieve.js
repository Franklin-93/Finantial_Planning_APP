const retrieveBtn = document.querySelector(".btn");
const inputID = document.getElementById("input-id");
const retrieveContainer = document.querySelector(".retrieve-container");
const retrievedDataContainer = document.querySelector(".data-container");
const genPDF = document.querySelector(".download-button-2");

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
    let retrievedData = document.querySelector(".data");
    retrievedData.textContent = breakdown;
    console.log(breakdown); //testing if the value went through rertrieving process
});
};

// hies elements from DOM
function hideAndShowElements(){
  retrieveContainer.style.display = "none"; // It hides the retrieve container when button clicked
  retrievedDataContainer.style.display = "block"; // It shows the retrieved container when button clicked
};


/*Display final breakdown and hide / show stuff*/
function showPDFandDownload(){
  const backButoon = document.querySelector(".back-container");
  const PDFStart = document.querySelector(".pdf-and-start-conatiner-2");
  backButoon.style.display = 'none'; //hides back button
  PDFStart.style.display = 'block';// shows the PDF generator and start page again
};


// call functions on button clicked 
retrieveBtn.addEventListener('click', function() {
  retrieveBreakdown();
  hideAndShowElements();
  showPDFandDownload();
});


/*it generates a PDF file with the final brrakdown*/
genPDF.addEventListener("click", function (event) {

  window.jsPDF = window.jspdf.jsPDF; // without this line of code wont run. add this line of code
	
  let doc = new jsPDF();

  const contentText = document.querySelector(".data").textContent;
  const titleText = "HERE IS YOUR BREAKDOWN";
  const titleFontSize = 18;
  const textFontSize = 12;
  const margin = 10;
  
  // Set font size for the title
  doc.setFontSize(titleFontSize);
  doc.setTextColor(200, 0, 0); // Set font color to black (RGB)
  doc.text(titleText, 20, 20); // Display the title at position (20, 20)

  // Set font size and styles for the content text
  doc.setFontSize(textFontSize);
  doc.setFont("Helvetica"); // Set font type to bold
  doc.setTextColor(0, 0, 0); // Set font color to black (RGB)

  // Calculate the y-coordinate position for the content text
  const titleHeight = titleFontSize * 1; // Adjust multiplier as needed for spacing
  const contentY = 20 + titleHeight + margin;

  // Display the content text at the adjusted position
  doc.text(20, contentY, contentText, { align: "left" }); // Align the text to the left

	doc.save('@HELPER.Results.pdf');
  event.preventDefault();
});


 


