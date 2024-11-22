'use client'

import { motion } from 'framer-motion'
import DonateButton from './donate-button'

export default function SupportButton() {

  return (
        <motion.div
        className=" rounded-lg shadow-xl overflow-hidden w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
       >
      
        <div className="p-6">
          <motion.h2
            className="text-2xl font-bold mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Support Our Tools
          </motion.h2>
          <motion.p
            className="mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
Your feedback and support help us improve and add powerful features. Together, we can make these tools even better for everyone!          </motion.p>
         <DonateButton />
        </div>
      </motion.div>
   
  )
}