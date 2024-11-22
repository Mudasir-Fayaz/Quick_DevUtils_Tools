"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  Plus, X, Play } from 'lucide-react'

type Alarm = {
  id: string
  time: string
  label: string
  days: string[]
  sound: string
  volume: number
  snoozeInterval: number
  isActive: boolean
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const SOUNDS = ['Beep','Alarm','Bell', 'Chime', 'Digital']
const SNOOZE_INTERVALS = [5, 10, 15, 20, 30]

export default function AlarmClock() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [alarms, setAlarms] = useState<Alarm[]>([])
  const [newAlarm, setNewAlarm] = useState<Alarm>({
    id: '',
    time: '',
    label: '',
    days: [],
    sound: 'Beep',
    volume: 50,
    snoozeInterval: 5,
    isActive: true
  })
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null)
  const [isSnoozing, setIsSnoozing] = useState(false)
const showNotification = false;
  const [alarmHistory, setAlarmHistory] = useState<string[]>([])
const isSilentMode = false;
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const storedAlarms = localStorage.getItem('alarms')
    if (storedAlarms) {
      setAlarms(JSON.parse(storedAlarms))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(alarms))
  }, [alarms])

  useEffect(() => {
    if (activeAlarm) {
      audioRef.current = new Audio(`/sounds/${activeAlarm.sound.toLowerCase()}.mp3`)
      audioRef.current.loop = true
      audioRef.current.volume = activeAlarm.volume / 100
      audioRef.current.play()
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200])
      }
      showAlarmNotification(activeAlarm)
    } else if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
  }, [activeAlarm])

  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date()
      alarms.forEach(alarm => {
        const [alarmHour, alarmMinute] = alarm.time.split(':').map(Number)
        if (
          alarm.isActive &&
          now.getHours() === alarmHour &&
          now.getMinutes() === alarmMinute &&
          now.getSeconds() == 1 &&
          alarm.days.includes(format(now, 'EEE'))
        ) {
          setActiveAlarm(alarm)
          addToHistory(alarm)
        }
      })
    }
    const alarmChecker = setInterval(checkAlarms, 1000)
    return () => clearInterval(alarmChecker)
  }, [alarms])

  const addToHistory = (alarm: Alarm) => {
    const historyEntry = `${format(new Date(), 'yyyy-MM-dd HH:mm')} - ${alarm.label || 'Unnamed Alarm'}`
    setAlarmHistory(prev => [historyEntry, ...prev.slice(0, 9)])
  }

  const showAlarmNotification = (alarm: Alarm) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Alarm', {
        body: alarm.label || 'Your alarm is ringing!',
        icon: '/alarm-icon.png'
      })
    }
  }

  const handleNewAlarm = () => {
    if (newAlarm.time) {
      setAlarms(prev => [...prev, { ...newAlarm, id: Date.now().toString() }])
      setNewAlarm({
        id: '',
        time: '',
        label: '',
        days: [],
        sound: 'Beep',
        volume: 50,
        snoozeInterval: 5,
        isActive: true
      })
    }
  }

  const handleAlarmDismiss = () => {
    
    setActiveAlarm(null)
    if(isSnoozing)
    setIsSnoozing(false)
  }

  const handleAlarmSnooze = () => {
    if (activeAlarm) {
      setActiveAlarm(null)
      setIsSnoozing(true)
      setTimeout(() => {
        setActiveAlarm(activeAlarm)
        setIsSnoozing(false)
      }, activeAlarm.snoozeInterval * 60 * 1000)
    }
  }

  const handleQuickAlarm = (minutes: number) => {
    const now = new Date()
    const alarmTime = new Date(now.getTime() + minutes * 60000)
    const newQuickAlarm: Alarm = {
      id: Date.now().toString(),
      time: format(alarmTime, 'HH:mm'),
      label: `Quick Alarm (${minutes} min)`,
      days: [format(now, 'EEE')],
      sound: 'Beep',
      volume: 50,
      snoozeInterval: 5,
      isActive: true
    }
    setAlarms(prev => [...prev, newQuickAlarm])
  }

  return (
    <Card className="w-full mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-center">
          <motion.div
            key={currentTime.toISOString()}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-4xl md:text-6xl font-bold">
              {format(currentTime, 'HH:mm:ss')}
            </span>
            <span className="text-xl md:text-2xl text-muted-foreground">
              {format(currentTime, 'h:mm:ss a')}
            </span>
          </motion.div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="alarms" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="alarms" className="text-sm md:text-base">Alarms</TabsTrigger>
            <TabsTrigger value="new" className="text-sm md:text-base">New Alarm</TabsTrigger>
            <TabsTrigger value="history" className="text-sm md:text-base">History</TabsTrigger>
          </TabsList>
          <TabsContent value="alarms" className="mt-0">
            <ul className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
              {alarms.map((alarm) => (
                <li
                  key={alarm.id}
                  className="bg-card p-4 rounded-lg flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <p className="font-bold text-lg">{alarm.time}</p>
                    <p className="text-sm text-muted-foreground">{alarm.label || 'Unnamed Alarm'}</p>
                    <p className="text-xs text-muted-foreground">
                      {alarm.days.join(', ')} | {alarm.sound}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={alarm.isActive}
                      onCheckedChange={(checked) => {
                        const updatedAlarms = alarms.map(a =>
                          a.id === alarm.id ? { ...a, isActive: checked } : a
                        )
                        setAlarms(updatedAlarms)
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => setAlarms(alarms.filter(a => a.id !== alarm.id))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="new">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alarmTime">Time</Label>
                  <Input
                    id="alarmTime"
                    type="time"
                    value={newAlarm.time}
                    onChange={(e) => setNewAlarm({ ...newAlarm, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alarmLabel">Label</Label>
                  <Input
                    id="alarmLabel"
                    type="text"
                    value={newAlarm.label}
                    onChange={(e) => setNewAlarm({ ...newAlarm, label: e.target.value })}
                    placeholder="Alarm label"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Days</Label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((day) => (
                    <Button
                      key={day}
                      variant={newAlarm.days.includes(day) ? "default" : "outline"}
                      onClick={() => {
                        const updatedDays = newAlarm.days.includes(day)
                          ? newAlarm.days.filter(d => d !== day)
                          : [...newAlarm.days, day]
                        setNewAlarm({ ...newAlarm, days: updatedDays })
                      }}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alarmSound">Sound</Label>
                <Select
                  value={newAlarm.sound}
                  onValueChange={(value) => setNewAlarm({ ...newAlarm, sound: value })}
                >
                  <SelectTrigger id="alarmSound">
                    <SelectValue placeholder="Select a sound" />
                  </SelectTrigger>
                  <SelectContent>
                    {SOUNDS.map((sound) => (
                      <SelectItem key={sound} value={sound}>{sound}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alarmVolume">Volume</Label>
                <Slider
                  id="alarmVolume"
                  min={0}
                  max={100}
                  step={1}
                  value={[newAlarm.volume]}
                  onValueChange={(value) => setNewAlarm({ ...newAlarm, volume: value[0] })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="snoozeInterval">Snooze Interval (minutes)</Label>
                <Select
                  value={newAlarm.snoozeInterval.toString()}
                  onValueChange={(value) => setNewAlarm({ ...newAlarm, snoozeInterval: parseInt(value) })}
                >
                  <SelectTrigger id="snoozeInterval">
                    <SelectValue placeholder="Select snooze interval" />
                  </SelectTrigger>
                  <SelectContent>
                    {SNOOZE_INTERVALS.map((interval) => (
                      <SelectItem key={interval} value={interval.toString()}>{interval}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleNewAlarm} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Alarm
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="history">
            <ul className="space-y-2">
              {alarmHistory.map((entry, index) => (
                <li key={index} className="bg-secondary p-2 rounded">
                  {entry}
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center space-x-2">
          <Button onClick={() => handleQuickAlarm(5)} className="text-sm md:text-base">+5 min</Button>
          <Button onClick={() => handleQuickAlarm(10)} className="text-sm md:text-base">+10 min</Button>
          <Button onClick={() => handleQuickAlarm(15)} className="text-sm md:text-base">+15 min</Button>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Play className="mr-2 h-4 w-4" /> Test Alarm
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Alarm</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select
                value={newAlarm.sound}
                onValueChange={(value) => setNewAlarm({ ...newAlarm, sound: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a sound" />
                </SelectTrigger>
                <SelectContent>
                  {SOUNDS.map((sound) => (
                    <SelectItem key={sound} value={sound}>{sound}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[newAlarm.volume]}
                onValueChange={(value) => setNewAlarm({ ...newAlarm, volume: value[0] })}
              />
              <Button onClick={() => {
                const audio = new Audio(`/sounds/${newAlarm.sound.toLowerCase()}.mp3`)
                audio.volume = newAlarm.volume / 100
                audio.play()
              }}>
                Play Test Sound
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {isSilentMode && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
            <p className="font-bold">Warning</p>
            <p>Your device is in silent mode. Alarms may not be audible.</p>
          </div>
        )}

        <AnimatePresence>
          {activeAlarm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <Card className="w-full max-w-md bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-center">
                    {activeAlarm.label || 'Alarm'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-4xl md:text-6xl font-bold text-center">{activeAlarm.time}</p>
                  <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <Button onClick={handleAlarmSnooze} className="w-full sm:w-auto">
                      Snooze ({activeAlarm.snoozeInterval} min)
                    </Button>
                    <Button onClick={handleAlarmDismiss} variant="destructive" className="w-full sm:w-auto">
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg"
          >
            <p>Alarm will go off in 5 minutes</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}