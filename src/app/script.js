

import * as myCalculator from './functions.js' //Export all functions


// values to be assign to getMonthly values function
const value = document.getElementById("price");  
const time = document.getElementById("length");
const item = document.getElementById("item");

// BOX-FORM-1
const output_container = document.querySelector(".output-container");
const resultPart1 = document.querySelector(".results-part-1");
const buttonNext = document.querySelector(".button");// Get the button element
const boxForm = document.querySelector(".form-box"); // get first box-form class and hide it

// BOX-FORM-2
const boxForm2 = document.querySelector(".form-box-2"); // get second box-form and display block
const input = document.getElementById("final-input");
const buttonCalculate = document.getElementById("button-calculator");
const resultPart2 = document.querySelector(".results-part-2");

let monthlyValue;  //it holds the monthly values return values
buttonNext.addEventListener("click",firstBreakdown);// event listener for the BOX-FORM

/**
 * get monthly values
 * hide box-form-1 
 * display output container and its results
 * display box-form-2
 */
function firstBreakdown(event){

    // assigning values
    const itemValue = value.value;
    const length = time.value;
    const userItem = item.value;

    monthlyValue = myCalculator.getMonthlyValue(itemValue,length); // get monthly values

    //message that appears on the page when 'next' button is clicked
    let text = " The " + userItem +  " is going to cost you " + monthlyValue + " Monthly "; 

    boxForm.style.display = 'none';// hide form when button next is clicked
    output_container.style.display = 'block'; // show div results for the item
    resultPart1.textContent = text; // appends the monthly value to the DOM
    boxForm2.style.display='block'; // displat box-form-2
    
    event.preventDefault(); //prevents the page to load and values not being attained
};





let text2 = ""; // OUTPPUT out of scope to be validate and store the correct output everytime it tuns 
buttonCalculate.addEventListener("click",finalBreakdown);

function finalBreakdown(event){

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
 if ((integerFromDifference ==0)){
          
  text2 = "HERE IS YOUR BREADOWN |\n"+
  "Because you can pay \u20AC " + userInput + ", more than the monthly value \u20AC " + Math.round(monthlyValue)+ ")\n"+
                 "you will take " + daysFromDifferenceMonths + " days less to pay for the (" + userItem + ")" + "\n" +  
                 "Leaving you with " + integer + " months and " + daysFromDecimal + " remaining days total.";
         }
      
      
       /*-------------------------------------------------------------------
         if days from decimal part is NULL (MONTHS ONLY) to be displayed
        ---------------------------------------------------------------------*/
 else if (daysFromDecimal ==0){
           
  text2 = "HERE IS YOUR BREADOWN | \n"+
  "Because you can pay \u20AC " + userInput + ", more than the monthly value \u20AC " + Math.round(monthlyValue)+ ")\n"+
                 "you will take " + integerFromDifference + " months less to pay for the (" + userItem + ")" + "\n" +   
                 "Leaving you with " + integer + " months total.";
         }
      
       
       /*-------------------------------------------------------------------
         if days from decimal part is greater than 1 (MONTHS & DAYS) to be displayed
        ---------------------------------------------------------------------*/
  else if (daysFromDecimal >1){
          
    text2 = "HERE IS YOUR BREADOWN |\n"+ 
    "Because you can pay \u20AC " + userInput + ", more than the monthly value \u20AC " + Math.round(monthlyValue)+ "\n"+
                 "you will take " + integerFromDifference + " months & " + daysFromDifferenceMonths + " days less to pay for the (" + userItem + ")" + "\n" +    
                 "Leaving you with " + integer + " months and " + daysFromDecimal + " remaining days total.";
     }
}

//IF USER PAY LESS THAN (Monthly Value) then it will take more days & months to pay
else if (userInput < monthlyValue){ 
        /*-------------------------------------------------------------------
         if integer from difference is NULL. (DAYS ONLY) to be displayed cause 
         the months fur to pay is less than length && not greater than length (ONLY DECIMAL) differences
        ---------------------------------------------------------------------*/
     if ((integerFromDifference == 0)){
           
      text2 = "HERE IS YOUR BREADOWN |\n"+
      "Because you can pay \u20AC " + userInput + ", less than the monthly value \u20AC " + Math.round(monthlyValue)+ "\n"+
                 "you will take " + daysFromDecimal + " days more to pay for the (" + userItem + ")" + "\n" +   
                 "Leaving you with " + integer + " months and " + daysFromDecimal + " days total.";
         }
      
      
       /*-------------------------------------------------------------------
         if days from decimal part is NULL (MONTHS ONLY) to be displayed
        ---------------------------------------------------------------------*/
     else if (daysFromDecimal == 0){
     
      text2 = "HERE IS YOUR BREADOWN |\n"+
      "Because you can pay \u20AC " + userInput + ", less than the monthly value \u20AC " + Math.round(monthlyValue)+ "\n"+
                 "you will take " + integerFromDifference_2 + " months more to pay for the (" + userItem + ")" + "\n" +    
                 "Leaving you with " + integer + " months total.";
         }
      
       
       /*-------------------------------------------------------------------
         if days from decimal part is greater than 1 (MONTHS & DAYS) to be displayed
        ---------------------------------------------------------------------*/
     else if (daysFromDecimal >1){
           
      text2 = "HERE IS YOUR BREADOWN | \n"+
      "Because you can pay \u20AC " + userInput + ", less than the monthly value \u20AC " + Math.round(monthlyValue)+ "\n"+
                 "you will take " + integerFromDifference_2 + " months & " + daysFromDecimal + " days more to pay for the (" + userItem + ")" + "\n" +  
                 "Leaving you with " + integer + " months and " + daysFromDecimal + " remaining days total.";
         }
 } 
 
 showFinalBreakdown(text2);
 event.preventDefault();
}



function showFinalBreakdown(breakdown){

  const backButoon = document.querySelector(".back-container");
  const PDFStart = document.querySelector(".pdf-and-start-conatiner");
  const quoteMessageContainer = document.querySelector(".quote-message-coontainer");

  resultPart1.style.display ="none"; // Hide first results
  boxForm2.style.display = 'none'; // hide form when button next is clicked
  resultPart2.style.display = 'block'; // show final output results 
  resultPart2.textContent = breakdown; // appends the final breakdown message to the DOM

  backButoon.style.display = 'none'; //hides back button
  PDFStart.style.display = 'block';// shows the PDF generator and start page again
  quoteMessageContainer.style.display = 'block'; // it shows the quote message and id generated when button is clicked

};

function generateID (){
  const randomID = document.querySelector(".random-number"); // it gets the ID element
  let genRandomId = myCalculator.generateRandomId();
  randomID.textContent = genRandomId; // Appends generatedID to the Dom
}
generateID();



const genPDF = document.getElementById("download-button");
genPDF.addEventListener("click", function (event) {
  window.jsPDF = window.jspdf.jsPDF; // without this line of code wont run. add this line of code
	
  let doc = new jsPDF();
	doc.text(10,10,text2);
	doc.save('@HELPER.Results.pdf');
  event.preventDefault();
});

