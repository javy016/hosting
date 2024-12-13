const imagesPage1 = [
    { src: 'imagenes/naturaleza1.jpg', category: 'naturaleza', name: 'Bosque otoño' },
    { src: 'imagenes/naturaleza2.jpeg', category: 'naturaleza', name: 'Lago' },
    { src: 'imagenes/ciudad1.jpg', category: 'ciudades', name: 'Nueva York' },
    { src: 'imagenes/ciudad2.jpg', category: 'ciudades', name: 'Madrid' },
    { src: 'imagenes/animal1.jpg', category: 'animales', name: 'Leopardo' },
    { src: 'imagenes/leon.jpg', category: 'animales', name: 'León' },
];

const imagesPage2 = [
    { src: 'imagenes/naturaleza3.jpg', category: 'naturaleza', name: 'Montaña' },
    { src: 'imagenes/naturaleza4.jpg', category: 'naturaleza', name: 'Aurora' },
    { src: 'imagenes/tokyo.jpg', category: 'ciudades', name: 'Tokyo' },
    { src: 'imagenes/barcelona.jpg', category: 'ciudades', name: 'Barcelona' },
    { src: 'imagenes/lechuza.jpeg', category: 'animales', name: 'Lechuza' },
    { src: 'imagenes/perro.jpg', category: 'animales', name: 'Perro' },
];

let currentPage = 0;
const imagesPerPage = 6;

function displayImages() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    // Combina las imágenes de ambas páginas
    const allImages = [...imagesPage1, ...imagesPage2];

    const searchValue = document.getElementById('search').value.toLowerCase();
    const selectedCategory = document.getElementById('category').value;

    // Filtra las imágenes según la búsqueda y la categoría seleccionada
    const filteredImages = allImages.filter(image => {
        const matchesSearch = image.name.toLowerCase().includes(searchValue);
        const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Muestra las imágenes filtradas
    const paginatedImages = filteredImages.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage);
    
    paginatedImages.forEach(image => {
        const div = document.createElement('div');
        div.className = 'thumbnail';
        div.innerHTML = `<img src="${image.src}" alt="${image.name}" onclick="openModal('${image.src}')">`;
        gallery.appendChild(div);
    });

    // Habilita o deshabilita los botones de paginación
    document.getElementById('prev').disabled = currentPage === 0;
    document.getElementById('next').disabled = (currentPage + 1) * imagesPerPage >= filteredImages.length;
}

document.getElementById('search').addEventListener('input', () => {
    currentPage = 0; // Reinicia la página actual al buscar
    displayImages();
});

document.getElementById('category').addEventListener('change', () => {
    currentPage = 0; // Reinicia la página actual al cambiar la categoría
    displayImages();
});

document.getElementById('next').addEventListener('click', () => {
    currentPage++;
    displayImages();
});

document.getElementById('prev').addEventListener('click', () => {
    currentPage--;
    displayImages();
});

function openModal(src) {
    const modal = document.getElementById('modal');
    const fullImage = document.getElementById('fullImage');
    fullImage.src = src; // Asigna la imagen al modal
    modal.style.display = 'flex'; // Muestra el modal al hacer clic en la imagen
}

document.getElementById('close').onclick = function() {
    document.getElementById('modal').style.display = 'none'; // Cierra el modal
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none'; // Cierra el modal si se hace clic fuera de él
    }
}

// Inicializa la galería al cargar la página
displayImages();
