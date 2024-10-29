/**
 * References for validation
 * https://getbootstrap.com/docs/5.0/forms/validation/
 * https://mdbootstrap.com/docs/standard/forms/validation/ 
 */
(function () {
    'use strict';

    var forms = document.querySelectorAll('.needs-validation');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            confirmPassword.classList.remove('is-invalid');

            // Prevent form submission if passwords don't match or form is invalid
            if (!form.checkValidity() || password.value !== confirmPassword.value) {
                event.preventDefault();
                event.stopPropagation();

                if (password.value !== confirmPassword.value) {
                    confirmPassword.classList.add('is-invalid');
                }
            } else {
                // Prevent default form submission to handle it with JavaScript
                event.preventDefault();

                // Collect form data
                var formData = {
                    username: document.getElementById('username').value,
                    first_name: document.getElementById('firstName').value,
                    last_name: document.getElementById('lastName').value,
                    email: document.getElementById('email').value,
                    password1: password.value,
                    password2: confirmPassword.value
                };

                // Send data to the backend using Fetch API
                fetch("http://localhost:8000/signup/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('Signup successful!');
                        // Optionally, redirect to login or another page
                        window.location.href = '/login';
                    } else {
                        alert(`Error: ${data.message}`);
                        console.error("Backend errors:", data.errors);
                    }
                })
                .catch(error => console.error("Error:", error));
            }

            form.classList.add('was-validated');
        }, false);
    });
})();
