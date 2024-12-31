'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { CopyButton } from '@/components/CopyButton'

export default function RandomIntegerRange() {
  const [start, setStart] = useState(1)
  const [end, setEnd] = useState(10)
  const [count, setCount] = useState(5)
  const [ascending, setAscending] = useState(true)
  const [result, setResult] = useState<number[]>([])

  const generateRange = () => {
    const range = []
    for (let i = 0; i < count; i++) {
      range.push(Math.floor(Math.random() * (end - start + 1)) + start)
    }
    range.sort((a, b) => ascending ? a - b : b - a)
    setResult(range)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="start">Start:</Label>
        <Input
          id="start"
          type="number"
          value={start}
          onChange={(e) => setStart(parseInt(e.target.value))}
          className="w-20"
        />
        <Label htmlFor="end">End:</Label>
        <Input
          id="end"
          type="number"
          value={end}
          onChange={(e) => setEnd(parseInt(e.target.value))}
          className="w-20"
        />
        <Label htmlFor="count">Count:</Label>
        <Input
          id="count"
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="ascending"
          checked={ascending}
          onCheckedChange={setAscending}
        />
        <Label htmlFor="ascending">Ascending order</Label>
      </div>
      <Button onClick={generateRange}>Generate Range</Button>
      {result.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated Range:</h3>
          <div className="flex items-center">
            <p className="text-2xl font-mono">{result.join(', ')}</p>
            <CopyButton text={result.join(', ')} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

