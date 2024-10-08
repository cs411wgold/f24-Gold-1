document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve the saved email and password from localStorage (simulating stored user data)
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    // Check if the entered email and password match the stored values
    if (email === storedEmail && password === storedPassword) {
        // If login is successful, display a message and redirect to home page
        document.getElementById('loginMessage').textContent = "Login successful! Redirecting...";
        
        // Redirect to home.html after a short delay (1 second)
        setTimeout(function () {
            window.location.href = "../home.html"; // Adjust path if needed
        }, 1000);
    } else {
        // If login fails, display an error message
        document.getElementById('loginMessage').textContent = "Invalid email or password. Please try again.";
    }
});

// login.js

document.addEventListener("DOMContentLoaded", function () {
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simple validation
    if (email === "" || password === "") {
        displayMessage("Please fill in all fields.", "error");
    } else {
        // Simulate login process (You can replace this with actual authentication logic)
        fakeLogin(email, password);
    }
});

function fakeLogin(email, password) {
    // Simulating a simple login validation (replace this with real authentication)
    if (email === "user@example.com" && password === "password123") {
        displayMessage("Login successful! Redirecting...", "success");

        // Simulate a redirection after successful login (2 seconds delay)
        setTimeout(function () {
            window.location.href = "dashboard.html"; // Redirect to a dashboard or homepage
        }, 2000);
    } else {
        displayMessage("Invalid email or password.", "error");
    }
}

function displayMessage(message, type) {
    loginMessage.textContent = message;
    if (type === "success") {
        loginMessage.style.color = "green";
    } else if (type === "error") {
        loginMessage.style.color = "red";
    }
}
});
