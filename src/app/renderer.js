
// we use require when usiing node.js
// assign them to const and then go about just calling them
import * as myCalculator from './functions.js'


/*-------------------------------------------------------------
Getting DECIMAL PART from months due to pay
--------------------------------------------------------------*/
//let decimalPart = myCalculator.getDecimal(monthsDue);
//console.log("EXTRACTING DECIMAL PART : " + decimalPart );

/*-------------------------------------------------------------
Getting INTEGER PART from months due to pay
--------------------------------------------------------------*/
//let integer = myCalculator.getInteger(monthsDue);
//console.log("INTEGER PART : " + integer);

/*-------------------------------------------------------------
Getting DAYS from decimal part of months due (rounded to UP)
--------------------------------------------------------------*/
//let daysFromDecimal = myCalculator.getRemaningDaysRounded(decimalPart);
//console.log("DAYS FROM DECIMAL PART : (make sure to round to 20) " + daysFromDecimal);

 /*-------------------------------------------------------------
(IF user is PAYING MORE) that will leave them with LESS months to pay
Finding DIFFERENCE between (length & MonthsDue) 
--------------------------------------------------------------*/
//let difference = myCalculator.getDifferenceMore(29,monthsDue);       
//console.log("DIFFERENCE BETWEEN (length & months Due - MORE : " + difference);

/*-------------------------------------------------------------
(IF user is PAYING LESS) that will leave them with MORE months to pay
Finding DIFFERENCE between (length & MonthsDue) 
--------------------------------------------------------------*/
//let difference_2 = myCalculator.getDifferenceMore(29,monthsDue);       
//console.log("DIFFERENCE BETWEEN (length & months Due - MORE : " + difference_2);

/*-------------------------------------------------------------
Extracting DECIMAL PART from Difference
--------------------------------------------------------------*/
//let getDecimalFromDifference = myCalculator.getDecimal(difference);
//console.log("EXTRACTING DECIMAL PART from DIFFERENCE - LESS : " + getDecimalFromDifference );

//let getDecimalFromDifference_2 = myCalculator.getDecimal(difference_2);
//console.log("EXTRACTING DECIMAL PART from DIFFERENCE - MORE : " + getDecimalFromDifference_2 );

/*-------------------------------------------------------------
Getting days from (Integer Difference) to use if USER IS PAYING More
--------------------------------------------------------------*/
//let daysFromDifferenceMonths = myCalculator.getRemaningDays(getDecimalFromDifference);
//console.log("DAYS FROM DECIMAL PART ( difference ) - LESS : " + daysFromDifferenceMonths);


  
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



// onclick call get first breakdown input when button 'next' is clicked
button.addEventListener("click", function(event) {
      
       // 1) CALL getMonthlyValue - Finding (months due to pay) 
       let monthlyValue = myCalculator.getMonthlyValue(itemValue.value,length.value); 
        // monthly output
        let text = " The " + userItem.value +  " is going to cost you " + monthlyValue + " Monthly ";

        // appends the monthly value to the DOM
        result_part_1.innerHTML = text;  

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
    });




  // shows DIV
  function showDIV(){
      setTimeout(() => {
      // it was set to display 'none' in CSS
      //here when button is clicked call function inside first event listener
      div.style.display = 'block';
    }, 4000); 
  };
    

    


    
  // onclick function when button 'next' is clicked
  button_2.addEventListener("click", function (event) {

     /*-------------------------------------------------------------
    Finding (months due to pay) 
    --------------------------------------------------------------*/
    let monthsDue = myCalculator.getMonthsDueToPay(itemValue.value,length.value,userInput.value);

    let text2 = "just (TESTING) MONTHS TO PAY " + monthsDue;

    // appends the monthly value to the DOM
    result_part_2.innerHTML = text2;  

    //-------------------------------------------
    // hide form when button next is clicked
    div.style.display = 'none';
      
    // Hide first results
    result_part_1.style.display ="none";

    // show div results for the item
    result_part_2.style.display = 'block';

    // shows the PDF generator and start page again
    PDFStart.style.display = 'block';
    //-------------------------------------------

    // define the 'event' in the function parameter and call prevent default to avoid loading the page
    event.preventDefault();
})
















































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

  





    












