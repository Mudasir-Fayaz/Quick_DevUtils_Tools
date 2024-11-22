"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, RefreshCw, ArrowRightLeft } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

type UnitCategory = {
  name: string
  units: { [key: string]: number }
}

const unitCategories: UnitCategory[] = [
  {
    name: "Length",
    units: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.34,
    },
  },
  {
    name: "Weight",
    units: {
      gram: 1,
      kilogram: 1000,
      milligram: 0.001,
      pound: 453.592,
      ounce: 28.3495,
    },
  },
  {
    name: "Volume",
    units: {
      liter: 1,
      milliliter: 0.001,
      gallon: 3.78541,
      quart: 0.946353,
      pint: 0.473176,
      cup: 0.236588,
    },
  },
]

export default function UnitConverter() {
  const [category, setCategory] = useState(unitCategories[0])
  const [fromUnit, setFromUnit] = useState(Object.keys(category.units)[0])
  const [toUnit, setToUnit] = useState(Object.keys(category.units)[1])
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<{ from: string; to: string; category: string }>>([])

  const convert = (value: string, from: string, to: string) => {
    const fromFactor = category.units[from]
    const toFactor = category.units[to]
    const result = (parseFloat(value) * fromFactor) / toFactor
    return isNaN(result) ? "" : result.toFixed(6)
  }

  useEffect(() => {
    if (fromValue) {
      const result = convert(fromValue, fromUnit, toUnit)
      setToValue(result)
      if (result) {
        setHistory(prev => [{ from: `${fromValue} ${fromUnit}`, to: `${result} ${toUnit}`, category: category.name }, ...prev.slice(0, 9)])
      }
    } else {
      setToValue("")
    }
    setError(null)
  }, [category, fromUnit, toUnit, fromValue])

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  const handleClear = () => {
    setFromValue("")
    setToValue("")
    setError(null)
  }

  return (
    <div className="container mx-auto space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">Unit Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue={category.name} onValueChange={(value) => setCategory(unitCategories.find(c => c.name === value) || category)}>
            <TabsList className="grid w-full grid-cols-3">
              {unitCategories.map((cat) => (
                <TabsTrigger key={cat.name} value={cat.name}>{cat.name}</TabsTrigger>
              ))}
            </TabsList>
            {unitCategories.map((cat) => (
              <TabsContent key={cat.name} value={cat.name}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                      <SelectTrigger>
                        <SelectValue placeholder="From" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(cat.units).map((unit) => (
                          <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Enter value"
                      value={fromValue}
                      onChange={(e) => setFromValue(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Select value={toUnit} onValueChange={setToUnit}>
                      <SelectTrigger>
                        <SelectValue placeholder="To" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(cat.units).map((unit) => (
                          <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Result"
                      value={toValue}
                      readOnly
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="flex justify-between">
            <Button onClick={handleSwap} variant="outline">
              <ArrowRightLeft className="mr-2 h-4 w-4" /> Swap
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Clear
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
          </AnimatePresence>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Conversion History</CardTitle>
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
                  <p className="font-semibold">{item.category}</p>
                  <p>{item.from} = {item.to}</p>
                </motion.li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}