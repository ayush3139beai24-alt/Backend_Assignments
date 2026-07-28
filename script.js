document.getElementById("registrationForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let age = document.getElementById("age").value.trim();

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let ageError = document.getElementById("ageError");

    nameError.textContent = "";
    emailError.textContent = "";
    ageError.textContent = "";

    let isValid = true;


    if (name === "") {
        nameError.textContent = "Name is required.";
        isValid = false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Enter a valid email.";
        isValid = false;
    }


    if (age === "") {
        ageError.textContent = "Age is required.";
        isValid = false;
    } else if (age < 18 || age > 100) {
        ageError.textContent = "Age must be between 18 and 100.";
        isValid = false;
    }

    if (isValid) {
        alert("Registration Successful!!!");
        document.getElementById("registrationForm").submit(); 
    }

});