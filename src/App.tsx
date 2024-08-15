import React, { useRef, useState, useEffect } from 'react'
import { animated, useSpring, useScroll, useTransition } from '@react-spring/web'

import './App.css'

const PAGE_COUNT = 4

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null!)

  // Setup scroll binding to control the position of the door slats
  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress > 0.5) {
        setTriggerText(true)
      } else {
        setTriggerText(false)
      }
    },
  })

  const [triggerText, setTriggerText] = useState(false)

  const textItems = ['Prathemesh', 'Rolling', 'Shutters']
  const contactInfo = [
    'Contact',
    'Survey No. 271, 1, Pune - Nashik Hwy, near Ekveera devi temple, Rajgurunagar, Maharashtra 410505',
    '99752 44371',
  ]

  const textTransitions = useTransition(triggerText ? contactInfo : [], {
    trail: 400,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const spring = useSpring({
    to: {
      transform: scrollYProgress.to([0, 1], ['translateY(0%)', 'translateY(-100%)']),
    },
    from: {
      transform: 'translateY(0%)',
    },
    config: { mass: 1, tension: 280, friction: 60 },
  })

  return (
    <div ref={containerRef} className="app">
      <div className="animated_layers">
        <div className="wall">
          <animated.div className="roller" style={spring}>
            <p className="title">
              {textItems.map(t => (
                <div>{t}</div>
              ))}
            </p>
          </animated.div>
          <div className="text_container">
            <p className="info_text">
              {textTransitions((style, item) => (
                <animated.div style={style}>{item}</animated.div>
              ))}
            </p>
          </div>
        </div>
      </div>
      {new Array(PAGE_COUNT).fill(null).map((_, index) => (
        <div className="full_page" key={index} />
      ))}
    </div>
  )
}
