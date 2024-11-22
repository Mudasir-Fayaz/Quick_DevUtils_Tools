'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {  Copy, RotateCcw, History, DicesIcon } from 'lucide-react'

interface GeneratedNumber {
  value: number
  timestamp: Date
}

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(1)
  const [uniqueOnly, setUniqueOnly] = useState(false)
  const [decimalPlaces, setDecimalPlaces] = useState(0)
  const [generatedNumbers, setGeneratedNumbers] = useState<GeneratedNumber[]>([])
  const [history, setHistory] = useState<GeneratedNumber[][]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateRandomNumbers = () => {
    setIsGenerating(true)
    const numbers: GeneratedNumber[] = []
    const set = new Set()

    while (numbers.length < count) {
      const randomNumber = Number((Math.random() * (max - min) + min).toFixed(decimalPlaces))
      if (!uniqueOnly || !set.has(randomNumber)) {
        numbers.push({ value: randomNumber, timestamp: new Date() })
        set.add(randomNumber)
      }
    }

    setGeneratedNumbers(numbers)
    setHistory(prev => [numbers, ...prev.slice(0, 9)])
    setIsGenerating(false)
  }

  const copyToClipboard = () => {
    const text = generatedNumbers.map(n => n.value).join(', ')
    navigator.clipboard.writeText(text)
  }

  const clearAll = () => {
    setGeneratedNumbers([])
    setHistory([])
  }

  useEffect(() => {
    if (uniqueOnly && count > max - min + 1) {
      setCount(max - min + 1)
    }
  }, [min, max, uniqueOnly, count])

  return (
    <div className="container mx-auto">
     
      
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure your random number generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="min">Minimum</Label>
                <Input
                  id="min"
                  type="number"
                  value={min}
                  onChange={(e) => setMin(Number(e.target.value))}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="max">Maximum</Label>
                <Input
                  id="max"
                  type="number"
                  value={max}
                  onChange={(e) => setMax(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="count">Number of values to generate</Label>
              <Slider
                id="count"
                min={1}
                max={uniqueOnly ? Math.min(100, max - min + 1) : 100}
                step={1}
                value={[count]}
                onValueChange={(value) => setCount(value[0])}
              />
              <div className="text-sm text-gray-500 text-right">{count}</div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="unique"
                checked={uniqueOnly}
                onCheckedChange={setUniqueOnly}
              />
              <Label htmlFor="unique">Generate unique numbers only</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="decimal">Decimal places</Label>
              <Slider
                id="decimal"
                min={0}
                max={10}
                step={1}
                value={[decimalPlaces]}
                onValueChange={(value) => setDecimalPlaces(value[0])}
              />
              <div className="text-sm text-gray-500 text-right">{decimalPlaces}</div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button onClick={generateRandomNumbers} className="w-full" disabled={isGenerating}>
            <DicesIcon className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Random Numbers'}
          </Button>

          <AnimatePresence>
            {generatedNumbers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Numbers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[100px]">
                      <div className="space-y-2">
                        {generatedNumbers.map((num, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span>{num.value}</span>
                            <span className="text-sm text-gray-500">
                              {num.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="mt-4 flex space-x-2">
                      <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy to Clipboard
                      </Button>
                      <Button onClick={clearAll} variant="outline" className="flex-1">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Clear All
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <History className="w-5 h-5 mr-2" />
                Generation History
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              {history.map((set, setIndex) => (
                <div key={setIndex} className="mb-4 p-2 bg-gray-100 rounded">
                  <p className="font-semibold mb-2">Set {setIndex + 1}</p>
                  {set.map((num, numIndex) => (
                    <div key={numIndex} className="flex justify-between items-center text-sm">
                      <span>{num.value}</span>
                      <span className="text-gray-500">{num.timestamp.toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      
    </div>
  )
}