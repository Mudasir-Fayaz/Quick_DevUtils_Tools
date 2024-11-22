"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {  Copy, Download, HelpCircle,  Plus, Minus } from 'lucide-react'


interface Shadow {
  offsetX: number
  offsetY: number
  blur: number
  spread: number
  color: string
  inset: boolean
}

interface BoxStyle {
  width: number
  height: number
  borderRadius: number
  backgroundColor: string
}

const initialShadow: Shadow = {
  offsetX: 5,
  offsetY: 5,
  blur: 10,
  spread: 0,
  color: 'rgba(0, 0, 0, 0.5)',
  inset: false,
}

const initialBoxStyle: BoxStyle = {
  width: 200,
  height: 200,
  borderRadius: 10,
  backgroundColor: '#ffffff',
}

const shadowPresets = {
  'Soft': { offsetX: 3, offsetY: 3, blur: 10, spread: 0, color: 'rgba(0, 0, 0, 0.1)', inset: false },
  'Hard': { offsetX: 5, offsetY: 5, blur: 0, spread: 0, color: 'rgba(0, 0, 0, 0.5)', inset: false },
  'Glow': { offsetX: 0, offsetY: 0, blur: 20, spread: 10, color: 'rgba(0, 123, 255, 0.5)', inset: false },
  'Inset': { offsetX: 2, offsetY: 2, blur: 5, spread: 0, color: 'rgba(0, 0, 0, 0.2)', inset: true },
}

export default function BoxShadow() {
  const [shadows, setShadows] = useState<Shadow[]>([initialShadow])
  const [boxStyle, setBoxStyle] = useState<BoxStyle>(initialBoxStyle)
  const [activeShadowIndex, setActiveShadowIndex] = useState(0)
  const [generatedCSS, setGeneratedCSS] = useState('')
  const [isAnimated, setIsAnimated] = useState(false)
  const [animationDuration, setAnimationDuration] = useState(2)

  useEffect(() => {
    generateCSS()
  }, [shadows, boxStyle, isAnimated, animationDuration])

  const generateCSS = () => {
    const boxShadowCSS = shadows.map(shadow => 
      `${shadow.inset ? 'inset ' : ''}${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
    ).join(', ')

    let css = `.box-shadow-example {
  width: ${boxStyle.width}px;
  height: ${boxStyle.height}px;
  border-radius: ${boxStyle.borderRadius}px;
  background-color: ${boxStyle.backgroundColor};
  box-shadow: ${boxShadowCSS};
`

    if (isAnimated) {
      css += `  animation: shadowPulse ${animationDuration}s infinite alternate;
}

@keyframes shadowPulse {
  to {
    box-shadow: ${shadows.map(shadow => 
      `${shadow.inset ? 'inset ' : ''}${shadow.offsetX * 1.2}px ${shadow.offsetY * 1.2}px ${shadow.blur * 1.5}px ${shadow.spread * 1.2}px ${shadow.color}`
    ).join(', ')};
  }
`
    } else {
      css += '}'
    }

    setGeneratedCSS(css)
  }

  const updateShadow = (index: number, key: keyof Shadow, value: number | string | boolean) => {
    const newShadows = [...shadows]
    newShadows[index] = { ...newShadows[index], [key]: value }
    setShadows(newShadows)
  }

  const addShadow = () => {
    setShadows([...shadows, initialShadow])
    setActiveShadowIndex(shadows.length)
  }

  const removeShadow = (index: number) => {
    if (shadows.length > 1) {
      const newShadows = shadows.filter((_, i) => i !== index)
      setShadows(newShadows)
      setActiveShadowIndex(Math.min(activeShadowIndex, newShadows.length - 1))
    }
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(generatedCSS)
  }

  const downloadCSS = () => {
    const blob = new Blob([generatedCSS], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'box-shadow-styles.css'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto space-y-6">
     

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Shadow Controls</CardTitle>
            <CardDescription>
              Customize your box shadow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeShadowIndex.toString()} onValueChange={(value) => setActiveShadowIndex(parseInt(value))}>
              <TabsList className="grid grid-cols-3 mb-4">
                {shadows.map((_, index) => (
                  <TabsTrigger key={index} value={index.toString()}>
                    Shadow {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {shadows.map((shadow, index) => (
                <TabsContent key={index} value={index.toString()}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`offset-x-${index}`}>Offset X</Label>
                      <Slider
                        id={`offset-x-${index}`}
                        min={-50}
                        max={50}
                        step={1}
                        value={[shadow.offsetX]}
                        onValueChange={(value) => updateShadow(index, 'offsetX', value[0])}
                      />
                      <div className="text-center mt-1">{shadow.offsetX}px</div>
                    </div>
                    <div>
                      <Label htmlFor={`offset-y-${index}`}>Offset Y</Label>
                      <Slider
                        id={`offset-y-${index}`}
                        min={-50}
                        max={50}
                        step={1}
                        value={[shadow.offsetY]}
                        onValueChange={(value) => updateShadow(index, 'offsetY', value[0])}
                      />
                      <div className="text-center mt-1">{shadow.offsetY}px</div>
                    </div>
                    <div>
                      <Label htmlFor={`blur-${index}`}>Blur</Label>
                      <Slider
                        id={`blur-${index}`}
                        min={0}
                        max={100}
                        step={1}
                        value={[shadow.blur]}
                        onValueChange={(value) => updateShadow(index, 'blur', value[0])}
                      />
                      <div className="text-center mt-1">{shadow.blur}px</div>
                    </div>
                    <div>
                      <Label htmlFor={`spread-${index}`}>Spread</Label>
                      <Slider
                        id={`spread-${index}`}
                        min={-50}
                        max={50}
                        step={1}
                        value={[shadow.spread]}
                        onValueChange={(value) => updateShadow(index, 'spread', value[0])}
                      />
                      <div className="text-center mt-1">{shadow.spread}px</div>
                    </div>
                    <div>
                      <Label htmlFor={`color-${index}`}>Color</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id={`color-${index}`}
                          type="color"
                          value={shadow.color}
                          onChange={(e) => updateShadow(index, 'color', e.target.value)}
                          className="w-12 h-8 p-0 border-none"
                        />
                        <Input
                          type="text"
                          value={shadow.color}
                          onChange={(e) => updateShadow(index, 'color', e.target.value)}
                          className="flex-grow"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`inset-${index}`}
                        checked={shadow.inset}
                        onCheckedChange={(checked) => updateShadow(index, 'inset', checked)}
                      />
                      <Label htmlFor={`inset-${index}`}>Inset</Label>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button onClick={addShadow}>
              <Plus className="mr-2 h-4 w-4" /> Add Shadow
            </Button>
            <Button
              onClick={() => removeShadow(activeShadowIndex)}
              disabled={shadows.length <= 1}
              className="ml-2"
            >
              <Minus className="mr-2 h-4 w-4" /> Remove Shadow
            </Button>
          </CardFooter>
        </Card>

        <AnimatePresence>
          { (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    Live preview of your box shadow
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center min-h-[300px]">
                  <div
                    className="box-shadow-example"
                    style={{
                      width: `${boxStyle.width}px`,
                      height: `${boxStyle.height}px`,
                      borderRadius: `${boxStyle.borderRadius}px`,
                      backgroundColor: boxStyle.backgroundColor,
                      boxShadow: shadows.map(shadow => 
                        `${shadow.inset ? 'inset ' : ''}${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
                      ).join(', '),
                      animation: isAnimated ? `shadowPulse ${animationDuration}s infinite alternate` : 'none',
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Box Style</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="box-width">Width</Label>
              <Slider
                id="box-width"
                min={50}
                max={400}
                step={1}
                value={[boxStyle.width]}
                onValueChange={(value) => setBoxStyle({...boxStyle, width: value[0]})}
              />
              <div className="text-center mt-1">{boxStyle.width}px</div>
            </div>
            <div>
              <Label htmlFor="box-height">Height</Label>
              <Slider
                id="box-height"
                min={50}
                max={400}
                step={1}
                value={[boxStyle.height]}
                onValueChange={(value) => setBoxStyle({...boxStyle, height: value[0]})}
              />
              <div className="text-center mt-1">{boxStyle.height}px</div>
            </div>
            <div>
              <Label htmlFor="box-border-radius">Border Radius</Label>
              <Slider
                id="box-border-radius"
                min={0}
                max={200}
                step={1}
                value={[boxStyle.borderRadius]}
                onValueChange={(value) => setBoxStyle({...boxStyle, borderRadius: value[0]})}
              />
              <div className="text-center mt-1">{boxStyle.borderRadius}px</div>
            </div>
            <div>
              <Label htmlFor="box-background-color">Background Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="box-background-color"
                  type="color"
                  value={boxStyle.backgroundColor}
                  onChange={(e) =>   setBoxStyle({...boxStyle, backgroundColor: e.target.value})}
                  className="w-12 h-8 p-0 border-none"
                />
                <Input
                  type="text"
                  value={boxStyle.backgroundColor}
                  onChange={(e) => setBoxStyle({...boxStyle, backgroundColor: e.target.value})}
                  className="flex-grow"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Animation Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="animated-shadow"
              checked={isAnimated}
              onCheckedChange={setIsAnimated}
            />
            <Label htmlFor="animated-shadow">Animate Shadow</Label>
          </div>
          {isAnimated && (
            <div className="mt-4">
              <Label htmlFor="animation-duration">Animation Duration (seconds)</Label>
              <Slider
                id="animation-duration"
                min={0.5}
                max={5}
                step={0.1}
                value={[animationDuration]}
                onValueChange={(value) => setAnimationDuration(value[0])}
              />
              <div className="text-center mt-1">{animationDuration}s</div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shadow Presets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(shadowPresets).map(([name, preset]) => (
              <Button
                key={name}
                onClick={() => setShadows([preset])}
                variant="outline"
              >
                {name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated CSS</CardTitle>
          <CardDescription>
            Copy or download the generated CSS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] w-full rounded border p-4">
            <pre>
            <pre className="whitespace-pre-wrap font-mono text-sm">{generatedCSS}</pre>

            </pre>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={copyCSS}>
                  <Copy className="mr-2 h-4 w-4" /> Copy CSS
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy generated CSS to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={downloadCSS}>
                  <Download className="mr-2 h-4 w-4" /> Download CSS
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download generated CSS file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>

      <div className="fixed bottom-4 right-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-10 h-10 rounded-full p-0">
              <HelpCircle className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Help Guide</h4>
                <p className="text-sm text-muted-foreground">
                  Quick guide on how to use the Box Shadow Generator
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Shadows</Label>
                  <div className="col-span-2 text-sm">
                    Add and customize multiple shadows
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Box Style</Label>
                  <div className="col-span-2 text-sm">
                    Adjust the box dimensions and style
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Animation</Label>
                  <div className="col-span-2 text-sm">
                    Enable and customize shadow animation
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. CSS</Label>
                  <div className="col-span-2 text-sm">
                    Copy or download the generated CSS
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}