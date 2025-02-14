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
  const navBrand = document.querySelector(".nav-brand");
  let index = 0;
  const speed = 50; // Faster typing speed

  // Clear initial text
  preTextSpan.textContent = "";
  firstNameSpan.textContent = "";

  function typePreText() {
    if (index < preText.length) {
      preTextSpan.textContent = preText.slice(0, index + 1);
      index++;
      setTimeout(typePreText, speed);
    } else {
      // Start typing Cosimo after preText is complete
      index = 0;
      typeCosimo();
    }
  }

  function typeCosimo() {
    if (index < "Cosimo".length) {
      firstNameSpan.textContent = "Cosimo".slice(0, index + 1);
      index++;
      setTimeout(typeCosimo, speed);
    }
  }
  
  // Start typing after a small delay
  setTimeout(typePreText, 500);

  /* Scroll Interaction */
  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight * 0.3) {
      typingContainer.classList.add("scrolled");
      preTextSpan.style.opacity = "0";
      
      // Show navigation after a small delay
      setTimeout(() => {
        mainNav.classList.add("visible");
        lastNameSpan.textContent = lastName;
      }, 800);
      
    } else {
      typingContainer.classList.remove("scrolled");
      preTextSpan.style.opacity = "1";
      lastNameSpan.textContent = "";
      mainNav.classList.remove("visible");
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