'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  Copy, Download, Save } from 'lucide-react'

type GradientType = 'linear' | 'radial' | 'conic'
type ColorStop = { color: string; position: number }

const CSSGradient = () => {
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: '#ff0000', position: 0 },
    { color: '#0000ff', position: 100 }
  ])
  const [angle, setAngle] = useState(90)
  const [shape, setShape] = useState<'circle' | 'ellipse'>('circle')
  const [size, setSize] = useState<'closest-side' | 'farthest-corner'>('farthest-corner')
  const [centerX, setCenterX] = useState(50)
  const [centerY, setCenterY] = useState(50)
  const [repeating, setRepeating] = useState(false)
  const [cssCode, setCssCode] = useState('')
  const [gradientHistory, setGradientHistory] = useState<string[]>([])
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updateGradient()
  }, [gradientType, colorStops, angle, shape, size, centerX, centerY, repeating])

  const updateGradient = () => {
    let gradientString = ''
    if (repeating) {
      gradientString += 'repeating-'
    }
    
    switch (gradientType) {
      case 'linear':
        gradientString += `linear-gradient(${angle}deg, ${colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`
        break
      case 'radial':
        gradientString += `radial-gradient(${shape} ${size} at ${centerX}% ${centerY}%, ${colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`
        break
      case 'conic':
        gradientString += `conic-gradient(from ${angle}deg at ${centerX}% ${centerY}%, ${colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`
        break
    }
    
    setCssCode(`background: ${gradientString};`)
    if (previewRef.current) {
      previewRef.current.style.background = gradientString
    }
  }

  const addColorStop = () => {
    setColorStops([...colorStops, { color: '#000000', position: 50 }])
  }

  const removeColorStop = (index: number) => {
    setColorStops(colorStops.filter((_, i) => i !== index))
  }

  const updateColorStop = (index: number, color: string, position: number) => {
    const newStops = [...colorStops]
    newStops[index] = { color, position }
    setColorStops(newStops)
  }

  const reverseGradient = () => {
    setColorStops([...colorStops].reverse())
  }

  const generateRandomGradient = () => {
    const randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`
    setColorStops([
      { color: randomColor(), position: 0 },
      { color: randomColor(), position: 100 }
    ])
    setAngle(Math.floor(Math.random() * 360))
  }

  const saveGradient = () => {
    setGradientHistory([cssCode, ...gradientHistory])
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode)
  }

  const downloadImage = () => {
    if (previewRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = previewRef.current.clientWidth
      canvas.height = previewRef.current.clientHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        colorStops.forEach(stop => gradient.addColorStop(stop.position / 100, stop.color))
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        const link = document.createElement('a')
        link.download = 'gradient.png'
        link.href = canvas.toDataURL()
        link.click()
      }
    }
  }

  return (
    <div className="container mx-auto">
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gradient Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Gradient Type</Label>
                <Select value={gradientType} onValueChange={(value: GradientType) => setGradientType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                    <SelectItem value="conic">Conic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {gradientType === 'linear' && (
                <div>
                  <Label>Angle</Label>
                  <Slider min={0} max={360} step={1} value={[angle]} onValueChange={([value]) => setAngle(value)} />
                  <span>{angle}°</span>
                </div>
              )}

              {gradientType === 'radial' && (
                <>
                  <div>
                    <Label>Shape</Label>
                    <Select value={shape} onValueChange={(value: 'circle' | 'ellipse') => setShape(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="circle">Circle</SelectItem>
                        <SelectItem value="ellipse">Ellipse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Size</Label>
                    <Select value={size} onValueChange={(value: 'closest-side' | 'farthest-corner') => setSize(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="closest-side">Closest Side</SelectItem>
                        <SelectItem value="farthest-corner">Farthest Corner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {(gradientType === 'radial' || gradientType === 'conic') && (
                <>
                  <div>
                    <Label>Center X</Label>
                    <Slider min={0} max={100} step={1} value={[centerX]} onValueChange={([value]) => setCenterX(value)} />
                    <span>{centerX}%</span>
                  </div>
                  <div>
                    <Label>Center Y</Label>
                    <Slider min={0} max={100} step={1} value={[centerY]} onValueChange={([value]) => setCenterY(value)} />
                    <span>{centerY}%</span>
                  </div>
                </>
              )}

              <div>
                <Label>Color Stops</Label>
                {colorStops.map((stop, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateColorStop(index, e.target.value, stop.position)}
                      className="w-8 h-8"
                    />
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={stop.position}
                      onChange={(e) => updateColorStop(index, stop.color, Number(e.target.value))}
                      className="w-16"
                    />
                    <Button variant="outline" size="sm" onClick={() => removeColorStop(index)}>Remove</Button>
                  </div>
                ))}
                <Button onClick={addColorStop} className="mt-2">Add Color Stop</Button>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="repeating" checked={repeating} onCheckedChange={setRepeating} />
                <Label htmlFor="repeating">Repeating Gradient</Label>
              </div>

              <div className="space-x-2">
                <Button onClick={reverseGradient}>Reverse Gradient</Button>
                <Button onClick={generateRandomGradient}>Random Gradient</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gradient Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={previewRef} className="w-full h-64 rounded-lg shadow-inner"></div>
            <div className="mt-4">
              <Label>CSS Code</Label>
              <div className="relative">
                <pre className="bg-gray-100 p-2 rounded-lg overflow-x-auto">
                  <code>{cssCode}</code>
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={copyToClipboard}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4 space-x-2">
              <Button onClick={saveGradient}>
                <Save className="w-4 h-4 mr-2" />
                Save Gradient
              </Button>
              <Button onClick={downloadImage}>
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Gradient History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gradientHistory.map((gradient, index) => (
              <div
                key={index}
                className="h-24 rounded-lg shadow-inner cursor-pointer"
                style={{ background: gradient.split(': ')[1] }}
                onClick={() => setCssCode(gradient)}
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CSSGradient