

import * as myCalculator from './functions.js' //Export all functions

// values to be assign to getMonthly values function
const value = document.getElementById("price");  
const time = document.getElementById("length");
const item = document.getElementById("item");

// BOX-FORM-1
const output_container = document.querySelector(".output-container");
const resultPart1 = document.querySelector(".results-part-1");
//const buttonNext = document.querySelector(".button");// Get the button element
const form = document.querySelector(".form"); // get first box-form class and hide it
const formBox = document.querySelector(".form-box"); // get first box-form class and hide it
// BOX-FORM-2
const form2 = document.querySelector(".form-2");
const formBox2 = document.querySelector(".form-box-2"); // get second box-form and display block
const input = document.getElementById("final-input");
const resultPart2 = document.querySelector(".results-part-2");

let monthlyValue;  //it holds the monthly values return values

/**
 * get monthly values
 * hide box-form-1 
 * display output container and its results
 * display box-form-2
 */
function firstBreakdown(event){
event.preventDefault(); 
    // assigning values
    const itemValue = value.value;
    const length = time.value;
    const userItem = item.value;

    monthlyValue = myCalculator.getMonthlyValue(itemValue,length); // get monthly values

    //message that appears on the page when 'next' button is clicked
    let text = " The " + userItem +  " is going to cost you " + monthlyValue + " Monthly "; 

    formBox.style.display = 'none';// hide form when button next is clicked
    output_container.style.display = 'block'; // show div results for the item
    resultPart1.textContent = text; // appends the monthly value to the DOM
    formBox2.style.display='block'; // displat box-form-2
    
    //prevents the page to load and values not being attained
};
form.addEventListener("submit",firstBreakdown);// event listener for the BOX-FORM




let text2 = ""; // OUTPPUT out of scope to be validate and store the correct output everytime it runs 
form2.addEventListener("submit",finalBreakdown);

function finalBreakdown(event){
event.preventDefault();
  // assigning values
  const itemValue = value.value;
  const length = time.value;
  const userItem = item.value;
  const userInput = input.value;

  // Finding (months due to pay) 
  let monthsDue = myCalculator.getMonthsDueToPay(itemValue, length, userInput);
  console.log("MONTHS TO PAY : " + monthsDue);
  
  // Getting DECIMAL PART from months due to pay
  let decimalPart = myCalculator.getDecimal(monthsDue);
  console.log("EXTRACTING DECIMAL PART : " + decimalPart );

  // Getting INTEGER PART from months due to pay
  let integer = myCalculator.getInteger(monthsDue);
  console.log("INTEGER PART : " + integer);

  // Getting DAYS from decimal part of months due (rounded to UP)
  let daysFromDecimal = myCalculator.getRemaningDaysRounded(decimalPart);
  console.log("DAYS FROM DECIMAL PART :" + daysFromDecimal);

  /*-------------------------------------------------------------
  (IF user is PAYING MORE) that will leave them with LESS months to pay
  Finding DIFFERENCE between (length & MonthsDue) 
  --------------------------------------------------------------*/
  let difference = myCalculator.getDifferenceLess(length, monthsDue);       
  console.log("DIFFERENCE BETWEEN (length & months Due - LESS : " + difference);

  /*-------------------------------------------------------------
  (IF user is PAYING LESS) that will leave them with MORE months to pay
  Finding DIFFERENCE between (length & MonthsDue) 
  --------------------------------------------------------------*/
  let difference_2 = myCalculator.getDifferenceMore(length, monthsDue);       
  console.log("DIFFERENCE BETWEEN (length & months Due - MORE : " + difference_2);
      
  /*-------------------------------------------------------------
  Extracting DECIMAL PART from Difference
  --------------------------------------------------------------*/
  let getDecimalFromDifference = myCalculator.getDecimal(difference);
  console.log("EXTRACTING DECIMAL PART from DIFFERENCE - LESS : " + getDecimalFromDifference );

  let getDecimalFromDifference_2 = myCalculator.getDecimal(difference_2);
  console.log("EXTRACTING DECIMAL PART from DIFFERENCE - MORE : " + getDecimalFromDifference_2 );
        
  /*-------------------------------------------------------------
  Extracting (INTEGER) PART from (Integer Difference)
  --------------------------------------------------------------*/
  let integerFromDifference = myCalculator.getInteger(difference);
  console.log("INTEGER FROM DIFFERENCE - LESS:" + integerFromDifference);

  let integerFromDifference_2 = myCalculator.getInteger(difference_2);
  console.log("INTEGER FROM DIFFERENCE  - MORE:" + integerFromDifference_2);

  /*-------------------------------------------------------------
  Getting days from (Integer Difference) to use if USER IS PAYING More
  --------------------------------------------------------------*/
  let daysFromDifferenceMonths = myCalculator.getRemaningDays(getDecimalFromDifference);
  console.log("DAYS FROM DECIMAL PART ( difference ) - LESS : " + daysFromDifferenceMonths);


      //IF USER PAY MORE THAN (Monthly Value) then it will take less days & months to pay
      if (userInput > monthlyValue){ 
        /*-------------------------------------------------------------------
         if integer from difference is NULL. (DAYS ONLY) to be displayed cause 
         the months fur to pay is less than length && not greater than length (ONLY DECIMAL) differences
        ---------------------------------------------------------------------*/
 if ((integerFromDifference == 0)){
          
  text2 = "if you can pay \u20AC " + userInput + ", which is more than the monthly value of \u20AC " + Math.round(monthlyValue)+ ",\n"+
                 "it will take you " + daysFromDifferenceMonths + " days less to fully pay for the (" + userItem + ").\n" +  "\n" + 
                 "This leaves you with total of " + integer + " months and " + daysFromDecimal + " remaining days to complete the payment.";
      
                }
      
        
      
       /*-------------------------------------------------------------------
         if days from decimal part is NULL (MONTHS ONLY) to be displayed
        ---------------------------------------------------------------------*/
 else if (daysFromDecimal == 0){
           
  text2 = "If you can pay \u20AC " + userInput + ", which is more than the monthly value of \u20AC " + Math.round(monthlyValue)+ ",\n"+
                 "it will take you " + integerFromDifference + " months less to fully pay for the (" + userItem + ").\n" + "\n" +   
                 "This leaves you with total of " + integer + " months to complete the payment.";
         }
      
       
       /*-------------------------------------------------------------------
         if days from decimal part is greater than 1 (MONTHS & DAYS) to be displayed
        ---------------------------------------------------------------------*/
  else if (daysFromDecimal >1){
          
    text2 = "If you can pay \u20AC " + userInput + ", which is more than the monthly value of \u20AC " + Math.round(monthlyValue)+ ",\n"+
                 "it will take you " + integerFromDifference + " months & " + daysFromDifferenceMonths + " days less to fully pay for the the (" + userItem + ").\n" + "\n" +   
                 "This leaves you with total of " + integer + " months and " + daysFromDecimal + " remaining days complete the payment.";
     }
}

//IF USER PAY LESS THAN (Monthly Value) then it will take more days & months to pay
else if (userInput < monthlyValue){ 
        /*-------------------------------------------------------------------
         if integer from difference is NULL. (DAYS ONLY) to be displayed cause 
         the months fur to pay is less than length && not greater than length (ONLY DECIMAL) differences
        ---------------------------------------------------------------------*/
     if ((integerFromDifference == 0)){
           
      text2 = "If you can pay \u20AC " + userInput + ", which is less than the monthly value of \u20AC " + Math.round(monthlyValue)+ ",\n"+
                 "it will take you an additional " + daysFromDecimal + " days to fully pay for the (" + userItem + ").\n" + "\n" +    
                 "This leaves you with total of " + integer + " months and " + daysFromDecimal + " remaining days to complete the payment.";
         }
      
       /*-------------------------------------------------------------------
         if days from decimal part is NULL (MONTHS ONLY) to be displayed
        ---------------------------------------------------------------------*/
     else if (daysFromDecimal == 0){
     
      text2 = "If you can pay can pay \u20AC " + userInput + ", which is less than the monthly value of \u20AC " + Math.round(monthlyValue)+ ",\n"+
                 "it will take you an addtional " + integerFromDifference_2 + " months to fully pay for the (" + userItem + ").\n" + "\n" +    
                 "This leaves you with total of " + integer + " remaining months to complete the payment.";
         }
      
       
       /*-------------------------------------------------------------------
         if days from decimal part is greater than 1 (MONTHS & DAYS) to be displayed
        ---------------------------------------------------------------------*/
     else if (daysFromDecimal >1){
           
      text2 = "If you can pay \u20AC " + userInput + ", which is less than the monthly value of \u20AC " + Math.round(monthlyValue)+ ",\n"+
                 "it will take you an additinal " + integerFromDifference_2 + " months & " + daysFromDecimal + " days to fully pay for the (" + userItem + ").\n" +  "\n" + 
                 "This leaves you with total of " + integer + " months and " + daysFromDecimal + " remaining days to complete the payment.";
         }
         
 } 

 // if user input is equal to monthly value
 else {
  
  text2 = "Because you can pay \u20AC " + userInput + ", which is the same monthly value of \u20AC " + Math.round(monthlyValue)+ ",\n"+
  "it will take you the original length of payment of " + length + " months to fully pay for the (" + userItem + ").\n" + "\n" + 
  "This leaves you with total of " + integer + " months to complete the payment.";
  console.log(text2)
 }
 
 showFinalBreakdown(text2);
}


/*Display final breakdown and hide / show stuff*/
function showFinalBreakdown(breakdown){

  const backButoon = document.querySelector(".back-container");
  const PDFStart = document.querySelector(".pdf-and-start-conatiner");
  const quoteMessageContainer = document.querySelector(".quote-message-coontainer");

  resultPart1.style.display ="none"; // Hide first results
  formBox2.style.display = 'none'; // hide form when button next is clicked
  resultPart2.style.display = 'block'; // show final output results 
  resultPart2.textContent = breakdown; // appends the final breakdown message to the DOM

  backButoon.style.display = 'none'; //hides back button
  PDFStart.style.display = 'block';// shows the PDF generator and start page again
  quoteMessageContainer.style.display = 'block'; // it shows the quote message and id generated when button is clicked
};

/*geneartes a random ID and display in the DOM*/
function generateID (){
  const randomID = document.querySelector(".random-number"); // it gets the ID element
  let genRandomId = myCalculator.generateRandomId();
  randomID.textContent = genRandomId; // Appends generatedID to the Dom
  console.log(genRandomId);
}
generateID();


/*it generates a PDF file with the final brrakdown*/
const genPDF = document.getElementById("download-button");

genPDF.addEventListener("click", function (event) {

  window.jsPDF = window.jspdf.jsPDF; // without this line of code wont run. add this line of code
	
  let doc = new jsPDF();


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
  doc.text(20, contentY, text2, { align: "left" }); // Align the text to the left

	doc.save('HELPER.Results.pdf');
  event.preventDefault();
});


// sends results to server to be stored in the database
function sendToServer(){
  const finalResult = document.querySelector(".results-part-2");
  const randomN = document.querySelector(".random-number");
  const text = finalResult.textContent;
  const idText = randomN.textContent;
  window.ipcRenderer.send('final:breakdown',{ text, idText }); // passing an object
};


// getting final breakdown value once it has been appended to the DOM
/*Getting value from DOM after being appended by following this method*/
form2.addEventListener("submit", sendToServer);


