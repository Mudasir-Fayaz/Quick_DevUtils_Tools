"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import RandExp from "randexp"

export default function RandomRegex() {
  const [regex, setRegex] = useState("")
  const [count, setCount] = useState(1)
  const [results, setResults] = useState<string[]>([])

  const generateData = () => {
    try {
      const randexp = new RandExp(regex)
      const newResults = []
      for (let i = 0; i < count; i++) {
        newResults.push(randexp.gen())
      }
      setResults(newResults)
    } catch (error) {
      if(error){
      toast({
        title: "Invalid Regex",
        description: "Please enter a valid regular expression.",
        variant: "destructive",
      })}
    }
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
          <Label htmlFor="regex">Regular Expression</Label>
          <Input
            id="regex"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="Enter your regex pattern"
          />
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
        <Button onClick={generateData}>Generate Data</Button>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <Textarea value={results.join("\n")} readOnly className="h-40" />
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(results.join("\n"))
                toast({
                  title: "Copied to clipboard",
                  description: "The generated data has been copied to your clipboard.",
                })
              }}
            >
              Copy All
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

