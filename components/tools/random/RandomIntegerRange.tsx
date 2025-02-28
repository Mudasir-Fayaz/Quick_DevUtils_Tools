"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

export default function RandomIntegerRange() {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(100)
  const [step, setStep] = useState(1)
  const [unique, setUnique] = useState(false)
  const [count, setCount] = useState(1)
  const [results, setResults] = useState<number[]>([])

  const generateIntegers = () => {
    const range = []
    for (let i = start; i <= end; i += step) {
      range.push(i)
    }

    if (unique && range.length < count) {
      toast({
        title: "Error",
        description: "Not enough unique integers in the specified range.",
        variant: "destructive",
      })
      return
    }

    const newResults = []
    const usedIndices = new Set()
    for (let i = 0; i < count; i++) {
      let index
      do {
        index = Math.floor(Math.random() * range.length)
      } while (unique && usedIndices.has(index))

      usedIndices.add(index)
      newResults.push(range[index])
    }
    setResults(newResults)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="start">Start value</Label>
          <Input id="start" type="number" value={start} onChange={(e) => setStart(Number.parseInt(e.target.value))} />
        </div>
        <div>
          <Label htmlFor="end">End value</Label>
          <Input id="end" type="number" value={end} onChange={(e) => setEnd(Number.parseInt(e.target.value))} />
        </div>
        <div>
          <Label htmlFor="step">Step increment</Label>
          <Input
            id="step"
            type="number"
            min={1}
            value={step}
            onChange={(e) => setStep(Math.max(1, Number.parseInt(e.target.value)))}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="unique" checked={unique} onCheckedChange={setUnique} />
          <Label htmlFor="unique">Generate unique numbers</Label>
        </div>
        <div>
          <Label htmlFor="count">Number of integers to generate</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          />
        </div>
        <Button onClick={generateIntegers}>Generate Integers</Button>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            {results.map((result, index) => (
              <div key={index} className="p-4 bg-secondary rounded-md flex justify-between items-center">
                <p className="text-lg font-mono">{result}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(result.toString())
                    toast({
                      title: "Copied to clipboard",
                      description: "The generated integer has been copied to your clipboard.",
                    })
                  }}
                >
                  Copy
                </Button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

