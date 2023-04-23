

const userItem = document.getElementById("item");
let num1 = document.getElementById('price');
let num2 = document.getElementById('length');


function userInput(){
    
    let num1New = parseInt(num1.value);
    let num2New = parseInt(num2.value);

    var result = num2New + num1New;
    document.getElementById('results-part1').innerHTML = "The " + userItem.value +  " is going to cost you " + result + " Monthly "    

    event.preventDefault();
    
}
 


//const { app } = require("electron");
//const { app } = require("electron");
//console.log(versions.node());
//console.log(myCPU);
//console.log(api.hello);

//information.innerText = "Hi there my name is Franklin";
/*function getValues() {
    var num1 = document.getElementById('number1').value;
    number1 = parseInt(num1);
    var num2 = document.getElementById('number2').value;
    number2 = parseInt(num2);
}

function sumUp(){
    getValues();

    var result = number1 + number2;
    document.getElementById('result').innerHTML = 
    "This is the sumup of both numbers" + number1 + " and "
    +number2 +" equals " +  result;
    }


*/
    






    function division() {
        getValues();

        if ( num2New == 0){
            var result = "Not a valid operation";

        }else{
            var result = num1New / num2New;
        }
        
        document.getElementById('result').innerHTML = result;
    
    }

    





































function addFields(){
    // Generate a dynamic number of inputs
    var number = document.getElementById("member").value;
    // Get the element where the inputs will be added to
    
   
        // Append a node with a random text
        container.appendChild(document.createTextNode("Member " + (i+1)));
        // Create an <input> element, set its type and name attributes
        var input = document.createElement("input");
        input.type = "text";
        input.name = "member";
        number.appendChild(input);
        
    
}
