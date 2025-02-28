"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

export default function RandomInteger() {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)
  const [includeNegative, setIncludeNegative] = useState(false)
  const [count, setCount] = useState(1)
  const [unique, setUnique] = useState(false)
  const [results, setResults] = useState<number[]>([])

  const generateIntegers = () => {
    const minValue = includeNegative ? min : Math.max(0, min)
    const maxValue = Math.max(minValue, max)

    if (unique && maxValue - minValue + 1 < count) {
      toast({
        title: "Error",
        description: "Not enough unique integers in the specified range.",
        variant: "destructive",
      })
      return
    }

    const newResults = new Set<number>()
    while (newResults.size < count) {
      const num = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
      if (!unique || !newResults.has(num)) {
        newResults.add(num)
      }
    }
    setResults(Array.from(newResults))
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
          <Label htmlFor="min">Minimum</Label>
          <Input id="min" type="number" value={min} onChange={(e) => setMin(Number.parseInt(e.target.value))} />
        </div>
        <div>
          <Label htmlFor="max">Maximum</Label>
          <Input id="max" type="number" value={max} onChange={(e) => setMax(Number.parseInt(e.target.value))} />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="includeNegative" checked={includeNegative} onCheckedChange={setIncludeNegative} />
          <Label htmlFor="includeNegative">Include negative numbers</Label>
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
        <div className="flex items-center space-x-2">
          <Switch id="unique" checked={unique} onCheckedChange={setUnique} />
          <Label htmlFor="unique">Ensure unique numbers</Label>
        </div>
        <Button onClick={generateIntegers}>Generate Integers</Button>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            {results.map((num, index) => (
              <div key={index} className="p-4 bg-secondary rounded-md flex justify-between items-center">
                <p className="text-lg font-mono">{num}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(num.toString())
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

