"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

function formatTime(hours: number, minutes: number, seconds: number | null, is24Hour: boolean): string {
  let formattedHours = hours
  let period = ""
  if (!is24Hour) {
    period = hours >= 12 ? " PM" : " AM"
    formattedHours = hours % 12 || 12
  }
  const formattedMinutes = minutes.toString().padStart(2, "0")
  const formattedSeconds = seconds !== null ? `:${seconds.toString().padStart(2, "0")}` : ""
  return `${formattedHours}:${formattedMinutes}${formattedSeconds}${period}`
}

export default function RandomTime() {
  const [startTime, setStartTime] = useState("00:00")
  const [endTime, setEndTime] = useState("23:59")
  const [is24Hour, setIs24Hour] = useState(true)
  const [includeSeconds, setIncludeSeconds] = useState(false)
  const [count, setCount] = useState(1)
  const [results, setResults] = useState<string[]>([])

  const generateTimes = () => {
    const [startHours, startMinutes] = startTime.split(":").map(Number)
    const [endHours, endMinutes] = endTime.split(":").map(Number)
    const startMinutesTotal = startHours * 60 + startMinutes
    const endMinutesTotal = endHours * 60 + endMinutes

    const newResults = []
    for (let i = 0; i < count; i++) {
      const randomMinutes = Math.floor(Math.random() * (endMinutesTotal - startMinutesTotal + 1)) + startMinutesTotal
      const hours = Math.floor(randomMinutes / 60)
      const minutes = randomMinutes % 60
      const seconds = includeSeconds ? Math.floor(Math.random() * 60) : null
      newResults.push(formatTime(hours, minutes, seconds, is24Hour))
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
          <Label htmlFor="startTime">Start Time</Label>
          <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="is24Hour" checked={is24Hour} onCheckedChange={setIs24Hour} />
          <Label htmlFor="is24Hour">24-hour format</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="includeSeconds" checked={includeSeconds} onCheckedChange={setIncludeSeconds} />
          <Label htmlFor="includeSeconds">Include seconds</Label>
        </div>
        <div>
          <Label htmlFor="count">Number of times to generate</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          />
        </div>
        <Button onClick={generateTimes}>Generate Times</Button>
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
                      description: "The generated time has been copied to your clipboard.",
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

