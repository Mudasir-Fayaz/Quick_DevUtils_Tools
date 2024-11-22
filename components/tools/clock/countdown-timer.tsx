'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  Maximize2, Minimize2, Play,  Square } from 'lucide-react'

const PRESET_TIMES = [
  { label: '5 min', value: 5 * 60 },
  { label: '10 min', value: 10 * 60 },
  { label: '15 min', value: 15 * 60 },
  { label: '25 min', value: 25 * 60 },
  { label: '30 min', value: 30 * 60 },
]

const ALERT_SOUNDS = [
  { label: 'Beep', value: 'beep' },
  { label: 'Alarm', value: 'alarm' },
  { label: 'Bell', value: 'bell' },
]

const COLOR_THEMES = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Blue', value: 'blue' },
]

type ColorTheme = 'light' | 'dark';
type AlertSound = 'beep' | 'alarm' | 'chime'; // Adjust this based on available alert sounds
type Item = {
  label?: string;
  duration: number;
};
export default function CountdownTimer() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [autoRestart, setAutoRestart] = useState<boolean>(false);
  const [showAnalog, setShowAnalog] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [alertSound, setAlertSound] = useState<AlertSound>('beep');
  const [colorTheme, setColorTheme] = useState<ColorTheme>('light');
  const [label, setLabel] = useState<string>('');
  const [volume, setVolume] = useState<number>(50);
const history:Item[] = [];
  const startTimer = useCallback((): void => {
    setIsRunning(true);
  }, []);

  const stopTimer = useCallback((): void => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback((): void => {
    setIsRunning(false);
    setTime(0);
  }, []);

  const handlePresetSelect = useCallback((value: string): void => {
    setTime(parseInt(value));
    setIsRunning(false);
  }, []);

  const handleCustomTimeSet = useCallback((hours: number, minutes: number, seconds: number): void => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTime(totalSeconds);
    setIsRunning(false);
  }, []);

  const toggleFullScreen = useCallback((): void => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
      }
    }
  }, []);

  const playAlertSound = useCallback((): void => {
    const audio = new Audio(`/sounds/${alertSound}.mp3`);
    audio.volume = volume / 100;
    audio.play();
  }, [alertSound, volume]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            if (interval) clearInterval(interval);  // Check if interval is defined
            playAlertSound();
            if (autoRestart) {
              return time;  // restart timer with the initial time
            }
            setIsRunning(false);
            return 0;  // reset timer
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning && time !== 0 && interval) {
      clearInterval(interval);  // Ensure interval is cleared when it's running
    }

    return () => {
      if (interval) {
        clearInterval(interval);  // Cleanup interval on unmount or re-run
      }
    };
  }, [isRunning, time, autoRestart, playAlertSound]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.code === 'Space') {
        setIsRunning((prev) => !prev);
      } else if (event.code === 'KeyR') {
        resetTimer();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [resetTimer]);

  useEffect(() => {
    document.body.className = colorTheme;
  }, [colorTheme]);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (fullScreen) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
        <h2 className="text-9xl font-bold mb-8">{formatTime(time)}</h2>
        <div className="flex space-x-4">
          <Button size="lg" onClick={isRunning ? stopTimer : startTimer}>
            {isRunning ? <Square className="mr-2 h-6 w-6" /> : <Play className="mr-2 h-6 w-6" />}
            {isRunning ? 'Stop' : 'Start'}
          </Button>
          <Button size="lg" onClick={resetTimer}>Reset</Button>
          <Button size="lg" onClick={toggleFullScreen}>
            <Minimize2 className="mr-2 h-6 w-6" />
            Exit Fullscreen
          </Button>
        </div>
      </div>
    );
  }
  // Your other JSX rendering code continues here

  return (
    <div className={`min-h-screen`}>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Countdown Timer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-6xl font-bold mb-4">{formatTime(time)}</h2>
            {showAnalog && (
              <div className="w-48 h-48 mx-auto mb-4 relative rounded-full border-4 border-primary">
                <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-primary origin-bottom transform -translate-x-1/2 rotate-[${(time % 3600) / 10}deg] transition-transform"></div>
              </div>
            )}
          </div>
          <div className="flex justify-center space-x-2">
            <Button onClick={isRunning ? stopTimer : startTimer}>
              {isRunning ? <Square className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isRunning ? 'Stop' : 'Start'}
            </Button>
            <Button onClick={resetTimer}>Reset</Button>
            <Button onClick={toggleFullScreen}>
              <Maximize2 className="mr-2 h-4 w-4" />
              Fullscreen
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="hours">Hours</Label>
              <Input
                id="hours"
                type="number"
                min="0"
                max="23"
                onChange={(e) => handleCustomTimeSet(parseInt(e.target.value), 0, 0)}
              />
            </div>
            <div>
              <Label htmlFor="minutes">Minutes</Label>
              <Input
                id="minutes"
                type="number"
                min="0"
                max="59"
                onChange={(e) => handleCustomTimeSet(0, parseInt(e.target.value), 0)}
              />
            </div>
            <div>
              <Label htmlFor="seconds">Seconds</Label>
              <Input
                id="seconds"
                type="number"
                min="0"
                max="59"
                onChange={(e) => handleCustomTimeSet(0, 0, parseInt(e.target.value))}
              />
            </div>
          </div>
          <Select onValueChange={handlePresetSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select preset time" />
            </SelectTrigger>
            <SelectContent>
              {PRESET_TIMES.map((preset) => (
                <SelectItem key={preset.value} value={preset.value.toString()}>
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="auto-restart" checked={autoRestart} onCheckedChange={setAutoRestart} />
              <Label htmlFor="auto-restart">Auto Restart</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="show-analog" checked={showAnalog} onCheckedChange={setShowAnalog} />
              <Label htmlFor="show-analog">Show Analog Clock</Label>
            </div>
            <div>
              <Label htmlFor="alert-sound">Alert Sound</Label>
              <Select value={alertSound} onValueChange={(v:AlertSound) => setAlertSound(v)}>
                <SelectTrigger id="alert-sound">
                  <SelectValue placeholder="Select alert sound" />
                </SelectTrigger>
                <SelectContent>
                  {ALERT_SOUNDS.map((sound) => (
                    <SelectItem key={sound.value} value={sound.value}>
                      {sound.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="color-theme">Color Theme</Label>
              <Select value={colorTheme} onValueChange={(v:ColorTheme) => setColorTheme(v)}>
                <SelectTrigger id="color-theme">
                  <SelectValue placeholder="Select color theme" />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_THEMES.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="volume">Volume</Label>
              <Slider
                id="volume"
                min={0}
                max={100}
                step={1}
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
              />
            </div>
            <div>
              <Label htmlFor="label">Custom Label</Label>
              <Input id="label" value={label} onChange={(e) => setLabel(e.target.value)} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">History</h3>
            <ul className="space-y-2">
              {history.map((item, index) => (
                <li key={index} className="text-sm">
                  {item.label || 'Unnamed'}: {formatTime(item.duration)}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}