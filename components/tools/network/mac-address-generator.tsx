"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function MacAddressGenerator() {
  const [quantity, setQuantity] = useState(1)
  const [prefix, setPrefix] = useState("64:16:7F")
  const [isUppercase, setIsUppercase] = useState(true)
  const [separator, setSeparator] = useState(":")
  const [generatedAddresses, setGeneratedAddresses] = useState<string[]>([])

  const generateMacAddress = () => {
    const addresses = []
    for (let i = 0; i < quantity; i++) {
      let address = prefix
      for (let j = 0; j < 6 - prefix.split(separator).length; j++) {
        address += separator + Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
      }
      addresses.push(isUppercase ? address.toUpperCase() : address.toLowerCase())
    }
    setGeneratedAddresses(addresses)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedAddresses.join("\n"))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center"></CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity:</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prefix">MAC address prefix:</Label>
            <Input
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Case:</Label>
          <RadioGroup
            defaultValue={isUppercase ? "uppercase" : "lowercase"}
            onValueChange={(value) => setIsUppercase(value === "uppercase")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="uppercase" id="uppercase" />
              <Label htmlFor="uppercase">Uppercase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lowercase" id="lowercase" />
              <Label htmlFor="lowercase">Lowercase</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="separator">Separator:</Label>
          <Select onValueChange={setSeparator} defaultValue={separator}>
            <SelectTrigger id="separator">
              <SelectValue placeholder="Select separator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=":">:</SelectItem>
              <SelectItem value="-">-</SelectItem>
              <SelectItem value=".">.</SelectItem>
              <SelectItem value=" ">None</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2">
          <Button onClick={generateMacAddress} className="flex-1">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate
          </Button>
          <Button onClick={copyToClipboard} variant="outline" className="flex-1">
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>

        <div className="mt-4">
          <Label>Generated MAC Addresses:</Label>
          <motion.div
            className="bg-secondary p-4 rounded-md mt-2 max-h-60 overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {generatedAddresses.map((address, index) => (
              <motion.div
                key={index}
                className="font-mono"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {address}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

