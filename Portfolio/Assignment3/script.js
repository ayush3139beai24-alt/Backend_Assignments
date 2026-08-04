const feedbackForm = document.getElementById("feedbackForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseSelect = document.getElementById("course");
const feedbackInput = document.getElementById("feedback");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const courseError = document.getElementById("courseError");
const feedbackError = document.getElementById("feedbackError");

const sessionUserDisplay = document.getElementById("sessionUserDisplay");
const output = document.getElementById("output");
const deleteBtn = document.getElementById("deleteBtn");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener("DOMContentLoaded", () => {
    showStoredData();
});

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
courseSelect.addEventListener("change", validateCourse);
feedbackInput.addEventListener("input", validateFeedback);

function validateName() {
    const value = nameInput.value.trim();
    if (value.length < 3) {
        nameError.textContent = "Name must contain at least 3 characters.";
        return false;
    }
    nameError.textContent = "";
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();
    if (!value || !emailRegex.test(value)) {
        emailError.textContent = "Enter a valid email.";
        return false;
    }
    emailError.textContent = "";
    return true;
}

function validateCourse() {
    const value = courseSelect.value;
    if (!value) {
        courseError.textContent = "Please select a course.";
        return false;
    }
    courseError.textContent = "";
    return true;
}

function validateFeedback() {
    const value = feedbackInput.value.trim();
    if (!value) {
        feedbackError.textContent = "Please enter feedback.";
        return false;
    }
    feedbackError.textContent = "";
    return true;
}
feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isCourseValid = validateCourse();
    const isFeedbackValid = validateFeedback();

    if (!isNameValid || !isEmailValid || !isCourseValid || !isFeedbackValid) {
        return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const course = courseSelect.value;
    const feedback = feedbackInput.value.trim();

    const feedbackData = { name, email, course, feedback };
    localStorage.setItem("studentFeedback", JSON.stringify(feedbackData));

    sessionStorage.setItem("currentSessionUser", name);

    showStoredData();

    feedbackForm.reset();
});

deleteBtn.addEventListener("click", deleteStoredData);

function deleteStoredData() {

    localStorage.removeItem("studentFeedback");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("course");
    localStorage.removeItem("feedback");
    
    sessionStorage.removeItem("currentSessionUser");
    sessionStorage.clear();
    localStorage.clear();

    showStoredData();
}

function showStoredData() {

    const currentUser = sessionStorage.getItem("currentSessionUser");
    if (currentUser) {
        sessionUserDisplay.textContent = `Current Session User: ${currentUser}`;
    } else {
        sessionUserDisplay.textContent = `Current Session User: `;
    }

    const storedFeedbackRaw = localStorage.getItem("studentFeedback");
    if (storedFeedbackRaw) {
        try {
            const data = JSON.parse(storedFeedbackRaw);
            output.innerHTML = `<strong>Name:</strong> ${data.name}\n<strong>Email:</strong> ${data.email}\n<strong>Course:</strong> ${data.course}\n<strong>Feedback:</strong> ${data.feedback}`;
        } catch (e) {
            output.textContent = "No feedback stored.";
        }
    } else {
        output.textContent = "No feedback stored.";
    }
}