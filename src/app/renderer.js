



const userItem = document.getElementById("item");
let itemValue = document.getElementById("price");
let length = document.getElementById("length");


function Go(){

    let price = parseInt(itemValue.value);
    let instalments = parseInt(length.value);
    var result = price / instalments;
    
    // append to the 
    document.getElementById("results-part1").innerHTML = " The " + userItem.value +  " is going to cost you " +  Math.round(result) + " Monthly "    
    
    // prevent from loading the page
    event.preventDefault();

   
};


    












