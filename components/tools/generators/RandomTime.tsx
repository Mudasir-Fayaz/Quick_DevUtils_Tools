'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { CopyButton } from '@/components/CopyButton'

export default function RandomTime() {
  const [result, setResult] = useState('')

  const generateTime = () => {
    const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0')
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0')
    const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0')
    setResult(`${hours}:${minutes}:${seconds}`)
  }

  return (
    <div className="space-y-4">
      <Button onClick={generateTime}>Generate Time</Button>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated Time:</h3>
          <div className="flex items-center">
            <p className="text-2xl font-mono">{result}</p>
            <CopyButton text={result} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

