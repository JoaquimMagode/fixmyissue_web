document.addEventListener('DOMContentLoaded', function() {
    // Activate the Bootstrap carousel
    var homeCarousel = document.querySelector('#home');
    if (homeCarousel) {
        var carousel = new bootstrap.Carousel(homeCarousel, {
            interval: 5500,
            wrap: true,
            pause: 'hover'
        });
    }

    // Activate Amazon ads carousel
    var adsCarousel = document.querySelector('#amazonAdsCarousel');
    if (adsCarousel) {
        var adsCarouselInstance = new bootstrap.Carousel(adsCarousel, {
            interval: 4000,
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

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Quick issue buttons functionality
    const quickIssueButtons = document.querySelectorAll('.quick-issue');
    const problemDescription = document.getElementById('problem-description');
    
    quickIssueButtons.forEach(button => {
        button.addEventListener('click', function() {
            const issue = this.getAttribute('data-issue');
            problemDescription.value = issue;
            
            // Visual feedback
            quickIssueButtons.forEach(btn => btn.classList.remove('btn-primary'));
            quickIssueButtons.forEach(btn => btn.classList.add('btn-outline-primary'));
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-primary');
        });
    });

    // Current location functionality
    const currentLocationBtn = document.getElementById('current-location-btn');
    const addressInput = document.getElementById('address-input');
    
    if (currentLocationBtn && addressInput) {
        currentLocationBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                this.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Getting Location...';
                this.disabled = true;
                
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        addressInput.value = `Current Location: ${lat.toFixed(6)}, ${lng.toFixed(6)} (Please add your complete address)`;
                        currentLocationBtn.innerHTML = '<i class="bi bi-geo-alt-fill"></i> Use Current Location';
                        currentLocationBtn.disabled = false;
                    },
                    function(error) {
                        alert('Unable to get your location. Please enter your address manually.');
                        currentLocationBtn.innerHTML = '<i class="bi bi-geo-alt-fill"></i> Use Current Location';
                        currentLocationBtn.disabled = false;
                    }
                );
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        });
    }

    // Form submission handling
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const address = formData.get('address');
            const description = formData.get('description');
            
            // Create WhatsApp message with email info
            const message = `Hi! I would like to request a service appointment:\n\n` +
                          `Name: ${name}\n` +
                          `Phone: ${phone}\n` +
                          `Service: ${service}\n` +
                          `Address: ${address}\n` +
                          `Problem: ${description}\n\n` +
                          `Please also send confirmation to: joaquimcesarmagode@gmail.com`;
            
            const whatsappUrl = `https://wa.me/918980192607?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            alert('Request sent via WhatsApp! We will contact you soon.');
        });
    }
});