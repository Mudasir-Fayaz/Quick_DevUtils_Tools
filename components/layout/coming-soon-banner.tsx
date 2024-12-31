'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, Sparkles } from 'lucide-react'

export default function ComingSoonBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth >= 640)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 sm:p-6 shadow-lg"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <Sparkles className="w-6 h-6 mr-2 text-yellow-300" />
          <h2 className="text-lg sm:text-xl font-bold">More Tools & Features</h2>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.p
              className="text-sm sm:text-base mb-4 sm:mb-0 text-center sm:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              We&#39;re working hard to bring you exciting new tools & features.
            </motion.p>
          )}
        </AnimatePresence>
        <div className="flex items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mr-2 sm:hidden bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors duration-200"
            aria-label={isExpanded ? "Show less" : "Show more"}
          >
            <ChevronRight className={`w-4 h-4 transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="bg-white text-purple-600 hover:bg-opacity-90 font-semibold py-2 px-4 rounded-full transition-colors duration-200 flex items-center"
          >
            <span className="mr-2 hidden sm:inline">Got it</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}