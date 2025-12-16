document.addEventListener('DOMContentLoaded', function() {
    // Activate the Bootstrap carousel
    var homeCarousel = document.querySelector('#home');
    if (homeCarousel) {
        var carousel = new bootstrap.Carousel(homeCarousel, {
            interval: 5500, // Slightly longer interval
            wrap: true,
            pause: 'hover'
        });
    }

    // Change navbar background on scroll
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});