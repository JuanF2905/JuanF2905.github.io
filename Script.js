// Seleccionamos el elemento de la tarjeta
const card = document.querySelector('.card');

// Añadimos un "escuchador de eventos" para el clic
card.addEventListener('click', function() {
    // Cada vez que se hace clic, se añade o quita la clase 'is-flipped'
    card.classList.toggle('is-flipped');
});