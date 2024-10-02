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
