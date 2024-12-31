'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const mimeTypes: { [key: string]: string } = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  // Add more MIME types as needed
}

const MimeTypes: React.FC = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const getMimeType = () => {
    const extension = input.startsWith('.') ? input : `.${input}`
    setResult(mimeTypes[extension.toLowerCase()] || 'Unknown MIME type')
  }

  const getExtension = () => {
    const entry = Object.entries(mimeTypes).find(([, value]) => value.toLowerCase() === input.toLowerCase())
    setResult(entry ? entry[0] : 'Unknown extension')
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>MIME Types Lookup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Enter file extension or MIME type"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex space-x-2">
          <Button onClick={getMimeType}>Get MIME Type</Button>
          <Button onClick={getExtension}>Get Extension</Button>
        </div>
        {result && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-semibold"
          >
            Result: {result}
          </motion.p>
        )}
      </CardContent>
    </Card>
  )
}

export default MimeTypes

