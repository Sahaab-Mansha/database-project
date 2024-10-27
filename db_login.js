document.addEventListener('DOMContentLoaded', function () {
    const eyeIcon = document.querySelector('.eye_icon');
    const passwordInput = document.querySelector('#password input');

    eyeIcon.addEventListener('click', function () {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.classList.add('open'); // Add the open class
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.remove('open'); // Remove the open class
        }
    });
});