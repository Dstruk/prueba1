// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('La página ha cargado completamente.');

    // Lógica para el formulario de inicio de sesión
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
});
