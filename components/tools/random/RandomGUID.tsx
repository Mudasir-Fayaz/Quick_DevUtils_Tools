"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

function generateGUID(uppercase: boolean, removeBraces: boolean): string {
  let guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })

  if (uppercase) {
    guid = guid.toUpperCase()
  }

  if (!removeBraces) {
    guid = `{${guid}}`
  }

  return guid
}

export default function RandomGUID() {
  const [uppercase, setUppercase] = useState(false)
  const [removeBraces, setRemoveBraces] = useState(false)
  const [count, setCount] = useState(1)
  const [results, setResults] = useState<string[]>([])

  const generateGUIDs = () => {
    const newResults = []
    for (let i = 0; i < count; i++) {
      newResults.push(generateGUID(uppercase, removeBraces))
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
          <Switch id="uppercase" checked={uppercase} onCheckedChange={setUppercase} />
          <Label htmlFor="uppercase">Uppercase GUID</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="removeBraces" checked={removeBraces} onCheckedChange={setRemoveBraces} />
          <Label htmlFor="removeBraces">Remove braces</Label>
        </div>
        <div>
          <Label htmlFor="count">Number of GUIDs to generate</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          />
        </div>
        <Button onClick={generateGUIDs}>Generate GUIDs</Button>
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
                      description: "The generated GUID has been copied to your clipboard.",
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

