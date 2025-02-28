"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"

export default function RandomString() {
  const [length, setLength] = useState(10)
  const [includeLetters, setIncludeLetters] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false)
  const [customChars, setCustomChars] = useState("")
  const [caseSensitive, setCaseSensitive] = useState(true)
  const [count, setCount] = useState(1)
  const [strings, setStrings] = useState<string[]>([])

  const generateStrings = () => {
    let chars = ""
    if (includeLetters) chars += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) chars += "0123456789"
    if (includeSpecialChars) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"
    if (customChars) chars += customChars
    if (caseSensitive && includeLetters) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const newStrings = []
    for (let i = 0; i < count; i++) {
      let str = ""
      for (let j = 0; j < length; j++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      newStrings.push(str)
    }
    setStrings(newStrings)
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
          <Label>String length: {length}</Label>
          <Slider
            min={1}
            max={50}
            step={1}
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="includeLetters" checked={includeLetters} onCheckedChange={setIncludeLetters} />
          <Label htmlFor="includeLetters">Include letters</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="includeNumbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
          <Label htmlFor="includeNumbers">Include numbers</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="includeSpecialChars" checked={includeSpecialChars} onCheckedChange={setIncludeSpecialChars} />
          <Label htmlFor="includeSpecialChars">Include special characters</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="caseSensitive" checked={caseSensitive} onCheckedChange={setCaseSensitive} />
          <Label htmlFor="caseSensitive">Case sensitive</Label>
        </div>
        <div>
          <Label htmlFor="customChars">Custom characters</Label>
          <Input
            id="customChars"
            value={customChars}
            onChange={(e) => setCustomChars(e.target.value)}
            placeholder="Add any custom characters here"
          />
        </div>
        <div>
          <Label htmlFor="count">Number of strings to generate</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={10}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          />
        </div>
        <Button onClick={generateStrings}>Generate Strings</Button>
        {strings.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            {strings.map((str, index) => (
              <div key={index} className="p-4 bg-secondary rounded-md flex justify-between items-center">
                <p className="text-lg font-mono">{str}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(str)
                    toast({
                      title: "Copied to clipboard",
                      description: "The generated string has been copied to your clipboard.",
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

