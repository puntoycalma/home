const track = document.getElementById('carousel-track');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

let slides = [];
let currentIndex = 0;

// LISTA DE IMÁGENES (temporal, luego se puede cargar desde JSON o backend)
const images = [
    "producto1.jpg",
    "producto2.jpg",
    "producto3.jpg",
    "producto4.jpg",
    "producto5.jpg"
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

// NEXT
nextButton.addEventListener('click', () => {
    if (slides.length === 0) return;
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

// PREVIOUS
prevButton.addEventListener('click', () => {
    if (slides.length === 0) return;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

// RESPONSIVE
window.addEventListener('resize', updateCarousel);
updateCarousel();

/* =========================
   SWIPE / TOUCH SUPPORT
   ========================= */

let startX = 0;
let endX = 0;
const threshold = 50; // distancia mínima para cambiar slide

const carousel = document.querySelector('.carousel');

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
}, { passive: true });

carousel.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
}, { passive: true });

carousel.addEventListener('touchend', () => {
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            // swipe izquierda → siguiente
            currentIndex = (currentIndex + 1) % slides.length;
        } else {
            // swipe derecha → anterior
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        }
        updateCarousel();
    }

    startX = 0;
    endX = 0;
});
