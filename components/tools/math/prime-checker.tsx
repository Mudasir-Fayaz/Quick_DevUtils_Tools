"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Check, RefreshCw, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function PrimeChecker() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<{ input: number; isPrime: boolean }>>([])
  const [showInfo, setShowInfo] = useState(false)

  const isPrime = (num: number): boolean => {
    if (num <= 1) return false
    if (num <= 3) return true
    if (num % 2 === 0 || num % 3 === 0) return false
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false
    }
    return true
  }

  const handleCheck = () => {
    setError(null)
    setResult(null)

    const num = parseFloat(input)
    if (isNaN(num) || !Number.isInteger(num) || num < 0) {
      setError("Please enter a positive integer.")
      return
    }

    const prime = isPrime(num)
    setResult(
      prime
        ? `${num} is a prime number!`
        : `${num} is not a prime number. It is divisible by ${findSmallestDivisor(num)}.`
    )
    setHistory((prev) => [...prev, { input: num, isPrime: prime }])
  }

  const findSmallestDivisor = (num: number): number => {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return i
    }
    return num
  }

  const handleClear = () => {
    setInput("")
    setResult(null)
    setError(null)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleCheck()
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [input])

  return (
    <div className="container mx-auto space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center flex items-center justify-center">
            Prime Number Checker
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={() => setShowInfo(!showInfo)}
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Prime number information</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click for more information about prime numbers</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              type="number"
              placeholder="Enter a positive integer"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleCheck} className="w-full md:w-auto" disabled={!input}>
              <Check className="mr-2 h-4 w-4" /> Check
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
                className="text-green-500 font-semibold text-lg"
              >
                {result}
              </motion.div>
            )}
          </AnimatePresence>
          <Button onClick={handleClear} variant="outline" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Clear
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>About Prime Numbers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A prime number is a natural number greater than 1 that is only divisible by 1 and itself. Prime numbers
                  play a crucial role in various fields, including cryptography and computer science.
                </p>
                <h3 className="font-semibold mt-4 mb-2">Examples of prime numbers:</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>2 - The smallest and only even prime number</li>
                  <li>3, 5, 7 - The first odd prime numbers</li>
                  <li>11, 13, 17, 19 - Some larger prime numbers</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Check History</CardTitle>
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
                  className={`p-2 rounded-md ${
                    item.isPrime ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                  }`}
                >
                  {item.input} is {item.isPrime ? "prime" : "not prime"}
                </motion.li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}