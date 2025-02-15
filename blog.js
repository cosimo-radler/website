document.addEventListener('DOMContentLoaded', () => {
  const blogContent = document.querySelector('#blog-content');
  const typingContainer = document.querySelector('.typing-container');
  const message = "Coming soon, I am still busy typing...";
  let index = 0;

  // Function to get a random typing speed between min and max
  const getRandomSpeed = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Base typing speed is now slower (100ms) with variation
  const baseSpeed = 100;

  // Helper function to simulate typing with proper cursor
  const typeText = () => {
    if (index < message.length) {
      typingContainer.textContent = message.slice(0, index + 1);
      index++;
      // Add random variation to typing speed
      setTimeout(typeText, getRandomSpeed(baseSpeed * 0.8, baseSpeed * 1.5));
    } else {
      typingContainer.classList.add('typing-complete');
    }
  };

  // Start typing after a small delay
  setTimeout(() => {
    typingContainer.classList.add('typing');
    typeText();
  }, 500);
}); 