document.addEventListener('DOMContentLoaded', function() {
    // Activate the carousel
    var servicesCarousel = document.querySelector('#services-carousel');
    if (servicesCarousel) {
        var carousel = new bootstrap.Carousel(servicesCarousel, {
            interval: 5000, // Scroll every 5 seconds
            wrap: true // Loop continuously
        });
    }

    // Optional: Add a subtle animation to service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.5s ease-out forwards`;
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => {
        observer.observe(card);
    });
});

// Add CSS for the animation if it's not in the main stylesheet
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(style);
