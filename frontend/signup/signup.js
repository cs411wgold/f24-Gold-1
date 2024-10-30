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
                    password1: password.value,
                    password2: confirmPassword.value
                };

                // Send data to the backend using Fetch API
                fetch("http://localhost:8000/signup/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();  // Ensure the response is JSON
                    })
                    .then((data) => {
                        if (data.status === "success") {
                            alert("Signup successful!");
                            window.location.href = "/login";  // Redirect on success
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
