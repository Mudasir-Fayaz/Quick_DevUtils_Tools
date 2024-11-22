"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Calculator, RefreshCw, Info, Plus, Minus } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function GcdLcmCalculator() {
  const [inputs, setInputs] = useState<string[]>(["", ""])
  const [results, setResults] = useState<{ gcd: number | null; lcm: number | null }>({ gcd: null, lcm: null })
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<{ inputs: number[]; gcd: number; lcm: number }>>([])
  const [showInfo, setShowInfo] = useState(false)

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b)
  }

  const calculateGcdLcm = () => {
    setError(null)
    setResults({ gcd: null, lcm: null })

    const numbers = inputs.map(input => {
      const num = parseInt(input)
      if (isNaN(num) || num <= 0) {
        throw new Error("Please enter positive integers only.")
      }
      return num
    })

    if (numbers.length < 2) {
      throw new Error("Please enter at least two numbers.")
    }

    let currentGcd = numbers[0]
    let currentLcm = numbers[0]

    for (let i = 1; i < numbers.length; i++) {
      currentGcd = gcd(currentGcd, numbers[i])
      currentLcm = lcm(currentLcm, numbers[i])
    }

    setResults({ gcd: currentGcd, lcm: currentLcm })
    setHistory(prev => [...prev, { inputs: numbers, gcd: currentGcd, lcm: currentLcm }])
  }

  const handleCalculate = () => {
    try {
      calculateGcdLcm()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const handleClear = () => {
    setInputs(["", ""])
    setResults({ gcd: null, lcm: null })
    setError(null)
  }

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs]
    newInputs[index] = value
    setInputs(newInputs)
  }

  const addInput = () => {
    setInputs([...inputs, ""])
  }

  const removeInput = (index: number) => {
    if (inputs.length > 2) {
      const newInputs = inputs.filter((_, i) => i !== index)
      setInputs(newInputs)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleCalculate()
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [inputs])

  return (
    <div className="container mx-auto space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className=" font-bold text-center flex items-center justify-center">
            GCD and LCM Calculator
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
                    <span className="sr-only">GCD and LCM information</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click for more information about GCD and LCM</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {inputs.map((input, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-2">
              <Input
                type="number"
                placeholder={`Enter number ${index + 1}`}
                value={input}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="flex-grow"
              />
              {index >= 2 && (
                <Button onClick={() => removeInput(index)} variant="outline" size="icon">
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <div className="flex justify-between">
            <Button onClick={addInput} variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Add Number
            </Button>
            <Button onClick={handleCalculate} className="w-full md:w-auto" disabled={inputs.some(input => !input)}>
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
            {results.gcd !== null && results.lcm !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-green-500 font-semibold text-lg"
              >
                <p>GCD: {results.gcd}</p>
                <p>LCM: {results.lcm}</p>
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
                <CardTitle>About GCD and LCM</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="gcd">
                    <AccordionTrigger>Greatest Common Divisor (GCD)</AccordionTrigger>
                    <AccordionContent>
                      The GCD of two or more integers is the largest positive integer that divides each of the integers. For example, the GCD of 8 and 12 is 4.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="lcm">
                    <AccordionTrigger>Least Common Multiple (LCM)</AccordionTrigger>
                    <AccordionContent>
                      The LCM of two or more integers is the smallest positive integer that is divisible by each of the integers. For example, the LCM of 4 and 6 is 12.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="relationship">
                    <AccordionTrigger>Relationship between GCD and LCM</AccordionTrigger>
                    <AccordionContent>
                      For two positive integers a and b, GCD(a,b) * LCM(a,b) = a * b. This relationship is used in the calculation of LCM.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

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
                  <p>Numbers: {item.inputs.join(", ")}</p>
                  <p>GCD: {item.gcd}</p>
                  <p>LCM: {item.lcm}</p>
                </motion.li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}