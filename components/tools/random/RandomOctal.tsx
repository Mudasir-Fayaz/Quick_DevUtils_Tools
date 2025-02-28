"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function RandomOctal() {
  const [digits, setDigits] = useState(3)
  const [count, setCount] = useState(1)
  const [exclude, setExclude] = useState("")
  const [results, setResults] = useState<string[]>([])

  const generateOctal = () => {
    const excludeSet = new Set(
      exclude
        .split(",")
        .map((n) => Number.parseInt(n.trim()))
        .filter((n) => !isNaN(n) && n >= 0 && n < 8),
    )
    const newResults = []
    for (let i = 0; i < count; i++) {
      let octal = ""
      for (let j = 0; j < digits; j++) {
        let digit
        do {
          digit = Math.floor(Math.random() * 8)
        } while (excludeSet.has(digit))
        octal += digit.toString()
      }
      newResults.push(octal)
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
          <Label htmlFor="digits">Number of digits</Label>
          <Input
            id="digits"
            type="number"
            min={1}
            max={20}
            value={digits}
            onChange={(e) => setDigits(Number.parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="count">Number of octal numbers to generate</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="exclude">Exclude specific digits (comma-separated)</Label>
          <Input id="exclude" value={exclude} onChange={(e) => setExclude(e.target.value)} placeholder="e.g. 0, 7" />
        </div>
        <Button onClick={generateOctal}>Generate Octal Numbers</Button>
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
                      description: "The generated octal number has been copied to your clipboard.",
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

