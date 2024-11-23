'use client'

import { motion } from 'framer-motion'
import { Wrench,  Clock} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } }
}

export default function AboutPage() {
  return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="max-w-6xl mx-auto space-y-12"
      >
        <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-gray-300">
          About Us
        </motion.h1>

        <motion.section variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Wrench className="mr-2" /> Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
            <p className="text-gray-600 dark:text-gray-200">Quick DevUtils is here to make your work easier and faster with helpful tools for professionals and hobbyists. Whether you&apos;re handling text, code, or data, we offer tools to simplify your tasks. From editing text and formatting JSON to doing math calculations, we've got you covered. Need help with HTML, CSS, or JavaScript? Or maybe a color picker or clock tool? Quick DevUtils has everything you need to work smarter, not harder.
</p>

<h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Text Tools</h2>
<p className="text-gray-600 dark:text-gray-200">
  Enhance your productivity with powerful text manipulation tools, including formatters, counters, and editors. 
  Quickly transform and analyze text for your projects, emails, or reports with precision and ease.
</p>

<h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">String Tools</h2>
<p className="text-gray-600 dark:text-gray-200">
  Simplify string operations with utilities like encoders, decoders, splitters, and more. 
  Whether you&apos;re a developer or a data specialist, these tools help you manage and manipulate strings effortlessly.
</p>

<h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">JSON Tools</h2>
<p className="text-gray-600 dark:text-gray-200">
  Work effortlessly with JSON data using formatters, viewers, and diff checkers. 
  Perfect for developers who need to debug, format, or compare JSON data efficiently.
</p>

<h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Math Tools</h2>
<p className="text-gray-600 dark:text-gray-200">
  Solve complex calculations with ease using calculators, converters, and other math utilities. 
  From basic arithmetic to advanced computations, our tools simplify mathematical challenges for all users.
</p>

<h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">ASCII Tools</h2>
<p className="text-gray-600 dark:text-gray-200">
  Convert and manipulate ASCII data with tools for encoding, decoding, and visualization. 
  Ideal for developers and enthusiasts working on text-based data transformations.
</p>

<h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">HTML Tools</h2>
<p className="text-gray-600 dark:text-gray-200">
  Optimize your web development with HTML formatters, viewers, and validators. 
  Simplify your workflow and ensure clean, error-free HTML code for your projects.
</p>

<h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">CSS Tools</h2>
<p className="text-gray-600 dark:text-gray-200">
  Create beautiful styles effortlessly with CSS generators, formatters, and minifiers. 
  Design responsive and efficient CSS with tools tailored for web developers and designers.
</p>

<h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">JavaScript Tools</h2>
<p className="text-gray-600 dark:text-gray-200">
  Simplify JavaScript tasks with debuggers, code generators, and formatters tailored for developers. 
  Write cleaner, more efficient code with tools that optimize your development process.
</p>

<h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Color Tools</h2>
<p className="text-gray-600 dark:text-gray-200">
  Explore and generate stunning color palettes with pickers, converters, and gradients. 
  Perfect for designers and creatives looking to craft beautiful visuals with ease.
</p>

<h2 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-300">Clock Tools</h2>
<p className="text-gray-600 dark:text-gray-200">
  Stay organized and on time with world clocks, countdowns, and timezone converters. 
  Manage schedules across time zones effortlessly with tools designed for global productivity.
</p>

            </CardContent>
          </Card>
        </motion.section>

        <motion.section variants={fadeInUp}>
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Mudasir Fayaz", role: "Lead Developer", avatar: "/placeholder.svg?height=100&width=100" },
            //   { name: "John Smith", role: "Lead Developer", avatar: "/placeholder.svg?height=100&width=100" },
            //   { name: "Emily Brown", role: "UX Designer", avatar: "/placeholder.svg?height=100&width=100" },
            // 
            ].map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    {/* <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar> */}

                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Clock className="mr-2" /> Our History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">22 Nov 2024:</span>
                 <p className="text-gray-600 dark:text-gray-200">
  The first release of Quick DevUtils features a diverse range of utilities, including text tools, string tools, JSON tools, math tools, ASCII tools, HTML tools, CSS tools, JavaScript tools, color tools, and clock tools. Designed to simplify tasks and enhance productivity, this is just the beginning.
</p>

                </li>
              
              </ul>
            </CardContent>
          </Card>
        </motion.section>

       
      </motion.div>
  
  )
}