// Handle accordion functionality in FAQ section
document.addEventListener("DOMContentLoaded", function () {
  // Toggle accordion items
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const accordionItem = this.parentElement;

      // Toggle the active class on the clicked item
      accordionItem.classList.toggle("active");

      // Optional: close other open accordion items
      const allAccordionItems = document.querySelectorAll(".accordion-item");
      allAccordionItems.forEach((item) => {
        if (item !== accordionItem && item.classList.contains("active")) {
          item.classList.remove("active");
        }
      });
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 90; // Adjust based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Open the first FAQ item by default
  const firstAccordionItem = document.querySelector(".accordion-item");
  if (firstAccordionItem) {
    firstAccordionItem.classList.add("active");
  }

  // Add active class to navigation items based on scroll position
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);
  updateActiveNavLink();
});

// Before and After Image Slider functionality
document.addEventListener("DOMContentLoaded", function () {
  initBeforeAfterSlider();
});

function initBeforeAfterSlider() {
  const container = document.querySelector(".before-and-after-container");
  if (!container) return; // Exit if container doesn't exist

  const beforeImage = container.querySelector(".before-image");
  const handle = container.querySelector(".handle");
  let isResizing = false;

  // Initialize mouse and touch event listeners
  container.addEventListener("mousedown", startSliding);
  container.addEventListener("touchstart", startSliding, { passive: false });

  window.addEventListener("mousemove", slide);
  window.addEventListener("touchmove", slide, { passive: false });

  window.addEventListener("mouseup", stopSliding);
  window.addEventListener("touchend", stopSliding);

  // Set initial position
  updateSliderPosition(50); // Start at 50%

  function startSliding(e) {
    e.preventDefault();
    isResizing = true;

    // Add active class for styling purposes if desired
    container.classList.add("active");
  }

  function stopSliding() {
    isResizing = false;

    // Remove active class
    container.classList.remove("active");
  }

  function slide(e) {
    if (!isResizing) return;

    // Prevent default behavior for touch events
    if (e.type === "touchmove") {
      e.preventDefault();
    }

    // Get coordinates
    const containerRect = container.getBoundingClientRect();
    const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;

    // Calculate position as percentage
    let position = ((x - containerRect.left) / containerRect.width) * 100;

    // Limit position between 0 and 100
    position = Math.max(0, Math.min(position, 100));

    // Update slider position
    updateSliderPosition(position);
  }

  function updateSliderPosition(position) {
    // Set width of before image
    beforeImage.style.width = `${position}%`;

    // Set position of slider handle
    handle.style.left = `${position}%`;
  }
}
