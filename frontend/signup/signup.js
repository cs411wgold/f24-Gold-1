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

            // review information entered and make sure password and re-entered passwords match
            if (!form.checkValidity() || password.value !== confirmPassword.value) {
                event.preventDefault();
                event.stopPropagation();

                // if password and re-entered password to not match, return invalid
                if (password.value !== confirmPassword.value) {
                    confirmPassword.classList.add('is-invalid');
                }
            }

            form.classList.add('was-validated');
        }, false);
    });
})();
