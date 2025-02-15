document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile menu for all pages
  initializeMobileMenu();

  // Only run home page specific code if we're on the home page
  if (document.body.classList.contains('home')) {
    initializeHomePage();
  }
});

function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

function initializeHomePage() {
  /* Typing Animation */
  const preText = "Hey, I am ";
  const lastName = "Radler";
  const preTextSpan = document.querySelector(".pre-text");
  const firstNameSpan = document.querySelector(".first-name");
  const lastNameSpan = document.querySelector(".last-name");
  const typingContainer = document.querySelector(".typing-container");
  const mainNav = document.querySelector(".main-nav");
  let index = 0;
  
  // Function to get a random typing speed between min and max
  const getRandomSpeed = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Base typing speed is now slower (100ms) with variation
  const baseSpeed = 100;

  // Clear initial text
  preTextSpan.textContent = "";
  firstNameSpan.textContent = "";

  function typePreText() {
    if (index < preText.length) {
      preTextSpan.textContent = preText.slice(0, index + 1);
      index++;
      // Add random variation to typing speed
      setTimeout(typePreText, getRandomSpeed(baseSpeed * 0.8, baseSpeed * 1.5));
    } else {
      // Start typing Cosimo after preText is complete
      index = 0;
      setTimeout(typeCosimo, baseSpeed * 2); // Longer pause between phrases
    }
  }

  function typeCosimo() {
    if (index < "Cosimo".length) {
      firstNameSpan.textContent = "Cosimo".slice(0, index + 1);
      index++;
      // Add random variation to typing speed
      setTimeout(typeCosimo, getRandomSpeed(baseSpeed * 0.8, baseSpeed * 1.5));
    }
  }
  
  // Start typing after a small delay
  setTimeout(typePreText, 500);

  /* Scroll Interaction */
  window.addEventListener("scroll", () => {
    const scrollThreshold = window.innerHeight * 0.3;
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > scrollThreshold) {
      typingContainer.classList.add("scrolled");
      preTextSpan.style.opacity = "0";
      
      // Show navigation and last name after the container has moved to top-left
      setTimeout(() => {
        mainNav.classList.add("visible");
        lastNameSpan.textContent = lastName;
      }, 400);
    } else {
      // When scrolling back up, first remove the last name and nav
      lastNameSpan.textContent = "";
      mainNav.classList.remove("visible");
      
      // Then reset the container position
      typingContainer.classList.remove("scrolled");
      preTextSpan.style.opacity = "1";
    }
  });

  /* Scroll Interaction for Content Animation */
  const contentContainer = document.querySelector(".content-container");
  const landingSection = document.getElementById("landing");

  window.addEventListener("scroll", () => {
    if (window.scrollY > landingSection.offsetHeight * 0.3) {
      contentContainer.classList.add("scrolled");
    } else {
      contentContainer.classList.remove("scrolled");
    }
  });
} 