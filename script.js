// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('La página ha cargado completamente.');

    // Lógica para el formulario de inicio de sesión
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => { // Añadir 'async' aquí
            event.preventDefault(); // Prevenir el envío por defecto del formulario

            const username = loginForm.username.value;
            const password = loginForm.password.value;

            try {
                const response = await fetch('http://localhost:5000/api/login', { // Usar fetch para el backend
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`Inicio de sesión exitoso: ${data.message}`);
                    console.log('Usuario autenticado:', data.username);
                    // Aquí normalmente redirigiríamos al usuario a una página protegida
                } else {
                    alert(`Error al iniciar sesión: ${data.message}`);
                    console.log('Intento de inicio de sesión fallido:', data.message);
                }
            } catch (error) {
                console.error('Error de red o del servidor:', error);
                alert('Error al conectar con el servidor. Inténtalo de nuevo más tarde.');
            }
        });
    }

    // Lógica para la barra de búsqueda
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Buscando:', searchTerm);
                alert(`Buscando: ${searchTerm}`);
                // Aquí iría la lógica real de búsqueda, por ejemplo, filtrar películas/series
            } else {
                alert('Por favor, introduce un término de búsqueda.');
            }
        });

        // Opcional: Permitir búsqueda al presionar Enter en el input
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Lógica para hacer las tarjetas de películas interactivas
    const movieCards = document.querySelectorAll('.movie-card');

    movieCards.forEach(card => {
        card.addEventListener('click', () => {
            const titleElement = card.querySelector('h4');
            const title = titleElement ? titleElement.textContent : 'Contenido Desconocido';
            alert(`Has hecho clic en: ${title}`);
            console.log('Clic en tarjeta:', title);
            // Aquí podrías redirigir a una página de detalles o mostrar un modal
        });
    });

    // Lógica para el modal de autenticación
    const authModal = document.getElementById('authModal');
    const openAuthModalBtn = document.getElementById('openAuthModal');
    const closeButton = document.querySelector('.close-button');

    if (authModal && openAuthModalBtn && closeButton) {
        openAuthModalBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevenir el salto del enlace
            authModal.style.display = 'flex'; // Mostrar el modal
        });

        closeButton.addEventListener('click', () => {
            authModal.style.display = 'none'; // Ocultar el modal
        });

        // Cerrar el modal si se hace clic fuera de su contenido
        window.addEventListener('click', (event) => {
            if (event.target === authModal) {
                authModal.style.display = 'none';
            }
        });
    }

    // Lógica para el formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = registerForm.username.value;
            const password = registerForm.password.value;
            const confirmPassword = registerForm.confirmPassword.value;

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`Registro exitoso: ${data.message}`);
                    console.log('Usuario registrado:', data.username);
                    // Redirigir al usuario a la página de login
                    window.location.href = 'login.html';
                } else {
                    alert(`Error en el registro: ${data.message}`);
                    console.log('Intento de registro fallido:', data.message);
                }
            } catch (error) {
                console.error('Error de red o del servidor:', error);
                alert('Error al conectar con el servidor. Inténtalo de nuevo más tarde.');
            }
        });
    }
});
