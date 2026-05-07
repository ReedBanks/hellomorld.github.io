// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section > .container, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gallery filter functionality
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });

    // Filter items
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Carousel functionality
function initCarousel() {
    const carousel = document.querySelector('.projects-carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    let currentPosition = 0;
    const itemWidth = projectItems[0].offsetWidth;
    const gap = 32; // 2rem = 32px
    const itemTotalWidth = itemWidth + gap;
    const containerWidth = carousel.parentElement.offsetWidth;
    const itemsPerView = Math.floor(containerWidth / itemTotalWidth);
    const maxScroll = Math.max(0, (projectItems.length - itemsPerView) * itemTotalWidth);
    
    function updateCarousel() {
        currentPosition = Math.max(0, Math.min(currentPosition, maxScroll));
        carousel.style.transform = `translateX(-${currentPosition}px)`;
    }
    
    prevBtn.addEventListener('click', () => {
        currentPosition = Math.max(0, currentPosition - itemTotalWidth);
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentPosition = Math.min(currentPosition + itemTotalWidth, maxScroll);
        updateCarousel();
    });
    
    // Initialize
    updateCarousel();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newContainerWidth = carousel.parentElement.offsetWidth;
        const newItemsPerView = Math.floor(newContainerWidth / itemTotalWidth);
        const newMaxScroll = Math.max(0, (projectItems.length - newItemsPerView) * itemTotalWidth);
        currentPosition = Math.min(currentPosition, newMaxScroll);
        updateCarousel();
    });
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}
