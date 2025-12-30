const track = document.getElementById('carousel-track');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

let slides = [];
let currentIndex = 0;

// LISTA DE IMÁGENES (temporal, luego se puede cargar desde JSON o backend)
const images = [
    "producto1.jpg",
    "producto2.jpg",
    "producto3.jpg"
];

// Crear elementos <img> dinámicamente
images.forEach(imgName => {
    const img = document.createElement('img');
    img.src = `images/${imgName}`;
    img.alt = "Producto artesanal";
    track.appendChild(img);
});

slides = Array.from(track.children);

function updateCarousel() {
    if (slides.length === 0) return;
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

// Next
nextButton.addEventListener('click', () => {
    if (slides.length === 0) return;
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

// Previous
prevButton.addEventListener('click', () => {
    if (slides.length === 0) return;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

// Scroll suave y responsive
window.addEventListener('resize', updateCarousel);
updateCarousel();
