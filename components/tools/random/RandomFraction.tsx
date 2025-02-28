"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

function simplifyFraction(numerator: number, denominator: number): [number, number] {
  const divisor = gcd(Math.abs(numerator), Math.abs(denominator))
  return [numerator / divisor, denominator / divisor]
}

export default function RandomFraction() {
  const [numeratorMin, setNumeratorMin] = useState(0)
  const [numeratorMax, setNumeratorMax] = useState(10)
  const [denominatorMin, setDenominatorMin] = useState(1)
  const [denominatorMax, setDenominatorMax] = useState(10)
  const [simplified, setSimplified] = useState(true)
  const [mixedFraction, setMixedFraction] = useState(false)
  const [showDecimal, setShowDecimal] = useState(false)
  const [count, setCount] = useState(1)
  const [results, setResults] = useState<string[]>([])

  const generateFractions = () => {
    const newResults: string[] = []
    for (let i = 0; i < count; i++) {
      let numerator = Math.floor(Math.random() * (numeratorMax - numeratorMin + 1)) + numeratorMin
      let denominator = Math.floor(Math.random() * (denominatorMax - denominatorMin + 1)) + denominatorMin

      if (simplified) {
        ;[numerator, denominator] = simplifyFraction(numerator, denominator)
      }

      let result = ""
      if (mixedFraction && Math.abs(numerator) >= denominator) {
        const wholePart = Math.floor(numerator / denominator)
        numerator = Math.abs(numerator % denominator)
        result = `${wholePart} ${numerator}/${denominator}`
      } else {
        result = `${numerator}/${denominator}`
      }

      if (showDecimal) {
        const decimal = (numerator / denominator).toFixed(2)
        result += ` (${decimal})`
      }

      newResults.push(result)
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="numeratorMin">Numerator Min</Label>
            <Input
              id="numeratorMin"
              type="number"
              value={numeratorMin}
              onChange={(e) => setNumeratorMin(Number.parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="numeratorMax">Numerator Max</Label>
            <Input
              id="numeratorMax"
              type="number"
              value={numeratorMax}
              onChange={(e) => setNumeratorMax(Number.parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="denominatorMin">Denominator Min</Label>
            <Input
              id="denominatorMin"
              type="number"
              min={1}
              value={denominatorMin}
              onChange={(e) => setDenominatorMin(Math.max(1, Number.parseInt(e.target.value)))}
            />
          </div>
          <div>
            <Label htmlFor="denominatorMax">Denominator Max</Label>
            <Input
              id="denominatorMax"
              type="number"
              min={1}
              value={denominatorMax}
              onChange={(e) => setDenominatorMax(Math.max(1, Number.parseInt(e.target.value)))}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="simplified" checked={simplified} onCheckedChange={setSimplified} />
          <Label htmlFor="simplified">Simplify fractions</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="mixedFraction" checked={mixedFraction} onCheckedChange={setMixedFraction} />
          <Label htmlFor="mixedFraction">Use mixed fractions</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="showDecimal" checked={showDecimal} onCheckedChange={setShowDecimal} />
          <Label htmlFor="showDecimal">Show decimal equivalent</Label>
        </div>
        <div>
          <Label htmlFor="count">Number of fractions to generate</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          />
        </div>
        <Button onClick={generateFractions}>Generate Fractions</Button>
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
                      description: "The generated fraction has been copied to your clipboard.",
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

