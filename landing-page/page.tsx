"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import styles from "./LandingPage.module.css"

export default function LandingPage() {
  const [typedText, setTypedText] = useState("")
  const [isContentVisible, setIsContentVisible] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const text = "Hey, I'm Cosimo"
    let index = 0

    const typeText = () => {
      if (index < text.length) {
        setTypedText((prev) => prev + text.charAt(index))
        index++
        setTimeout(typeText, 100)
      }
    }

    typeText()

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      if (scrollPosition > windowHeight * 0.5) {
        setIsContentVisible(true)
      } else {
        setIsContentVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <main className={styles.main}>
      <section className={styles.intro}>
        <div className={styles.typingContainer}>
          <span>{typedText}</span>
          <span className={styles.cursor}>|</span>
        </div>
        <div className={styles.scrollIndicator}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>
      <section className={`${styles.content} ${isContentVisible ? styles.visible : ""}`} ref={contentRef}>
        <h1 className={isContentVisible ? styles.visible : ""}>Cosimo</h1>
        <div className={styles.placeholderContent}>
          <Image src="/placeholder.svg" alt="Placeholder Image" width={300} height={300} />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>
      </section>
    </main>
  )
}

