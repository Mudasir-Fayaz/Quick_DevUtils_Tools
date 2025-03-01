"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Calculator, RefreshCw, Download } from "lucide-react"

export default function FactorialCalculator() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<{ input: string; result: string }>>([])
  const [showSteps, setShowSteps] = useState(false)

  const calculateFactorial = (n: number): bigint => {
    if (n === 0 || n === 1) return BigInt(1)
    return BigInt(n) * calculateFactorial(n - 1)
  }

  const handleCalculate = () => {
    setError(null)
    setResult(null)
    setShowSteps(false)

    const num = parseInt(input)
    if (isNaN(num) || num < 0) {
      setError("Please enter a non-negative integer.")
      return
    }

    try {
      const factorial = calculateFactorial(num)
      const result = `${num}! = ${factorial.toString()}`
      setResult(result)
      setHistory((prev) => [...prev, { input: num.toString(), result }])
    } catch (err) {
      console.log(err)
      setError("An error occurred during calculation.")
    }
  }

  const handleClear = () => {
    setInput("")
    setResult(null)
    setError(null)
    setShowSteps(false)
  }

  const handleDownload = () => {
    const content = history.map((item) => `${item.input}! = ${item.result}`).join("\n")
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "factorial_history.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleCalculate()
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [input, handleCalculate])

  return (
    <div className="container mx-auto space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">Factorial Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              type="number"
              placeholder="Enter a non-negative integer"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleCalculate} className="w-full md:w-auto">
              <Calculator className="mr-2 h-4 w-4" /> Calculate
            </Button>
          </div>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 flex items-center"
              >
                <AlertCircle className="mr-2 h-4 w-4" /> {error}
              </motion.div>
            )}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-green-500 font-semibold text-lg overflow-x-auto"
              >
                {result}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={handleClear} variant="outline" className="w-full md:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" /> Clear
            </Button>
            <Button onClick={() => setShowSteps(!showSteps)} variant="outline" className="w-full md:w-auto">
              {showSteps ? "Hide Steps" : "Show Steps"}
            </Button>
            <Button onClick={handleDownload} variant="outline" className="w-full md:w-auto">
              <Download className="mr-2 h-4 w-4" /> Download History
            </Button>
          </div>
          <AnimatePresence>
            {showSteps && result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Calculation Steps:</h3>
                    <ul className="list-disc list-inside">
                      {Array.from({ length: parseInt(input) }, (_, i) => i + 1).map((num) => (
                        <li key={num}>
                          {num} {num === parseInt(input) ? "=" : "×"}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Calculation History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <ul className="space-y-2">
              {history.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-2 bg-secondary rounded-md"
                >
                  {item.result}
                </motion.li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}