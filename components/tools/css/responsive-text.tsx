'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TooltipProvider} from '@/components/ui/tooltip'
import {Smartphone, Tablet, Monitor, Download, Copy,  AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline } from 'lucide-react'

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

type BreakpointKey = keyof typeof breakpoints
type TextStyle = {
  fontSize: number
  fontFamily: string
  lineHeight: number
  letterSpacing: number
  fontWeight: number
  textAlign: 'left' | 'center' | 'right' | 'justify'
  color: string
  textShadow: string
  padding: number
  margin: number
}

export default function ResponsiveTextTester() {
  const [text, setText] = useState('Enter your text here to test responsiveness')
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointKey>('lg')
  const [styles, setStyles] = useState<Record<BreakpointKey, TextStyle>>({
    sm: { fontSize: 14, fontFamily: 'Arial', lineHeight: 1.5, letterSpacing: 0, fontWeight: 400, textAlign: 'left', color: '#000000', textShadow: 'none', padding: 10, margin: 0 },
    md: { fontSize: 16, fontFamily: 'Arial', lineHeight: 1.5, letterSpacing: 0, fontWeight: 400, textAlign: 'left', color: '#000000', textShadow: 'none', padding: 15, margin: 0 },
    lg: { fontSize: 18, fontFamily: 'Arial', lineHeight: 1.6, letterSpacing: 0, fontWeight: 400, textAlign: 'left', color: '#000000', textShadow: 'none', padding: 20, margin: 0 },
    xl: { fontSize: 20, fontFamily: 'Arial', lineHeight: 1.7, letterSpacing: 0, fontWeight: 400, textAlign: 'left', color: '#000000', textShadow: 'none', padding: 25, margin: 0 },
  })
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [showGrid, setShowGrid] = useState(false)
  const [containerWidth, setContainerWidth] = useState(100)
  const [characterLimit, setCharacterLimit] = useState(280)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleStyleChange = (property: keyof TextStyle, value: number | string) => {
    setStyles(prevStyles => ({
      ...prevStyles,
      [currentBreakpoint]: {
        ...prevStyles[currentBreakpoint],
        [property]: value,
      },
    }))
  }

  const handleBreakpointChange = (breakpoint: BreakpointKey) => {
    setCurrentBreakpoint(breakpoint)
  }

  const getResponsiveStyle = () => {
    const baseStyle = styles[currentBreakpoint]
    return {
      ...baseStyle,
      fontWeight: isBold ? 700 : baseStyle.fontWeight,
      fontStyle: isItalic ? 'italic' : 'normal',
      textDecoration: isUnderline ? 'underline' : 'none',
    }
  }

  const exportCSS = () => {
    let css = ''
    Object.entries(styles).forEach(([breakpoint, style]) => {
      css += `@media (min-width: ${breakpoints[breakpoint as BreakpointKey]}px) {\n`
      css += '  .responsive-text {\n'
      Object.entries(style).forEach(([property, value]) => {
        css += `    ${property.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}: ${value}${property === 'fontSize' ? 'px' : ''};\n`
      })
      css += '  }\n'
      css += '}\n\n'
    })
    return css
  }

  const handleExportCSS = () => {
    const css = exportCSS()
    const blob = new Blob([css], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'responsive-text-styles.css'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyCSS = () => {
    const css = exportCSS()
    navigator.clipboard.writeText(css)
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold"></CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={currentBreakpoint} onValueChange={(value) => handleBreakpointChange(value as BreakpointKey)}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="sm"><Smartphone className="mr-2 h-4 w-4" /> SM</TabsTrigger>
                  <TabsTrigger value="md"><Tablet className="mr-2 h-4 w-4" /> MD</TabsTrigger>
                  <TabsTrigger value="lg"><Monitor className="mr-2 h-4 w-4" /> LG</TabsTrigger>
                  <TabsTrigger value="xl"><Monitor className="mr-2 h-4 w-4" /> XL</TabsTrigger>
                </TabsList>
              </div>
              {Object.keys(breakpoints).map((breakpoint) => (
                <TabsContent key={breakpoint} value={breakpoint}>
                  <div 
                    className={`border p-4 rounded-md overflow-auto ${showGrid ? 'bg-grid' : ''}`} 
                    style={{ 
                      width: `${containerWidth}%`,
                      height: '200px',
                      ...getResponsiveStyle(),
                    }}
                  >
                    {text}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <div className="mt-4">
              <Textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Enter your text here..."
                className="w-full mb-2"
              />
              <div className="flex justify-between items-center">
                <span>Characters: {text.length} / {characterLimit}</span>
                <span>Words: {text.trim().split(/\s+/).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Style Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">Font Size</label>
                <Slider
                  id="fontSize"
                  min={8}
                  max={72}
                  step={1}
                  value={[styles[currentBreakpoint].fontSize]}
                  onValueChange={(value) => handleStyleChange('fontSize', value[0])}
                  className="w-full"
                />
                <span>{styles[currentBreakpoint].fontSize}px</span>
              </div>
              <div>
                <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700">Font Family</label>
                <Select onValueChange={(value) => handleStyleChange('fontFamily', value)} defaultValue={styles[currentBreakpoint].fontFamily}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Helvetica">Helvetica</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    <SelectItem value="Courier New">Courier New</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="lineHeight" className="block text-sm font-medium text-gray-700">Line Height</label>
                <Slider
                  id="lineHeight"
                  min={1}
                  max={3}
                  step={0.1}
                  value={[styles[currentBreakpoint].lineHeight]}
                  onValueChange={(value) => handleStyleChange('lineHeight', value[0])}
                  className="w-full"
                />
                <span>{styles[currentBreakpoint].lineHeight}</span>
              </div>
              <div>
                <label htmlFor="letterSpacing" className="block text-sm font-medium text-gray-700">Letter Spacing</label>
                <Slider
                  id="letterSpacing"
                  min={-5}
                  max={10}
                  step={0.5}
                  value={[styles[currentBreakpoint].letterSpacing]}
                  onValueChange={(value) => handleStyleChange('letterSpacing', value[0])}
                  className="w-full"
                />
                <span>{styles[currentBreakpoint].letterSpacing}px</span>
              </div>
              <div>
                <label htmlFor="fontWeight" className="block text-sm font-medium text-gray-700">Font Weight</label>
                <Slider
                  id="fontWeight"
                  min={100}
                  max={900}
                  step={100}
                  value={[styles[currentBreakpoint].fontWeight]}
                  onValueChange={(value) => handleStyleChange('fontWeight', value[0])}
                  className="w-full"
                />
                <span>{styles[currentBreakpoint].fontWeight}</span>
              </div>
              <div>
                <label htmlFor="textAlign" className="block text-sm font-medium text-gray-700">Text Align</label>
                <div className="flex space-x-2">
                  <Button onClick={() => handleStyleChange('textAlign', 'left')}><AlignLeft className="h-4 w-4" /></Button>
                  <Button onClick={() => handleStyleChange('textAlign', 'center')}><AlignCenter className="h-4 w-4" /></Button>
                  <Button onClick={() => handleStyleChange('textAlign', 'right')}><AlignRight className="h-4 w-4" /></Button>
                  <Button onClick={() => handleStyleChange('textAlign', 'justify')}><AlignJustify className="h-4 w-4" /></Button>
                </div>
              </div>
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700">Text Color</label>
                <Input
                  type="color"
                  id="color"
                  value={styles[currentBreakpoint].color}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="w-full h-10"
                />
              </div>
              <div>
                <label htmlFor="textShadow" className="block text-sm font-medium text-gray-700">Text Shadow</label>
                <Input
                  type="text"
                  id="textShadow"
                  value={styles[currentBreakpoint].textShadow}
                  onChange={(e) => handleStyleChange('textShadow', e.target.value)}
                  placeholder="e.g., 1px 1px 2px #000"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="padding" className="block text-sm font-medium text-gray-700">Padding</label>
                <Slider
                  id="padding"
                  min={0}
                  max={50}
                  step={1}
                  value={[styles[currentBreakpoint].padding]}
                  onValueChange={(value) => handleStyleChange('padding', value[0])}
                  className="w-full"
                />
                <span>{styles[currentBreakpoint].padding}px</span>
              </div>
              <div>
                <label htmlFor="margin" className="block text-sm font-medium text-gray-700">Margin</label>
                <Slider
                  id="margin"
                  min={0}
                  max={50}
                  step={1}
                  value={[styles[currentBreakpoint].margin]}
                  onValueChange={(value) => handleStyleChange('margin', value[0])}
                  className="w-full"
                />
                <span>{styles[currentBreakpoint].margin}px</span>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => setIsBold(!isBold)}><Bold className="h-4 w-4" /></Button>
              <Button onClick={() => setIsItalic(!isItalic)}><Italic className="h-4 w-4" /></Button>
              <Button onClick={() => setIsUnderline(!isUnderline)}><Underline className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Advanced Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="containerWidth" className="block text-sm font-medium text-gray-700">Container Width</label>
                <Slider
                  id="containerWidth"
                  min={10}
                  max={100}
                  step={1}
                  value={[containerWidth]}
                  onValueChange={(value) => setContainerWidth(value[0])}
                  className="w-full"
                />
                <span>{containerWidth}%</span>
              </div>
              <div>
                <label htmlFor="characterLimit" className="block text-sm font-medium text-gray-700">Character Limit</label>
                <Input
                  type="number"
                  id="characterLimit"
                  value={characterLimit}
                  onChange={(e) => setCharacterLimit(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="showGrid" checked={showGrid} onCheckedChange={setShowGrid} />
                <label htmlFor="showGrid">Show Grid</label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button onClick={handleExportCSS}><Download className="mr-2 h-4 w-4" /> Export CSS</Button>
              <Button onClick={handleCopyCSS}><Copy className="mr-2 h-4 w-4" /> Copy CSS</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}