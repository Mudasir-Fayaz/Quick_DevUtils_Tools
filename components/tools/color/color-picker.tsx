"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {  Copy,  HelpCircle, Trash2, Palette, Plus,  RefreshCw } from 'lucide-react'

const colorFormats = ['hex', 'rgb', 'hsl']
const harmonies = ['complementary', 'analogous', 'triadic', 'tetradic', 'monochromatic']

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0]
}

const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2;
  let h, s = l;

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
      default: h = 0
    }
    h /= 6
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }).join('')
}

const generateHarmony = (hex: string, type: string): string[] => {
  const [h, s, l] = rgbToHsl(...hexToRgb(hex))
  switch (type) {
    case 'complementary':
      return [hex, rgbToHex(...hslToRgb((h + 180) % 360, s, l))]
    case 'analogous':
      return [
        rgbToHex(...hslToRgb((h + 330) % 360, s, l)),
        hex,
        rgbToHex(...hslToRgb((h + 30) % 360, s, l))
      ]
    case 'triadic':
      return [
        hex,
        rgbToHex(...hslToRgb((h + 120) % 360, s, l)),
        rgbToHex(...hslToRgb((h + 240) % 360, s, l))
      ]
    case 'tetradic':
      return [
        hex,
        rgbToHex(...hslToRgb((h + 90) % 360, s, l)),
        rgbToHex(...hslToRgb((h + 180) % 360, s, l)),
        rgbToHex(...hslToRgb((h + 270) % 360, s, l))
      ]
    case 'monochromatic':
      return [
        rgbToHex(...hslToRgb(h, s, Math.max(0, l - 30))),
        hex,
        rgbToHex(...hslToRgb(h, s, Math.min(100, l + 30)))
      ]
    default:
      return [hex]
  }
}

export default function ColorPicker() {
  const [color, setColor] = useState('#FF5733')
  const [format, setFormat] = useState('hex')
  const [harmony, setHarmony] = useState('complementary')
  const [recentColors, setRecentColors] = useState<string[]>([])
  const [savedPalettes, setSavedPalettes] = useState<{ name: string; colors: string[] }[]>([])
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  useEffect(() => {
    if (!recentColors.includes(color)) {
      setRecentColors(prev => [color, ...prev].slice(0, 10))
    }
  }, [color])

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(text)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const savePalette = () => {
    const paletteName = prompt('Enter a name for this palette:')
    if (paletteName) {
      setSavedPalettes(prev => [...prev, { name: paletteName, colors: generateHarmony(color, harmony) }])
    }
  }

  const deletePalette = (index: number) => {
    setSavedPalettes(prev => prev.filter((_, i) => i !== index))
  }

  const getFormattedColor = (hex: string): string => {
    const [r, g, b] = hexToRgb(hex)
    switch (format) {
      case 'rgb':
        return `rgb(${r}, ${g}, ${b})`
      case 'hsl':
        const [h, s, l] = rgbToHsl(r, g, b)
        return `hsl(${h}, ${s}%, ${l}%)`
      default:
        return hex
    }
  }

  return (
    <div className="container mx-auto space-y-6">


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Color Selection</CardTitle>
            <CardDescription>Choose your color</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <Input
                  type="color"
                  value={color}
                  onChange={handleColorChange}
                  className="w-20 h-20"
                />
                <div className="flex-grow">
                  <Label htmlFor="color-input">Color Value</Label>
                  <Input
                    id="color-input"
                    value={getFormattedColor(color)}
                    onChange={(e) => setColor(e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="format-select">Color Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger id="format-select">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorFormats.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => copyToClipboard(getFormattedColor(color))}>
                    <Copy className="mr-2 h-4 w-4" />
                    {copiedColor === getFormattedColor(color) ? 'Copied!' : 'Copy'}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy color to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Color Harmony</CardTitle>
            <CardDescription>Explore color harmonies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="harmony-select">Harmony Type</Label>
                <Select value={harmony} onValueChange={setHarmony}>
                  <SelectTrigger id="harmony-select">
                    <SelectValue placeholder="Select harmony" />
                  </SelectTrigger>
                  <SelectContent>
                    {harmonies.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h.charAt(0).toUpperCase() + h.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-2">
                {generateHarmony(color, harmony).map((c, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="w-12 h-12 rounded-full"
                          style={{ backgroundColor: c }}
                          onClick={() => copyToClipboard(getFormattedColor(c))}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{getFormattedColor(c)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={savePalette}>
              <Plus className="mr-2 h-4 w-4" /> Save Palette
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-20">
            <div className="flex flex-wrap gap-2">
              {recentColors.map((c, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="w-10 h-10 rounded-full"
                        style={{ backgroundColor: c }}
                        onClick={() => setColor(c)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getFormattedColor(c)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saved Palettes</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-60">
            {savedPalettes.map((palette, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{palette.name}</h3>
                  <Button variant="ghost" size="sm" onClick={() => deletePalette(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {palette.colors.map((c, colorIndex) => (
                    <TooltipProvider key={colorIndex}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className="w-10 h-10 rounded-full"
                            style={{ backgroundColor: c }}
                            onClick={() => setColor(c)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{getFormattedColor(c)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
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
                <h4  className="font-medium leading-none">Help</h4>
                <p className="text-sm text-muted-foreground">
                  How to use the Color Picker:
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Palette className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    Use the color input or enter a value
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <RefreshCw className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    Change color format as needed
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Plus className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    Save color palettes for later use
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Copy className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    Click on colors to copy their values
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