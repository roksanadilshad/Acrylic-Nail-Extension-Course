// testimonials

const testimonials = [
    {
        name: "Szvoreny Attila",
        role: "Healthcare Assistant",
        text: "This Maths course really gave me the confidence to pass my level 2 exam. The lessons were easy to follow and explained really well. I loved  the mock tests and they helped me put what i learned into practice.",
        mainImg: "https://i.ibb.co.com/GvzPQF6q/Image-1.png", 
        thumbImg: "https://i.ibb.co.com/4g09mkGL/Ellipse-7.png", 
        badge: "Passed Level 2 exam",
        videoUrl: "https://www.youtube.com/watch?v=ySgBOaPcLlw" // Video 1
    },
    {
        name: "John Doe",
        role: "Software Engineer",
        text: "The Functional Skills Math Level 2 course by Lead Academy is clear and well-structured. The lessons are easy to follow, with practical examples that build confidence and improve problem-solving skills effectively.",
        mainImg: "https://i.ibb.co.com/G4PTcq1g/unsplash-p-At-A8xe-i-VM.png",
        thumbImg: "https://i.ibb.co.com/G4PTcq1g/unsplash-p-At-A8xe-i-VM.png",
        badge: "Career Switch Success",
        videoUrl: "https://www.youtube.com/watch?v=9e9vexPeTtY" // Video 2
    },
    {
        name: "Mark Stevens",
        role: "Teacher",
        text: "Lead Academy’s Functional Skills Math Level 2 is very helpful for exam prep. The content is simple, engaging, and well explained. It strengthened my basics and made difficult topics easier to understand.",
        mainImg: "https://i.ibb.co.com/qMqT38Fz/unsplash-8-Vt2haq8-NSQ.png",
        thumbImg: "https://i.ibb.co.com/qMqT38Fz/unsplash-8-Vt2haq8-NSQ.png",
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
    // document.getElementById('testimonial-text').innerText = `"${data.text}"`;
    document.getElementById('badge-text').innerHTML = `<i class="bi bi-check-lg me-1"></i> ${data.badge}`;
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

function openFullReview() {
    const data = testimonials[currentIndex];
    
    // Fill modal data
    document.getElementById('modal-name').innerText = data.name;
    document.getElementById('modal-role').innerText = data.role;
    document.getElementById('modal-text').innerText = `"${data.text}"`;
    document.getElementById('modal-img').src = data.thumbImg;

    // Show the modal (using Bootstrap's JS API)
    const modalElement = document.getElementById('testimonialModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

const playBtn = document.querySelector('.play-btn');
    playBtn.onclick = () => {
        Fancybox.show(
            testimonials.map(t => ({
                src: t.videoUrl,
                type: "video",
            })),
            {
                startIndex: currentIndex, // Opens the video for the current student
            }
        );
    };
    renderThumbs();

function renderThumbs() {
    const container = document.getElementById('thumb-container');
    container.innerHTML = '';
    
    testimonials.forEach((item, index) => {
        // 1. Create a wrapper DIV instead of just an IMG
        const wrapper = document.createElement('div');
        wrapper.className = `profile-thumb ${index === currentIndex ? 'active' : ''}`;
        
        // 2. Create the IMG element
        const img = document.createElement('img');
        img.src = item.thumbImg; 
        img.style.width = "100%"; // Fill the wrapper
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.borderRadius = "50%"; 

        // 3. Move the click event to the wrapper
        wrapper.onclick = () => updateUI(index);
        
        // 4. Assemble
        wrapper.appendChild(img);
        container.appendChild(wrapper);
    });
}

function nextTestimonial() {
    let newIndex = (currentIndex + 1) % testimonials.length;
    updateUI(newIndex);
}

function prevTestimonial() {
    let newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateUI(newIndex);
}


updateUI(0);
