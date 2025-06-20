document.addEventListener('DOMContentLoaded', function () {
    // --- Skrip untuk Navigasi Mobile ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = mobileMenu.querySelectorAll('a');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- Skrip untuk Animasi saat Scroll ---
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1 
    });

    const animatedElements = document.querySelectorAll('.repeating-animation');
    animatedElements.forEach(el => observer.observe(el));
    
    // --- Skrip untuk Header dan Tombol Scroll ---
    const header = document.getElementById('header');
    const toTopButton = document.getElementById('to-top-button');
    const heroSectionHeight = document.getElementById('home').offsetHeight;
    
    window.addEventListener('scroll', () => {
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // To Top button visibility
        if (window.scrollY > 300) {
            toTopButton.classList.remove('hidden');
        } else {
            toTopButton.classList.add('hidden');
        }

        // Booking form animation trigger
        const bookingForm = document.getElementById('booking-form-wrapper');
        if (bookingForm && window.scrollY > heroSectionHeight / 3) {
             bookingForm.classList.add('visible');
        }
    });
    
    // Initial check for booking form
    const bookingForm = document.getElementById('booking-form-wrapper');
     if (bookingForm && window.scrollY > (heroSectionHeight / 3)) {
         bookingForm.classList.add('visible');
     }

    // --- Skrip untuk Flatpickr Datepicker ---
    let checkoutPicker; // Declare here to be accessible in checkinConfig

    const checkinConfig = {
        wrap: true,
        dateFormat: "d-m-Y",
        minDate: "today",
        onChange: function(selectedDates, dateStr, instance) {
            if (checkoutPicker && selectedDates.length > 0) {
                // Ensure the checkout date is always after the check-in date
                const nextDay = new Date(selectedDates[0]);
                nextDay.setDate(nextDay.getDate() + 1);
                checkoutPicker.set('minDate', nextDay);
            }
        }
    };
    
    const checkoutConfig = {
        wrap: true,
        dateFormat: "d-m-Y",
        minDate: new Date().fp_incr(1) // Set minDate to tomorrow
    };

    const checkinPicker = flatpickr("#checkin-wrapper", checkinConfig);
    checkoutPicker = flatpickr("#checkout-wrapper", checkoutConfig);

});
