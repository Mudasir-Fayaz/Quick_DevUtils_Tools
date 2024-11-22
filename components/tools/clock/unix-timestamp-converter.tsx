'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, RefreshCw, Calendar, Globe } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UnixTimestampConverter() {
  const [unixTimestamp, setUnixTimestamp] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [currentTimestamp, setCurrentTimestamp] = useState(0)
  const [selectedTimezone, setSelectedTimezone] = useState('UTC')
  const [convertedTime, setConvertedTime] = useState('')
  const [activeTab, setActiveTab] = useState('unix-to-date')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    convertUnixToDate()
  }, [unixTimestamp, selectedTimezone])

  useEffect(() => {
    convertDateToUnix()
  }, [dateTime, selectedTimezone])

  const convertUnixToDate = () => {
    if (unixTimestamp) {
      const date = new Date(parseInt(unixTimestamp) * 1000)
      try {
        const converted = date.toLocaleString('en-US', {
          timeZone: selectedTimezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
        setConvertedTime(converted)
      } catch (error) {
        console.log(error)
        setConvertedTime('Invalid timezone')
      }
    } else {
      setConvertedTime('')
    }
  }

  const convertDateToUnix = () => {
    if (dateTime) {
      const date = new Date(dateTime)
      const unix = Math.floor(date.getTime() / 1000)
      setUnixTimestamp(unix.toString())
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setUnixTimestamp('')
    setDateTime('')
    setConvertedTime('')
  }

  const timezones = Intl.supportedValuesOf('timeZone')

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center"></CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="unix-to-date">
              <Clock className="w-4 h-4 mr-2" />
              Unix to Date
            </TabsTrigger>
            <TabsTrigger value="date-to-unix">
              <Calendar className="w-4 h-4 mr-2" />
              Date to Unix
            </TabsTrigger>
          </TabsList>
          <TabsContent value="unix-to-date" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="unix-input">Unix Timestamp</Label>
              <Input
                id="unix-input"
                type="number"
                value={unixTimestamp}
                onChange={(e) => setUnixTimestamp(e.target.value)}
                placeholder="Enter Unix timestamp"
              />
            </div>
            <AnimatePresence mode="wait">
              {convertedTime && (
                <motion.div
                  key={convertedTime}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-secondary rounded-md"
                >
                  <p className="text-lg font-semibold">{convertedTime}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
          <TabsContent value="date-to-unix" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date-input">Date and Time</Label>
              <Input
                id="date-input"
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </div>
            <AnimatePresence mode="wait">
              {unixTimestamp && (
                <motion.div
                  key={unixTimestamp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-secondary rounded-md"
                >
                  <p className="text-lg font-semibold">{unixTimestamp}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <Label htmlFor="timezone-select">Timezone</Label>
          </div>
          <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
            <SelectTrigger id="timezone-select">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((zone) => (
                <SelectItem key={zone} value={zone}>{zone}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Unix Timestamp</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                key={currentTimestamp}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-center"
              >
                {currentTimestamp}
              </motion.div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={() => {
              if (activeTab === 'unix-to-date') {
                setUnixTimestamp(currentTimestamp.toString())
              } else {
                setDateTime(new Date().toISOString().slice(0, 16))
              }
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Use Current Time
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}