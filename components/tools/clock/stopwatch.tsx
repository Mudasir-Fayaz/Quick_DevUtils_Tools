'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Flag, Maximize2, Minimize2, Volume2, VolumeX } from 'lucide-react'

type Lap = {
  total: number;
  lap: number;
};

export default function Stopwatch() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [showMilliseconds, setShowMilliseconds] = useState<boolean>(true);
  const [use24HourFormat, setUse24HourFormat] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [countdownHours, setCountdownHours] = useState<number>(0);
  const [countdownMinutes, setCountdownMinutes] = useState<number>(0);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(0);
  const [isCountdown, setIsCountdown] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastLapTimeRef = useRef<number>(0);

  const formatTime = useCallback((ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;

    if (use24HourFormat) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}${showMilliseconds ? `.${milliseconds.toString().padStart(3, '0')}` : ''}`;
    } else {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}${showMilliseconds ? `.${milliseconds.toString().padStart(3, '0')}` : ''} ${ampm}`;
    }
  }, [showMilliseconds, use24HourFormat]);

  const startStopwatch = useCallback(() => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
      setIsRunning(true);
    }
  }, [isRunning, time]);

  const pauseStopwatch = useCallback(() => {
    if (isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [isRunning]);

  const resetStopwatch = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
    setLaps([]);
    setIsCountdown(false);
    lastLapTimeRef.current = 0;
  }, []);

  const lapTime = useCallback(() => {
    const currentLapTime = time - lastLapTimeRef.current;
    setLaps((prevLaps) => [...prevLaps, { total: time, lap: currentLapTime }]);
    lastLapTimeRef.current = time;
  }, [time]);

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  }, []);

  const startCountdown = useCallback(() => {
    if (!isRunning) {
      const totalSeconds = countdownHours * 3600 + countdownMinutes * 60 + countdownSeconds;
      if (totalSeconds > 0) {
        setTime(totalSeconds * 1000);
        setIsCountdown(true);
        startTimeRef.current = Date.now() + totalSeconds * 1000;
        intervalRef.current = setInterval(() => {
          const remaining = startTimeRef.current - Date.now();
          if (remaining <= 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setTime(0);
            setIsRunning(false);
            setIsCountdown(false);
            if (soundEnabled) {
              new Audio('/alert.mp3').play();
            }
            if ('vibrate' in navigator) {
              navigator.vibrate(1000);
            }
          } else {
            setTime(remaining);
          }
        }, 10);
        setIsRunning(true);
      }
    }
  }, [isRunning, countdownHours, countdownMinutes, countdownSeconds, soundEnabled]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'KeyS') {
        if(isRunning) {
          pauseStopwatch()
        } else {
        startStopwatch() }
      } else if (event.code === 'KeyR') {
        resetStopwatch();
      } else if (event.code === 'KeyL') {
        lapTime();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, startStopwatch, pauseStopwatch, resetStopwatch, lapTime]);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isFullScreen ? 'flex items-center justify-center' : ''}`}>
      <Card className={`mx-auto ${isFullScreen ? 'w-full h-full flex flex-col justify-center items-center' : 'max-w-2xl'}`}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center"></CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`text-center ${isFullScreen ? 'text-9xl' : 'text-6xl'} font-mono font-bold transition-all duration-300 ease-in-out`}>
            {formatTime(time)}
          </div>
          <div className="flex justify-center space-x-2">
            <Button onClick={isRunning ? pauseStopwatch : isCountdown ? startCountdown : startStopwatch}>
              {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={resetStopwatch}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button onClick={lapTime} disabled={!isRunning || isCountdown}>
              <Flag className="mr-2 h-4 w-4" />
              Lap
            </Button>
            <Button onClick={toggleFullScreen}>
              {isFullScreen ? <Minimize2 className="mr-2 h-4 w-4" /> : <Maximize2 className="mr-2 h-4 w-4" />}
              {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
          </div>
          {!isFullScreen && (
            <>
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-milliseconds"
                  checked={showMilliseconds}
                  onCheckedChange={setShowMilliseconds}
                />
                <Label htmlFor="show-milliseconds">Show Milliseconds</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="24-hour-format"
                  checked={use24HourFormat}
                  onCheckedChange={setUse24HourFormat}
                />
                <Label htmlFor="24-hour-format">Use 24-hour Format</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="sound-enabled"
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
                <Label htmlFor="sound-enabled">Sound Alerts</Label>
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="countdown-hours">Hours:</Label>
                  <Input
                    id="countdown-hours"
                    type="number"
                    min="0"
                    max="23"
                    value={countdownHours}
                    onChange={(e) => setCountdownHours(parseInt(e.target.value) || 0)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="countdown-minutes">Minutes:</Label>
                  <Input
                    id="countdown-minutes"
                    type="number"
                    min="0"
                    max="59"
                    value={countdownMinutes}
                    onChange={(e) => setCountdownMinutes(parseInt(e.target.value) || 0)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="countdown-seconds">Seconds:</Label>
                  <Input
                    id="countdown-seconds"
                    type="number"
                    min="0"
                    max="59"
                    value={countdownSeconds}
                    onChange={(e) => setCountdownSeconds(parseInt(e.target.value) || 0)}
                    className="w-full"
                  />
                </div>
              </div>
              <Button onClick={startCountdown} disabled={isRunning || (countdownHours === 0 && countdownMinutes === 0 && countdownSeconds === 0)}>
                Start Countdown
              </Button>
              {laps.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Laps</h3>
                  <ul className="space-y-1 max-h-40 overflow-y-auto">
                    {laps.map((lap, index) => (
                      <li key={index} className="text-sm">
                        Lap {index + 1}: {formatTime(lap.lap)} (Total: {formatTime(lap.total)})
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => setLaps([])} className="mt-2">
                    Clear Laps
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}