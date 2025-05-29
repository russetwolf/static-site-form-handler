const API_GATEWAY_URL = "http://TODO"

document.getElementById("contactForm").addEventListener("submit", sendForm);

function sendForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = JSON.stringify({
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  });
  console.log(`Form ${form.id} submitted with data: ${formData}`);

  const request = new XMLHttpRequest();
    request.open("POST", API_GATEWAY_URL, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                form.reset();
                showFormSuccess();
            } else {
                showFormError();
            }
        }
    };
    request.send(formData);
}

// Making these separate functions so something nicer than an alert can be used in future, like a hidden div that gets shown based on the results. But that's beyond the MVP.
function showFormSuccess() {
    alert("Form submitted successfully")
}
function showFormError() {
    alert("Form submit error")
}