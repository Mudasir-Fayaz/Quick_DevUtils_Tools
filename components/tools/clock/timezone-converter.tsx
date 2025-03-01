'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function TimezoneConverter() {
  const [sourceTime, setSourceTime] = useState(new Date())
  const [sourceZone, setSourceZone] = useState('UTC')
  const [targetZone, setTargetZone] = useState('America/New_York')
  const [convertedTime, setConvertedTime] = useState(new Date())
  const [timeZones, setTimeZones] = useState<string[]>([])
  const [filteredTimeZones, setFilteredTimeZones] = useState<string[]>([])

  // Fetch time zones on component mount
  useEffect(() => {
    const fetchTimeZones = () => {
      const zones: string[] = typeof Intl.supportedValuesOf === 'function'
        ? Intl.supportedValuesOf('timeZone')
        : [];
    if(timeZones)
      setTimeZones(zones);
      setFilteredTimeZones(zones);
    };
    
    fetchTimeZones();
  }, [timeZones])

  // Convert time when source time or zones change
  useEffect(() => {
    const convertTime = () => {
      const sourceDate = new Date(sourceTime)
      const targetDate = new Date(sourceDate.toLocaleString('en-US', { timeZone: targetZone }))
      const offset = targetDate.getTime() - sourceDate.getTime()
      setConvertedTime(new Date(sourceDate.getTime() + offset))
    }
    convertTime()
  }, [sourceTime, sourceZone, targetZone])

  // Format time for display
  const formatTime = useCallback((date: Date, zone: string) => {
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: zone,
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }, [])

  // Filter time zones based on search term
  
  // Calculate time difference
  const timeDifference = convertedTime.getTime() - sourceTime.getTime()
  const hoursDiff = Math.floor(Math.abs(timeDifference) / (1000 * 60 * 60))
  const minutesDiff = Math.floor((Math.abs(timeDifference) % (1000 * 60 * 60)) / (1000 * 60))

  return (
    <div className="mx-auto">
      
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Source Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="datetime-local"
              value={sourceTime.toISOString().slice(0, 16)}
              onChange={(e) => setSourceTime(new Date(e.target.value))}
            />
            <Select value={sourceZone} onValueChange={setSourceZone}>
              <SelectTrigger>
                <SelectValue placeholder="Select source time zone" />
              </SelectTrigger>
              <SelectContent>
                {filteredTimeZones.map((zone) => (
                  <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Target Time Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={targetZone} onValueChange={setTargetZone}>
              <SelectTrigger>
                <SelectValue placeholder="Select target time zone" />
              </SelectTrigger>
              <SelectContent>
                {filteredTimeZones.map((zone) => (
                  <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Converted Time</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={convertedTime.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-primary mb-2">
                {formatTime(convertedTime, targetZone)}
              </p>
              <p className="text-sm text-muted-foreground">
                Time Difference: {timeDifference >= 0 ? '+' : '-'}{hoursDiff}h {minutesDiff}m
              </p>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Times in Major Cities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'].map((zone) => (
              <Card key={zone} className="bg-secondary">
                <CardContent className="p-4">
                  <h4 className="font-medium text-secondary-foreground mb-2">{zone.split('/').pop()}</h4>
                  <p className="text-lg font-semibold text-primary">
                    {new Date().toLocaleString('en-US', { timeZone: zone, hour: 'numeric', minute: 'numeric', hour12: true })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Time Zone Conversion Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Select your source time zone from the dropdown menu.</li>
            <li>Enter the date and time you want to convert in the source time input.</li>
            <li>Choose the target time zone you want to convert to.</li>
            <li>The converted time will be displayed automatically.</li>
            <li>Use the search feature to quickly find specific time zones.</li>
          </ol>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="mt-4">
                  <Info className="mr-2 h-4 w-4" /> Time Zone Tips
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remember that Daylight Saving Time can affect conversions.</p>
                <p>Some countries have multiple time zones.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  )
}