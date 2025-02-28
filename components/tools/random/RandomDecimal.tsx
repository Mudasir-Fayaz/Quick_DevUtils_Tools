"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

export default function RandomDecimal() {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)
  const [includeFloating, setIncludeFloating] = useState(true)
  const [precision, setPrecision] = useState(2)
  const [count, setCount] = useState(1)
  const [results, setResults] = useState<string[]>([])

  const generateDecimals = () => {
    const newResults = []
    for (let i = 0; i < count; i++) {
      let num = Math.random() * (max - min) + min
      if (!includeFloating) {
        num = Math.floor(num)
      }
      newResults.push(num.toFixed(precision))
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
          <Label htmlFor="min">Minimum</Label>
          <Input id="min" type="number" value={min} onChange={(e) => setMin(Number.parseFloat(e.target.value))} />
        </div>
        <div>
          <Label htmlFor="max">Maximum</Label>
          <Input id="max" type="number" value={max} onChange={(e) => setMax(Number.parseFloat(e.target.value))} />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="includeFloating" checked={includeFloating} onCheckedChange={setIncludeFloating} />
          <Label htmlFor="includeFloating">Include floating-point numbers</Label>
        </div>
        <div>
          <Label htmlFor="precision">Decimal precision</Label>
          <Input
            id="precision"
            type="number"
            min={0}
            max={10}
            value={precision}
            onChange={(e) => setPrecision(Number.parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="count">Number of decimals to generate</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          />
        </div>
        <Button onClick={generateDecimals}>Generate Decimal Numbers</Button>
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
                      description: "The generated decimal number has been copied to your clipboard.",
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

