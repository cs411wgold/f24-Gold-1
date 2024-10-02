document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Get form input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Save user data to localStorage (simulate storing in a database)
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Display a success message
    document.getElementById('signupMessage').textContent = "Account created successfully! Redirecting...";

    // Redirect to login.html after a short delay
    setTimeout(function () {
        window.location.href = "../login.html"; // Adjust path if needed
    }, 2000);
});

