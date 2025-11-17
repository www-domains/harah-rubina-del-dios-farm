(function() {
    if (typeof window.jQuery === 'undefined') {
        console.warn('jQuery is not loaded. Skipping jQuery-dependent UI enhancements.');
        return;
    }

    $(document).ready(function() {
    // Handle active state in navigation
    $('.nav-link').on('click', function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    // Mobile navigation
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
    });

    // Back to top button
    const backToTop = $('#backToTop');
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.addClass('show');
        } else {
            backToTop.removeClass('show');
        }
    });

    backToTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 75
            }, 800);
        }
    });

    // Add animation to service cards
    $('.service-card').hover(
        function() { $(this).addClass('shadow-lg'); },
        function() { $(this).removeClass('shadow-lg'); }
    );

    // Form submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    // Handle responsive images
    function handleResponsiveImages() {
        const windowWidth = $(window).width();
        const images = $('.hero-image, .service-card img, .blog-card img');
        
        if (windowWidth <= 576) {
            images.each(function() {
                const src = $(this).attr('src');
                if (src.indexOf('-mobile') === -1) {
                    $(this).attr('src', src.replace('.jpg', '-mobile.jpg'));
                }
            });
        } else {
            images.each(function() {
                const src = $(this).attr('src');
                if (src.indexOf('-mobile') !== -1) {
                    $(this).attr('src', src.replace('-mobile.jpg', '.jpg'));
                }
            });
        }
    }

    // Run on load and resize
    handleResponsiveImages();
    $(window).resize(handleResponsiveImages);

    // Add loading animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Set active class on button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Get filter value
                const filterValue = button.getAttribute('data-filter');

                // Filter gallery items
                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.classList.remove('hide');
                        item.style.display = 'block';
                    } else {
                        item.classList.add('hide');
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Background Music
    const backgroundMusic = document.getElementById('background-music');

    if (backgroundMusic) {
        backgroundMusic.volume = 0.2; // Set a pleasant, non-intrusive volume

        const playMusic = () => {
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay was prevented by the browser.");
                    // As a fallback, we can try to play it again after a user interaction.
                    document.body.addEventListener('click', playMusic, { once: true });
                });
            }
        };

        // Attempt to play music automatically
        playMusic();
    }

    // Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    });
})();
