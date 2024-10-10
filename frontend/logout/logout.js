// Function to handle logout
function logout() {
    // Clear user data from localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('password');

    // Optionally clear other user data if stored
    localStorage.removeItem('name');

    // Redirect to login page after logging out
    window.location.href = "../login/login.html"; // Adjust path as needed
}

// Trigger the logout function when a logout button or link is clicked
document.getElementById('logoutButton').addEventListener('click', logout);
