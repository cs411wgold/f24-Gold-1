document.addEventListener("DOMContentLoaded", function () {
    const testSubmit = document.getElementById("testSubmit");

    if (testSubmit) {  // Corrected variable name
        testSubmit.addEventListener("click", function (event) {  // Attach to test submit button
            event.preventDefault();  // Prevent any default action
            console.log("Test submit button clicked!");  // Check if this logs

            // Get the values from the input fields
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Check if fields are populated
            if (username === "" || password === "") {
                alert("Please fill in all fields.");
                return;
            }

            // Make an AJAX request to the login endpoint
            fetch("/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("Login successful! Redirecting...");
                    setTimeout(() => {
                        window.location.href = "dashboard.html";
                    }, 1000);
                } else {
                    alert(data.message);  // Alert error message
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

    function displayMessage(message, type) {
        const loginMessage = document.getElementById("loginMessage");
        if (loginMessage) {
            loginMessage.textContent = message;
            loginMessage.style.color = (type === "success") ? "green" : "red";
        }
    }
});

