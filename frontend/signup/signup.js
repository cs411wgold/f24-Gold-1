//reference https://mdbootstrap.com/docs/standard/forms/validation/ for validation
(function () {
    'use strict';

    var forms = document.querySelectorAll('.needs-validation');

    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            confirmPassword.classList.remove('is-invalid');

            // make sure password and re-entered passwords match
            if (!form.checkValidity() || password.value !== confirmPassword.value) {
                event.preventDefault();
                event.stopPropagation();

                if (password.value !== confirmPassword.value) {
                    confirmPassword.classList.add('is-invalid');
                }
            }

            form.classList.add('was-validated');
        }, false);
    });
})();
