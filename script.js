// Typing animation configuration
const TEXT_TO_TYPE = "Hey, I'm Cosimo";
const TYPING_SPEED = 100; // milliseconds per character
const INITIAL_DELAY = 500; // milliseconds before typing starts

// DOM elements
const typingElement = document.getElementById('typing-text');
const scrollIndicator = document.querySelector('.scroll-indicator');
const contentSection = document.querySelector('.content');
const nameElement = document.querySelector('.content__name');

// Typing animation function
const typeText = async () => {
    try {
        // Wait for initial delay
        await new Promise(resolve => setTimeout(resolve, INITIAL_DELAY));

        // Type each character with delay
        for (let i = 0; i < TEXT_TO_TYPE.length; i++) {
            typingElement.textContent += TEXT_TO_TYPE[i];
            await new Promise(resolve => setTimeout(resolve, TYPING_SPEED));
        }

        // Show scroll indicator after typing is complete
        scrollIndicator.classList.add('visible');
    } catch (error) {
        console.error('Error in typing animation:', error);
    }
};

// Scroll handling
const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Show content section when scrolled into view
    if (scrollPosition > windowHeight * 0.3) {
        contentSection.classList.add('visible');
        nameElement.classList.add('slide-left');
    }
};

// Intersection Observer for better performance
const observeContent = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('content__name')) {
                    entry.target.classList.add('slide-left');
                }
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(contentSection);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    typeText();
    observeContent();
    window.addEventListener('scroll', handleScroll);
}); 