document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Get form input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    // Save user data to localStorage (simulate storing in a database)
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('phoneNumber', phoneNumber);

    // Display a success message
    document.getElementById('signupMessage').textContent = "Account created successfully! Redirecting...";

    // Redirect to login.html after a short delay
    setTimeout(function () {
        window.location.href = "../login.html"; // Adjust path if needed
    }, 2000);
});

