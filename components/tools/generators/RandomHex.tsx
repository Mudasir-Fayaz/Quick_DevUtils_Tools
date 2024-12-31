'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from '@/components/CopyButton'

export default function RandomHex() {
  const [length, setLength] = useState(6)
  const [result, setResult] = useState('')

  const generateHex = () => {
    let hex = ''
    for (let i = 0; i < length; i++) {
      hex += Math.floor(Math.random() * 16).toString(16)
    }
    setResult(hex.toUpperCase())
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="length">Length:</Label>
        <Input
          id="length"
          type="number"
          min="1"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
      <Button onClick={generateHex}>Generate Hex</Button>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated Hex:</h3>
          <div className="flex items-center">
            <p className="text-2xl font-mono">{result}</p>
            <CopyButton text={result} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

