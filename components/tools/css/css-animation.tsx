'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RefreshCw, Copy, Check } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const easingFunctions = {
  'linear': [0, 0, 1, 1],
  'ease': [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
} as const;

type EasingFunction = keyof typeof easingFunctions;

interface AnimationProperties {
  name: string;
  duration: number;
  timingFunction: EasingFunction;
  delay: number;
  iterationCount: number | 'infinite';
  direction: string;
  fillMode: string;
  translateX: number;
  translateY: number;
  scale: number;
  rotate: number;
  opacity: number;
  width: number;
  height: number;
  backgroundColor: string;
  borderRadius: number;
}

export default function CSSAnimation(): JSX.Element {
  const [animationProperties, setAnimationProperties] = useState<AnimationProperties>({
    name: 'myAnimation',
    duration: 1,
    timingFunction: 'ease',
    delay: 0,
    iterationCount: 1,
    direction: 'normal',
    fillMode: 'none',
    translateX: 0,
    translateY: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    width: 100,
    height: 100,
    backgroundColor: '#3b82f6',
    borderRadius: 0,
  })
  const easingPoints = easingFunctions[animationProperties.timingFunction] || [0.42, 0, 0.58, 1];

  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const generateCSS = (): string => {
    const {
      name,
      duration,
      timingFunction,
      delay,
      iterationCount,
      direction,
      fillMode,
      translateX,
      translateY,
      scale,
      rotate,
      opacity,
      width,
      height,
      backgroundColor,
      borderRadius,
    } = animationProperties

    const keyframes = `@keyframes ${name} {
  0% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    opacity: 1;
    width: 100px;
    height: 100px;
    background-color: #3b82f6;
    border-radius: 0;
  }
  100% {
    transform: translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg);
    opacity: ${opacity};
    width: ${width}px;
    height: ${height}px;
    background-color: ${backgroundColor};
    border-radius: ${borderRadius}px;
  }
}`

    const animationCSS = `
.animated-element {
  animation-name: ${name};
  animation-duration: ${duration}s;
  animation-timing-function: ${timingFunction};
  animation-delay: ${delay}s;
  animation-iteration-count: ${iterationCount};
  animation-direction: ${direction};
  animation-fill-mode: ${fillMode};
}`

    return `${keyframes}\n${animationCSS}`
  }

  const handleCopy = (): void => {
    navigator.clipboard.writeText(generateCSS())
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const resetAnimation = (): void => {
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 10)
  }

  const updateAnimationProperty = <K extends keyof AnimationProperties>(
    key: K,
    value: AnimationProperties[K]
  ): void => {
    setAnimationProperties(prev => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center"></CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="customize" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="code">Generated CSS</TabsTrigger>
          </TabsList>
          <TabsContent value="customize" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="animation-name">Animation Name</Label>
                <Input
                  id="animation-name"
                  value={animationProperties.name}
                  onChange={(e) => updateAnimationProperty('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (seconds)</Label>
                <Slider
                  id="duration"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={[animationProperties.duration]}
                  onValueChange={(value) => updateAnimationProperty('duration', value[0])}
                />
                <span className="text-sm">{animationProperties.duration}s</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timing-function">Timing Function</Label>
                <Select
                  value={animationProperties.timingFunction}
                  onValueChange={(value:"linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out") => updateAnimationProperty('timingFunction', value)}
                >
                  <SelectTrigger id="timing-function">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="delay">Delay (seconds)</Label>
                <Slider
                  id="delay"
                  min={0}
                  max={5}
                  step={0.1}
                  value={[animationProperties.delay]}
                  onValueChange={(value) => updateAnimationProperty('delay', value[0])}
                />
                <span className="text-sm">{animationProperties.delay}s</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="iteration-count">Iteration Count</Label>
                <Input
                  id="iteration-count"
                  type="number"
                  min={1}
                  value={animationProperties.iterationCount.toString()}
                  onChange={(e) => updateAnimationProperty('iterationCount', e.target.value === 'infinite' ? 'infinite' : parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="direction">Direction</Label>
                <Select
                  value={animationProperties.direction}
                  onValueChange={(value) => updateAnimationProperty('direction', value)}
                >
                  <SelectTrigger id="direction">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['normal', 'reverse', 'alternate', 'alternate-reverse'].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fill-mode">Fill Mode</Label>
                <Select
                  value={animationProperties.fillMode}
                  onValueChange={(value) => updateAnimationProperty('fillMode', value)}
                >
                  <SelectTrigger id="fill-mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['none', 'forwards', 'backwards', 'both'].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="translate-x">Translate X (px)</Label>
                <Slider
                  id="translate-x"
                  min={-200}
                  max={200}
                  value={[animationProperties.translateX]}
                  onValueChange={(value) => updateAnimationProperty('translateX', value[0])}
                />
                <span className="text-sm">{animationProperties.translateX}px</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="translate-y">Translate Y (px)</Label>
                <Slider
                  id="translate-y"
                  min={-200}
                  max={200}
                  value={[animationProperties.translateY]}
                  onValueChange={(value) => updateAnimationProperty('translateY', value[0])}
                />
                <span className="text-sm">{animationProperties.translateY}px</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scale">Scale</Label>
                <Slider
                  id="scale"
                  min={0.1}
                  max={2}
                  step={0.1}
                  value={[animationProperties.scale]}
                  onValueChange={(value) => updateAnimationProperty('scale', value[0])}
                />
                <span className="text-sm">{animationProperties.scale}</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rotate">Rotate (degrees)</Label>
                <Slider
                  id="rotate"
                  min={0}
                  max={360}
                  value={[animationProperties.rotate]}
                  onValueChange={(value) => updateAnimationProperty('rotate', value[0])}
                />
                <span className="text-sm">{animationProperties.rotate}°</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="opacity">Opacity</Label>
                <Slider
                  id="opacity"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[animationProperties.opacity]}
                  onValueChange={(value) => updateAnimationProperty('opacity', value[0])}
                />
                <span className="text-sm">{animationProperties.opacity}</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">Width (px)</Label>
                <Slider
                  id="width"
                  min={50}
                  max={300}
                  value={[animationProperties.width]}
                  onValueChange={(value) => updateAnimationProperty('width', value[0])}
                />
                <span className="text-sm">{animationProperties.width}px</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (px)</Label>
                <Slider
                  id="height"
                  min={50}
                  max={300}
                  value={[animationProperties.height]}
                  onValueChange={(value) => updateAnimationProperty('height', value[0])}
                />
                <span className="text-sm">{animationProperties.height}px</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="background-color">Background Color</Label>
                <Input
                  id="background-color"
                  type="color"
                  value={animationProperties.backgroundColor}
                  onChange={(e) => updateAnimationProperty('backgroundColor', e.target.value)}
                  className="h-10 p-1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="border-radius">Border Radius (px)</Label>
                <Slider
                  id="border-radius"
                  min={0}
                  max={150}
                  value={[animationProperties.borderRadius]}
                  onValueChange={(value) => updateAnimationProperty('borderRadius', value[0])}
                />
                <span className="text-sm">{animationProperties.borderRadius}px</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="code" className="space-y-4">
            <pre className="p-4 bg-secondary rounded-md overflow-x-auto">
              <code>{generateCSS()}</code>
            </pre>
            <Button onClick={handleCopy}>
              {isCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {isCopied ? 'Copied!' : 'Copy CSS'}
            </Button>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Animation Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-64 h-64 bg-gray-100 rounded-md mb-4 overflow-hidden flex items-center justify-center">
              <motion.div
    className="bg-blue-500"
    animate={
        isPlaying
            ? {
                  x: animationProperties.translateX,
                  y: animationProperties.translateY,
                  scale: animationProperties.scale,
                  rotate: animationProperties.rotate,
                  opacity: animationProperties.opacity,
                  width: animationProperties.width,
                  height: animationProperties.height,
                  backgroundColor: animationProperties.backgroundColor,
                  borderRadius: animationProperties.borderRadius,
              }
            : {}
    }
    transition={{
        duration: animationProperties.duration || 0.5, // add a fallback
        ease: easingPoints, // Directly pass bezier points
        delay: animationProperties.delay || 0,
        repeat:
            animationProperties.iterationCount === "infinite"
                ? Infinity
                : (Number(animationProperties.iterationCount) || 1) - 1,
        repeatType: animationProperties.direction === "alternate" ? "reverse" : "loop",
    }}
    style={{
        width: "100px",
        height: "100px",
    }}
/>
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button onClick={resetAnimation}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}