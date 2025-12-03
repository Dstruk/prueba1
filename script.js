// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('La página ha cargado completamente.');

    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevenir el envío por defecto del formulario

            const username = loginForm.username.value;
            const password = loginForm.password.value;

            if (username === 'usuario' && password === 'contraseña') {
                alert('Inicio de sesión exitoso!');
                console.log('Usuario autenticado:', username);
                // Aquí normalmente redirigiríamos al usuario a una página protegida
            } else {
                alert('Nombre de usuario o contraseña incorrectos.');
                console.log('Intento de inicio de sesión fallido para:', username);
            }
        });
    }
});
