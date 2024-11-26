'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Ensure this path is correct
import { motion } from 'framer-motion' // Correct import for motion from framer-motion
import { RefreshCw } from 'lucide-react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const RefundPolicy = () => {
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
    Refund and Cancellation Policy
  </motion.h1>

  <motion.section variants={fadeInUp}>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <RefreshCw className="mr-2" /> Refund and Cancellation Policy
          
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-200">
          At Quick DevUtils, we strive to provide the best services to our users. However, we understand that situations may arise where cancellations or refunds are needed. Please review our policy below for more details.
        </p>

        <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Cancellation/Refund Request Time</h2>
        <p className="text-gray-600 dark:text-gray-200">
          You can request a cancellation or refund only on the <span className="font-extrabold">same day</span> as the purchase. Any requests made after this period will not be eligible for cancellation or refund.
        </p>

        <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Refund Processing Time</h2>
        <p className="text-gray-600 dark:text-gray-200">
          Once a refund request is approved, we will process the refund within <span className="font-extrabold">6-8 working days</span>. The amount will be credited to your original payment method or bank account.
        </p>

        <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Additional Details</h2>
        <p className="text-gray-600 dark:text-gray-200">
          - Refunds will be processed only if the purchased service has not been fully utilized. <br />
          - For subscription-based services, partial refunds are not applicable. <br />
          - All prices listed on our platform are in <span className="font-medium">Indian Rupees (INR)</span>.
        </p>

        <h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Contact Us</h2>
        <p className="text-gray-600 dark:text-gray-200">
          If you have any questions or require assistance with cancellations or refunds, please reach out to us at <a href="mailto:shahadahcentral@gmail.com" className="text-blue-600 hover:underline">shahadahcentral@gmail.com</a>. We are here to help.
        </p>
      </CardContent>
    </Card>
  </motion.section>
</motion.div>
   </>
  );
};

export default RefundPolicy;
