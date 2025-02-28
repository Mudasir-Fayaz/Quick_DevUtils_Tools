"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

function generateUUID(version: string, removeDashes: boolean): string {
  let uuid: string
  switch (version) {
    case "v1":
      uuid = "xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
      break
    case "v4":
    default:
      uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
      break
  }
  return removeDashes ? uuid.replace(/-/g, "") : uuid
}

export default function RandomUUID() {
  const [version, setVersion] = useState("v4")
  const [removeDashes, setRemoveDashes] = useState(false)
  const [count, setCount] = useState(1)
  const [results, setResults] = useState<string[]>([])

  const generateUUIDs = () => {
    const newResults = []
    for (let i = 0; i < count; i++) {
      newResults.push(generateUUID(version, removeDashes))
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
        <div>
          <Label htmlFor="version">UUID Version</Label>
          <Select value={version} onValueChange={setVersion}>
            <SelectTrigger id="version">
              <SelectValue placeholder="Select UUID version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v1">Version 1 (time-based)</SelectItem>
              <SelectItem value="v4">Version 4 (random)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="removeDashes" checked={removeDashes} onCheckedChange={setRemoveDashes} />
          <Label htmlFor="removeDashes">Remove dashes</Label>
        </div>
        <div>
          <Label htmlFor="count">Number of UUIDs to generate</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          />
        </div>
        <Button onClick={generateUUIDs}>Generate UUIDs</Button>
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
                      description: "The generated UUID has been copied to your clipboard.",
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

