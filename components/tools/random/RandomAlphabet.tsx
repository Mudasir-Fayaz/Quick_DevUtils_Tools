"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"

export default function RandomAlphabet() {
  const [count, setCount] = useState(1)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [excludeVowels, setExcludeVowels] = useState(false)
  const [customExclude, setCustomExclude] = useState("")
  const [result, setResult] = useState("")

  const generateLetters = () => {
    let chars = ""
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz"
    if (excludeVowels) chars = chars.replace(/[aeiouAEIOU]/g, "")
    if (customExclude) {
      const excludeRegex = new RegExp(`[${customExclude}]`, "gi")
      chars = chars.replace(excludeRegex, "")
    }

    let result = ""
    for (let i = 0; i < count; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setResult(result)
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
          <Label>Number of letters: {count}</Label>
          <Slider
            min={1}
            max={50}
            step={1}
            value={[count]}
            onValueChange={(value) => setCount(value[0])}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="uppercase" checked={uppercase} onCheckedChange={setUppercase} />
          <Label htmlFor="uppercase">Include uppercase</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="lowercase" checked={lowercase} onCheckedChange={setLowercase} />
          <Label htmlFor="lowercase">Include lowercase</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="excludeVowels" checked={excludeVowels} onCheckedChange={setExcludeVowels} />
          <Label htmlFor="excludeVowels">Exclude vowels</Label>
        </div>
        <div>
          <Label htmlFor="customExclude">Custom exclude characters</Label>
          <Input
            id="customExclude"
            value={customExclude}
            onChange={(e) => setCustomExclude(e.target.value)}
            placeholder="e.g. xyz"
          />
        </div>
        <Button onClick={generateLetters}>Generate</Button>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 bg-secondary rounded-md"
          >
            <p className="text-2xl font-mono">{result}</p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => {
                navigator.clipboard.writeText(result)
                toast({
                  title: "Copied to clipboard",
                  description: "The generated letters have been copied to your clipboard.",
                })
              }}
            >
              Copy to Clipboard
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

