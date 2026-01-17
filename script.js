/**
 * ALPS Landing Page Script
 * Future functionality to include:
 * 1. Mobile navigation toggle (hamburger menu logic).
 * 2. Form validation for the contact/inquiry section.
 * 3. Dynamic loading of service details or testimonials.
 * 4. Smooth scrolling for anchor links.
 */

console.log("ALPS script loaded successfully.");

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");

  // ---- Reveal (consistent for all sections) ----
  const handleScroll = () => {
    // Header scroll state
    if (window.scrollY > 50) header?.classList.add("scrolled");
    else header?.classList.remove("scrolled");

    // IMPORTANT: query fresh each time so new sections stay consistent
    const revealElements = document.querySelectorAll(".reveal");

    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight * 0.85) el.classList.add("active");
      if (elementTop > windowHeight * 0.95 || window.scrollY < 20) el.classList.remove("active");
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Initialize on load

  // ---- Video overlay ----
  const video = document.getElementById("alps-video");
  const overlay = document.getElementById("video-overlay");

  if (video && overlay) {
    video.volume = 0.5;

    overlay.addEventListener("click", () => {
      video.play();
      overlay.classList.add("hidden");
      video.setAttribute("controls", "controls");
    });
  }

  // ---- How It Works slider ----
  const slider = document.getElementById("howSlider");
  if (!slider) return; // no slider on page

  const track = slider.querySelector(".how-track");
  const slides = slider.querySelectorAll(".how-slide");
  if (!track || slides.length === 0) return;

  let index = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const goToSlide = (i) => {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  // Set initial position (so you can confirm it’s wired)
  goToSlide(0);

  // Auto-slide every 15s
  let autoTimer = setInterval(() => goToSlide(index + 1), 15000);

  const resetAuto = () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goToSlide(index + 1), 15000);
  };

  // Swipe support (touch)
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
  }, { passive: true });

  slider.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener("touchend", () => {
    if (!isDragging) return;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? goToSlide(index + 1) : goToSlide(index - 1);
      resetAuto();
    }

    isDragging = false;
  });

  // Optional: swipe/drag support (mouse)
  slider.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    currentX = startX;
    isDragging = true;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    const diff = startX - currentX;

    if (Math.abs(diff) > 60) {
      diff > 0 ? goToSlide(index + 1) : goToSlide(index - 1);
      resetAuto();
    }

    isDragging = false;
  });
});
