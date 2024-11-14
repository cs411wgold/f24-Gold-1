/**
 * Initializes the login functionality once the DOM is fully loaded.
 * Sets up event listeners and handles the login process.
 */
document.addEventListener("DOMContentLoaded", function () {
    const testSubmit = document.getElementById("testSubmit");

    if (testSubmit) {  // Corrected variable name
        /**
         * Handles the click event on the test submit button.
         * Prevents default form submission, validates input fields,
         * and makes an AJAX request to the login endpoint.
         *
         * @param {Event} event - The click event object.
         */
        testSubmit.addEventListener("click", function (event) {
            event.preventDefault();  // Prevent any default action
            console.log("Test submit button clicked!");  // Check if this logs

            // Get the values from the input fields
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Check if fields are populated
            if (email === "" || password === "") {
                alert("Please fill in all fields.");
                return;
            }

            // Make an AJAX request to the login endpoint
            fetch("http://127.0.0.1:8000/login/", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("Login successful! Redirecting...");
                    setTimeout(() => {
                        window.location.href = "../home/home.html";
                    }, 1000);
                } else {
                    alert(data.message);  
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
        });
    } else {
        console.error("Test submit button not found!");
    }

    /**
     * Displays a message to the user in the login interface.
     *
     * @param {string} message - The message to display.
     * @param {string} type - The type of message ('success' or 'error') to determine styling.
     */
    function displayMessage(message, type) {
        const loginMessage = document.getElementById("loginMessage");
        if (loginMessage) {
            loginMessage.textContent = message;
            loginMessage.style.color = (type === "success") ? "green" : "red";
        }
    }
});

