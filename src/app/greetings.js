function greetings(){

    const getTime = new Date().getHours();
    const greet  = document.querySelector(".greetings"); 
    const MID_DAY=12;
    const AFTERNNON=17;
    let greeting;

      if (getTime < MID_DAY) {
        greeting = "Good morning!";
      } 
      else if (getTime <= AFTERNNON) {
        greeting = "Good afternoon!";
      } 
      else if (getTime == MID_DAY) {
        greeting = "Good noon!";
      } 
      else {
        greeting = "Good evening!";
      }
      
      greet.innerHTML = greeting;
      console.log(greeting);
  };

  // calling function
  greetings();

  function hideText() {
    const greet  = document.querySelector(".greetings");
   // greet.style.display = 'none'; // Clear the text content
    greet.style.opacity = '0'; // Set opacity to 0

  // After a short delay, hide the element completely
  }

// calling function
 setTimeout(hideText, 5000); // 500ms = 0.5s (same as the transition duration) 
