'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from '@/components/CopyButton'

export default function RandomFraction() {
  const [maxDenominator, setMaxDenominator] = useState(100)
  const [result, setResult] = useState<string>('')

  const generateFraction = () => {
    const numerator = Math.floor(Math.random() * maxDenominator) + 1
    const denominator = Math.floor(Math.random() * maxDenominator) + 1
    setResult(`${numerator}/${denominator}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="maxDenominator">Max Denominator:</Label>
        <Input
          id="maxDenominator"
          type="number"
          min="2"
          value={maxDenominator}
          onChange={(e) => setMaxDenominator(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
      <Button onClick={generateFraction}>Generate Fraction</Button>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated Fraction:</h3>
          <div className="flex items-center">
            <p className="text-2xl font-mono">{result}</p>
            <CopyButton text={result} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

