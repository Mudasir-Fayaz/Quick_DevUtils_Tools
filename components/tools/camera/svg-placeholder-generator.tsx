'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Download } from 'lucide-react'

const defaultWidth = 600
const defaultHeight = 350

function generateSVG(props: SVGProps): string {
  const { width, height, backgroundColor, textColor, fontSize, text, useExactSize } = props
  const svgWidth = useExactSize ? width : '100%'
  const svgHeight = useExactSize ? height : '100%'
  const viewBox = `0 0 ${width} ${height}`

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="${viewBox}">
      <rect width="100%" height="100%" fill="${backgroundColor}" />
      <text
        x="50%"
        y="50%"
        font-family="Arial, sans-serif"
        font-size="${fontSize}"
        fill="${textColor}"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${text}
      </text>
    </svg>
  `.trim()
}

interface SVGProps {
  width: number
  height: number
  backgroundColor: string
  textColor: string
  fontSize: number
  text: string
  useExactSize: boolean
}

export default function SvgPlaceholderGenerator() {
  const [svgProps, setSvgProps] = useState<SVGProps>({
    width: defaultWidth,
    height: defaultHeight,
    backgroundColor: '#cccccc',
    textColor: '#333333',
    fontSize: 24,
    text: `${defaultWidth}x${defaultHeight}`,
    useExactSize: false,
  })

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSvgProps(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSwitchChange = useCallback((checked: boolean) => {
    setSvgProps(prev => ({ ...prev, useExactSize: checked }))
  }, [])

  const svgString = useMemo(() => generateSVG(svgProps), [svgProps])
  const svgBase64 = useMemo(() => btoa(svgString), [svgString])

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }, [])

  const downloadSVG = useCallback(() => {
    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'placeholder.svg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [svgString])

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width (in px)</Label>
            <Input
              id="width"
              name="width"
              type="number"
              value={svgProps.width}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (in px)</Label>
            <Input
              id="height"
              name="height"
              type="number"
              value={svgProps.height}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color</Label>
            <Input
              id="backgroundColor"
              name="backgroundColor"
              type="color"
              value={svgProps.backgroundColor}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="textColor">Text Color</Label>
            <Input
              id="textColor"
              name="textColor"
              type="color"
              value={svgProps.textColor}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fontSize">Font Size</Label>
            <Input
              id="fontSize"
              name="fontSize"
              type="number"
              value={svgProps.fontSize}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Custom Text</Label>
            <Input
              id="text"
              name="text"
              value={svgProps.text}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="useExactSize"
            checked={svgProps.useExactSize}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="useExactSize">Use exact size</Label>
        </div>
        <div className="space-y-2">
          <Label>SVG Preview</Label>
          <motion.div
            className="border rounded-lg p-4 flex justify-center items-center bg-gray-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div dangerouslySetInnerHTML={{ __html: svgString }} />
          </motion.div>
        </div>
        <div className="space-y-2">
          <Label>SVG HTML Element</Label>
          <Textarea
            value={svgString}
            readOnly
            className="font-mono text-sm"
            rows={5}
          />
        </div>
        <div className="space-y-2">
          <Label>SVG in Base64</Label>
          <Textarea
            value={`data:image/svg+xml;base64,${svgBase64}`}
            readOnly
            className="font-mono text-sm"
            rows={3}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={() => copyToClipboard(svgString)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy SVG
          </Button>
          <Button onClick={() => copyToClipboard(`data:image/svg+xml;base64,${svgBase64}`)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Base64
          </Button>
          <Button onClick={downloadSVG}>
            <Download className="mr-2 h-4 w-4" />
            Download SVG
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
