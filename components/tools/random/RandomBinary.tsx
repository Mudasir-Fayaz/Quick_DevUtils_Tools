"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

export default function RandomBinary() {
  const [bits, setBits] = useState(8)
  const [count, setCount] = useState(1)
  const [zeroPadding, setZeroPadding] = useState(true)
  const [results, setResults] = useState<string[]>([])

  const generateBinary = () => {
    const newResults = []
    for (let i = 0; i < count; i++) {
      let binary = Math.floor(Math.random() * Math.pow(2, bits)).toString(2)
      if (zeroPadding) {
        binary = binary.padStart(bits, "0")
      }
      newResults.push(binary)
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
          <Label htmlFor="bits">Number of bits</Label>
          <Input
            id="bits"
            type="number"
            min={1}
            max={64}
            value={bits}
            onChange={(e) => setBits(Number.parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="count">Number of binary numbers to generate</Label>
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
          <Switch id="zeroPadding" checked={zeroPadding} onCheckedChange={setZeroPadding} />
          <Label htmlFor="zeroPadding">Zero-padding</Label>
        </div>
        <Button onClick={generateBinary}>Generate Binary Numbers</Button>
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
                      description: "The generated binary number has been copied to your clipboard.",
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

