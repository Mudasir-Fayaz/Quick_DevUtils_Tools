"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent,  CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {  Check, X,  Download, HelpCircle, Palette, RefreshCw, Eye, Sun, Moon } from 'lucide-react'

const hexToRgb = (hex: string): [number, number, number] | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b)

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null
}


const calculateLuminance = (r: number, g: number, b: number): number => {
  const [rr, gg, bb] = [r, g, b].map(c => {
    c /= 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb
}

const calculateContrastRatio = (l1: number, l2: number): number => {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

const getContrastRating = (ratio: number): { aa: string; aaa: string } => {
  return {
    aa: ratio >= 4.5 ? 'Pass' : 'Fail',
    aaa: ratio >= 7 ? 'Pass' : 'Fail',
  }
}

export default function ColorContrast() {
  const [textColor, setTextColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [contrastRatio, setContrastRatio] = useState(21)
  const [rating, setRating] = useState({ aa: 'Pass', aaa: 'Pass' })
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState('normal')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [sampleText, setSampleText] = useState('The quick brown fox jumps over the lazy dog')
  const [recentChecks, setRecentChecks] = useState<{ text: string; bg: string }[]>([])

  useEffect(() => {
    const textRgb = hexToRgb(textColor)
    const bgRgb = hexToRgb(bgColor)
    if (textRgb && bgRgb) {
      const textLuminance = calculateLuminance(...textRgb)
      const bgLuminance = calculateLuminance(...bgRgb)
      const ratio = calculateContrastRatio(textLuminance, bgLuminance)
      setContrastRatio(ratio)
      setRating(getContrastRating(ratio))
      
      // Add to recent checks
      setRecentChecks(prev => {
        const newCheck = { text: textColor, bg: bgColor }
        return [newCheck, ...prev.filter(check => 
          check.text !== newCheck.text || check.bg !== newCheck.bg
        )].slice(0, 5)
      })
    }
  }, [textColor, bgColor])

  const handleColorChange = (type: 'text' | 'bg', value: string) => {
    if (type === 'text') {
      setTextColor(value)
    } else {
      setBgColor(value)
    }
  }

  const swapColors = () => {
    const temp = textColor
    setTextColor(bgColor)
    setBgColor(temp)
  }


  const downloadResults = () => {
    const results = `
      Text Color: ${textColor}
      Background Color: ${bgColor}
      Contrast Ratio: ${contrastRatio.toFixed(2)}
      AA Compliance: ${rating.aa}
      AAA Compliance: ${rating.aaa}
    `
    const blob = new Blob([results], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'contrast_check_results.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`container mx-auto space-y-6`}>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Text Color</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                type="color"
                value={textColor}
                onChange={(e) => handleColorChange('text', e.target.value)}
                className="w-20 h-20"
              />
              <div className="flex-grow">
                <Label htmlFor="text-color-input">HEX Value</Label>
                <Input
                  id="text-color-input"
                  value={textColor}
                  onChange={(e) => handleColorChange('text', e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Background Color</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                type="color"
                value={bgColor}
                onChange={(e) => handleColorChange('bg', e.target.value)}
                className="w-20 h-20"
              />
              <div className="flex-grow">
                <Label htmlFor="bg-color-input">HEX Value</Label>
                <Input
                  id="bg-color-input"
                  value={bgColor}
                  onChange={(e) => handleColorChange('bg', e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contrast Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Contrast Ratio:</span>
              <span className="font-bold text-2xl">{contrastRatio.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>AA Compliance:</span>
              <span className={`font-bold ${rating.aa === 'Pass' ? 'text-green-500' : 'text-red-500'}`}>
                {rating.aa === 'Pass' ? <Check className="inline mr-1" /> : <X className="inline mr-1" />}
                {rating.aa}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>AAA Compliance:</span>
              <span className={`font-bold ${rating.aaa === 'Pass' ? 'text-green-500' : 'text-red-500'}`}>
                {rating.aaa === 'Pass' ? <Check className="inline mr-1" /> : <X className="inline mr-1" />}
                {rating.aaa}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={swapColors}>
            <RefreshCw className="mr-2 h-4 w-4" /> Swap Colors
          </Button>
          <Button onClick={downloadResults}>
            <Download className="mr-2 h-4 w-4" /> Download Results
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sample Text</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-grow">
                <Label htmlFor="sample-text">Sample Text</Label>
                <Input
                  id="sample-text"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="font-size">Font Size</Label>
                <Select value={fontSize.toString()} onValueChange={(value) => setFontSize(parseInt(value))}>
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {[12, 14, 16, 18, 20, 24, 28, 32].map((size) => (
                      <SelectItem key={size} value={size.toString()}>{size}px</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="font-weight">Font Weight</Label>
                <Select value={fontWeight} onValueChange={setFontWeight}>
                  <SelectTrigger id="font-weight">
                    <SelectValue placeholder="Select weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div 
              className="p-4 rounded-md"
              style={{ 
                backgroundColor: bgColor, 
                color: textColor,
                fontSize: `${fontSize}px`,
                fontWeight: fontWeight
              }}
            >
              {sampleText}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Checks</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-20">
            <div className="flex flex-wrap gap-2">
              {recentChecks.map((check, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-10 h-10 p-0"
                        style={{ backgroundColor: check.bg, border: `2px solid ${check.text}` }}
                        onClick={() => {
                          setTextColor(check.text)
                          setBgColor(check.bg)
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Text: {check.text}, BG: {check.bg}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="fixed bottom-4 right-4 space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle dark mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Help</h4>
                <p className="text-sm text-muted-foreground">
                  How to use the Color Contrast Checker:
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Palette className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    Choose text and background colors
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Eye  className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    View contrast ratio and compliance
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <RefreshCw className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    Swap colors to test different combinations
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Download className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    Download results for documentation
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