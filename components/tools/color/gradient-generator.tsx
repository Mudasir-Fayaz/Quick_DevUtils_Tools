'use client'

import React, { useState, useEffect } from 'react'
import { Copy, Plus, Minus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from '@/hooks/use-toast'

type GradientStop = {
  color: string
  position: number
}

type GradientType = 'linear' | 'radial' | 'conic'

const presetGradients = [
  { name: 'Sunset', stops: [{ color: '#ff7e5f', position: 0 }, { color: '#feb47b', position: 100 }] },
  { name: 'Ocean', stops: [{ color: '#2193b0', position: 0 }, { color: '#6dd5ed', position: 100 }] },
  { name: 'Forest', stops: [{ color: '#11998e', position: 0 }, { color: '#38ef7d', position: 100 }] },
  { name: 'Lavender', stops: [{ color: '#834d9b', position: 0 }, { color: '#d04ed6', position: 100 }] },
]

export default function GradientGenerator() {
  const [stops, setStops] = useState<GradientStop[]>([
    { color: '#ff0000', position: 0 },
    { color: '#0000ff', position: 100 },
  ])
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [angle, setAngle] = useState(90)
  const [cssCode, setCssCode] = useState('')
  const [selectedStopIndex, setSelectedStopIndex] = useState(0)

  useEffect(() => {
    generateCssCode()
  }, [stops, gradientType, angle])

  const generateCssCode = () => {
    let gradient = ''
    if (gradientType === 'linear') {
      gradient = `linear-gradient(${angle}deg, ${stops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`
    } else if (gradientType === 'radial') {
      gradient = `radial-gradient(circle, ${stops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`
    } else if (gradientType === 'conic') {
      gradient = `conic-gradient(from ${angle}deg, ${stops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`
    }
    setCssCode(`background: ${gradient};`)
  }

  const addStop = () => {
    if (stops.length < 5) {
      const newPosition = Math.round((stops[stops.length - 1].position + stops[stops.length - 2].position) / 2)
      setStops([...stops, { color: '#ffffff', position: newPosition }])
    }
  }

  const removeStop = (index: number) => {
    if (stops.length > 2) {
      setStops(stops.filter((_, i) => i !== index))
      if (selectedStopIndex === index) {
        setSelectedStopIndex(0)
      }
    }
  }

  const updateStopColor = (color: string) => {
    setStops(stops.map((stop, index) => 
      index === selectedStopIndex ? { ...stop, color } : stop
    ))
  }

  const updateStopPosition = (position: number) => {
    setStops(stops.map((stop, index) => 
      index === selectedStopIndex ? { ...stop, position } : stop
    ))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "CSS code copied to clipboard.",
    })
  }

  const setPresetGradient = (preset: typeof presetGradients[0]) => {
    setStops(preset.stops)
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  return (
    <div className="mx-auto space-y-6">

      <div className="flex flex-wrap gap-4">
        <Select value={gradientType} onValueChange={(value: GradientType) => setGradientType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Gradient type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="linear">Linear</SelectItem>
            <SelectItem value="radial">Radial</SelectItem>
            <SelectItem value="conic">Conic</SelectItem>
          </SelectContent>
        </Select>

        {gradientType !== 'radial' && (
          <div className="flex items-center space-x-2">
            <Label htmlFor="angle-input">Angle:</Label>
            <Input
              id="angle-input"
              type="number"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-20"
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        {presetGradients.map((preset, index) => (
          <Button key={index} onClick={() => setPresetGradient(preset)}>
            {preset.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Color Stops</h2>
          {stops.map((stop, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <div
                className="w-8 h-8 rounded-full cursor-pointer"
                style={{ backgroundColor: stop.color }}
                onClick={() => setSelectedStopIndex(index)}
                role="button"
                tabIndex={0}
                aria-label={`Select color stop ${index + 1}`}
              ></div>
              <Input
                type="number"
                value={stop.position}
                onChange={(e) => {
                  const newPosition = Math.max(0, Math.min(100, Number(e.target.value)))
                  updateStopPosition(newPosition)
                }}
                className="w-20"
                aria-label={`Color stop ${index + 1} position`}
              />
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => removeStop(index)} 
                disabled={stops.length <= 2}
                aria-label={`Remove color stop ${index + 1}`}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addStop} disabled={stops.length >= 5}>
            <Plus className="h-4 w-4 mr-2" />
            Add Stop
          </Button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Color Picker</h2>
          <div className="mb-4">
            <Label htmlFor="color-picker">Select Color:</Label>
            <Input
              id="color-picker"
              type="color"
              value={stops[selectedStopIndex]?.color}
              onChange={(e) => updateStopColor(e.target.value)}
              className="w-full h-12"
            />
          </div>
          <div className="space-y-2">
            <Label>RGB:</Label>
            <div className="flex space-x-2">
              {['r', 'g', 'b'].map((channel) => (
                <Input
                  key={channel}
                  type="number"
                  min="0"
                  max="255"
                  value={hexToRgb(stops[selectedStopIndex].color)?.[channel as keyof ReturnType<typeof hexToRgb>] ?? 0}
                  onChange={(e) => {
                    const rgb = hexToRgb(stops[selectedStopIndex].color) ?? { r: 0, g: 0, b: 0 }
                    rgb[channel as keyof typeof rgb] = Number(e.target.value)
                    updateStopColor(rgbToHex(rgb.r, rgb.g, rgb.b))
                  }}
                  className="w-20"
                  aria-label={`${channel.toUpperCase()} value`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Gradient Preview</h2>
        <div
  className="w-full h-32 rounded-lg"
  style={{
    background: cssCode.includes(': ')
      ? cssCode.split(': ')[1].slice(0, -1)
      : '' // Provide a fallback in case the split fails
  }}
  role="img"
  aria-label="Gradient preview"
></div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">CSS Code</h2>
        <div className="relative">
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-black">
            <code>{cssCode}</code>
          </pre>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={() => copyToClipboard(cssCode)}
            aria-label="Copy CSS code"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}