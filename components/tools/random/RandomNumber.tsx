"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export default function RandomNumber() {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)
  const [includeDecimals, setIncludeDecimals] = useState(false)
  const [format, setFormat] = useState("integer")
  const [count, setCount] = useState(1)
  const [numbers, setNumbers] = useState<number[]>([])

  const generateNumbers = () => {
    const newNumbers = []
    for (let i = 0; i < count; i++) {
      let num
      if (includeDecimals) {
        num = Math.random() * (max - min) + min
        if (format === "integer") {
          num = Math.floor(num)
        } else if (format === "fixed2") {
          num = Number.parseFloat(num.toFixed(2))
        }
      } else {
        num = Math.floor(Math.random() * (max - min + 1)) + min
      }
      newNumbers.push(num)
    }
    setNumbers(newNumbers)
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
          <Switch id="includeDecimals" checked={includeDecimals} onCheckedChange={setIncludeDecimals} />
          <Label htmlFor="includeDecimals">Include decimals</Label>
        </div>
        <div>
          <Label htmlFor="format">Number format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger id="format">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="integer">Integer</SelectItem>
              <SelectItem value="float">Float</SelectItem>
              <SelectItem value="fixed2">Fixed (2 decimals)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="count">Number of results to generate</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={10}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          />
        </div>
        <Button onClick={generateNumbers}>Generate Numbers</Button>
        {numbers.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            {numbers.map((num, index) => (
              <div key={index} className="p-4 bg-secondary rounded-md flex justify-between items-center">
                <p className="text-lg font-mono">{num}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(num.toString())
                    toast({
                      title: "Copied to clipboard",
                      description: "The generated number has been copied to your clipboard.",
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

