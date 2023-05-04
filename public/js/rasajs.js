const form = document.querySelector("form"),
        nextBtn = form.querySelector(".nextBtn"),
        nextBtn2 = form.querySelector(".nextBtn2"),
        backBtn = form.querySelector(".backBtn"),
        nextBtn3 = form.querySelector(".nextBtn3"),
        backBtn2 = form.querySelector(".backBtn2"),
        allInput = form.querySelectorAll(".first input");

document.addEventListener('DOMContentLoaded', () => {
  const positionLabel = document.querySelector('#position label').textContent;
  const inputFieldValues = Array.from(document.querySelectorAll('.input-field2 input')).map(input => input.value);
  const myButton = document.querySelector('#noneBtn');

  myButton.addEventListener('click', myFunction);

  function myFunction() {
    console.log(`Position Label: ${positionLabel}`);
    console.log(`Input Field Values: ${inputFieldValues}`);
  }
});

// Switching Opacity Forms
nextBtn.addEventListener("click", ()=> {
    allInput.forEach(input => {
        if(input.value == ""){
            form.classList.add('test');
        }else{
            //form.classList.remove('test');
        }
    })
})
backBtn.addEventListener("click", () => form.classList.remove('test'));
backBtn2.addEventListener("click", () => {
  form.classList.add('test');
  form.classList.remove('test1')
});
nextBtn2.addEventListener("click", () => {
  form.classList.add('test1');
  form.classList.remove('test')
});


// Dropdown
function showInput() {
    var position = document.getElementById("position").value;
    var inputFieldsToHide = ["inputOccupation1", "inputOccupation2", "inputOccupation3", "inputOccupation4"];

    for (var i = 0; i < inputFieldsToHide.length; i++) {
      var inputFieldToHide = document.getElementById(inputFieldsToHide[i]);

      if (position === "student" && (i === 0 || i === 2 || i === 3)) {
        inputFieldToHide.style.display = "none";
      } else if (position === "teacher" && (i === 0 || i === 1 || i === 3)) {
        inputFieldToHide.style.display = "none";
      } else if (position === "student-leader" && (i === 0 || i === 1 || i === 2)) {
        inputFieldToHide.style.display = "none";
      } else if (position === "admin-staff" && (i === 1 || i === 2 || i === 3)) {
        inputFieldToHide.style.display = "none";
      } else {
        inputFieldToHide.style.display = "block";
      }
    }
  }
  var inputFieldsToHide = ["inputOccupation1", "inputOccupation2", "inputOccupation3", "inputOccupation4"];
  for (var i = 0; i < inputFieldsToHide.length; i++) {
    var inputFieldToHide = document.getElementById(inputFieldsToHide[i]);
  inputFieldToHide.style.display = "none";
}

//////////////////-------------------------------------
const start_date1 = document.getElementById("start_date");
const end_date1 = document.getElementById("end_date");

form.addEventListener("submit",() => {
  const rasatesting = {
    start_date: start_date1.value,
    end_date: end_date1.value
  };  

  console.log(rasatesting)
  fetch("/api/rasa", {
      method: "POST",
      body: JSON.stringify(rasatesting),
      headers: {
          "Content-type": "application/json"
      }   
  })
})