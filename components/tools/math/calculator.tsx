'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const buttons = [
  { label: 'C', type: 'clear' },
  { label: '±', type: 'negate' },
  { label: '%', type: 'percent' },
  { label: '÷', type: 'operator' },
  { label: '7', type: 'number' },
  { label: '8', type: 'number' },
  { label: '9', type: 'number' },
  { label: '×', type: 'operator' },
  { label: '4', type: 'number' },
  { label: '5', type: 'number' },
  { label: '6', type: 'number' },
  { label: '-', type: 'operator' },
  { label: '1', type: 'number' },
  { label: '2', type: 'number' },
  { label: '3', type: 'number' },
  { label: '+', type: 'operator' },
  { label: '0', type: 'number' },
  { label: '.', type: 'decimal' },
  { label: '=', type: 'equals' },
]

const scientificButtons = [
  { label: 'sin', type: 'scientific' },
  { label: 'cos', type: 'scientific' },
  { label: 'tan', type: 'scientific' },
  { label: 'log', type: 'scientific' },
  { label: 'ln', type: 'scientific' },
  { label: 'x^2', type: 'scientific' },
  { label: 'x^3', type: 'scientific' },
  { label: '√', type: 'scientific' },
  { label: 'π', type: 'constant' },
  { label: 'e', type: 'constant' },
]

export default function MathCalculator() {
  const [display, setDisplay] = useState('0')
  const [currentValue, setCurrentValue] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState<string[]>([])

  const clearAll = () => {
    setDisplay('0')
    setCurrentValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
      setWaitingForOperand(false)
    }
  }

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display)

    if (currentValue === null) {
      setCurrentValue(inputValue)
    } else if (operator) {
      const currentValueNum = currentValue || 0
      const newValue = performCalculation(operator, currentValueNum, inputValue)
      setCurrentValue(newValue)
      setDisplay(String(newValue))
      setHistory(prev => [...prev, `${currentValueNum} ${operator} ${inputValue} = ${newValue}`])
    }

    setWaitingForOperand(true)
    setOperator(nextOperator)
  }

  const performCalculation = (op: string, a: number, b: number): number => {
    switch (op) {
      case '+': return a + b
      case '-': return a - b
      case '×': return a * b
      case '÷': return a / b
      default: return b
    }
  }

  const handleScientific = (func: string) => {
    const inputValue = parseFloat(display)
    let result: number

    switch (func) {
      case 'sin':
        result = Math.sin(inputValue)
        break
      case 'cos':
        result = Math.cos(inputValue)
        break
      case 'tan':
        result = Math.tan(inputValue)
        break
      case 'log':
        result = Math.log10(inputValue)
        break
      case 'ln':
        result = Math.log(inputValue)
        break
      case 'x^2':
        result = Math.pow(inputValue, 2)
        break
      case 'x^3':
        result = Math.pow(inputValue, 3)
        break
      case '√':
        result = Math.sqrt(inputValue)
        break
      default:
        return
    }

    setDisplay(String(result))
    setCurrentValue(result)
    setWaitingForOperand(true)
    setHistory(prev => [...prev, `${func}(${inputValue}) = ${result}`])
  }

  const handleConstant = (constant: string) => {
    let value: number
    switch (constant) {
      case 'π':
        value = Math.PI
        break
      case 'e':
        value = Math.E
        break
      default:
        return
    }
    setDisplay(String(value))
    setCurrentValue(value)
    setWaitingForOperand(true)
  }

  const handleButtonPress = (label: string, type: string) => {
    switch (type) {
      case 'number':
        inputDigit(label)
        break
      case 'operator':
        performOperation(label)
        break
      case 'decimal':
        inputDecimal()
        break
      case 'equals':
        if (operator && currentValue !== null) {
          performOperation('=')
        }
        break
      case 'clear':
        clearAll()
        break
      case 'negate':
        setDisplay(String(-parseFloat(display)))
        break
      case 'percent':
        setDisplay(String(parseFloat(display) / 100))
        break
      case 'scientific':
        handleScientific(label)
        break
      case 'constant':
        handleConstant(label)
        break
    }
  }

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-6"
      >
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="calculator" className="space-y-4">
            <div className="text-right text-4xl font-bold p-4 bg-gray-100 rounded-lg mb-4 overflow-x-auto text-black">
              {display}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {buttons.map((button, index) => (
                <motion.div key={index} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => handleButtonPress(button.label, button.type)}
                    className={`w-full h-16 text-xl ${
                      button.type === 'operator' || button.type === 'equals'
                        ? 'bg-blue-500 hover:bg-blue-600 text-black'
                        : button.type === 'clear'
                        ? 'bg-red-500 hover:bg-red-600 text-black'
                        : 'bg-gray-200 hover:bg-gray-300 text-black'
                    }`}
                  >
                    {button.label}
                  </Button>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {scientificButtons.map((button, index) => (
                <motion.div key={index} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => handleButtonPress(button.label, button.type)}
                    className="w-full h-12 text-sm bg-purple-500 hover:bg-purple-600 text-black"
                  >
                    {button.label}
                  </Button>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="history">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              {history.map((item, index) => (
                <div key={index} className="mb-2 text-black">
                  {item}
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}