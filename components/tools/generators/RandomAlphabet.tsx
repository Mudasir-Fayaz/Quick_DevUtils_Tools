'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from '@/components/CopyButton'

export default function RandomAlphabet() {
  const [count, setCount] = useState(1)
  const [result, setResult] = useState('')

  const generateAlphabet = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let generated = ''
    for (let i = 0; i < count; i++) {
      generated += alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    setResult(generated)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="count">Number of letters:</Label>
        <Input
          id="count"
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
      <Button onClick={generateAlphabet}>Generate</Button>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Result:</h3>
          <div className="flex items-center">
            <p className="text-2xl font-mono">{result}</p>
            <CopyButton text={result} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

