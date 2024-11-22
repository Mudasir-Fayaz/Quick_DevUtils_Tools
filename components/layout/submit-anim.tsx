'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SuccessMessage = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate form submission delay
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut"
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className=" p-8 rounded-lg shadow-lg text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.svg
              className="w-24 h-24 mx-auto text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                variants={checkVariants}
              />
              <motion.path
                d="M22 4L12 14.01l-3-3"
                variants={checkVariants}
              />
            </motion.svg>
            <motion.h2
              className="text-2xl font-bold mt-4"
              variants={textVariants}
            >
              Form Submitted Successfully!
            </motion.h2>
            <motion.p
              className="mt-2"
              variants={textVariants}
            >
              Thank you for your submission.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    
  )
}

export default SuccessMessage

