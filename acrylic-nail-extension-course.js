// testimonials

const testimonials = [
    {
        name: "Sara Mitchel",
        role: "Nail Technician,",
        address:"London",
        text: "I went from zero experience to running my own nail business within 3 months. The trainers are incredibly supportive and the hands-on approach made everything click!",
        mainImg: "https://i.ibb.co.com/XkY4b2M3/Overlay-Shadow.webp", 
        thumbImg: "https://i.ibb.co.com/XkY4b2M3/Overlay-Shadow.webp", 
        badge: "Now Running Own Salon",
        videoUrl: "https://www.youtube.com/watch?v=ySgBOaPcLlw" 
    },
    {
        name: "John Doe",
        role: "Nail Technician,",
        address:"London",
        text: "The Acrylic Nail Extension course by Lead Academy is clear and well-structured. The lessons are easy to follow, with practical examples that build confidence and improve your skills effectively.",
        mainImg: "https://i.ibb.co.com/G4PTcq1g/unsplash-p-At-A8xe-i-VM.webp",
        thumbImg: "https://i.ibb.co.com/G4PTcq1g/unsplash-p-At-A8xe-i-VM.webp",
        badge: "Career Switch Success",
        videoUrl: "https://www.youtube.com/watch?v=9e9vexPeTtY" // Video 2
    },
    {
        name: "Mark Stevens",
        role: "Beauty Therapist,",
        address:"London",
        text: "The Acrylic Nail Extension course by Lead Academy is clear and well-structured. The lessons are easy to follow, with practical examples that build confidence and improve your skills effectively.",
        mainImg: "https://i.ibb.co.com/YFrdRMSD/unsplash8-Vt2haq8-NSQ280x373.webp",
        thumbImg: "https://i.ibb.co.com/YFrdRMSD/unsplash8-Vt2haq8-NSQ280x373.webp",
        badge: "Professional Certificate",
        videoUrl: "https://www.youtube.com/watch?v=F8yuihI1DR0" // Video 3
    }
];

// Keep your testimonials array exactly as it is

let currentIndex = 0;

// MERGED updateUI Function (This replaces BOTH previous versions)
function updateUI(index) {
    currentIndex = index;
    const data = testimonials[currentIndex];

    // 1. Basic Text Content
    const nameEl = document.getElementById('user-name');
    const roleEl = document.getElementById('user-role');
    const addrEl = document.getElementById('user-address');
    const badgeEl = document.getElementById('badge-text');
    const mainImgEl = document.getElementById('main-img');
    const userIconEl = document.getElementById('user-icon');

    if(nameEl) nameEl.innerText = data.name;
    if(roleEl) roleEl.innerText = data.role;
    if(addrEl) addrEl.innerText = data.address;
    if(mainImgEl) mainImgEl.src = data.mainImg;
    if(userIconEl) userIconEl.src = data.thumbImg;
    
    // 2. Badge HTML (Icon + Text)
    if(badgeEl) {
        badgeEl.innerHTML = `<img src="https://i.ibb.co.com/9H1gNPQN/Component-1-4.webp" alt="User Icon" class="badge-icon"> ${data.badge}`;
    }
    renderThumbs();
}

// Ensure renderThumbs uses the logic you provided but is called by updateUI
function renderThumbs() {
    const container = document.getElementById('thumb-container');
    if (!container) return;

    container.innerHTML = ''; 

    testimonials.forEach((item, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = `thumb-line ${index === currentIndex ? 'active' : ''}`;
        
        // Inline styles to match your design
        wrapper.style.width = "103px";
        wrapper.style.height = "10px";
        wrapper.style.backgroundColor = (index === currentIndex) ? "#E92063" : "#E5E7EB";
        wrapper.style.display = "inline-block";
        wrapper.style.margin = "5px";
        wrapper.style.cursor = "pointer";
        wrapper.style.borderRadius = "9999px";

        wrapper.onclick = () => updateUI(index); 
        container.appendChild(wrapper);
    });
}

// Navigation Functions
function nextTestimonial() {
    let newIndex = (currentIndex + 1) % testimonials.length;
    updateUI(newIndex);
}

function prevTestimonial() {
    let newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateUI(newIndex);
}

// Initial Call
document.addEventListener('DOMContentLoaded', () => {
    updateUI(0);
});

// Play button logic
const playBtn = document.querySelector('.play-btn');
if(playBtn) {
    playBtn.onclick = () => {
        Fancybox.show(
            testimonials.map(t => ({
                src: t.videoUrl,
                type: "video",
            })),
            { startIndex: currentIndex }
        );
    };
}


// Smooth scroll to booking section
document.addEventListener('DOMContentLoaded', () => {
    const enrollButtons = document.querySelectorAll('.enroll-active-btn');
    const availableDatesButtons = document.querySelectorAll('.available-dates-btn');
    const bookingSection = document.getElementById('book-traning');

    // Function to smooth scroll to booking section
    function scrollToBooking(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (!bookingSection) {
            console.warn('Booking section not found');
            return;
        }

        // Get the position of the booking section
        const targetPosition = bookingSection.getBoundingClientRect().top + window.pageYOffset;
        const offset = 80; // Offset for fixed headers if any
        const finalPosition = targetPosition - offset;

        // Try jQuery animate first (most reliable with WooCommerce)
        if (typeof jQuery !== 'undefined') {
            jQuery('html, body').animate({
                scrollTop: finalPosition
            }, 1000, 'swing'); // 1 second duration with swing easing
        } else {
            // Fallback to custom smooth scroll
            const startPosition = window.pageYOffset;
            const distance = finalPosition - startPosition;
            const duration = 1000;
            let start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                
                // Easing function (ease-in-out)
                const ease = percentage < 0.5
                    ? 4 * percentage * percentage * percentage
                    : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
                
                window.scrollTo(0, startPosition + (distance * ease));
                
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }

            window.requestAnimationFrame(step);
        }
    }

    // Add click event to all "Enroll Now" buttons
    enrollButtons.forEach(button => {
        button.addEventListener('click', scrollToBooking);
    });

    // Add click event to all "See Available Dates" buttons
    availableDatesButtons.forEach(button => {
        button.addEventListener('click', scrollToBooking);
    });

    // Also handle the "Book now" buttons in curriculum section
    const curriculumBookButtons = document.querySelectorAll('.book-btn');
    curriculumBookButtons.forEach(button => {
        button.addEventListener('click', scrollToBooking);
    });
});

// booking logic
document.addEventListener('DOMContentLoaded', () => {
    const trainingContainer = document.querySelector('.book-traning-cards');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    const bookingDataEl = document.getElementById('acrylic-booking-data');

    if (!trainingContainer || !seeMoreBtn || !bookingDataEl) {
        return;
    }

    let bookingPayload = null;

    try {
        bookingPayload = JSON.parse(bookingDataEl.textContent);
    } catch (error) {
        console.error('Could not parse acrylic booking data:', error);
        return;
    }

    const baseCourse = bookingPayload.baseCourse || { items: [] };
    const addOnCourse = bookingPayload.addOnCourse || { items: [] };
    const baseProductId = parseInt(bookingPayload.baseProductId, 10) || 0;
    const addOnProductId = parseInt(bookingPayload.addOnProductId, 10) || 0;

    const trainingData = (baseCourse.items || []).filter(item => !item.hidden && !item.deleted);
    const addOnOptions = (addOnCourse.items || []).filter(item => !item.hidden && !item.deleted && !item.fully_booked);
    let displayedCount = 3;

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getNumericPrice(price) {
        const numeric = String(price || '').replace(/[^\d.]/g, '');
        return numeric ? parseFloat(numeric) : 0;
    }

    function calculateDiscount(sellPrice, regularPrice) {
        const sale = getNumericPrice(sellPrice);
        const regular = getNumericPrice(regularPrice);
        if (!sale || !regular || regular <= sale) {
            return '';
        }

        return `${Math.round(((regular - sale) / regular) * 100)}% OFF`;
    }

    function getSeatMessage(item) {
        if (item.fully_booked || item.real_stock < 1 || item.seats_left < 1) {
            return 'Sorry! No Seats Left';
        }

        return `Hurry! Only ${item.seats_left} Seats Left`;
    }

    function createAddOnDropdownOptions() {
        return addOnOptions.map(option => `
            <div class="dropdown-item" data-variation-id="${option.variation_id}" data-date-label="${escapeHtml(option.date_full || option.date)}">
                <div class="d-flex justify-content-between">
                    <span><strong>${escapeHtml(option.date_full || option.date)}</strong></span>
                    <span class="text-pink">${escapeHtml(option.sell_price)}</span>
                </div>
            </div>
        `).join('');
    }

    function createCardHTML(item) {
        const isSoldOut = item.fully_booked || item.real_stock < 1 || item.seats_left < 1;
        const discountText = calculateDiscount(item.sell_price, item.regular_price);
        const addOnDiscountText = calculateDiscount(addOnCourse.sell_price, addOnCourse.regular_price);
        const hasAddOn = !isSoldOut && addOnOptions.length > 0;
        const baseSellPrice = getNumericPrice(item.sell_price);
        const baseRegularPrice = getNumericPrice(item.regular_price);

        return `
        <div class="book-traning-card position-relative" data-variation-id="${item.variation_id}">
            ${discountText ? `<span class="discount-top d-none d-md-block">${escapeHtml(discountText)}</span>` : ''}
            <div>
                <div class="booking-info">
                    <div>
                        <div class="traning-address">
                            <div class="date-box d-none d-md-block">
                                <span class="date">${escapeHtml(item.date_day)}</span>
                                <span class="month">${escapeHtml(item.date_month)}</span>
                            </div>
                            <div class="location d-flex flex-column">
                                <p class="location-text">${escapeHtml(item.location)}</p>
                                <div class="location-icon d-flex justify-content-start align-items-center gap-2">
                                    <img src="https://i.ibb.co.com/kV9HgLYN/Group-47.webp" alt="location icon" class="d-none d-md-block">
                                    <p class="mb-0">${escapeHtml(item.address)}</p>
                                </div>
                                <div class="date-mobile d-flex justify-content-start align-items-center gap-2 d-block d-md-none">
                                    <span class="time-icon d-block d-md-none">
                                        <img src="https://i.ibb.co.com/CsWLJfTT/Group-82.webp" alt="date-icon" />
                                    </span>
                                    <p class="mb-0">${escapeHtml(item.date_full || item.date)}</p>
                                </div>
                                <div class="time d-flex justify-content-start align-items-center gap-2">
                                    <span class="time-icon">
                                        <img src="https://i.ibb.co.com/x87KPMvx/Group-48.webp" alt="time-icon" />
                                    </span>
                                    <p class="mb-0">${escapeHtml(item.time)}</p>
                                </div>
                            </div>
                        </div>
                        <div class="${isSoldOut ? 'alert-for-no-seats' : 'alert-for-seats'}">
                            <span>${isSoldOut ? 'Sorry! No Seats Left' : `<span class="d-md-none d-inline-block">🔥</span>${escapeHtml(getSeatMessage(item))}`}</span>
                        </div>
                    </div>
                    <div class="book-price">
                        <div class="pricing-tag">
                            <span class="current-price" data-base-price="${baseSellPrice}">${escapeHtml(item.sell_price)}</span>
                            <span class="original-price" data-base-price="${baseRegularPrice}">${escapeHtml(item.regular_price)}</span>
                        </div>
                        <button type="button" class="${isSoldOut ? 'already-booked-btn' : 'book-now-btn'}">${isSoldOut ? 'Fully Booked' : 'Book Now'}</button>
                    </div>
                </div>
            </div>
            ${hasAddOn ? `
            <div class="special-offer position-relative">
                ${addOnDiscountText ? `<span class="discount-top">🔥 Special Offer</span>` : `<span class="discount-top">🔥 Special Offer</span>`}
                <div class="d-flex justify-content-between flex-column flex-md-row align-items-md-end align-items-start gap-1 gap-lg-3">
                    <div class="special-offer-text d-flex align-items-lg-start align-items-center w-100">
                        <div class="la-toggle-switch offer-add mt-1">
                            <span class="la-toggle-slider"></span>
                        </div>
                        <div class="flex-grow-1 position-relative">
                            <p class="p-text-black mb-lg-1">Add Complete Nail Technician 3 Days Course</p>
                            <p class="text-morning mb-0 mt-lg-1 d-inline">Offers are applicable only if you add now!</p>
                            <p class="offer-validation mb-0" style="display:none;"></p>
                        </div>
                    </div>
                    <div class="special-offer-course d-flex align-items-end justify-content-between gap-2 d-block">
                        <span class="only-for d-inline-block">only for</span>
                        <span class="current-price">${escapeHtml(addOnCourse.sell_price || '')}</span>
                        <span class="original-price">${escapeHtml(addOnCourse.regular_price || '')}</span>
                    </div>
                </div>
                <div class="custom-select-wrapper" style="display: none;">
                    <div class="offer-date-input">
                        <span class="selected-val">Choose your preferred date</span>
                        <i class="arrow-down"></i>
                    </div>
                    <div class="offer-date-dropdown">
                        <div class="dropdown-search">
                            <input type="text" placeholder="Search date" class="city-search">
                        </div>
                        <div class="options-container">
                            ${createAddOnDropdownOptions()}
                        </div>
                    </div>
                </div>
            </div>` : ''}
        </div>`;
    }

    function renderCards() {
        trainingContainer.innerHTML = trainingData.slice(0, displayedCount).map(createCardHTML).join('');

        if (!trainingData.length) {
            trainingContainer.innerHTML = '<p class="text-center w-100">No training dates are available right now.</p>';
        }

        seeMoreBtn.style.display = trainingData.length <= 3 ? 'none' : 'block';
        seeMoreBtn.textContent = displayedCount > 3 ? 'See Less' : 'See More';
    }

    function showOfferMessage(card, message, isError = false) {
        const messageEl = card.querySelector('.offer-validation');
        if (!messageEl) {
            return;
        }

        messageEl.textContent = message;
        messageEl.style.display = message ? 'block' : 'none';
        messageEl.style.color = isError ? '#ffffff' : '#000000';
    }

    function animatePriceChange(element, nextValue) {
        if (!element) {
            return;
        }

        element.style.transition = 'opacity 180ms ease';
        element.style.opacity = '0.35';

        window.setTimeout(() => {
            element.textContent = nextValue;
            element.style.opacity = '1';
        }, 180);
    }

    function updateCombinedPricing(card, includeAddOn, animate = false) {
        const currentPriceEl = card.querySelector('.pricing-tag .current-price');
        const originalPriceEl = card.querySelector('.pricing-tag .original-price');

        if (!currentPriceEl || !originalPriceEl) {
            return;
        }

        const baseCurrentPrice = parseFloat(currentPriceEl.dataset.basePrice || '0');
        const baseOriginalPrice = parseFloat(originalPriceEl.dataset.basePrice || '0');
        const addOnCurrentPrice = getNumericPrice(addOnCourse.sell_price);
        const addOnOriginalPrice = getNumericPrice(addOnCourse.regular_price);

        const nextCurrentPrice = includeAddOn ? baseCurrentPrice + addOnCurrentPrice : baseCurrentPrice;
        const nextOriginalPrice = includeAddOn ? baseOriginalPrice + addOnOriginalPrice : baseOriginalPrice;

        if (animate) {
            animatePriceChange(currentPriceEl, `£${Math.round(nextCurrentPrice)}`);
            animatePriceChange(originalPriceEl, `£${Math.round(nextOriginalPrice)}`);
            return;
        }

        currentPriceEl.textContent = `£${Math.round(nextCurrentPrice)}`;
        originalPriceEl.textContent = `£${Math.round(nextOriginalPrice)}`;
    }

    function toggleOfferState(card, activate) {
        const offerImg = card.querySelector('.offer-add');
        const offerDiv = card.querySelector('.special-offer');
        const selectWrapper = card.querySelector('.custom-select-wrapper');
        const textMorning = card.querySelector('.text-morning');
        const selectedVal = card.querySelector('.selected-val');

        if (!offerImg || !offerDiv || !selectWrapper || !textMorning || !selectedVal) {
            return;
        }

        card.dataset.addOnEnabled = activate ? '1' : '0';

        if (activate) {
            offerImg.classList.add('active');
            offerDiv.style.background = '#F64E85';
            offerDiv.style.color = 'white';
            selectWrapper.style.display = 'block';
            textMorning.style.color = 'black';
            textMorning.textContent = 'Will be added to your cart!';
            selectedVal.style.color = 'black';
            selectedVal.parentElement.style.background = 'white';
            updateCombinedPricing(card, false);
            showOfferMessage(card, '');
        } else {
            offerImg.classList.remove('active');
            offerDiv.style.background = '';
            offerDiv.style.color = '';
            selectWrapper.style.display = 'none';
            textMorning.style.color = '';
            textMorning.textContent = 'Offers are applicable only if you add now!';
            selectedVal.textContent = 'Choose your preferred date';
            selectedVal.style.color = '';
            selectedVal.parentElement.style.background = '';
            card.dataset.addOnVariationId = '';
            card.dataset.addOnDate = '';
            updateCombinedPricing(card, false);
            showOfferMessage(card, '');
        }
    }

    function markCardAsFullyBooked(card, message) {
        const alertWrap = card.querySelector('.alert-for-seats');
        const bookBtn = card.querySelector('.book-now-btn');

        if (alertWrap) {
            alertWrap.className = 'alert-for-no-seats';
            alertWrap.innerHTML = `<span>${escapeHtml(message || 'Sorry! No Seats Left')}</span>`;
        }

        if (bookBtn) {
            bookBtn.textContent = 'Fully Booked';
            bookBtn.className = 'already-booked-btn';
            bookBtn.disabled = true;
        }

        const offerSection = card.querySelector('.special-offer');
        if (offerSection) {
            offerSection.remove();
        }
    }

    function bookCourseBundle(payload) {
        return jQuery.ajax({
            url: add_to_cart_la_object.ajax_url,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'ajax_add_course_bundle_la',
                nonce: (typeof fully_booked_ajax_object !== 'undefined' && fully_booked_ajax_object.nonce) ? fully_booked_ajax_object.nonce : '',
                base_product_id: payload.baseProductId,
                base_variation_id: payload.baseVariationId,
                add_on_product_id: payload.addOnProductId || 0,
                add_on_variation_id: payload.addOnVariationId || 0,
                quantity: 1
            }
        });
    }

    async function handleBooking(card, button) {
        const baseVariationId = parseInt(card.dataset.variationId, 10) || 0;
        const addOnEnabled = card.dataset.addOnEnabled === '1';
        const addOnVariationId = parseInt(card.dataset.addOnVariationId, 10) || 0;
        const originalText = button.textContent;

        if (!baseVariationId || !baseProductId) {
            return;
        }

        if (addOnEnabled && !addOnVariationId) {
            showOfferMessage(card, 'Please choose your preferred date for the 3 Days Course.', true);
            return;
        }

        showOfferMessage(card, '');
        button.disabled = true;
        button.textContent = 'Checking...';
        let isPending = true;
        const processingLabelTimer = window.setTimeout(() => {
            if (isPending) {
                button.textContent = 'Processing...';
            }
        }, 350);

        try {
            const bookingResponse = await bookCourseBundle({
                baseProductId: baseProductId,
                baseVariationId: baseVariationId,
                addOnProductId: addOnEnabled ? addOnProductId : 0,
                addOnVariationId: addOnEnabled ? addOnVariationId : 0
            });

            if (!bookingResponse || !bookingResponse.success) {
                const errorCode = bookingResponse?.data?.error_code || '';
                const errorMessage = bookingResponse?.data?.message || 'Unable to complete your booking right now. Please try again.';

                if (errorCode === 'base_out_of_stock') {
                    markCardAsFullyBooked(card, errorMessage);
                    return;
                }

                showOfferMessage(card, errorMessage, true);
                return;
            }

            window.location.href = bookingResponse?.data?.cart_url || '/cart/';
        } catch (error) {
            console.error('Booking error:', error);
            showOfferMessage(card, 'Unable to complete your booking right now. Please try again.', true);
        } finally {
            isPending = false;
            window.clearTimeout(processingLabelTimer);
            button.disabled = false;
            if (!button.classList.contains('already-booked-btn')) {
                button.textContent = originalText;
            }
        }
    }

    trainingContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.book-traning-card');
        if (!card) {
            return;
        }

        const offerToggle = event.target.closest('.offer-add');
        if (offerToggle) {
            const activate = card.dataset.addOnEnabled !== '1';
            toggleOfferState(card, activate);
            return;
        }

        const dateInput = event.target.closest('.offer-date-input');
        if (dateInput) {
            const currentDropdown = card.querySelector('.offer-date-dropdown');
            document.querySelectorAll('.offer-date-dropdown').forEach(dropdown => {
                if (dropdown !== currentDropdown) {
                    dropdown.classList.remove('show');
                }
            });
            if (currentDropdown) {
                currentDropdown.classList.toggle('show');
            }
            return;
        }

        const dropItem = event.target.closest('.dropdown-item');
        if (dropItem) {
            const selectedVal = card.querySelector('.selected-val');
            card.dataset.addOnVariationId = dropItem.dataset.variationId || '';
            card.dataset.addOnDate = dropItem.dataset.dateLabel || '';
            if (selectedVal) {
                selectedVal.textContent = dropItem.dataset.dateLabel || 'Choose your preferred date';
            }
            updateCombinedPricing(card, true, true);
            const dropdown = card.querySelector('.offer-date-dropdown');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
            showOfferMessage(card, '');
            return;
        }

        const bookNowBtn = event.target.closest('.book-now-btn');
        if (bookNowBtn) {
            handleBooking(card, bookNowBtn);
        }
    });

    trainingContainer.addEventListener('input', (event) => {
        if (!event.target.classList.contains('city-search')) {
            return;
        }

        const card = event.target.closest('.book-traning-card');
        if (!card) {
            return;
        }

        const searchValue = event.target.value.toLowerCase();
        card.querySelectorAll('.dropdown-item').forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(searchValue) ? 'block' : 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (!event.target.closest('.custom-select-wrapper')) {
            document.querySelectorAll('.offer-date-dropdown').forEach(dropdown => dropdown.classList.remove('show'));
        }
    });

    seeMoreBtn.addEventListener('click', () => {
        displayedCount = displayedCount < trainingData.length ? trainingData.length : 3;
        renderCards();
    });

    renderCards();
});
