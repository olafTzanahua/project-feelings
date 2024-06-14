document.addEventListener('DOMContentLoaded', function() {
    const postits = document.querySelectorAll('.postit');
    const centralPostit = document.getElementById('central-postit');

    let seenCount = 0;
    const totalPostits = postits.length - 1; // Excluyendo el post-it central

    // Posiciones predefinidas para los post-its
    const positions = [
        { top: 50, left: 50 },
        { top: 100, left: 300 },
        { top: 200, left: 150 },
        { top: 300, left: 250 },
        { top: 400, left: 100 },
        { top: 500, left: 200 },
        { top: 600, left: 350 },
        { top: 700, left: 250 }
    ];

    // Asignar posiciones a los post-its y agregar evento de clic
    postits.forEach((postit, index) => {
        const { top, left } = positions[index];
        postit.style.top = `${top}px`;
        postit.style.left = `${left}px`;

        postit.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            const backgroundColor = getComputedStyle(this).backgroundColor;
            showModal(message, backgroundColor);

            if (!this.classList.contains('seen')) {
                this.classList.add('seen');
                seenCount++;
            }

            if (seenCount === totalPostits) {
                centralPostit.classList.remove('hidden');
            }
        });
    });

    function showModal(message, backgroundColor) {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.style.backgroundColor = backgroundColor;

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        modalContent.appendChild(messageParagraph);

        const closeButton = document.createElement('span');
        closeButton.classList.add('modal-close');
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', function() {
            closeModal(modal);
        });

        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);

        // Aplicar animación al mostrar el modal
        setTimeout(() => {
            modalContent.classList.add('modal-animation');
        }, 50); // Pequeña demora para asegurar que la animación se aplique correctamente
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        modal.remove();
    }
});
