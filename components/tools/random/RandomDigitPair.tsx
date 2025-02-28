"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

export default function RandomDigitPair() {
  const [excludedPairs, setExcludedPairs] = useState("")
  const [count, setCount] = useState(1)
  const [padded, setPadded] = useState(true)
  const [results, setResults] = useState<string[]>([])

  const generateDigitPairs = () => {
    const excludedSet = new Set(excludedPairs.split(",").map((pair) => pair.trim().padStart(2, "0")))
    const availablePairs = []
    for (let i = 0; i < 100; i++) {
      const pair = i.toString().padStart(2, "0")
      if (!excludedSet.has(pair)) {
        availablePairs.push(pair)
      }
    }

    if (availablePairs.length === 0) {
      toast({
        title: "Error",
        description: "All pairs have been excluded. Please allow at least one pair.",
        variant: "destructive",
      })
      return
    }

    const newResults: string[] = []
    for (let i = 0; i < count; i++) {
      const pair = availablePairs[Math.floor(Math.random() * availablePairs.length)]
      newResults.push(padded ? pair : Number.parseInt(pair).toString())
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
          <Label htmlFor="excludedPairs">Exclude pairs (comma-separated)</Label>
          <Input
            id="excludedPairs"
            value={excludedPairs}
            onChange={(e) => setExcludedPairs(e.target.value)}
            placeholder="e.g. 00, 01, 99"
          />
        </div>
        <div>
          <Label htmlFor="count">Number of pairs to generate</Label>
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
          <Switch id="padded" checked={padded} onCheckedChange={setPadded} />
          <Label htmlFor="padded">Pad with leading zero</Label>
        </div>
        <Button onClick={generateDigitPairs}>Generate Digit Pairs</Button>
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
                    navigator.clipboard.writeText(result)
                    toast({
                      title: "Copied to clipboard",
                      description: "The generated digit pair has been copied to your clipboard.",
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

