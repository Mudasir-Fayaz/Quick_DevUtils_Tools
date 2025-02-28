'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Palette, Download, Undo, Redo } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HexColorPicker } from "react-colorful"

interface ColorVariation {
  hex: string
  rgb: string
  hsl: string
}

export default function ShadeTint() {
  const [baseColor, setBaseColor] = useState("#3b82f6")
  const [shades, setShades] = useState<ColorVariation[]>([])
  const [tints, setTints] = useState<ColorVariation[]>([])
  const [variationCount, setVariationCount] = useState(5)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    generateVariations()
  }, [baseColor, variationCount])

  const generateVariations = () => {
    const newShades = []
    const newTints = []

    for (let i = 1; i <= variationCount; i++) {
      const shadePercent = i / (variationCount + 1)
      const tintPercent = 1 - shadePercent

      const shadeHex = shadeColor(baseColor, shadePercent)
      const tintHex = tintColor(baseColor, tintPercent)

      newShades.push(createColorVariation(shadeHex))
      newTints.push(createColorVariation(tintHex))
    }

    setShades(newShades)
    setTints(newTints)

    // Add to history
    setHistory(prevHistory => [...prevHistory.slice(0, historyIndex + 1), baseColor])
    setHistoryIndex(prevIndex => prevIndex + 1)
  }

  const createColorVariation = (hex: string): ColorVariation => {
    const rgb = hexToRgb(hex)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    return {
      hex: hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    }
  }

  const shadeColor = (hex: string, percent: number) => {
    const rgb = hexToRgb(hex)
    const t = percent < 0 ? 0 : 255
    const p = percent < 0 ? percent * -1 : percent
    const R = Math.round((t - rgb.r) * p) + rgb.r
    const G = Math.round((t - rgb.g) * p) + rgb.g
    const B = Math.round((t - rgb.b) * p) + rgb.b
    return rgbToHex(R, G, B)
  }

  const tintColor = (hex: string, percent: number) => {
    const rgb = hexToRgb(hex)
    const t = percent < 0 ? 0 : 255
    const p = percent < 0 ? percent * -1 : percent
    const R = Math.round((t - rgb.r) * p) + rgb.r
    const G = Math.round((t - rgb.g) * p) + rgb.g
    const B = Math.round((t - rgb.b) * p) + rgb.b
    return rgbToHex(R, G, B)
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    const l = (max + min) / 2;
    let h = 0, s = l;

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const exportPalette = () => {
    const palette = {
      baseColor,
      shades,
      tints
    }
    const blob = new Blob([JSON.stringify(palette, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'color-palette.json'
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportCSS = () => {
    let css = `:root {\n  --base-color: ${baseColor};\n\n  /* Shades */\n`
    shades.forEach((shade, index) => {
      css += `  --shade-${index + 1}: ${shade.hex};\n`
    })
    css += `\n  /* Tints */\n`
    tints.forEach((tint, index) => {
      css += `  --tint-${index + 1}: ${tint.hex};\n`
    })
    css += '}'

    const blob = new Blob([css], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'color-palette.css'
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prevIndex => prevIndex - 1)
      setBaseColor(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prevIndex => prevIndex + 1)
      setBaseColor(history[historyIndex + 1])
    }
  }

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-lg shadow-xl p-2"
      >

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Base Color</CardTitle>
            <CardDescription>Choose your base color to generate shades and tints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <HexColorPicker color={baseColor} onChange={setBaseColor} />
              <div className="space-y-4 w-full md:w-auto">
                <div>
                  <Label htmlFor="hex-input">Hex Color</Label>
                  <Input
                    id="hex-input"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="variation-count">Number of Variations</Label>
                  <Slider
                    id="variation-count"
                    min={3}
                    max={10}
                    step={1}
                    value={[variationCount]}
                    onValueChange={(value) => setVariationCount(value[0])}
                  />
                  <div className="text-center mt-2">{variationCount} variations</div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={undo} disabled={historyIndex <= 0}>
                    <Undo className="w-4 h-4 mr-2" />
                    Undo
                  </Button>
                  <Button onClick={redo} disabled={historyIndex >= history.length - 1}>
                    <Redo className="w-4 h-4 mr-2" />
                    Redo
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="shades">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="shades">Shades</TabsTrigger>
            <TabsTrigger value="tints">Tints</TabsTrigger>
          </TabsList>
          <TabsContent value="shades">
            <Card>
              <CardHeader>
                <CardTitle>Shades</CardTitle>
                <CardDescription>Darker variations of the base color</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {shades.map((shade, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className="flex flex-col items-center"
                              onClick={() => copyToClipboard(shade.hex)}
                            >
                              <div
                                className="w-20 h-20 rounded-lg shadow-md cursor-pointer"
                                style={{ backgroundColor: shade.hex }}
                              ></div>
                              <span className="mt-2 text-sm font-mono">{shade.hex}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to copy</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tints">
            <Card>
              <CardHeader>
                <CardTitle>Tints</CardTitle>
                <CardDescription>Lighter variations of the base color</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {tints.map((tint, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className="flex flex-col items-center"
                              onClick={() => copyToClipboard(tint.hex)}
                            >
                              <div
                                className="w-20 h-20 rounded-lg shadow-md cursor-pointer"
                                style={{ backgroundColor: tint.hex }}
                              ></div>
                              <span className="mt-2 text-sm font-mono">{tint.hex}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to copy</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>See how your colors look in a sample layout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {[baseColor, ...shades.map(s => s.hex), ...tints.map(t => t.hex)].map((color, index) => (
                  <Button key={index} style={{ backgroundColor: color, color: getContrastColor(color) }}>
                    Button {index + 1}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {[baseColor, ...shades.map(s => s.hex), ...tints.map(t => t.hex)].map((color, index) => (
                  <div key={index} className="p-4 rounded" style={{ backgroundColor: color, color: getContrastColor(color) }}>
                    Text {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-center space-x-4">
          <Button onClick={exportPalette}>
            <Palette className="w-4 h-4 mr-2" />
            Export Palette
          </Button>
          <Button onClick={exportCSS}>
            <Download className="w-4 h-4 mr-2" />
            Export CSS
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

function getContrastColor(hexColor:  string) {
  // Convert hex to RGB
  const rgb = hexToRgb(hexColor)
  
  // Calculate luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255

  // Return black for light colors and white for dark colors
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 }
}