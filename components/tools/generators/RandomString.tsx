'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from '@/components/CopyButton'

export default function RandomString() {
  const [length, setLength] = useState(10)
  const [result, setResult] = useState('')

  const generateString = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let generated = ''
    for (let i = 0; i < length; i++) {
      generated += chars[Math.floor(Math.random() * chars.length)]
    }
    setResult(generated)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="length">String length:</Label>
        <Input
          id="length"
          type="number"
          min="1"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
      <Button onClick={generateString}>Generate String</Button>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated String:</h3>
          <div className="flex items-center">
            <p className="text-2xl font-mono break-all">{result}</p>
            <CopyButton text={result} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

