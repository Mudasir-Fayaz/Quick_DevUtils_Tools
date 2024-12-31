'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from '@/components/CopyButton'

function isPrime(num: number): boolean {
  if (num <= 1) return false
  if (num <= 3) return true
  if (num % 2 === 0 || num % 3 === 0) return false
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false
  }
  return true
}

export default function RandomPrime() {
  const [max, setMax] = useState(100)
  const [result, setResult] = useState<number | null>(null)

  const generatePrime = () => {
    let num
    do {
      num = Math.floor(Math.random() * max) + 2
    } while (!isPrime(num))
    setResult(num)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="max">Max value:</Label>
        <Input
          id="max"
          type="number"
          min="2"
          value={max}
          onChange={(e) => setMax(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
      <Button onClick={generatePrime}>Generate Prime</Button>
      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated Prime:</h3>
          <div className="flex items-center">
            <p className="text-2xl font-mono">{result}</p>
            <CopyButton text={result.toString()} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

