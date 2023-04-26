
const box_1 = document.querySelector(".box_1");
const button = document.querySelector(".button");
const userItem = document.getElementById("item");
let itemValue = document.getElementById("price");
let length = document.getElementById("length");
let result_part_1 = document.querySelector(".results-part-1");



 // event listeneing on click will display monthly value
 button.addEventListener("click", getMonthlyValue);
 
// getMonthlyValue

function getMonthlyValue() {   
     //preventDefault(); // prevents the page to reload      
  
    let price = parseInt(itemValue.value); // get prince
    let instalments = parseInt(length.value); // get number of months
    var result = price / instalments; // find the monthly value

    // appends the monthly value to the DOM
    result_part_1.innerHTML = " The " + userItem.value +  " is going tHHHHHHHHHHHHo cost you " +  Math.round(result) + " Monthly ";
   
    
  };

   // event listeneing on click will display monthly value
 //button.addEventListener("click", getMonthlyValue);



/*function hideForm(){
    button.addEventListener('click', () => {
    //button.style.display = 'none';

    // hide form
    box_1.style.display = 'none';

    // show div results for the item
    const result = document.querySelector('.results-part-1');
    result.style.display = 'block';

    // shows second form 
  });

};

hideForm();*/






    












