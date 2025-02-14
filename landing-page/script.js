document.addEventListener("DOMContentLoaded", () => {
  const typingText = document.getElementById("typing-text")
  const content = document.getElementById("content")
  const heading = document.querySelector("h1")
  const text = "Hey, I'm Cosimo"
  let index = 0

  function typeText() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index)
      index++
      setTimeout(typeText, 100)
    }
  }

  typeText()

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight

    if (scrollPosition > windowHeight * 0.5) {
      content.classList.add("visible")
      heading.classList.add("visible")
    } else {
      content.classList.remove("visible")
      heading.classList.remove("visible")
    }
  })
})

