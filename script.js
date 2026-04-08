// testimonials

const testimonials = [
    {
        name: "Sara Mitchel",
        role: "Nail Technician,",
        address:"London",
        text: "This Maths course really gave me the confidence to pass my level 2 exam. The lessons were easy to follow and explained really well. I loved  the mock tests and they helped me put what i learned into practice.",
        mainImg: "https://i.ibb.co.com/6R1KZt9s/Overlay-Shadow.png", 
        thumbImg: "https://i.ibb.co.com/4g09mkGL/Ellipse-7.png", 
        badge: "Passed Level 2 exam",
        videoUrl: "https://www.youtube.com/watch?v=ySgBOaPcLlw" 
    },
    {
        name: "John Doe",
        role: "Software Engineer,",
        address:"London",
        text: "The Functional Skills Math Level 2 course by Lead Academy is clear and well-structured. The lessons are easy to follow, with practical examples that build confidence and improve problem-solving skills effectively.",
        mainImg: "https://i.ibb.co.com/G4PTcq1g/unsplash-p-At-A8xe-i-VM.png",
        thumbImg: "https://i.ibb.co.com/G4PTcq1g/unsplash-p-At-A8xe-i-VM.png",
        badge: "Career Switch Success",
        videoUrl: "https://www.youtube.com/watch?v=9e9vexPeTtY" // Video 2
    },
    {
        name: "Mark Stevens",
        role: "Teacher,",
        address:"London",
        text: "Lead Academy’s Functional Skills Math Level 2 is very helpful for exam prep. The content is simple, engaging, and well explained. It strengthened my basics and made difficult topics easier to understand.",
        mainImg: "https://i.ibb.co.com/YFrdRMSD/unsplash8-Vt2haq8-NSQ280x373.png",
        thumbImg: "https://i.ibb.co.com/YFrdRMSD/unsplash8-Vt2haq8-NSQ280x373.png",
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
        badgeEl.innerHTML = `<img src="https://i.ibb.co.com/9H1gNPQN/Component-1-4.png" alt="User Icon" class="badge-icon"> ${data.badge}`;
    }

    // 3. Testimonial Text with Truncation (Read More logic)
    // const textElement = document.getElementById('testimonial-text');
    // if (textElement) {
    //     const limit = 150; // Set a reasonable limit for your design
    //     if (data.text.length > limit) {
    //         const truncatedText = data.text.substring(0, limit) + "...";
    //         textElement.innerHTML = `"${truncatedText}" <span class="text-primary fw-bold ms-1" style="cursor:pointer;" onclick="openFullReview()">read more</span>`;
    //     } else {
    //         textElement.innerText = `"${data.text}"`;
    //     }
    // }

    // 4. Refresh the progress bars (thumbs)
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
        const response = await fetch('data.json');
        const rawData = await response.json();
        
        // --- NEW: Filter logic for 'hide' property ---
        // Only keep items where hide is 0
        trainingData = rawData.filter(item => item.hide === 0);
        
        renderCards(); 
    } catch (error) {
        console.error("Could not load training data:", error);
    }

    // Helper function to create HTML for a card
    function createCardHTML(item) {
        const isSoldOut = item.seats === 0;
        return `
        <div class="book-traning-card position-relative">
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
                            <img src="https://i.ibb.co.com/kV9HgLYN/Group-47.png" alt="icon" class="d-none d-md-block">
                            <p class="mb-0">${item.address}</p>
                        </div>
                        <div class="date-mobile d-flex d-md-none align-items-center gap-2">
                            <img src="https://i.ibb.co.com/CsWLJfTT/Group-82.png" alt="date-icon">
                            <p class="mb-0">${item.date} ${item.month}, ${item.year}</p>
                        </div>
                        <div class="time d-flex align-items-center gap-2">
                            <img src="https://i.ibb.co.com/x87KPMvx/Group-48.png" alt="time-icon">
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
    <div class="d-flex justify-content-between flex-column flex-md-row align-items-md-end align-items-start gap-3">
        <div class="special-offer-text d-flex align-items-start w-100">
            <img src="https://i.ibb.co.com/Tx5H2cj9/Property-1-Off.png" alt="offer-add" class="offer-add mt-1">
            <div class="flex-grow-1 position-relative">
                <p class="p-text-black mb-1">Add Complete Nail Technical 3 Days Course</p>
                
                <div class="custom-select-wrapper">
                    <div class="offer-date-input d-flex justify-content-between align-items-center">
                        <span class="selected-val">Select available date...</span>
                        <img src="https://cdn-icons-png.flaticon.com/512/2985/2985150.png" width="10" alt="arrow">
                    </div>
                    
                    <div class="offer-date-dropdown">
                        <div class="dropdown-item" data-date="18th, 20th April">18th, 20th April</div>
                        <div class="dropdown-item" data-date="3rd, 10th May">3rd, 10th May</div>
                        <div class="dropdown-item" data-date="14th, 21st May">14th, 21st May</div>
                    </div>
                </div>
                
                <p class="text-morning mb-0 mt-1">Offers are applicable only if you add now!</p>
            </div>
        </div>
        <div class="special-offer-course d-flex align-items-end justify-content-between gap-2">
            <span class="only-for">only for</span>
            <span class="current-price">£${item.offerPrice}</span>
            <span class="original-price">£350</span>
        </div>
    </div>
</div>` : ''}
        </div>`;
    }

    function renderCards() {
        trainingContainer.innerHTML = trainingData.slice(0, displayedCount).map(item => createCardHTML(item)).join('');
        
        // Toggle See More button visibility if there are fewer than 3 cards
        if(trainingData.length <= 3) {
            seeMoreBtn.style.display = 'none';
        } else {
            seeMoreBtn.style.display = 'block';
        }
    }

    // Event Delegation for Clicks (Remains unchanged as requested)
    trainingContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.book-traning-card');
        if (!card) return;

        if (e.target.classList.contains('offer-add')) {
            const offerImg = e.target;
            const offerDiv = card.querySelector('.special-offer');
            const mainPriceSpan = card.querySelector('.book-price .current-price');
            const subText = offerDiv.querySelector('.text-morning');
            const spCurrent = offerDiv.querySelector('.special-offer-course .current-price'); 
            const offerPriceVal = parseInt(spCurrent.textContent.replace('£', ''));
            const basePrice = parseInt(mainPriceSpan.dataset.base);

            if (offerImg.src.includes('Property-1-Off.png')) {
                offerImg.src = "https://i.ibb.co.com/b5pJYHzj/Property-1-On.png";
                offerDiv.style.cssText = "border: 1px solid #F64E85; background: #F64E85; color: white !important;";
                subText.textContent = "Added to your cart!";
                subText.style.color = "black";
                spCurrent.style.color = "#FFFFFF";
                mainPriceSpan.textContent = `£${basePrice + offerPriceVal}`;
            } else {
                offerImg.src = "https://i.ibb.co.com/Tx5H2cj9/Property-1-Off.png";
                offerDiv.style.cssText = ""; 
                subText.textContent = "Offers are applicable only if you add now!";
                subText.style.color = "";
                spCurrent.style.color = "#000000";
                mainPriceSpan.textContent = `£${basePrice}`;
            }
        }

        // --- 2. DROPDOWN TOGGLE LOGIC ---
        const dateInput = e.target.closest('.offer-date-input');
        if (dateInput) {
            // Close other dropdowns
            document.querySelectorAll('.offer-date-dropdown').forEach(d => {
                if(d !== dateInput.nextElementSibling) d.classList.remove('show');
            });
            // Toggle current one
            dateInput.nextElementSibling.classList.toggle('show');
        }

        // --- 3. DROPDOWN ITEM SELECTION ---
        const dropItem = e.target.closest('.dropdown-item');
        if (dropItem) {
            const dropdown = dropItem.parentElement;
            const selectedSpan = dropdown.previousElementSibling.querySelector('.selected-val');
            selectedSpan.textContent = dropItem.dataset.date;
            selectedSpan.style.color = "#000";
            selectedSpan.style.fontWeight = "600";
            dropdown.classList.remove('show');
        }

        // --- 4. BOOKING LOGIC ---
        if (e.target.classList.contains('book-now-btn')) {
            // ... (Your existing booking seat decrement logic)
        }
    });

    // --- 5. GLOBAL CLICK (To close dropdown when clicking outside) ---
    window.addEventListener('click', (event) => {
        if (!event.target.closest('.custom-select-wrapper')) {
            document.querySelectorAll('.offer-date-dropdown').forEach(d => d.classList.remove('show'));
        }
    });
    

    seeMoreBtn.addEventListener('click', () => {
        if (displayedCount < trainingData.length) {
            displayedCount = trainingData.length;
            seeMoreBtn.textContent = "See Less";
        } else {
            displayedCount = 3;
            seeMoreBtn.textContent = "See More";
        }
        renderCards();
    });
});