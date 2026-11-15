
/* =====================================
   CPS MISAU CLASS OF 1988
   MAIN JAVASCRIPT
===================================== */


/* =====================================
   1. MOBILE NAVIGATION
===================================== */

const header = document.querySelector("header");
const nav = document.querySelector("header nav");

if (header && nav) {

    const container = header.querySelector(".container");

    if (container) {

        const menuButton = document.createElement("button");

        menuButton.className = "menu-toggle";
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.setAttribute("aria-label", "Toggle navigation");
        menuButton.setAttribute("aria-expanded", "false");

        container.appendChild(menuButton);

        menuButton.addEventListener("click", function () {

            nav.classList.toggle("active");

            const opened = nav.classList.contains("active");

            menuButton.innerHTML = opened
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';

            menuButton.setAttribute("aria-expanded", opened);

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", function () {

                nav.classList.remove("active");

                menuButton.innerHTML = '<i class="fas fa-bars"></i>';

                menuButton.setAttribute("aria-expanded", "false");

            });

        });

    }

}


/* =====================================
   2. STICKY HEADER SHADOW
===================================== */

window.addEventListener("scroll", function () {

    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 50);

});


/* =====================================
   3. ANIMATED STATISTICS
===================================== */

const counters = document.querySelectorAll(".stat h2");

if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.textContent.replace(/,/g, ""));

            if (!Number.isFinite(target)) {
                observer.unobserve(counter);
                return;
            }

            let current = 0;

            const increment = Math.max(1, Math.ceil(target / 100));

            function updateCounter() {

                current += increment;

                if (current < target) {

                    counter.textContent = current.toLocaleString();

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target.toLocaleString();

                }

            }

            updateCounter();

            observer.unobserve(counter);

        });

    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

}


/* =====================================
   4. IMAGE GALLERY LIGHTBOX
===================================== */

const galleryImages = document.querySelectorAll(".gallery-grid img");

if (galleryImages.length > 0) {

    const lightbox = document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <button class="lightbox-prev" aria-label="Previous">&#10094;</button>
        <img src="" alt="Gallery image">
        <button class="lightbox-next" aria-label="Next">&#10095;</button>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const nextButton = lightbox.querySelector(".lightbox-next");
    const prevButton = lightbox.querySelector(".lightbox-prev");

    let currentImage = 0;

    function showImage(index) {

        currentImage = (index + galleryImages.length) % galleryImages.length;

        lightboxImage.src = galleryImages[currentImage].src;

        lightboxImage.alt =
            galleryImages[currentImage].alt || "Gallery image";

    }

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }

    galleryImages.forEach((image, index) => {

        image.addEventListener("click", function () {

            showImage(index);

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });

    closeButton.addEventListener("click", closeLightbox);

    nextButton.addEventListener("click", function () {
        showImage(currentImage + 1);
    });

    prevButton.addEventListener("click", function () {
        showImage(currentImage - 1);
    });

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") closeLightbox();

        if (event.key === "ArrowRight") showImage(currentImage + 1);

        if (event.key === "ArrowLeft") showImage(currentImage - 1);

    });

}


/* =====================================
   5. BACK TO TOP
===================================== */

const backToTop = document.createElement("button");

backToTop.className = "back-to-top";

backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';

backToTop.setAttribute("aria-label", "Back to top");

document.body.appendChild(backToTop);

backToTop.style.display = "none";

window.addEventListener("scroll", function () {

    backToTop.style.display =
        window.scrollY > 400 ? "flex" : "none";

});

backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================
   6. REUNION COUNTDOWN
===================================== */

const countdown = document.getElementById("reunionCountdown");

if (countdown) {

    const reunionDate = new Date(countdown.dataset.date).getTime();

    let countdownTimer = null;

    function updateCountdown() {

        const now = Date.now();

        const difference = reunionDate - now;

        if (!Number.isFinite(reunionDate)) {

            countdown.textContent = "Please set the reunion date.";

            return false;

        }

        if (difference <= 0) {

            countdown.textContent = "The Reunion Event Has Started!";

            if (countdownTimer) {
                clearInterval(countdownTimer);
            }

            return false;

        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        countdown.innerHTML = `
            <div class="countdown-box">
                <h2>${days}</h2>
                <span>Days</span>
            </div>

            <div class="countdown-box">
                <h2>${hours}</h2>
                <span>Hours</span>
            </div>

            <div class="countdown-box">
                <h2>${minutes}</h2>
                <span>Minutes</span>
            </div>

            <div class="countdown-box">
                <h2>${seconds}</h2>
                <span>Seconds</span>
            </div>
        `;

        return true;

    }

    if (updateCountdown()) {

        countdownTimer = setInterval(updateCountdown, 1000);

    }

}


/* =====================================
   7. CURRENT YEAR
===================================== */

const yearElement = document.getElementById("currentYear");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =====================================
   8. SCROLL ANIMATION
===================================== */

const animatedElements = document.querySelectorAll(
    ".news-card, .project-card, .feature, .mission .card"
);

if ("IntersectionObserver" in window) {

    const animationObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show-animation");

                observer.unobserve(entry.target);

            }

        });

    }, { threshold: 0.15 });

    animatedElements.forEach(element => {

        element.classList.add("scroll-animation");

        animationObserver.observe(element);

    });

} else {

    animatedElements.forEach(element => {
        element.classList.add("show-animation");
    });

}


/* =====================================
   WEBSITE LOADED
===================================== */

console.log("CPS Misau Class of 1988 Website Loaded Successfully");
