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
        role: "Software Engineer",
        address:"London",
        text: "The Functional Skills Math Level 2 course by Lead Academy is clear and well-structured. The lessons are easy to follow, with practical examples that build confidence and improve problem-solving skills effectively.",
        mainImg: "https://i.ibb.co.com/G4PTcq1g/unsplash-p-At-A8xe-i-VM.png",
        thumbImg: "https://i.ibb.co.com/G4PTcq1g/unsplash-p-At-A8xe-i-VM.png",
        badge: "Career Switch Success",
        videoUrl: "https://www.youtube.com/watch?v=9e9vexPeTtY" // Video 2
    },
    {
        name: "Mark Stevens",
        role: "Teacher",
        address:"London",
        text: "Lead Academy’s Functional Skills Math Level 2 is very helpful for exam prep. The content is simple, engaging, and well explained. It strengthened my basics and made difficult topics easier to understand.",
        mainImg: "https://i.ibb.co.com/YFrdRMSD/unsplash8-Vt2haq8-NSQ280x373.png",
        thumbImg: "https://i.ibb.co.com/YFrdRMSD/unsplash8-Vt2haq8-NSQ280x373.png",
        badge: "Professional Certificate",
        videoUrl: "https://www.youtube.com/watch?v=F8yuihI1DR0" // Video 3
    }
];

let currentIndex = 0;

function updateUI(index) {
    currentIndex = index;
    const data = testimonials[currentIndex];

    document.getElementById('user-name').innerText = data.name;
    document.getElementById('user-role').innerText = data.role;
    document.getElementById('user-address').innerText = data.address;
    // document.getElementById('testimonial-text').innerText = `"${data.text}"`;
    document.getElementById('badge-text').innerHTML = `<img src="https://i.ibb.co.com/9H1gNPQN/Component-1-4.png" alt="User Icon" class="badge-icon"> ${data.badge}`;
    document.getElementById('main-img').src = data.mainImg;
    document.getElementById('user-icon').src = data.thumbImg;

    const textElement = document.getElementById('testimonial-text');
    const limit = 50;

    if (data.text.length > limit) {
        const truncatedText = data.text.substring(0, limit) + "...";
        textElement.innerHTML = `"${truncatedText} <span class="text-primary fw-bold ms-1" style="cursor:pointer;" onclick="openFullReview()">read more</span>`;
    } else {
        textElement.innerText = `"${data.text}"`;
    }

    renderThumbs();
}

// function openFullReview() {
//     const data = testimonials[currentIndex];
    
//     // Fill modal data
//     document.getElementById('modal-name').innerText = data.name;
//     document.getElementById('modal-role').innerText = data.role;
//     document.getElementById('modal-text').innerText = `"${data.text}"`;
//     document.getElementById('modal-img').src = data.thumbImg;

//     // Show the modal (using Bootstrap's JS API)
//     const modalElement = document.getElementById('testimonialModal');
//     const modal = new bootstrap.Modal(modalElement);
//     modal.show();
// }

const playBtn = document.querySelector('.play-btn');
    playBtn.onclick = () => {
        Fancybox.show(
            testimonials.map(t => ({
                src: t.videoUrl,
                type: "video",
            })),
            {
                startIndex: currentIndex,
            }
        );
    };
    renderThumbs();

function renderThumbs() {
    const container = document.getElementById('thumb-container');
    
    if (!container) {
        console.error("Could not find the element with ID 'thumb-container'");
        return;
    }

    container.innerHTML = ''; // Clear old thumbs

    testimonials.forEach((item, index) => {
        // 1. Create the div
        const wrapper = document.createElement('div');
        
        // 2. Set the class
        wrapper.className = `thumb-line ${index === currentIndex ? 'active' : ''}`;
        
        // 3. Force visibility with inline styles (to bypass any CSS issues)
        wrapper.style.width = "103px";
        wrapper.style.height = "10px";
        wrapper.style.backgroundColor = (index === currentIndex) ? "#E92063" : "#E5E7EB";
        wrapper.style.display = "inline-block";
        wrapper.style.margin = "5px";
        wrapper.style.cursor = "pointer";
        wrapper.style.borderRadius = "9999px";

        // 4. Click logic
        wrapper.onclick = () => {
            console.log("Clicked index:", index);
            updateUI(index); 
        };
        
        container.appendChild(wrapper);
    });
}

function updateUI(index) {
    currentIndex = index;
    const data = testimonials[currentIndex];

    if(document.getElementById('user-name')) document.getElementById('user-name').innerText = data.name;
    if(document.getElementById('main-img')) document.getElementById('main-img').src = data.mainImg;

    renderThumbs(); 
}

updateUI(0);

function nextTestimonial() {
    let newIndex = (currentIndex + 1) % testimonials.length;
    updateUI(newIndex);
}

function prevTestimonial() {
    let newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateUI(newIndex);
}


updateUI(0);


// booking logic
document.addEventListener('DOMContentLoaded', async () => {
    const trainingContainer = document.querySelector('.book-traning-cards');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    let displayedCount = 3;
    let trainingData = [];

    try {
        const response = await fetch('data.json');
        const rawData = await response.json();

        // BRIDGE: Mapping new JSON to your existing Logic
        trainingData = rawData.items.map((item, index) => {
            const dateParts = item.date.split(' '); 
            const year = dateParts[dateParts.length - 1];
            const month = dateParts[dateParts.length - 2].replace(',', '');
            const day = dateParts[0].replace(',', ''); 

            return {
                id: index + 1,
                city: rawData.location,
                address: rawData.address,
                time: rawData.time,
                date: day,
                month: month,
                year: year,
                seats: item.seat,
                price: parseInt(item.sell_price.replace('£', '')),
                originalPrice: parseInt(item.regular_price.replace('£', '')),
                offerPrice: 289, 
                hasOffer: item.seat > 0 
            };
        });

        renderCards();
    } catch (error) {
        console.error("Error loading training data:", error);
    }

    function renderCards() {
        const visibleData = trainingData.slice(0, displayedCount);
        trainingContainer.innerHTML = visibleData.map(item => createCardHTML(item)).join('');
        
        // Update button text and visibility
        if (trainingData.length <= 3) {
            seeMoreBtn.style.display = 'none';
        } else {
            seeMoreBtn.style.display = 'block';
            seeMoreBtn.textContent = displayedCount >= trainingData.length ? "See Less" : "See More";
        }
    }

    // Your existing click listener
    seeMoreBtn.addEventListener('click', () => {
        displayedCount += 3;
        renderCards();
    });
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
                    <div class="special-offer-text d-flex align-items-start">
                        <img src="https://i.ibb.co.com/Tx5H2cj9/Property-1-Off.png" alt="offer-add" class="offer-add mt-1">
                        <div>
                            <p class="p-text-black">Add Complete Nail Technical 3 Days Course</p>
                            <p class="text-morning mb-0">Offers are applicable only if you add now!</p>
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

    // Initial Render (First 3)
    function renderCards() {
        trainingContainer.innerHTML = trainingData.slice(0, displayedCount).map(item => createCardHTML(item)).join('');
    }
    renderCards();

    // Event Delegation for Clicks
    trainingContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.book-traning-card');
        if (!card) return;

        // --- SPECIAL OFFER LOGIC ---
        if (e.target.classList.contains('offer-add')) {
            const offerImg = e.target;
            const offerDiv = card.querySelector('.special-offer');
            const mainPriceSpan = card.querySelector('.book-price .current-price');
            const subText = offerDiv.querySelector('.text-morning');
            const offerPriceVal = parseInt(offerDiv.querySelector('.special-offer-course .current-price').textContent.replace('£', ''));
            const basePrice = parseInt(mainPriceSpan.dataset.base);

            if (offerImg.src.includes('Property-1-Off.png')) {
                offerImg.src = "https://i.ibb.co.com/b5pJYHzj/Property-1-On.png";
                offerDiv.style.cssText = "border: 1px solid #F64E85; background: #F64E85; color: white !important;";
                subText.textContent = "Added to your cart!";
                subText.style.color = "black";
                mainPriceSpan.textContent = `£${basePrice + offerPriceVal}`;
            } else {
                offerImg.src = "https://i.ibb.co.com/Tx5H2cj9/Property-1-Off.png";
                offerDiv.style.cssText = ""; 
                subText.textContent = "Offers are applicable only if you add now!";
                subText.style.color = "";
                mainPriceSpan.textContent = `£${basePrice}`;
            }
        }

        // --- BOOKING LOGIC ---
        if (e.target.classList.contains('book-now-btn')) {
            const btn = e.target;
            const alertSpan = card.querySelector('.alert-for-seats span');
            let seatMatch = alertSpan.textContent.match(/\d+/);
            
            if (seatMatch) {
                let count = parseInt(seatMatch[0]);
                count--;
                if (count <= 0) {
                    alertSpan.innerHTML = "Sorry! No Seats Left";
                    card.querySelector('.alert-for-seats').className = "alert-for-no-seats";
                    btn.textContent = "Fully Booked";
                    btn.className = "already-booked-btn";
                    btn.style.backgroundColor = "black";
                    btn.style.color = "white";
                } else {
                    alertSpan.innerHTML = `<span class="d-md-none d-inline-block">🔥</span>Hurry! Only ${count} Seats Left`;
                    btn.textContent = "Booked";
                }
            }
        }
    });
});
    // Helper function to create HTML for a card
    // function createCardHTML(item) {
    //     const isSoldOut = item.seats === 0;
    //     return `
    //     <div class="book-traning-card position-relative">
    //         <span class="discount-top d-none d-md-block">59% OFF</span>
    //         <div class="booking-info">
    //         <div>
    //         <div class="traning-address">
    //                 <div class="date-box d-none d-md-block">
    //                     <span class="date">${item.date}</span>
    //                     <span class="month">${item.month}</span>
    //                 </div>
    //                 <div class="location d-flex flex-column">
    //                     <p class="location-text">${item.city}</p>
    //                     <div class="location-icon d-flex justify-content-start align-items-center gap-2">
    //                         <img src="https://i.ibb.co.com/kV9HgLYN/Group-47.png" alt="icon" class="d-none d-md-block">
    //                         <p class="mb-0">${item.address}</p>
    //                     </div>
    //                     <div class="date-mobile d-flex d-md-none align-items-center gap-2">
    //                         <img src="https://i.ibb.co.com/CsWLJfTT/Group-82.png" alt="date-icon">
    //                         <p class="mb-0">${item.date} ${item.month}, ${item.year}</p>
    //                     </div>
    //                     <div class="time d-flex align-items-center gap-2">
    //                         <img src="https://i.ibb.co.com/x87KPMvx/Group-48.png" alt="time-icon">
    //                         <p class="mb-0">${item.time}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div class="${isSoldOut ? 'alert-for-no-seats' : 'alert-for-seats'}">
    //                 <span>${isSoldOut ? 'Sorry! No Seats Left' : `<span class="d-md-none d-inline-block">🔥</span>Hurry! Only ${item.seats} Seats Left`}</span>
    //             </div>
    //         </div>
                
                

    //             <div class="book-price">
    //                 <div class="pricing-tag">
    //                     <span class="current-price" data-base="${item.price}">£${item.price}</span>
    //                     <span class="original-price">£${item.originalPrice}</span>
    //                 </div>
    //                 <button class="${isSoldOut ? 'already-booked-btn' : 'book-now-btn'}" ${isSoldOut ? 'style="background:black; color:white;"' : ''}>
    //                     ${isSoldOut ? 'Fully Booked' : 'Book Now'}
    //                 </button>
    //             </div>
    //         </div>
    //         ${item.hasOffer ? `
    //         <div class="special-offer position-relative">
    //             <span class="discount-top">🔥 Special Offer</span>
    //             <div class="d-flex justify-content-between flex-column flex-md-row align-items-md-end align-items-start gap-3">
    //                 <div class="special-offer-text d-flex align-items-start">
    //                     <img src="https://i.ibb.co.com/Tx5H2cj9/Property-1-Off.png" alt="offer-add" class="offer-add mt-1">
    //                     <div>
    //                         <p class="p-text-black">Add Complete Nail Technical 3 Days Course</p>
    //                         <p class="text-morning mb-0">Offers are applicable only if you add now!</p>
    //                     </div>
    //                 </div>
    //                 <div class="special-offer-course d-flex align-items-end justify-content-between gap-2">
    //                     <span class="only-for">only for</span>
    //                     <span class="current-price">£${item.offerPrice}</span>
    //                     <span class="original-price">£350</span>
    //                 </div>
    //             </div>
    //         </div>` : ''}
    //     </div>`;
    // }

    // Initial Render (First 3)
    // function renderCards() {
    //     trainingContainer.innerHTML = trainingData.slice(0, displayedCount).map(item => createCardHTML(item)).join('');
    // }
    // renderCards();

    // Event Delegation for Clicks
    // trainingContainer.addEventListener('click', (e) => {
    //     const card = e.target.closest('.book-traning-card');
    //     if (!card) return;

    //     // --- SPECIAL OFFER LOGIC ---
    //     if (e.target.classList.contains('offer-add')) {
    //         const offerImg = e.target;
    //         const offerDiv = card.querySelector('.special-offer');
    //         const mainPriceSpan = card.querySelector('.book-price .current-price');
    //         const subText = offerDiv.querySelector('.text-morning');
    //         const offerPriceVal = parseInt(offerDiv.querySelector('.special-offer-course .current-price').textContent.replace('£', ''));
    //         const basePrice = parseInt(mainPriceSpan.dataset.base);

    //         if (offerImg.src.includes('Property-1-Off.png')) {
    //             offerImg.src = "https://i.ibb.co.com/b5pJYHzj/Property-1-On.png";
    //             offerDiv.style.cssText = "border: 1px solid #F64E85; background: #F64E85; color: white !important;";
    //             subText.textContent = "Added to your cart!";
    //             subText.style.color = "black";
    //             mainPriceSpan.textContent = `£${basePrice + offerPriceVal}`;
    //         } else {
    //             offerImg.src = "https://i.ibb.co.com/Tx5H2cj9/Property-1-Off.png";
    //             offerDiv.style.cssText = ""; 
    //             subText.textContent = "Offers are applicable only if you add now!";
    //             subText.style.color = "";
    //             mainPriceSpan.textContent = `£${basePrice}`;
    //         }
    //     }

    //     // --- BOOKING LOGIC ---
    //     if (e.target.classList.contains('book-now-btn')) {
    //         const btn = e.target;
    //         const alertSpan = card.querySelector('.alert-for-seats span');
    //         let seatMatch = alertSpan.textContent.match(/\d+/);
            
    //         if (seatMatch) {
    //             let count = parseInt(seatMatch[0]);
    //             count--;
    //             if (count <= 0) {
    //                 alertSpan.innerHTML = "Sorry! No Seats Left";
    //                 card.querySelector('.alert-for-seats').className = "alert-for-no-seats";
    //                 btn.textContent = "Fully Booked";
    //                 btn.className = "already-booked-btn";
    //                 btn.style.backgroundColor = "black";
    //                 btn.style.color = "white";
    //             } else {
    //                 alertSpan.innerHTML = `<span class="d-md-none d-inline-block">🔥</span>Hurry! Only ${count} Seats Left`;
    //                 btn.textContent = "Booked";
    //             }
    //         }
    //     }
    // });

    // --- SEE MORE / LESS ---
    // seeMoreBtn.addEventListener('click', () => {
    //     if (displayedCount < trainingData.length) {
    //         displayedCount = trainingData.length;
    //         seeMoreBtn.textContent = "See Less";
    //     } else {
    //         displayedCount = 3;
    //         seeMoreBtn.textContent = "See More";
    //     }
    //     renderCards();
    // });
