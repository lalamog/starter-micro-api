const button = document.getElementById("noneBtn"); // get a reference to the button element
button.addEventListener("click", function() {
  const rasatesting = {
    start_date: start_date.value,
    end_date: end_date.value
}       
fetch("/api/rasatesting", {
    method: "POST",
    body: JSON.stringify(rasatesting),
    headers: {
        "Content-type": "rasatesting/json"
    }
}) .then(res => res.json())
})