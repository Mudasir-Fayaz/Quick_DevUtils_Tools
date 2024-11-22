'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Ensure this path is correct
import { Lock } from 'lucide-react' // Ensure this import is correct
import { motion } from 'framer-motion' // Correct import for motion from framer-motion

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const PrivacyPolicy = () => {
  return (<>
   <motion.div
      initial="initial"
      animate="animate"
      variants={staggerChildren}
      className="max-w-6xl mx-auto space-y-12"
    >
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-gray-300"
      >
        Privacy Policy
      </motion.h1>

      <motion.section variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Lock className="mr-2" /> Your Privacy Matters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-200">
              At Tools App, we value and respect your privacy. This privacy policy outlines the types of personal data we collect, how it is used, and how we protect it. By using our website and services, you agree to the practices described in this policy.
            </p>

            <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Information We Collect</h2>
            <p className="text-gray-600 dark:text-gray-200">
              We collect information such as your name, email address, and usage data to improve our services and provide a better user experience. We may also collect technical data like browser type, IP address, and pages visited to optimize our website&apos;s performance.
            </p>

            <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-200">
              The data we collect is used to personalize your experience, send updates about our services, and improve our website’s functionality. We may also use the information for marketing purposes and to ensure the security of our platform.
            </p>

            <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Cookies and Tracking</h2>
            <p className="text-gray-600 dark:text-gray-200">
              We use cookies and other tracking technologies to enhance your experience and gather information on how our website is used. These tools help us understand user preferences and improve the functionality of our site.
            </p>

            <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Data Security</h2>
            <p className="text-gray-600 dark:text-gray-200">
              We implement security measures to protect your personal data. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-200">
              You have the right to access, correct, or delete your personal information at any time. If you wish to update or delete your data, please contact us at [insert contact email]. We will respond to your request promptly.
            </p>

            <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Third-Party Services</h2>
            <p className="text-gray-600 dark:text-gray-200">
              We may use third-party services for analytics, advertising, or other purposes. These third parties may collect information about you, and we encourage you to review their privacy policies for more details.
            </p>

            <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Changes to This Privacy Policy</h2>
            <p className="text-gray-600 dark:text-gray-200">
              We reserve the right to update or change this privacy policy at any time. Any changes will be posted on this page, and the updated policy will be effective immediately upon posting.
            </p>

            <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-200">
              If you have any questions or concerns about our privacy policy, please feel free to contact us at [insert contact email]. We&apos;re here to help.
            </p>
          </CardContent>
        </Card>
      </motion.section>
    </motion.div>
   </>
  );
};

export default PrivacyPolicy;
