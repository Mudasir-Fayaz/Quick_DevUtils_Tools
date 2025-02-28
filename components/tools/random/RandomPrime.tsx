"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

function isPrime(num: number): boolean {
  if (num <= 1) return false
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false
  }
  return true
}

export default function RandomPrime() {
  const [min, setMin] = useState(2)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(1)
  const [exclude, setExclude] = useState("")
  const [results, setResults] = useState<number[]>([])

  const generatePrimes = () => {
    const excludeSet = new Set(
      exclude
        .split(",")
        .map((n) => Number.parseInt(n.trim()))
        .filter((n) => !isNaN(n)),
    )
    const primes = []
    for (let i = min; i <= max; i++) {
      if (isPrime(i) && !excludeSet.has(i)) {
        primes.push(i)
      }
    }

    if (primes.length < count) {
      toast({
        title: "Error",
        description: "Not enough prime numbers in the specified range.",
        variant: "destructive",
      })
      return
    }

    const newResults = []
    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * primes.length)
      newResults.push(primes[index])
      primes.splice(index, 1)
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
          <Input
            id="min"
            type="number"
            min={2}
            value={min}
            onChange={(e) => setMin(Math.max(2, Number.parseInt(e.target.value)))}
          />
        </div>
        <div>
          <Label htmlFor="max">Maximum</Label>
          <Input
            id="max"
            type="number"
            min={2}
            value={max}
            onChange={(e) => setMax(Math.max(min, Number.parseInt(e.target.value)))}
          />
        </div>
        <div>
          <Label htmlFor="count">Number of primes to generate</Label>
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
          <Label htmlFor="exclude">Exclude specific primes (comma-separated)</Label>
          <Input id="exclude" value={exclude} onChange={(e) => setExclude(e.target.value)} placeholder="e.g. 2, 3, 5" />
        </div>
        <Button onClick={generatePrimes}>Generate Prime Numbers</Button>
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
                      description: "The generated prime number has been copied to your clipboard.",
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

