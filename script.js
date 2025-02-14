document.addEventListener('DOMContentLoaded', () => {
  /* Typing Animation */
  const text = "Hey, I'm Cosimo";
  const typedTextSpan = document.getElementById("typed-text");
  let index = 0;
  const speed = 150; // milliseconds per character

  function type() {
    if (index < text.length) {
      typedTextSpan.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }
  type();

  /* Scroll Interaction for Content Animation */
  const contentContainer = document.querySelector(".content-container");
  const landingSection = document.getElementById("landing");

  window.addEventListener("scroll", () => {
    // When scrolling past half the height of the landing section, trigger animation
    if (window.scrollY > landingSection.offsetHeight * 0.5) {
      contentContainer.classList.add("scrolled");
    } else {
      contentContainer.classList.remove("scrolled");
    }
  });
}); 