'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {

  

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 w-full bottom-0">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <div>
            <motion.h2 
              className="text-2xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Quick DevUtils
            </motion.h2>
            <motion.p 
              className="text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
       Quick DevUtils is here to make your work easier and faster with helpful tools for professionals and hobbyists. Whether you&apos;re handling text, code, or data, we offer tools to simplify your tasks. From editing text and formatting JSON to doing math calculations, we've got you covered. Need help with HTML, CSS, or JavaScript? Or maybe a color picker or clock tool? Quick DevUtils has everything you need to work smarter, not harder.
           </motion.p>
          </div>
          <div>
            <motion.h3 
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Quick Links
            </motion.h3>
            <motion.ul 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <li><Link href="/pages/about-us" className="hover:underline">About Us</Link></li>
              <li><Link href="/pages/refund-cancellations" className="hover:underline">Refund/Cancellations</Link></li>
              <li><Link href="/pages/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/pages/terms-conditions" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link href="/pages/contact-us" className="hover:underline">Contact</Link></li>
            </motion.ul>
          </div>
          <div>
            <motion.h3 
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Connect With Us
            </motion.h3>
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a href="https://github.com/Mudasir-Fayaz" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                <Github size={24} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://x.com/@coder_mudasir" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com/in/mudasir-fayaz" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:mudasirfayazitoo@gmail.com" className="hover:text-accent">
                <Mail size={24} />
                <span className="sr-only">Email</span>
              </a>
            </motion.div>
          </div>
         
        </motion.div>
        <motion.div 
          className="mt-8 pt-8 border-t border-primary-foreground/10 text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          © {new Date().getFullYear()} Quick DevUtils. All rights reserved.
        </motion.div>
      </div>
    </footer>
  )
}