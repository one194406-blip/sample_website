/**
 * Thulir Catering Service - Premium South Indian Theme
 * Main JS Logic: script.js
 */

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. Loader Logic
    // -------------------------------------------------------------
    const loaderWrapper = document.getElementById("loader-wrapper");
    window.addEventListener("load", () => {
        if (loaderWrapper) {
            loaderWrapper.style.opacity = "0";
            loaderWrapper.style.visibility = "hidden";
        }
    });

    // Fallback if window load doesn't trigger quickly
    setTimeout(() => {
        if (loaderWrapper && loaderWrapper.style.visibility !== "hidden") {
            loaderWrapper.style.opacity = "0";
            loaderWrapper.style.visibility = "hidden";
        }
    }, 2000);

    // -------------------------------------------------------------
    // 2. Navigation Header & Scroll Progress
    // -------------------------------------------------------------
    const header = document.getElementById("main-header");
    const progressBar = document.getElementById("progress-bar");
    const backToTopBtn = document.getElementById("back-to-top");
    const navLinks = document.querySelectorAll(".nav-link");

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Progress bar updates
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }

        // Header Background styling
        if (header) {
            if (scrollTop > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        // Back to top visibility
        if (backToTopBtn) {
            if (scrollTop > 400) {
                backToTopBtn.classList.add("active");
            } else {
                backToTopBtn.classList.remove("active");
            }
        }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial run

    // Back to top click handler
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // -------------------------------------------------------------
    // 3. Mobile Hamburger Menu Toggle
    // -------------------------------------------------------------
    const hamburger = document.getElementById("hamburger-menu");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close menu on nav-link clicks
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // -------------------------------------------------------------
    // 4. Hero Section Typing Effect
    // -------------------------------------------------------------
    const typingSpan = document.getElementById("hero-typing");
    if (typingSpan) {
        const words = [
            "Authentic South Indian Catering",
            "Tradition Served On A Banana Leaf",
            "Exquisite Food For Grand Celebrations"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingSpan.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // faster deleting
            } else {
                typingSpan.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // standard typing
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at full word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typingSpeed);
        };

        // Start typing loop
        setTimeout(type, 1000);
    }

    // -------------------------------------------------------------
    // 5. Special Menu Tab Switcher
    // -------------------------------------------------------------
    const tabButtons = document.querySelectorAll(".menu-tab-btn");
    const tabContents = document.querySelectorAll(".menu-tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetTab = button.getAttribute("data-tab");

            // Remove active states
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Add active state to clicked button and target tab
            button.classList.add("active");
            const targetEl = document.getElementById(targetTab);
            if (targetEl) {
                targetEl.classList.add("active");
            }
        });
    });

    // -------------------------------------------------------------
    // 6. Gallery Lightbox Popup
    // -------------------------------------------------------------
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            if (lightbox && lightboxImg && lightboxCaption) {
                const img = item.querySelector("img");
                const overlayText = item.querySelector("h4");
                
                lightbox.style.display = "block";
                lightboxImg.src = img.src;
                lightboxCaption.textContent = overlayText ? overlayText.textContent : "";
                document.body.style.overflow = "hidden"; // Prevent body scroll
            }
        });
    });

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = ""; // Re-enable scroll
        }
    };

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close on Escape Key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLightbox();
            closeSuccessModal();
        }
    });

    // -------------------------------------------------------------
    // 7. Stats Counter Animation on Scroll
    // -------------------------------------------------------------
    const statNumbers = document.querySelectorAll(".stat-number");
    const statsSection = document.getElementById("stats-section");
    let countersStarted = false;

    const startCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute("data-target"), 10);
            const increment = target / 50; // speed control
            let currentValue = 0;

            const updateCount = () => {
                currentValue += increment;
                if (currentValue < target) {
                    stat.textContent = Math.ceil(currentValue);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            updateCount();
        });
    };

    if (statsSection && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    startCounters();
                    countersStarted = true;
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // -------------------------------------------------------------
    // 8. Auto-sliding Testimonials Carousel
    // -------------------------------------------------------------
    const testimonialTrack = document.getElementById("testimonial-track");
    const testimonialSlides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".indicator-dot");
    let currentSlide = 0;
    const totalSlides = testimonialSlides.length;
    let autoSlideInterval;

    const updateSlider = (index) => {
        if (!testimonialTrack) return;
        
        currentSlide = index;
        const slideWidth = 100 / totalSlides;
        testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        dots.forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    };

    const nextSlide = () => {
        const nextIndex = (currentSlide + 1) % totalSlides;
        updateSlider(nextIndex);
    };

    const startAutoSlide = () => {
        if (totalSlides > 1) {
            autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    // Dot indicators click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            updateSlider(index);
            resetAutoSlide();
        });
    });

    startAutoSlide();

    // -------------------------------------------------------------
    // 9. Booking Form Validation & Success Modal
    // -------------------------------------------------------------
    const bookingForm = document.getElementById("booking-form");
    const successModal = document.getElementById("success-modal");
    const successClose = document.getElementById("success-close");
    const successModalBtn = document.getElementById("success-modal-btn");

    // Email regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone regex pattern (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;

    const validateField = (inputEl, errorEl, validationFn) => {
        const parent = inputEl.parentElement;
        const isValid = validationFn(inputEl.value.trim());

        if (isValid) {
            parent.classList.remove("error");
            return true;
        } else {
            parent.classList.add("error");
            return false;
        }
    };

    const closeSuccessModal = () => {
        if (successModal) {
            successModal.style.display = "none";
        }
    };

    if (bookingForm) {
        const nameInput = document.getElementById("booking-name");
        const phoneInput = document.getElementById("booking-phone");
        const emailInput = document.getElementById("booking-email");
        const eventInput = document.getElementById("booking-event-type");
        const guestsInput = document.getElementById("booking-guests");
        const dateInput = document.getElementById("booking-date");

        // Set min date to today's date
        const today = new Date().toISOString().split("T")[0];
        if (dateInput) {
            dateInput.min = today;
        }

        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let isFormValid = true;

            // 1. Name Check
            if (!validateField(nameInput, null, val => val.length >= 2)) {
                isFormValid = false;
            }

            // 2. Phone Check
            if (!validateField(phoneInput, null, val => phoneRegex.test(val))) {
                isFormValid = false;
            }

            // 3. Email Check
            if (!validateField(emailInput, null, val => emailRegex.test(val))) {
                isFormValid = false;
            }

            // 4. Event Type Check
            if (!validateField(eventInput, null, val => val !== "")) {
                isFormValid = false;
            }

            // 5. Guests Check
            if (!validateField(guestsInput, null, val => val !== "" && parseInt(val, 10) >= 25)) {
                isFormValid = false;
            }

            // 6. Date Check
            if (!validateField(dateInput, null, val => val !== "")) {
                isFormValid = false;
            }

            if (isFormValid) {
                // Show Success Modal
                if (successModal) {
                    successModal.style.display = "flex";
                }
                bookingForm.reset();
                // Remove any leftover error class states
                const formGroups = bookingForm.querySelectorAll(".form-group");
                formGroups.forEach(group => group.classList.remove("error"));
            }
        });

        // Real-time validation feedbacks
        nameInput.addEventListener("input", () => validateField(nameInput, null, val => val.length >= 2));
        phoneInput.addEventListener("input", () => validateField(phoneInput, null, val => phoneRegex.test(val)));
        emailInput.addEventListener("input", () => validateField(emailInput, null, val => emailRegex.test(val)));
        eventInput.addEventListener("change", () => validateField(eventInput, null, val => val !== ""));
        guestsInput.addEventListener("input", () => validateField(guestsInput, null, val => val !== "" && parseInt(val, 10) >= 25));
        dateInput.addEventListener("change", () => validateField(dateInput, null, val => val !== ""));
    }

    // Modal Closing logic
    if (successClose) {
        successClose.addEventListener("click", closeSuccessModal);
    }
    if (successModalBtn) {
        successModalBtn.addEventListener("click", closeSuccessModal);
    }
    if (successModal) {
        successModal.addEventListener("click", (e) => {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });
    }

    // -------------------------------------------------------------
    // 10. Scroll Animations Observer (Reveal-on-Scroll)
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-active");
                    revealObserver.unobserve(entry.target); // Trigger once
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => revealObserver.observe(el));
    }
});
