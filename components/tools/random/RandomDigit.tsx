"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

export default function RandomDigit() {
  const [excludedDigits, setExcludedDigits] = useState("")
  const [count, setCount] = useState(1)
  const [sequence, setSequence] = useState(false)
  const [results, setResults] = useState<string[]>([])

  const generateDigits = () => {
    const availableDigits = "0123456789".split("").filter((d) => !excludedDigits.includes(d))

    if (availableDigits.length === 0) {
      toast({
        title: "Error",
        description: "All digits have been excluded. Please allow at least one digit.",
        variant: "destructive",
      })
      return
    }

    const newResults: string[] = []
    for (let i = 0; i < count; i++) {
      const digit = availableDigits[Math.floor(Math.random() * availableDigits.length)]
      newResults.push(digit)
    }
    setResults(sequence ? [newResults.join("")] : newResults)
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
          <Label htmlFor="excludedDigits">Exclude digits</Label>
          <Input
            id="excludedDigits"
            value={excludedDigits}
            onChange={(e) => setExcludedDigits(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="e.g. 123"
          />
        </div>
        <div>
          <Label htmlFor="count">Number of digits to generate</Label>
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
          <Switch id="sequence" checked={sequence} onCheckedChange={setSequence} />
          <Label htmlFor="sequence">Generate as sequence</Label>
        </div>
        <Button onClick={generateDigits}>Generate Digits</Button>
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
                      description: "The generated digit(s) have been copied to your clipboard.",
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

