document.addEventListener('DOMContentLoaded', function() {
    const userRole = localStorage.getItem('userRole');

    if (userRole !== 'admin') {
        // Redirige a una página de error o a la página de cliente si el usuario no es un administrador.
        window.location.href = 'cliente.html';
    }
});
