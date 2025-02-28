"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"

export default function RandomPassword() {
  const [length, setLength] = useState(12)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [specialChars, setSpecialChars] = useState(true)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [count, setCount] = useState(1)
  const [passwords, setPasswords] = useState<string[]>([])

  const generatePasswords = () => {
    let chars = ""
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz"
    if (numbers) chars += "0123456789"
    if (specialChars) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"
    if (excludeAmbiguous) chars = chars.replace(/[O0l1I]/g, "")

    const newPasswords = []
    for (let i = 0; i < count; i++) {
      let password = ""
      for (let j = 0; j < length; j++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      newPasswords.push(password)
    }
    setPasswords(newPasswords)
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
          <Label>Password length: {length}</Label>
          <Slider
            min={8}
            max={32}
            step={1}
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
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
          <Switch id="numbers" checked={numbers} onCheckedChange={setNumbers} />
          <Label htmlFor="numbers">Include numbers</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="specialChars" checked={specialChars} onCheckedChange={setSpecialChars} />
          <Label htmlFor="specialChars">Include special characters</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="excludeAmbiguous" checked={excludeAmbiguous} onCheckedChange={setExcludeAmbiguous} />
          <Label htmlFor="excludeAmbiguous">Exclude ambiguous characters (O, 0, l, I)</Label>
        </div>
        <div>
          <Label htmlFor="count">Number of passwords to generate</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={10}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          />
        </div>
        <Button onClick={generatePasswords}>Generate Passwords</Button>
        {passwords.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            {passwords.map((password, index) => (
              <div key={index} className="p-4 bg-secondary rounded-md flex justify-between items-center">
                <p className="text-lg font-mono">{password}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(password)
                    toast({
                      title: "Copied to clipboard",
                      description: "The generated password has been copied to your clipboard.",
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

