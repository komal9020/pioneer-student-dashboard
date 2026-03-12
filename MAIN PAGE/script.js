let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dotsContainer');
const slider = document.getElementById('mainSlider');

// 1. Automatically create dots based on the number of slides
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        // Make dots clickable to jump to a slide
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
        
        dotsContainer.appendChild(dot);
    });
}

// 2. Logic to move slides
function moveSlide(direction) {
    currentSlide += direction;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    updateSlider();
}

// 3. Update the UI (Slide position and active dot)
function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots' active state
    const allDots = document.querySelectorAll('.dot');
    allDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Initialize
createDots();

// Auto-slide every 5 seconds
setInterval(() => {
    moveSlide(1);
}, 5000);


///---------------------------------------------------------------
let resIndex = 0;
function moveRes(n) {
    const track = document.getElementById('resultsTrack');
    const slides = document.querySelectorAll('.result-img');
    resIndex += n;

    if (resIndex >= slides.length) resIndex = 0;
    if (resIndex < 0) resIndex = slides.length - 1;

    track.style.transform = `translateX(-${resIndex * 100}%)`;
}