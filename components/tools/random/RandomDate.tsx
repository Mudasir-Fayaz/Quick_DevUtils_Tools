"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { format, isWeekend } from "date-fns"

export default function RandomDate() {
  const [startDate, setStartDate] = useState("2000-01-01")
  const [endDate, setEndDate] = useState("2023-12-31")
  const [dateFormat, setDateFormat] = useState("yyyy-MM-dd")
  const [excludeWeekends, setExcludeWeekends] = useState(false)
  const [count, setCount] = useState(1)
  const [results, setResults] = useState<string[]>([])

  const generateDates = () => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const newResults = []
    for (let i = 0; i < count; i++) {
      let date
      do {
        date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
      } while (excludeWeekends && isWeekend(date))
      newResults.push(format(date, dateFormat))
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
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="dateFormat">Date Format</Label>
          <Select value={dateFormat} onValueChange={setDateFormat}>
            <SelectTrigger id="dateFormat">
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
              <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
              <SelectItem value="dd.MM.yyyy">DD.MM.YYYY</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="excludeWeekends" checked={excludeWeekends} onCheckedChange={setExcludeWeekends} />
          <Label htmlFor="excludeWeekends">Exclude weekends</Label>
        </div>
        <div>
          <Label htmlFor="count">Number of dates to generate</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          />
        </div>
        <Button onClick={generateDates}>Generate Dates</Button>
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
                      description: "The generated date has been copied to your clipboard.",
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

