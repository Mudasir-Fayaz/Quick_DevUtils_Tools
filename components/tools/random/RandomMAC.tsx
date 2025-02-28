"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

function generateMACAddress(isUnicast: boolean, format: string): string {
  const mac = new Array(6).fill(0).map(() =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0"),
  )

  // Set the locally administered bit (second least-significant bit of the first octet)
  mac[0] = (Number.parseInt(mac[0], 16) | 0x02).toString(16).padStart(2, "0")

  if (isUnicast) {
    // Clear the least significant bit of the first octet for unicast
    mac[0] = (Number.parseInt(mac[0], 16) & 0xfe).toString(16).padStart(2, "0")
  } else {
    // Set the least significant bit of the first octet for multicast
    mac[0] = (Number.parseInt(mac[0], 16) | 0x01).toString(16).padStart(2, "0")
  }

  switch (format) {
    case "colon":
      return mac.join(":")
    case "hyphen":
      return mac.join("-")
    case "dot":
      return mac.join(".")
    default:
      return mac.join("")
  }
}

export default function RandomMAC() {
  const [isUnicast, setIsUnicast] = useState(true)
  const [format, setFormat] = useState("colon")
  const [count, setCount] = useState(1)
  const [results, setResults] = useState<string[]>([])

  const generateMACs = () => {
    const newResults = []
    for (let i = 0; i < count; i++) {
      newResults.push(generateMACAddress(isUnicast, format))
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
        <div className="flex items-center space-x-2">
          <Switch id="isUnicast" checked={isUnicast} onCheckedChange={setIsUnicast} />
          <Label htmlFor="isUnicast">Generate unicast addresses</Label>
        </div>
        <div>
          <Label htmlFor="format">MAC Address Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger id="format">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="colon">Colon-separated (aa:bb:cc:dd:ee:ff)</SelectItem>
              <SelectItem value="hyphen">Hyphen-separated (aa-bb-cc-dd-ee-ff)</SelectItem>
              <SelectItem value="dot">Dot-separated (aabb.ccdd.eeff)</SelectItem>
              <SelectItem value="plain">Plain (aabbccddeeff)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="count">Number of MAC addresses to generate</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          />
        </div>
        <Button onClick={generateMACs}>Generate MAC Addresses</Button>
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
                    navigator.clipboard.writeText(result)
                    toast({
                      title: "Copied to clipboard",
                      description: "The generated MAC address has been copied to your clipboard.",
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

