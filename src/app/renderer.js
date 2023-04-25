


const btn = document.querySelector(".calculate");
const userItem = document.getElementById("item");
let itemValue = document.getElementById("price");
let length = document.getElementById("length");


function Go(){

    let price = parseInt(itemValue.value);
    let instalments = parseInt(length.value);
    var result = price / instalments;
    
    // append to the 
    document.querySelector(".results-part-1").innerHTML = " The " + userItem.value +  " is going to cost you " +  Math.round(result) + " Monthly "    
    


btn.addEventListener('click', () => {
  // 👇️ hide button
  btn.style.display = 'none';

  // 👇️ show div
  const box = document.querySelector('.results-part-1');
  box.style.display = 'block';
});

event.preventDefault(); 
};





    












