
// we use require when usiing node.js
// assign them to const and then go about just calling them

import * as myCalculator from './functions.js'
  
// Getting Values from DOM
const box_1 = document.querySelector(".box_1");
const button = document.querySelector(".button");
const userItem = document.getElementById("item");
const result_part_1 = document.querySelector(".results-part-1");
const results = document.querySelector(".output-container");
const myForm = document.querySelector(".form-inline-1");
const PDFStart = document.querySelector(".pdf-start");

let itemValue = document.getElementById("price");
let length = document.getElementById("length");
let div = document.getElementById("myDiv");
let result_part_2 = document.querySelector(".results-part-2");
let button_2 = document.getElementById("button_2");
let userInput = document.getElementById("input");
const genPDF = document.getElementById("download-button");
const container = document.getElementById("container");
// function inside getMonthlyValue so I can call when validate
// cause it was giving me an error of undifined
function getValue(){
  let monthlyValue = myCalculator.getMonthlyValue(itemValue.value,length.value);
  return monthlyValue;
}



// onclick call get first breakdown input when button 'next' is clicked
button.addEventListener("click", function(event) {
      
  let monthlyValue = getValue();
  
  // monthly output
        let text = " The " + userItem.value +  " is going to cost you " + monthlyValue + " Monthly ";

        // appends the monthly value to the DOM
        result_part_1.textContent = text;  

        // hide form when button next is clicked
        box_1.style.display = 'none';

        // show div results for the item
        results.style.display = 'block';
        
        // shows DIV
        showDIV();

        // define the 'event' in the function parameter and call prevent default to avoid loading the page
        event.preventDefault();

        // assigning the 'myForm' class to reset method so the form can be cleared once the button is clicked
       
        // myForm.reset();
       /* note do not use the 'reset' method because it wont be possible to get
       values for manipulation as it will refresh if you use and the values that
       was acquired by 'value' will be lost */
       
    });


  // shows DIV
  function showDIV(){
      setTimeout(() => {
      // it was set to display 'none' in CSS
      //here when button is clicked call function inside first event listener
      div.style.display = 'block';
    }, 2000); 
  };
    
 // OUTPPUT out of scope to be validate and store the correct output everytime it tuns 
 let text2 = ""; 

    
  // onclick function when button 'next' is clicked
  button_2.addEventListener("click", function (event) {

    let monthlyValue = getValue();

    /*-------------------------------------------------------------
    Finding (months due to pay) 
    --------------------------------------------------------------*/
    let monthsDue = myCalculator.getMonthsDueToPay(itemValue.value,length.value,userInput.value);
    console.log("MONTHS TO PAY : " + monthsDue);
    /*-------------------------------------------------------------
    Getting DECIMAL PART from months due to pay
  --------------------------------------------------------------*/
    let decimalPart = myCalculator.getDecimal(monthsDue);
    console.log("EXTRACTING DECIMAL PART : " + decimalPart );

  /*-------------------------------------------------------------
    Getting INTEGER PART from months due to pay
  --------------------------------------------------------------*/
  let integer = myCalculator.getInteger(monthsDue);
  console.log("INTEGER PART : " + integer);

  /*-------------------------------------------------------------
  Getting DAYS from decimal part of months due (rounded to UP)
--------------------------------------------------------------*/
  let daysFromDecimal = myCalculator.getRemaningDaysRounded(decimalPart);
  console.log("DAYS FROM DECIMAL PART :" + daysFromDecimal);

  /*-------------------------------------------------------------
  (IF user is PAYING MORE) that will leave them with LESS months to pay
  Finding DIFFERENCE between (length & MonthsDue) 
--------------------------------------------------------------*/
let difference = myCalculator.getDifferenceLess(length.value,monthsDue);       
console.log("DIFFERENCE BETWEEN (length & months Due - LESS : " + difference);

 /*-------------------------------------------------------------
  (IF user is PAYING LESS) that will leave them with MORE months to pay
  Finding DIFFERENCE between (length & MonthsDue) 
--------------------------------------------------------------*/
let difference_2 = myCalculator.getDifferenceMore(length.value,monthsDue);       
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
        if (userInput.value > monthlyValue){ 
          /*-------------------------------------------------------------------
           if integer from difference is NULL. (DAYS ONLY) to be displayed cause 
           the months fur to pay is less than length && not greater than length (ONLY DECIMAL) differences
          ---------------------------------------------------------------------*/
   if ((integerFromDifference ==0)){
            
    text2 = "HERE IS YOUR BREADOWN |\n"+
    "Because you can pay \u20AC " + userInput.value + ", more than the monthly value \u20AC " + Math.round(monthlyValue)+ ")\n"+
                   "you will take " + daysFromDifferenceMonths + " days less to pay for the (" + userItem.value + ")" + "\n" +  
                   "Leaving you with " + integer + " months and " + daysFromDecimal + " remaining days total.";
           }
        
        
         /*-------------------------------------------------------------------
           if days from decimal part is NULL (MONTHS ONLY) to be displayed
          ---------------------------------------------------------------------*/
   else if (daysFromDecimal ==0){
             
    text2 = "HERE IS YOUR BREADOWN | \n"+
    "Because you can pay \u20AC " + userInput.value + ", more than the monthly value \u20AC " + Math.round(monthlyValue)+ ")\n"+
                   "you will take " + integerFromDifference + " months less to pay for the (" + userItem.value + ")" + "\n" +   
                   "Leaving you with " + integer + " months total.";
           }
        
         
         /*-------------------------------------------------------------------
           if days from decimal part is greater than 1 (MONTHS & DAYS) to be displayed
          ---------------------------------------------------------------------*/
    else if (daysFromDecimal >1){
            
      text2 = "HERE IS YOUR BREADOWN |\n"+ 
      "Because you can pay \u20AC " + userInput.value + ", more than the monthly value \u20AC " + Math.round(monthlyValue)+ "\n"+
                   "you will take " + integerFromDifference + " months & " + daysFromDifferenceMonths + " days less to pay for the (" + userItem.value + ")" + "\n" +    
                   "Leaving you with " + integer + " months and " + daysFromDecimal + " remaining days total.";
       }
}

//IF USER PAY LESS THAN (Monthly Value) then it will take more days & months to pay
else if (userInput.value < monthlyValue){ 
          /*-------------------------------------------------------------------
           if integer from difference is NULL. (DAYS ONLY) to be displayed cause 
           the months fur to pay is less than length && not greater than length (ONLY DECIMAL) differences
          ---------------------------------------------------------------------*/
       if ((integerFromDifference == 0)){
             
        text2 = "HERE IS YOUR BREADOWN |\n"+
        "Because you can pay \u20AC " + userInput.value + ", less than the monthly value \u20AC " + Math.round(monthlyValue)+ "\n"+
                   "you will take " + daysFromDecimal + " days more to pay for the (" + userItem.value + ")" + "\n" +   
                   "Leaving you with " + integer + " months and " + daysFromDecimal + " days total.";
           }
        
        
         /*-------------------------------------------------------------------
           if days from decimal part is NULL (MONTHS ONLY) to be displayed
          ---------------------------------------------------------------------*/
       else if (daysFromDecimal == 0){
       
        text2 = "HERE IS YOUR BREADOWN |\n"+
        "Because you can pay \u20AC " + userInput.value + ", less than the monthly value \u20AC " + Math.round(monthlyValue)+ "\n"+
                   "you will take " + integerFromDifference_2 + " months more to pay for the (" + userItem.value + ")" + "\n" +    
                   "Leaving you with " + integer + " months total.";
           }
        
         
         /*-------------------------------------------------------------------
           if days from decimal part is greater than 1 (MONTHS & DAYS) to be displayed
          ---------------------------------------------------------------------*/
       else if (daysFromDecimal >1){
             
        text2 = "HERE IS YOUR BREADOWN | \n"+
        "Because you can pay \u20AC " + userInput.value + ", less than the monthly value \u20AC " + Math.round(monthlyValue)+ "\n"+
                   "you will take " + integerFromDifference_2 + " months & " + daysFromDecimal + " days more to pay for the (" + userItem.value + ")" + "\n" +  
                   "Leaving you with " + integer + " months and " + daysFromDecimal + " remaining days total.";
           }
   } 

    // appends the final breakdown message to the DOM
    result_part_2.textContent = text2;  

    // hide form when button next is clicked
    div.style.display = 'none';
      
    // Hide first results
    result_part_1.style.display ="none";

    // show div results for the item
    result_part_2.style.display = 'block';

    // shows the PDF generator and start page again
    PDFStart.style.display = 'block';

    // define the 'event' in the function parameter and call prevent default to avoid loading the page
    event.preventDefault();
});



//Generates a pdf for the final breakdown

genPDF.addEventListener("click", function (event) {
  window.jsPDF = window.jspdf.jsPDF; // without this line of code wont run. add this line of code
	
  let doc = new jsPDF();
	doc.text(10,10,text2);
	doc.save('@HELPER.Results.pdf');
  event.preventDefault();
});





/*function generatePDF() {
  // Choose the element that your content will be rendered to.
  const element = document.querySelector(".results-part-2");
  // Choose the element and save the PDF for your user.
  html2pdf().from(element).save();
}

genPDF.addEventListener("click", generatePDF);
*/










































/*
  // Create Div Elements and Input form along with the button dinamicly when
  // button next is clekced so the last question(how can the user pay for the 'x' item ?)...
  function createInput(){

    //Create a 'div' Container element
    let divElement = document.createElement('div'); // create 'div' element
    //divElement.textContent = "container";  // text content
    divElement.setAttribute('id', 'myDiv'); // setting 'ID'
    // or >   divElement.id = "myDiv";

    // Append 'div' to the DOM
    document.body.appendChild(divElement);

    // Create an 'input' element
    let input = document.createElement('input'); 
    input.id="input";
    //let userInstalments = document.getElementById('input');
    
        
    // Getting the div's ID and appending to input created
    document.getElementById('myDiv').append(input);

    //Creating 'p' element and innerHTML to append message and append user item
    let pElement = document.createElement('p');
    pElement.innerHTML = "How much can you pay for Monthly ? ";  

    document.getElementById('myDiv').append(pElement);

    // create a calculate button
    let button = document.createElement("button");
    button.textContent = "calculate";  // text content
    button.setAttribute('id', 'button_2'); // setting 'ID'

    // append button to the 'div' element
    divElement.appendChild(button);

    // calling Function after creating a div form
    myTEST();
  }
  */

  





    












