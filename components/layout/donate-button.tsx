import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import React from 'react'

const DonateButton = () => {
  return (
    <a href='https://buymeacoffee.com/mudasirfayaz' target='_blank'>
    <motion.button
    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Heart className="mr-2" size={20} />
    <span>Support Me</span>
  </motion.button>
    </a>
  )
}

export default DonateButton
