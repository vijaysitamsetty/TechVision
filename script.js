// Preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("fade-out");
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});

// Scroll Progress Bar
const scrollProgress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.pageYOffset / totalHeight) * 100;
  scrollProgress.style.width = `${progress}%`;
});

// Back to Top Button
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.pageYOffset > 300);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Navbar Toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
  body.classList.toggle("nav-open");
});

// Hide navbar on scroll down, show on scroll up
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  requestAnimationFrame(() => {
    const currentScroll = window.pageYOffset;
    navbar.classList.toggle(
      "hidden",
      currentScroll > lastScroll && currentScroll > 100
    );
    lastScroll = currentScroll;
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
      body.classList.remove("nav-open");
    }
  });
});

// Carousel functionality
const carousel = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
let currentSlide = 0;
let autoSlideInterval;

// Create indicators
const indicators = document.createElement("div");
indicators.className = "carousel-indicators";
slides.forEach((_, index) => {
  const indicator = document.createElement("div");
  indicator.className = `indicator ${index === 0 ? "active" : ""}`;
  indicator.addEventListener("click", () => showSlide(index));
  indicators.appendChild(indicator);
});
carousel.appendChild(indicators);

function updateIndicators() {
  document.querySelectorAll(".indicator").forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });
}

function showSlide(index) {
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");

  currentSlide = index;
  updateIndicators();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

prevBtn.addEventListener("click", () => {
  showSlide(currentSlide - 1);
  stopAutoSlide();
  startAutoSlide();
});

nextBtn.addEventListener("click", () => {
  showSlide(currentSlide + 1);
  stopAutoSlide();
  startAutoSlide();
});

// Start auto-sliding
startAutoSlide();

// Pause auto-sliding when hovering over carousel
carousel.addEventListener("mouseenter", stopAutoSlide);
carousel.addEventListener("mouseleave", startAutoSlide);

// Services Cards Navigation
const cardsWrapper = document.querySelector(".cards-wrapper");
const cards = document.querySelectorAll(".card");
const cardPrevBtn = document.querySelector(".card-nav.prev");
const cardNextBtn = document.querySelector(".card-nav.next");
let scrollAmount = 0;
const cardWidth = 300 + 32; // card width + gap

// Function to check and update button states
function updateButtonStates() {
  cardPrevBtn.disabled = cardsWrapper.scrollLeft <= 0;
  cardNextBtn.disabled =
    cardsWrapper.scrollLeft + cardsWrapper.clientWidth >=
    cardsWrapper.scrollWidth;
}

// Scroll event to update button states dynamically
cardsWrapper.addEventListener("scroll", updateButtonStates);

// Event Listeners for Buttons
cardPrevBtn.addEventListener("click", () => {
  cardsWrapper.scrollBy({ left: -cardWidth, behavior: "smooth" });
});

cardNextBtn.addEventListener("click", () => {
  cardsWrapper.scrollBy({ left: cardWidth, behavior: "smooth" });
});

// Initialize card navigation state
// updateCardNavigation();

// Contact Form Animation
const formInputs = document.querySelectorAll(
  ".form-group input, .form-group textarea"
);

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      input.parentElement.classList.remove("focused");
    }
  });

  // Check initial state
  if (input.value) {
    input.parentElement.classList.add("focused");
  }
});

// Form Submission
const contactForm = document.getElementById("contactForm");
const successMessage = document.createElement("div");
successMessage.className = "success-message";
successMessage.textContent = "Message sent successfully!";
document.body.appendChild(successMessage);

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Mock API call
  setTimeout(() => {
    alert("Message sent successfully!");
  }, 1000);

  // Clear form
  contactForm.reset();
  formInputs.forEach((input) => {
    input.parentElement.classList.remove("focused");
  });

  // Show success message
  successMessage.classList.add("show");
  setTimeout(() => {
    successMessage.classList.remove("show");
  }, 3000);
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");

      // Animate features list items sequentially
      if (entry.target.classList.contains("feature-item")) {
        const delay =
          Array.from(entry.target.parentElement.children).indexOf(
            entry.target
          ) * 200;
        entry.target.style.animationDelay = `${delay}ms`;
      }
    }
  });
}, observerOptions);

// Observe sections and features for animation
document.querySelectorAll("section, .feature-item").forEach((section) => {
  observer.observe(section);
});
