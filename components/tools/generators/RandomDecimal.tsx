'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from '@/components/CopyButton'

export default function RandomDecimal() {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1)
  const [decimals, setDecimals] = useState(2)
  const [result, setResult] = useState<number | null>(null)

  const generateDecimal = () => {
    const randomDecimal = Math.random() * (max - min) + min
    setResult(Number(randomDecimal.toFixed(decimals)))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="min">Min:</Label>
        <Input
          id="min"
          type="number"
          value={min}
          onChange={(e) => setMin(parseFloat(e.target.value))}
          className="w-20"
        />
        <Label htmlFor="max">Max:</Label>
        <Input
          id="max"
          type="number"
          value={max}
          onChange={(e) => setMax(parseFloat(e.target.value))}
          className="w-20"
        />
        <Label htmlFor="decimals">Decimals:</Label>
        <Input
          id="decimals"
          type="number"
          min="0"
          max="20"
          value={decimals}
          onChange={(e) => setDecimals(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
      <Button onClick={generateDecimal}>Generate Decimal</Button>
      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated Decimal:</h3>
          <div className="flex items-center">
            <p className="text-2xl font-mono">{result}</p>
            <CopyButton text={result.toString()} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

