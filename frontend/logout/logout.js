/**
 * Function to log the user out.  This is done by
 * removing the users email and password information
 * from local storage as well as other optional 
 * information, such as the username/name.
 * 
 * After clearing information, user is redirected to 
 * the login page.
 */

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
/**
 * Section of code to trigger the logout function when any button
 * characterized as a 'logoutButton' is clicked on
 */

// Trigger the logout function when a logout button or link is clicked
document.getElementById('logoutButton').addEventListener('click', logout);
