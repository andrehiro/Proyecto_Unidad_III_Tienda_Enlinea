document.addEventListener('DOMContentLoaded', function() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function() {
        const enteredUsername = username.value;
        const enteredPassword = password.value;

        if (enteredUsername === 'admin' && enteredPassword === '123') {
            localStorage.setItem('userRole', 'admin'); // Almacena el rol en localStorage
            window.location.href = 'admin.html'; // Redireccionar al panel de administrador
        } else if (enteredUsername === 'cliente' && enteredPassword === '123') {
            localStorage.setItem('userRole', 'cliente'); // Almacena el rol en localStorage
            window.location.href = 'cliente.html'; // Redireccionar al panel de cliente
        } else {
            alert('Credenciales incorrectas. Por favor, intenta de nuevo.');
        }
    });
});