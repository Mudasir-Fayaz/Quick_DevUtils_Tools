'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from '@/components/CopyButton'

export default function RandomInteger() {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)
  const [result, setResult] = useState<number | null>(null)

  const generateInteger = () => {
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min
    setResult(randomInt)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="min">Min:</Label>
        <Input
          id="min"
          type="number"
          value={min}
          onChange={(e) => setMin(parseInt(e.target.value))}
          className="w-20"
        />
        <Label htmlFor="max">Max:</Label>
        <Input
          id="max"
          type="number"
          value={max}
          onChange={(e) => setMax(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
      <Button onClick={generateInteger}>Generate Integer</Button>
      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated Integer:</h3>
          <div className="flex items-center">
            <p className="text-2xl font-mono">{result}</p>
            <CopyButton text={result.toString()} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

