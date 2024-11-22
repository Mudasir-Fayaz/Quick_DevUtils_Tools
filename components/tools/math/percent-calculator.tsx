'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Percent, RotateCcw, History } from 'lucide-react'

type CalculationType = 'basic' | 'change' | 'reverse'

interface Calculation {
  type: CalculationType
  inputs: { [key: string]: string }
  result: string
}

export default function PercentCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>('basic')
  const [inputs, setInputs] = useState<{ [key: string]: string }>({})
  const [result, setResult] = useState<string>('')
  const [history, setHistory] = useState<Calculation[]>([])

  const calculatePercentage = () => {
    let calculatedResult = ''
    switch (calculationType) {
      case 'basic':
        const value = parseFloat(inputs.value || '0')
        const percentage = parseFloat(inputs.percentage || '0')
        calculatedResult = ((value * percentage) / 100).toFixed(2)
        break
      case 'change':
        const oldValue = parseFloat(inputs.oldValue || '0')
        const newValue = parseFloat(inputs.newValue || '0')
        const percentageChange = ((newValue - oldValue) / oldValue * 100).toFixed(2)
        calculatedResult = `${percentageChange}%`
        break
      case 'reverse':
        const finalValue = parseFloat(inputs.finalValue || '0')
        const appliedPercentage = parseFloat(inputs.appliedPercentage || '0')
        const originalValue = (finalValue / (1 + appliedPercentage / 100)).toFixed(2)
        calculatedResult = originalValue
        break
    }
    setResult(calculatedResult)
    setHistory(prev => [...prev, { type: calculationType, inputs: { ...inputs }, result: calculatedResult }])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const clearInputs = () => {
    setInputs({})
    setResult('')
  }

  useEffect(() => {
    clearInputs()
  }, [calculationType])

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" rounded-lg shadow-xl p-6 w-full"
      >
        <Tabs value={calculationType} onValueChange={(value) => setCalculationType(value as CalculationType)}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="change">% Change</TabsTrigger>
            <TabsTrigger value="reverse">Reverse %</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Percentage</CardTitle>
                <CardDescription>Calculate a percentage of a number</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input
                    id="value"
                    name="value"
                    type="number"
                    placeholder="Enter value"
                    value={inputs.value || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="percentage">Percentage</Label>
                  <Input
                    id="percentage"
                    name="percentage"
                    type="number"
                    placeholder="Enter percentage"
                    value={inputs.percentage || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="change">
            <Card>
              <CardHeader>
                <CardTitle>Percentage Change</CardTitle>
                <CardDescription>Calculate the percentage change between two values</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="oldValue">Old Value</Label>
                  <Input
                    id="oldValue"
                    name="oldValue"
                    type="number"
                    placeholder="Enter old value"
                    value={inputs.oldValue || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newValue">New Value</Label>
                  <Input
                    id="newValue"
                    name="newValue"
                    type="number"
                    placeholder="Enter new value"
                    value={inputs.newValue || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reverse">
            <Card>
              <CardHeader>
                <CardTitle>Reverse Percentage</CardTitle>
                <CardDescription>Calculate the original value before a percentage was applied</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="finalValue">Final Value</Label>
                  <Input
                    id="finalValue"
                    name="finalValue"
                    type="number"
                    placeholder="Enter final value"
                    value={inputs.finalValue || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appliedPercentage">Applied Percentage</Label>
                  <Input
                    id="appliedPercentage"
                    name="appliedPercentage"
                    type="number"
                    placeholder="Enter applied percentage"
                    value={inputs.appliedPercentage || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-4">
          <Button onClick={calculatePercentage} className="w-full">
            <Percent className="w-4 h-4 mr-2" />
            Calculate
          </Button>
          <Button onClick={clearInputs} variant="outline" className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{result}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  Calculation History
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {history.map((calc, index) => (
                  <div key={index} className="mb-2 p-2 rounded">
                    <p className="font-semibold">{calc.type.charAt(0).toUpperCase() + calc.type.slice(1)} Calculation</p>
                    {Object.entries(calc.inputs).map(([key, value]) => (
                      <p key={key}>{key}: {value}</p>
                    ))}
                    <p className="mt-1">
                      <ArrowRight className="w-4 h-4 inline mr-1" />
                      Result: {calc.result}
                    </p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}