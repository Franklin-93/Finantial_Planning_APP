
// Getting Values
const box_1 = document.querySelector(".box_1");
const button = document.querySelector(".button");
const userItem = document.getElementById("item");
const result_part_1 = document.querySelector(".results-part-1");
const results = document.querySelector(".results");
const myForm = document.querySelector(".form-inline-1");

// Getting Price / Length
let itemValue = document.getElementById("price");
let length = document.getElementById("length");








// onclick function when button 'next' is clicked
  button.addEventListener("click", function (event) {

    let price = parseInt(itemValue.value); // get prince
    let instalments = parseInt(length.value); // get number of months
    let result = price / instalments; // find the monthly value

    let text = " The " + userItem.value +  " is going to cost you " +  Math.round(result) + " Monthly ";
    // appends the monthly value to the DOM
    result_part_1.innerHTML = text;  

    //-------------------------------------------
    // hide form when button next is clicked
    box_1.style.display = 'none';
      
    // show div results for the item
    results.style.display = 'block';
    //-------------------------------------------
  
    // create form after 2 seconds using 'setTimeOut' method
    setTimeout(createInput, 2000);

    // define the 'event' in the function parameter and call prevent default to avoid loading the page
    event.preventDefault();

    // assigning the 'myForm' class to reset method so the form can be cleared once the button is clicked
    myForm.reset();

 });
  







 


  // Create ELEMENTS...
  function createInput(){

    //Create a 'div' Container element
    let divElement = document.createElement('div'); // create 'div' element
    divElement.textContent = "container";  // text content
    divElement.setAttribute('id', 'myDiv'); // setting 'ID'
    // or >   divElement.id = "myDiv";

    // Append 'div' to the DOM
    document.body.appendChild(divElement);

    // Create an 'input' element
    let input = document.createElement('input'); 

    // Getting the div's ID and appending to input created
    document.getElementById('myDiv').append(input);

    // create a calculate button
    let button = document.createElement("button");
    button.textContent = "calculate";  // text content
    button.setAttribute('id', 'btn'); // setting 'ID'

    // append button to the 'div' element
    divElement.appendChild(button);
  }
  

  





    












