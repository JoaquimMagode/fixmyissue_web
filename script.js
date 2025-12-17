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

    // Laptop image galleries
    const laptopImages = {
        dell: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026&auto=format&fit=crop'
        ],
        hp: [
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2032&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1515378791036-0648a814c963?q=80&w=2070&auto=format&fit=crop'
        ],
        lenovo: [
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=2012&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop'
        ]
    };

    // Handle laptop image clicks
    document.querySelectorAll('.laptop-gallery').forEach(gallery => {
        gallery.addEventListener('click', function() {
            const laptopType = this.dataset.laptop;
            const images = laptopImages[laptopType];
            const modalCarouselInner = document.getElementById('modalCarouselInner');
            
            // Clear previous images
            modalCarouselInner.innerHTML = '';
            
            // Add images to modal carousel
            images.forEach((img, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                carouselItem.innerHTML = `<img src="${img}" class="d-block w-100" style="max-height: 70vh; object-fit: contain;">`;
                modalCarouselInner.appendChild(carouselItem);
            });
            
            // Show modal
            const modal = new bootstrap.Modal(document.getElementById('imageModal'));
            modal.show();
        });
    });

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
                          `Problem: ${description}\n\n`;
            
            const whatsappUrl = `https://wa.me/918980192607?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            alert('Request sent via WhatsApp! We will contact you soon.');
        });
    }
});