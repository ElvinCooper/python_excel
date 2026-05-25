/* ==========================================================================
   INTERACTIVE JS LOGIC - EXCEL AUTOMATION LANDING PAGE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. HEADER SCROLL EFFECT
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. MOBILE HAMBURGER MENU
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = mobileOverlay.querySelectorAll('a');

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMobileMenu() {
        hamburger.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside the links (on the overlay itself)
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // 3. REVEAL ON SCROLL ANIMATION

    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it enters full view
    });

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. INTERACTIVE SAVINGS CALCULATOR
    const sliderHours = document.getElementById('slider-hours');
    const sliderRate = document.getElementById('slider-rate');
    const valHours = document.getElementById('val-hours');
    const valRate = document.getElementById('val-rate');
    
    const resultHours = document.getElementById('result-hours');
    const resultMoney = document.getElementById('result-money');

    function calculateSavings() {
        const hours = parseInt(sliderHours.value);
        const rate = parseInt(sliderRate.value);

        // Update display values
        valHours.textContent = `${hours} h`;
        valRate.textContent = `$${rate} USD`;

        // Mathematical calculations
        // Assume automation eliminates 90% of manual repetitive labor time
        const percentageAutomated = 0.9;
        const hoursSavedPerWeek = hours * percentageAutomated;
        const hoursSavedPerMonth = Math.round(hoursSavedPerWeek * 4.33); // 4.33 weeks per month
        const hoursSavedPerYear = Math.round(hoursSavedPerWeek * 52);
        
        const moneySavedPerYear = Math.round(hoursSavedPerYear * rate);

        // Format money output with comma grouping
        const formattedMoney = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(moneySavedPerYear);

        // Animation counter effect on values
        animateValue(resultHours, parseInt(resultHours.textContent) || 0, hoursSavedPerMonth, 400);
        
        // Directly set money text to avoid complex formatting transitions
        resultMoney.textContent = formattedMoney;
    }

    // Smooth value change helper
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    if (sliderHours && sliderRate) {
        sliderHours.addEventListener('input', calculateSavings);
        sliderRate.addEventListener('input', calculateSavings);
        
        // Run initial calculation on load
        calculateSavings();
    }

    // 4. FAQ ACCORDION INTERACTIVITY
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const faqItem = btn.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Close all other items first for single-expansion effect
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Toggle selected item
            if (!isActive) {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            }
        });
    });
});
