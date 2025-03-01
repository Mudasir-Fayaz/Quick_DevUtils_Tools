"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Copy, Download, HelpCircle,  Palette } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const hexToRgba = (hex: string, alpha: number = 1): string => {
  let r: number, g: number, b: number

  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '')

  // Parse the hex values
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16)
    g = parseInt(hex.slice(2, 4), 16)
    b = parseInt(hex.slice(4, 6), 16)
  } else {
    throw new Error('Invalid HEX color.')
  }

  // Ensure alpha is between 0 and 1
  alpha = Math.max(0, Math.min(1, alpha))

  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`
}

export default function HexRgba() {
  const [hexInput, setHexInput] = useState('#FF5733')
  const [alpha, setAlpha] = useState(1)
  const [rgbaOutput, setRgbaOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [recentColors, setRecentColors] = useState<string[]>([])
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  useEffect(() => {
    try {
      const rgba = hexToRgba(hexInput, alpha)
      setRgbaOutput(rgba)
      setError(null)
      if (!recentColors.includes(hexInput)) {
        setRecentColors(prev => [hexInput, ...prev].slice(0, 5))
      }
    } catch (err) {
      console.log(err)
      setError('Invalid HEX color')
      setRgbaOutput('')
    }
  }, [hexInput, alpha, recentColors])

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHexInput(e.target.value)
  }

  const handleAlphaChange = (value: number[]) => {
    setAlpha(value[0])
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(text)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const downloadJSON = () => {
    const data = {
      hex: hexInput,
      rgba: rgbaOutput
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'color_conversion.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto space-y-6">
      

      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>Enter a HEX color code</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <div className="flex-grow">
                <Label htmlFor="hex-input">HEX Color</Label>
                <Input
                  id="hex-input"
                  value={hexInput}
                  onChange={handleHexChange}
                  placeholder="#FF5733"
                />
              </div>
              <div className="w-20 h-20 rounded-md shadow-md" style={{ backgroundColor: hexInput }} />
            </div>
            <div>
              <Label htmlFor="alpha-slider">Alpha: {alpha.toFixed(2)}</Label>
              <Slider
                id="alpha-slider"
                min={0}
                max={1}
                step={0.01}
                value={[alpha]}
                onValueChange={handleAlphaChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Card>
        <CardHeader>
          <CardTitle>RGBA Output</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input value={rgbaOutput} readOnly />
            <div className="w-20 h-20 rounded-md shadow-md" style={{ backgroundColor: rgbaOutput }} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => copyToClipboard(rgbaOutput)}>
                  <Copy className="mr-2 h-4 w-4" />
                  {copiedColor === rgbaOutput ? 'Copied!' : 'Copy RGBA'}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy RGBA to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={downloadJSON}>
                  <Download className="mr-2 h-4 w-4" />
                  Download JSON
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download color data as JSON</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-20">
            <div className="flex flex-wrap gap-2">
              {recentColors.map((color, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-10 h-10 p-0"
                        style={{ backgroundColor: color }}
                        onClick={() => setHexInput(color)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{color}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Tabs defaultValue="instructions">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <TabsContent value="instructions">
          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Enter a valid HEX color code (e.g., #FF5733 or #F53)</li>
                <li>Adjust the alpha value using the slider</li>
                <li>View the RGBA output and color preview</li>
                <li>Copy the RGBA value or download as JSON</li>
                <li>Use recent colors for quick access</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About This Tool</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                This Hex to RGBA converter allows you to easily convert HEX color codes to RGBA format.
                It supports both full (#RRGGBB) and shorthand (#RGB) HEX formats and provides real-time
                conversion with a visual color preview.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
                <h4 className="font-medium leading-none">Help</h4>
                <p className="text-sm text-muted-foreground">
                  Need help with color conversion? Here are some tips:
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Palette className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    Use #RRGGBB or #RGB format for HEX colors
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <AlertCircle className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    Alpha values range from 0 (transparent) to 1 (opaque)
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