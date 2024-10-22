document.addEventListener("DOMContentLoaded", function () {
    const testSubmit = document.getElementById("testSubmit");

    if (testSubmit) {  // Corrected variable name
        testSubmit.addEventListener("click", function (event) {  // Attach to test submit button
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
                    username: email,
                    password: password
                })
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

    function displayMessage(message, type) {
        const loginMessage = document.getElementById("loginMessage");
        if (loginMessage) {
            loginMessage.textContent = message;
            loginMessage.style.color = (type === "success") ? "green" : "red";
        }
    }
});

