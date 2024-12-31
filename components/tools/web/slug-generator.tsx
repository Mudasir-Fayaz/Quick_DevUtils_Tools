'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const SlugGenerator: React.FC = () => {
  const [input, setInput] = useState('')
  const [slug, setSlug] = useState('')

  const generateSlug = () => {
    const slugified = input
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
    setSlug(slugified)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Enter text to slugify"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={generateSlug}>Generate Slug</Button>
        {slug && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Input
              type="text"
              value={slug}
              readOnly
              className="w-full"
            />
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default SlugGenerator

