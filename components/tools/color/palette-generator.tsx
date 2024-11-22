'use client'

import React, { useState, useEffect } from 'react'
import { Shuffle, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { toast } from '@/hooks/use-toast'

const PaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState('#3b82f6')
  const [palette, setPalette] = useState<string[]>([])
  const [paletteSize, setPaletteSize] = useState(5)

  const generatePalette = (color: string) => {
    const hsl = hexToHSL(color)
    const newPalette = []
    for (let i = 0; i < paletteSize; i++) {
      const lightness = 90 - (i * (80 / (paletteSize - 1)))
      newPalette.push(hslToHex(hsl.h, hsl.s, lightness))
    }
    setPalette(newPalette)
  }

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16)
    setBaseColor(`#${randomColor.padStart(6, '0')}`)
  }

  const hexToHSL = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

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

    return { h: h * 360, s: s * 100, l: l * 100 }
}


  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${text} has been copied to clipboard.`,
    })
  }

  useEffect(() => {
    generatePalette(baseColor)
  }, [baseColor, paletteSize])

  return (
    <div className="container mx-auto">
     
      <div className="mb-6">
        <label htmlFor="baseColor" className="block text-sm font-medium mb-2">Base Color</label>
        <div className="flex items-center space-x-4">
          <Input
            type="color"
            id="baseColor"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-16 h-16 p-1 rounded"
          />
          <Input
            type="text"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-32"
          />
          <Button onClick={generateRandomColor}>
            <Shuffle className="w-4 h-4 mr-2" />
            Random
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="paletteSize" className="block text-sm font-medium mb-2">Palette Size: {paletteSize}</label>
        <Slider
          id="paletteSize"
          min={3}
          max={10}
          step={1}
          value={[paletteSize]}
          onValueChange={(value) => setPaletteSize(value[0])}
          className="w-full max-w-xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {palette.map((color, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="h-32 w-full" 
              style={{ backgroundColor: color }}
            ></div>
            <div className="p-4">
              <p className="text-lg font-semibold mb-2">{color}</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(color)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaletteGenerator