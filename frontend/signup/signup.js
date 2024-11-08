/**
 * References for validation
 * https://getbootstrap.com/docs/5.0/forms/validation/
 * https://mdbootstrap.com/docs/standard/forms/validation/ 
 */
(function () {
    'use strict';

    // Get the form, password, and confirmPassword elements
    var forms = document.querySelectorAll('.needs-validation');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');

    // Loop over the forms and attach event listeners
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();  // Prevent the default form submission
            confirmPassword.classList.remove('is-invalid');

            // Check if passwords match and form is valid
            if (!form.checkValidity() || password.value !== confirmPassword.value) {
                event.stopPropagation();

                // Show invalid feedback if passwords do not match
                if (password.value !== confirmPassword.value) {
                    confirmPassword.classList.add('is-invalid');
                }
            } else {
                // Form data to be sent to the backend
                var formData = {
                    username: document.getElementById('usernameInput').value,
                    email: document.getElementById('email').value,
                    password1: password.value,  // Updated to match the expected field name
                    password2: confirmPassword.value  // Updated to match the expected field name
                };

                // Send data to the backend using Fetch API
                fetch("http://localhost:8000/signup/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })
                .then(async (response) => {
                    if (!response.ok) {
                        // Capture server response for debugging
                        const errorDetails = await response.text();
                        console.error("Server response error:", errorDetails);
                        throw new Error(`Network response was not ok: ${errorDetails}`);
                    }
                    return response.json(); 
                })
                .then((data) => {
                    if (data.status === "success") {
                        alert("Signup successful!");
                        window.location.href = "../home/home.html";  // Redirect on success
                    } else {
                        alert(`Error: ${data.message}`);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("An error occurred during signup.");
                });
            }

            form.classList.add('was-validated');  // Bootstrap form validation class
        }, false);
    });
})();
