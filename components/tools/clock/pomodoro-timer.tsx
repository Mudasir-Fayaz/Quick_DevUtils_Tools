"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, SkipForward, Volume2} from 'lucide-react'

const motivationalMessages = [
  "Great job! Keep it up!",
  "You're making excellent progress!",
  "Stay focused, you've got this!",
  "Every Pomodoro brings you closer to your goals!",
  "Take a deep breath and keep going!"
]

const backgroundMusicFiles = [
  "https://cdn.pixabay.com/audio/2022/05/09/audio_d4df907d1c.mp3",
  "https://cdn.pixabay.com/audio/2023/11/18/audio_092516882e.mp3",
  "https://cdn.pixabay.com/audio/2023/11/19/audio_a786630afe.mp3"
]
type AlertSoundKey = 'work' | 'shortBreak' | 'longBreak' | 'complete';

const alertSounds: Record<AlertSoundKey, string> = {
  work: "/sounds/work.mp3",
  shortBreak: "/sounds/short-break.mp3",
  longBreak: "/sounds/long-break.mp3",
  complete: "/sounds/complete.mp3"
};


export default function PomodoroTimer() {
  const [workDuration, setWorkDuration] = useState(25)
  const [shortBreakDuration, setShortBreakDuration] = useState(5)
  const [longBreakDuration, setLongBreakDuration] = useState(15)
  const [currentSession, setCurrentSession] = useState('work')
  const [timeLeft, setTimeLeft] = useState(workDuration * 60)
  const [isActive, setIsActive] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [breaksTaken, setBreaksTaken] = useState(0)
  const [volume, setVolume] = useState(50)
  const [showMotivationalMessage, setShowMotivationalMessage] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false)
  const [selectedAlertSound, setSelectedAlertSound] = useState<AlertSoundKey>('work')
  const [dailyGoal, setDailyGoal] = useState(8)
  const [tasks, setTasks] = useState([{ id: 1, text: 'Complete first task', completed: false }])
  const [newTask, setNewTask] = useState('')
  const [isProductivityMode, setIsProductivityMode] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)

  const alertAudioRef = useRef<HTMLAudioElement | null>(null)
  const bgMusicRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {

    alertAudioRef.current = new Audio(alertSounds[selectedAlertSound])
    bgMusicRef.current = new Audio(backgroundMusicFiles[0])
    bgMusicRef.current.loop = true

    return () => {
      if (alertAudioRef.current) alertAudioRef.current.pause()
      if (bgMusicRef.current) bgMusicRef.current.pause()
    }
  }, [selectedAlertSound])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 11 && prevTime > 1) {
            setShowCountdown(true)
          } else {
            setShowCountdown(false)
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (timeLeft === 0) {
      handleSessionComplete()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  useEffect(() => {
    if (alertAudioRef.current) alertAudioRef.current.volume = volume / 100
    if (bgMusicRef.current) bgMusicRef.current.volume = volume / 100
  }, [volume])

  const playSound = () => {
    if (alertAudioRef.current) {
      alertAudioRef.current.play()
    }
  }

  const toggleBackgroundMusic = () => {
    if (isBackgroundMusicPlaying) {
      bgMusicRef.current?.pause()
    } else {
      bgMusicRef.current?.play()
    }
    setIsBackgroundMusicPlaying(!isBackgroundMusicPlaying)
  }

  const handleSessionComplete = () => {
    playSound()
    if (currentSession === 'work') {
      setSessionsCompleted(prev => prev + 1)
      setCurrentSession(sessionsCompleted % 4 === 3 ? 'longBreak' : 'shortBreak')
      setTimeLeft((sessionsCompleted % 4 === 3 ? longBreakDuration : shortBreakDuration) * 60)
    } else {
      setBreaksTaken(prev => prev + 1)
      setCurrentSession('work')
      setTimeLeft(workDuration * 60)
    }
    showNotification()
    displayMotivationalMessage()
  }

  const displayMotivationalMessage = () => {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
    setCurrentMessage(randomMessage)
    setShowMotivationalMessage(true)
    setTimeout(() => setShowMotivationalMessage(false), 5000)
  }

  const showNotification = () => {
    if (!isProductivityMode && "Notification" in window && Notification.permission === "granted") {
      new Notification("Pomodoro Session Change", {
        body: `${currentSession === 'work' ? 'Break' : 'Work'} session starting now!`
      })
    }
  }

  const toggleTimer = () => setIsActive(!isActive)

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(workDuration * 60)
    setCurrentSession('work')
  }

  const skipSession = () => {
    setIsActive(false)
    if (currentSession === 'work') {
      setCurrentSession('shortBreak')
      setTimeLeft(shortBreakDuration * 60)
    } else {
      setCurrentSession('work')
      setTimeLeft(workDuration * 60)
    }
  }

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl font-bold text-center">Pomodoro Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="workDuration" className="text-sm font-medium">Work Duration (minutes)</Label>
            <Input
              id="workDuration"
              type="number"
              value={workDuration}
              onChange={(e) => setWorkDuration(Number(e.target.value))}
              min={1}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="shortBreakDuration" className="text-sm font-medium">Short Break (minutes)</Label>
            <Input
              id="shortBreakDuration"
              type="number"
              value={shortBreakDuration}
              onChange={(e) => setShortBreakDuration(Number(e.target.value))}
              min={1}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="longBreakDuration" className="text-sm font-medium">Long Break (minutes)</Label>
            <Input
              id="longBreakDuration"
              type="number"
              value={longBreakDuration}
              onChange={(e) => setLongBreakDuration(Number(e.target.value))}
              min={1}
              className="mt-1"
            />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{formatTime(timeLeft)}</h2>
          <Progress value={(timeLeft / (currentSession === 'work' ? workDuration : currentSession === 'shortBreak' ? shortBreakDuration : longBreakDuration) / 60) * 100} className="w-full h-4" />
          <p className="mt-2 text-lg sm:text-xl font-semibold">{currentSession === 'work' ? 'Work Session' : currentSession === 'shortBreak' ? 'Short Break' : 'Long Break'}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={toggleTimer} className="w-full sm:w-auto">
            {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} className="w-full sm:w-auto">Reset</Button>
          <Button onClick={skipSession} className="w-full sm:w-auto"><SkipForward className="mr-2 h-4 w-4" />Skip</Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4" />
            <Slider
              value={[volume]}
              onValueChange={([value]) => setVolume(value)}
              max={100}
              step={1}
              className="w-24 sm:w-32"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="bgMusic" className="text-sm">Background Sound</Label>
            <Switch
              id="bgMusic"
              checked={isBackgroundMusicPlaying}
              onCheckedChange={toggleBackgroundMusic}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="alertSound" className="text-sm">Alert Sound</Label>
            <Select value={selectedAlertSound} onValueChange={(v: AlertSoundKey) => setSelectedAlertSound(v)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select alert sound" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="shortBreak">Short Break</SelectItem>
                <SelectItem value="longBreak">Long Break</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Productivity Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base">Sessions Completed: {sessionsCompleted}</p>
              <p className="text-sm sm:text-base">Breaks Taken: {breaksTaken}</p>
              <p className="text-sm sm:text-base">Daily Goal: {sessionsCompleted}/{dailyGoal} sessions</p>
              <Progress value={(sessionsCompleted / dailyGoal) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <Label htmlFor={`task-${task.id}`} className={`text-sm sm:text-base ${task.completed ? 'line-through' : ''}`}>
                      {task.text}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex mt-4">
                <Input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task"
                  className="mr-2 text-sm sm:text-base"
                />
                <Button onClick={addTask} size="sm">Add</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="productivityMode" className="text-sm sm:text-base">Productivity Mode</Label>
            <Switch
              id="productivityMode"
              checked={isProductivityMode}
              onCheckedChange={setIsProductivityMode}
            />
          </div>
          <Button onClick={() => setDailyGoal(dailyGoal + 1)} size="sm">Increase Daily Goal</Button>
        </div>

        <AnimatePresence>
          {showMotivationalMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg text-sm sm:text-base"
            >
              {currentMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCountdown && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-9xl font-bold text-primary"
            >
              {timeLeft}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}