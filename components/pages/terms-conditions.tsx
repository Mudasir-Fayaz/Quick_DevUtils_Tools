'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from 'lucide-react'
import {motion} from 'framer-motion'

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
  
  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  }
  
const TermsConditions = () => {
  return (
    <motion.div
    initial="initial"
    animate="animate"
    variants={staggerChildren}
    className="max-w-6xl mx-auto space-y-12"
  >
    <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-gray-300">
      Terms and Conditions
    </motion.h1>
  
    <motion.section variants={fadeInUp}>
      <Card>
      
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Shield className="mr-2" /> User Agreement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-200">
            By using Tools App, you agree to be bound by the following terms and conditions. Please read them carefully before using the website. If you do not agree to these terms, please refrain from using the website.
          </p>
  
          <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Use of Services</h2>
          <p className="text-gray-600 dark:text-gray-200">
            You agree to use Tools App&apos;s services for lawful purposes only. Any activity that disrupts or negatively affects the website or services is strictly prohibited.
          </p>
  
          <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-200">
            All content, logos, and services provided on the website are owned by Tools App and protected by intellectual property laws. Unauthorized use of our materials is prohibited.
          </p>
  
          <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Account Responsibility</h2>
          <p className="text-gray-600 dark:text-gray-200">
            If you create an account on Tools App, you are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.
          </p>
  
          <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Privacy and Data Collection</h2>
          <p className="text-gray-600 dark:text-gray-200">
            We value your privacy and handle personal data in accordance with our Privacy Policy. By using our website, you consent to the collection and processing of your data as outlined.
          </p>
  
          <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Limitation of Liability</h2>
          <p className="text-gray-600 dark:text-gray-200">
            Tools App is not liable for any damages or losses arising from the use or inability to use our services. Users are responsible for using the website at their own risk.
          </p>
  
          <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Modifications to the Terms</h2>
          <p className="text-gray-600 dark:text-gray-200">
            Tools App reserves the right to modify or update these Terms and Conditions at any time. Any changes will be posted on this page, and continued use of the website constitutes your acceptance of these changes.
          </p>
  
          <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Governing Law</h2>
          <p className="text-gray-600 dark:text-gray-200">
            These terms are governed by the laws of the jurisdiction in which Tools App operates. Any disputes will be resolved in accordance with applicable laws.
          </p>
  
        </CardContent>
      </Card>
    </motion.section>
  </motion.div>

  )
}

export default TermsConditions
