'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin } from 'lucide-react'

const Logo = () => {
  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  const socialVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div 
      className="flex flex-col items-center p-4 bg-gradient-to-r mb-4 from-purple-600 to-blue-600 text-white rounded-lg shadow-lg"
      initial="hidden"
      animate="visible"
      variants={logoVariants}
    >
      <motion.h1 className="text-2xl font-bold mb-2" variants={logoVariants}>
        {'Quick DevUtils'.split('').map((letter, index) => (
          <motion.span key={index} variants={letterVariants}>
            {letter}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p className="text-sm mb-2" variants={logoVariants}>
        Built by Mudasir Fayaz
      </motion.p>
      <motion.div className="flex space-x-4" variants={socialVariants}>
        <motion.a 
          href="https://github.com/Mudasir-Fayaz" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Github size={20} />
        </motion.a>
        <motion.a 
          href="https://x.com/@mudasirbuilds" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Twitter size={20} />
        </motion.a>
        <motion.a 
          href="https://linkedin.com/in/mudasir-fayaz" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Linkedin size={20} />
        </motion.a>
      </motion.div>
    </motion.div>
  )
}

export default Logo

