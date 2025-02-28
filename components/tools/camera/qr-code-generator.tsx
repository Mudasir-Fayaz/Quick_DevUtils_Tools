'use client'

import React, { useState, useCallback, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const errorCorrectionLevels = ['L', 'M', 'Q', 'H']

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://example.com')
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [errorCorrection, setErrorCorrection] = useState('M')
  const [size, setSize] = useState(256)
  const qrRef = useRef<HTMLDivElement>(null)

  const handleDownload = useCallback((format: 'png' | 'svg' | 'jpeg') => {
    if (!qrRef.current) return

    const svg = qrRef.current.querySelector('svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = size
      canvas.height = size
      ctx?.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL(`image/${format}`)
      const link = document.createElement('a')
      link.download = `qrcode.${format}`
      link.href = dataURL
      link.click()
    }

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
  }, [size])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="qr-text">QR Code Text</Label>
          <Input
            id="qr-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fg-color">Foreground Color</Label>
          <Input
            id="fg-color"
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bg-color">Background Color</Label>
          <Input
            id="bg-color"
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Error Resistance</Label>
          <Select value={errorCorrection} onValueChange={setErrorCorrection}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {errorCorrectionLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Size: {size}x{size}</Label>
          <Slider
            min={128}
            max={512}
            step={8}
            value={[size]}
            onValueChange={(value) => setSize(value[0])}
          />
        </div>
        <motion.div
          ref={qrRef}
          className="flex justify-center items-center p-4 bg-white rounded-lg"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <QRCodeSVG
            value={text}
            size={size}
            fgColor={fgColor}
            bgColor={bgColor}
            level={errorCorrection as any}
            includeMargin
          />
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-2">
        <Button onClick={() => handleDownload('png')}>PNG</Button>
        <Button onClick={() => handleDownload('svg')}>SVG</Button>
        <Button onClick={() => handleDownload('jpeg')}>JPEG</Button>
      </CardFooter>
    </Card>
  )
}

