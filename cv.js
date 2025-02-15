document.addEventListener('DOMContentLoaded', () => {
  const quoteText = document.querySelector('.quote-text');
  const quoteAuthor = document.querySelector('.quote-author');
  const personalResponse = document.querySelector('.personal-response');
  const responseSignature = document.querySelector('.response-signature');
  const cvContent = document.querySelector('#cv-content');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  const quote = "I don't feel frightened by not knowing things. I think it's much more interesting";
  const response = "and I could not agree more, Feynman was onto something...";

  // Helper function to simulate typing with proper cursor
  const typeText = async (element, text, speed = 50) => {
    element.classList.add('typing');
    element.textContent = '';
    
    for (let char of text) {
      element.textContent += char;
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    element.classList.remove('typing');
    element.classList.add('typing-complete');
  };

  // Helper function to fade in an element
  const fadeIn = (element, delay = 0) => {
    setTimeout(() => {
      element.style.opacity = '0';
      element.style.display = 'block';
      
      let opacity = 0;
      const interval = setInterval(() => {
        if (opacity < 1) {
          opacity += 0.1;
          element.style.opacity = opacity;
        } else {
          clearInterval(interval);
        }
      }, 30);
    }, delay);
  };

  // Main animation sequence
  const startAnimation = async () => {
    // Make CV content immediately available for scrolling
    cvContent.classList.remove('hidden');
    
    // Type out the quote
    await typeText(quoteText, quote);
    
    // Show author with fade immediately after quote
    await new Promise(resolve => setTimeout(resolve, 200));
    fadeIn(quoteAuthor);
    quoteAuthor.textContent = "Richard Feynman";

    // Wait and type the response
    await new Promise(resolve => setTimeout(resolve, 800));
    await typeText(personalResponse, response);

    // Show signature with fade
    await new Promise(resolve => setTimeout(resolve, 200));
    fadeIn(responseSignature);

    // Show scroll indicator at the end
    fadeIn(scrollIndicator, 500);
  };

  // Start the animation sequence
  startAnimation();

  // Add scroll functionality
  scrollIndicator.addEventListener('click', () => {
    cvContent.scrollIntoView({ behavior: 'smooth' });
  });
}); 