import { useRef } from 'react'
import { useSpring, animated, useScroll } from '@react-spring/web'

import styles from './styles.module.scss'

const X_LINES = 40

const PAGE_COUNT = 5

const INITIAL_WIDTH = 20

export default function MyComponent() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll()

  return (
    <div ref={containerRef} className={styles.body}>
      <animated.div style={{ opacity: scrollYProgress.to(s => s) }}>Hello World</animated.div>
      {new Array(PAGE_COUNT).fill(null).map((_, index) => (
        <div className={styles.full__page} key={index} />
      ))}
    </div>
  )
}
