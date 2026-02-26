"use client"

import { motion, type Variants } from "framer-motion"

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  once?: boolean
  amount?: number
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.2,
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  once?: boolean
  amount?: number
}

const directionOffset = { up: 24, down: -24, left: 24, right: -24 }

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  amount = 0.2,
}: FadeInProps) {
  const isVertical = direction === "up" || direction === "down"
  return (
    <motion.div
      initial={{ opacity: 0, y: isVertical ? directionOffset[direction] : 0, x: !isVertical ? directionOffset[direction] : 0 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function getStaggerContainer(delayChildren = 0.1, staggerChildren = 0.08) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren, staggerChildren },
    },
  }
}

export function getStaggerItem() {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }
}

export { motion }
