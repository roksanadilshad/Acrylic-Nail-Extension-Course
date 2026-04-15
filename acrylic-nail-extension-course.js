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


// booking logic
document.addEventListener('DOMContentLoaded', async () => {
    const trainingContainer = document.querySelector('.book-traning-cards');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    let displayedCount = 3;
    let trainingData = [];

    try {
        const response = await fetch('/wp-content/themes/lead-academy-child/assets/fs-json/acrylic-data.json');
        const rawData = await response.json();
        trainingData = rawData.filter(item => item.hide === 0);
        renderCards(); 
    } catch (error) {
        console.error("Could not load training data:", error);
    }

    function createCardHTML(item) {
        const isSoldOut = item.seats === 0;
        const dropdownOptions = trainingData.map(opt => `
            <div class="dropdown-item" data-target-id="${opt.id}">
                <div class="d-flex justify-content-between">
                    <span><strong>${opt.date} ${opt.month}</strong></span>
                    <span class="text-pink">£${opt.price}</span>
                </div>
            </div>
        `).join('');

        return `
        <div class="book-traning-card position-relative" data-card-id="${item.id}">
            <span class="discount-top d-none d-md-block">59% OFF</span>
            <div class="booking-info">
            <div>
                <div class="traning-address">
                    <div class="date-box d-none d-md-block">
                        <span class="date">${item.date}</span>
                        <span class="month">${item.month}</span>
                    </div>
                    <div class="location d-flex flex-column">
                        <p class="location-text">${item.city}</p>
                        <div class="location-icon d-flex justify-content-start align-items-center gap-2">
                            <img src="https://i.ibb.co.com/kV9HgLYN/Group-47.webp" alt="icon" class="d-none d-md-block">
                            <p class="mb-0">${item.address}</p>
                        </div>
                        <div class="date-mobile d-flex d-md-none align-items-center gap-2">
                            <img src="https://i.ibb.co.com/CsWLJfTT/Group-82.webp" alt="date-icon">
                            <p class="mb-0">${item.date} ${item.month}, ${item.year}</p>
                        </div>
                        <div class="time d-flex align-items-center gap-2">
                            <img src="https://i.ibb.co.com/x87KPMvx/Group-48.webp" alt="time-icon">
                            <p class="mb-0">${item.time}</p>
                        </div>
                    </div>
                </div>
                <div class="${isSoldOut ? 'alert-for-no-seats' : 'alert-for-seats'}">
                    <span>${isSoldOut ? 'Sorry! No Seats Left' : `<span class="d-md-none d-inline-block">🔥</span>Hurry! Only ${item.seats} Seats Left`}</span>
                </div>
                </div>
                <div class="book-price">
                    <div class="pricing-tag">
                        <span class="current-price" data-base="${item.price}">£${item.price}</span>
                        <span class="original-price">£${item.originalPrice}</span>
                    </div>
                    <button class="${isSoldOut ? 'already-booked-btn' : 'book-now-btn'}" ${isSoldOut ? 'style="background:black; color:white;"' : ''}>
                        ${isSoldOut ? 'Fully Booked' : 'Book Now'}
                    </button>
                </div>
            </div>
            ${item.hasOffer ? `
            <div class="special-offer position-relative">
                <span class="discount-top">🔥 Special Offer</span>
                <div class="d-flex justify-content-between flex-column flex-md-row align-items-md-end align-items-start gap-1 gap-lg-3">
                    <div class="special-offer-text d-flex align-items-lg-start align-items-center w-100">
                        <img src="https://i.ibb.co.com/Tx5H2cj9/Property-1-Off.webp" alt="offer-add" class="offer-add mt-1">
                        <div class="flex-grow-1 position-relative">
                            <p class="p-text-black mb-lg-1">Add Complete Nail Technical 3 Days Course</p>

                            <p class="text-morning mb-0 mt-lg-1 d-inline">Offers are applicable only if you add now!</p>
                        </div>
                    </div>
                    <div class="special-offer-course d-flex align-items-end justify-content-between gap-2 d-block">
                        <span class="only-for d-inline-block">only for</span>
                        <span class="current-price">£${item.offerPrice}</span>
                        <span class="original-price">£350</span>
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
                                        ${dropdownOptions}
                                    </div>
                                </div>
                            </div>
            </div>` : ''}
        </div>`;
    }

    function renderCards() {
        trainingContainer.innerHTML = trainingData.slice(0, displayedCount).map(item => createCardHTML(item)).join('');
        seeMoreBtn.style.display = trainingData.length <= 3 ? 'none' : 'block';
    }

    trainingContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.book-traning-card');
        if (!card) return;

        // 1. SEARCH LOGIC
        if (e.target.classList.contains('city-search')) {
            e.target.addEventListener('input', (event) => {
                const val = event.target.value.toLowerCase();
                const items = card.querySelectorAll('.dropdown-item');
                items.forEach(item => {
                    item.style.display = item.textContent.toLowerCase().includes(val) ? 'block' : 'none';
                });
            });
            return; 
        }

        // 2. OPEN/CLOSE DROPDOWN
        const dateInput = e.target.closest('.offer-date-input');
        if (dateInput) {
            const currentDropdown = dateInput.nextElementSibling;
            document.querySelectorAll('.offer-date-dropdown').forEach(d => {
                if (d !== currentDropdown) d.classList.remove('show');
            });
            currentDropdown.classList.toggle('show');
            return;
        }

        // 3. DYNAMIC DATA SWITCHER
        const dropItem = e.target.closest('.dropdown-item');
        if (dropItem) {
            const targetId = parseInt(dropItem.dataset.targetId);
            const newData = trainingData.find(d => d.id === targetId);
            if (newData) {
                const temp = document.createElement('div');
                temp.innerHTML = createCardHTML(newData);
                const newCard = temp.firstElementChild;
                
                // Keep the "Offer On" state if it was already selected
                const wasOfferActive = card.querySelector('.offer-add').src.includes('Property-1-On.webp');
                if(wasOfferActive) {
                    toggleOfferState(newCard, true);
                }

                card.replaceWith(newCard);
                return; 
            }
        }

        // 4. PRICE / OFFER ADD LOGIC
        if (e.target.classList.contains('offer-add')) {
            const isActive = e.target.src.includes('Property-1-Off.webp');
            toggleOfferState(card, isActive);
        }

        // 5. BOOK NOW LOGIC
        if (e.target.classList.contains('book-now-btn')) {
            const btn = e.target;
            const alertSpan = card.querySelector('.alert-for-seats span');
            let seatMatch = alertSpan.textContent.match(/\d+/);
            if (seatMatch) {
                let count = parseInt(seatMatch[0]) - 1;
                if (count <= 0) {
                    alertSpan.innerHTML = "Sorry! No Seats Left";
                    btn.textContent = "Fully Booked";
                    btn.className = "already-booked-btn";
                    btn.style.background = "black";
                    btn.style.color = "white";
                } else {
                    alertSpan.innerHTML = `<span class="d-md-none d-inline-block">🔥</span>Hurry! Only ${count} Seats Left`;
                    btn.textContent = "Booked";
                }
            }
        }
    });

    // Helper to handle the UI changes for Special Offer
    function toggleOfferState(card, activate) {
        const offerImg = card.querySelector('.offer-add');
        const offerDiv = card.querySelector('.special-offer');
        const selectWrapper = card.querySelector('.custom-select-wrapper');
        const textMorning = card.querySelector('.text-morning');
        const mainPriceSpan = card.querySelector('.book-price .current-price');
        const spCurrent = offerDiv.querySelector('.special-offer-course .current-price'); 
        const selectedVal = card.querySelector('.selected-val');
        const selectedValSpan = card.querySelector('.selected-val-span');
        
        const offerPriceVal = parseInt(spCurrent.textContent.replace('£', ''));
        const basePrice = parseInt(mainPriceSpan.dataset.base);

        if (activate) {
            offerImg.src = "https://i.ibb.co.com/b5pJYHzj/Property-1-On.webp";
            offerDiv.style.background = "#F64E85";
            offerDiv.style.color = "white";
            
            // UI requirements
            selectWrapper.style.display = "block";
            textMorning.style.color = "black";
            textMorning.textContent = "Added to your cart!";
            spCurrent.style.color = "white";
            
            if(selectedVal) {
                selectedVal.style.color = "black"; // Input text becomes black
                selectedVal.parentElement.style.background = "white"; // Make input white for contrast
            }
            
            mainPriceSpan.textContent = `£${basePrice + offerPriceVal}`;
            mainPriceSpan.style.color = "#F64E85"; // Price becomes green
        } else {
            offerImg.src = "https://i.ibb.co.com/Tx5H2cj9/Property-1-Off.webp";
            offerDiv.style.background = "";
            offerDiv.style.color = "";
            
            // Revert UI
            selectWrapper.style.display = "none";
            textMorning.style.color = "";
            textMorning.textContent = "Offers are applicable only if you add now!";
            spCurrent.style.color = "";
            selectedValSpan.style.color = "#000000";
            mainPriceSpan.textContent = `£${basePrice}`;
            mainPriceSpan.style.color = ""; // Revert price color
        }
    }

    window.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-select-wrapper')) {
            document.querySelectorAll('.offer-date-dropdown').forEach(d => d.classList.remove('show'));
        }
    });

    seeMoreBtn.addEventListener('click', () => {
        displayedCount = (displayedCount < trainingData.length) ? trainingData.length : 3;
        seeMoreBtn.textContent = (displayedCount > 3) ? "See Less" : "See More";
        renderCards();
    });
});