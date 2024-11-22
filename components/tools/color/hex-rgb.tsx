'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

function hexToRgb(hex: string): { r: number; g: number; b: number; a: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: result[4] ? Math.round((parseInt(result[4], 16) / 255) * 100) / 100 : 1
  } : null
}

function rgbToHex(r: number, g: number, b: number, a: number = 1): string {
  const toHex = (value: number) => {
    const hex = Math.round(value).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${a < 1 ? toHex(Math.round(a * 255)) : ''}`
}

export default function HexRgb() {
  const [hex, setHex] = useState('#000000')
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0, a: 1 })
  const [activeTab, setActiveTab] = useState('hex')

  useEffect(() => {
    if (activeTab === 'hex') {
      const result = hexToRgb(hex)
      if (result) setRgb(result)
    } else {
      setHex(rgbToHex(rgb.r, rgb.g, rgb.b, rgb.a))
    }
  }, [hex, rgb, activeTab])

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHex(e.target.value)
  }

  const handleRgbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRgb(prev => ({ ...prev, [name]: name === 'a' ? parseFloat(value) : parseInt(value) }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Color code copied to clipboard.",
    })
  }

  return (
    <Card className="w-full  mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center"></CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hex">HEX</TabsTrigger>
            <TabsTrigger value="rgb">RGB</TabsTrigger>
          </TabsList>
          <TabsContent value="hex" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={hex}
                onChange={handleHexChange}
                placeholder="#000000"
                className="font-mono"
              />
              <Input
                type="color"
                value={hex}
                onChange={handleHexChange}
                className="w-12 h-12 p-1 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label>RGB Value</Label>
              <div className="flex items-center space-x-2">
                <Input readOnly value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b}${rgb.a < 1 ? `, ${rgb.a}` : ''})`} className="font-mono" />
                <Button size="icon" variant="outline" onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b}${rgb.a < 1 ? `, ${rgb.a}` : ''})`)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="rgb" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="r">R</Label>
                <Input
                  type="number"
                  id="r"
                  name="r"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={handleRgbChange}
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor="g">G</Label>
                <Input
                  type="number"
                  id="g"
                  name="g"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={handleRgbChange}
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor="b">B</Label>
                <Input
                  type="number"
                  id="b"
                  name="b"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={handleRgbChange}
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor="a">A</Label>
                <Input
                  type="number"
                  id="a"
                  name="a"
                  min="0"
                  max="1"
                  step="0.01"
                  value={rgb.a}
                  onChange={handleRgbChange}
                  className="font-mono"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>HEX Value</Label>
              <div className="flex items-center space-x-2">
                <Input readOnly value={hex} className="font-mono" />
                <Button size="icon" variant="outline" onClick={() => copyToClipboard(hex)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-4 w-full h-24 rounded-md" style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})` }}></div>
      </CardContent>
    </Card>
  )
}