'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock,  Calendar,  } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TimeDifference() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startTimezone, setStartTimezone] = useState('UTC')
  const [endTimezone, setEndTimezone] = useState('UTC')
  const [difference, setDifference] = useState<{ years: number; months: number; days: number; hours: number; minutes: number } | null>(null)

  const timezones = Intl.supportedValuesOf('timeZone')
  const calculateDifference = () => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    // Adjust for timezones
    const startOffset = new Date(start.toLocaleString('en-US', { timeZone: startTimezone })).getTimezoneOffset()
    const endOffset = new Date(end.toLocaleString('en-US', { timeZone: endTimezone })).getTimezoneOffset()
    
    const adjustedStart = new Date(start.getTime() - startOffset * 60 * 1000)
    const adjustedEnd = new Date(end.getTime() - endOffset * 60 * 1000)

    let years = adjustedEnd.getFullYear() - adjustedStart.getFullYear()
    let months = adjustedEnd.getMonth() - adjustedStart.getMonth()
    let days = adjustedEnd.getDate() - adjustedStart.getDate()
    let hours = adjustedEnd.getHours() - adjustedStart.getHours()
    let minutes = adjustedEnd.getMinutes() - adjustedStart.getMinutes()

    if (minutes < 0) {
      hours--
      minutes += 60
    }
    if (hours < 0) {
      days--
      hours += 24
    }
    if (days < 0) {
      months--
      const daysInMonth = new Date(adjustedStart.getFullYear(), adjustedStart.getMonth() + 1, 0).getDate()
      days += daysInMonth
    }
    if (months < 0) {
      years--
      months += 12
    }

    setDifference({ years, months, days, hours, minutes })
  }
  useEffect(() => {
    if (startDate && endDate) {
      calculateDifference()
    }
  }, [startDate, endDate, startTimezone, endTimezone, calculateDifference])

 

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center"></CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date & Time</Label>
            <Input
              id="start-date"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Select value={startTimezone} onValueChange={setStartTimezone}>
              <SelectTrigger id="start-timezone">
                <SelectValue placeholder="Start Timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((zone) => (
                  <SelectItem key={`start-${zone}`} value={zone}>{zone}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date & Time</Label>
            <Input
              id="end-date"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Select value={endTimezone} onValueChange={setEndTimezone}>
              <SelectTrigger id="end-timezone">
                <SelectValue placeholder="End Timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((zone) => (
                  <SelectItem key={`end-${zone}`} value={zone}>{zone}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {difference && (
            <motion.div
              key={JSON.stringify(difference)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-secondary rounded-md"
            >
              <h3 className="text-lg font-semibold mb-2">Time Difference:</h3>
              <ul className="space-y-1">
                <li>{difference.years} years</li>
                <li>{difference.months} months</li>
                <li>{difference.days} days</li>
                <li>{difference.hours} hours</li>
                <li>{difference.minutes} minutes</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => {
              const now = new Date()
              setStartDate(now.toISOString().slice(0, 16))
              setEndDate(now.toISOString().slice(0, 16))
            }}
          >
            <Clock className="w-4 h-4 mr-2" />
            Use Current Time
          </Button>
          <Button
            onClick={() => {
              setStartDate('')
              setEndDate('')
              setDifference(null)
            }}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}