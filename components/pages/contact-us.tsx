'use client'

import { motion } from 'framer-motion'
import { Send, Mail, MapPin, CircleUserRound } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm, ValidationError } from '@formspree/react';
import SuccessMessage from '../layout/submit-anim'

export default function Contact() {
 
  const [state, handleSubmit] = useForm("xeoqzwjl");
  

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)
  //   // Simulate form submission
  //   await new Promise(resolve => setTimeout(resolve, 2000))
  //   setIsSubmitting(false)
  //   alert('Form submitted successfully!')
  // }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {state.succeeded ? <SuccessMessage />: (<Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <Input id="name" type="text" placeholder="Your Name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <Input id="email" type="email" name='email' placeholder="your@email.com" required />
                  </div>
                  <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <Textarea id="message" name='message' placeholder="Your message here..." required />
                  </div>
                  <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
                  <Button type="submit" className="w-full" disabled={state.submitting}>
                    {state.submitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>)}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CircleUserRound className="text-blue-500" />
                  <span>Mudasir Fayaz</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-500" />
                  <span>mudasirfayazitoo@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-blue-500" />
                  <span>Qazigund Anantnag, 192221</span>
                </div>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle>Our Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-gray-400" />
                </div>
              </CardContent>
            </Card> */}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}