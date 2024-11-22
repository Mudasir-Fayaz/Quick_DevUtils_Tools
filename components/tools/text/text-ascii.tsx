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
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, HelpCircle, Shuffle  } from 'lucide-react'
type Font = 'Standard' | 'Block' | '3D' | 'Script' | 'Bubble'
type Size = 'Small' | 'Medium' | 'Large'
type Alignment = 'Left' | 'Center' | 'Right'
type ColorMode = 'plain' | 'colored'

// Mock ASCII art generation function (replace with actual library)
const generateAsciiArt = (text: string, font: Font, size: Size): string => {
  if(!font && !size) {
    font = 'Standard'
    size = 'Medium'
  }
  // This is a placeholder. In a real implementation, you'd use a proper ASCII art library.
  const asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.']
  return text.split('').map(() => 
    asciiChars[Math.floor(Math.random() * asciiChars.length)]
  ).join('')
}

const fonts: Font[] = ['Standard', 'Block', '3D', 'Script', 'Bubble']
const sizes: Size[] = ['Small', 'Medium', 'Large']
const alignments: Alignment[] = ['Left', 'Center', 'Right']

export default function TextAscii() {
  const [inputText, setInputText] = useState<string>('Hello, ASCII!')
  const [asciiArt, setAsciiArt] = useState<string>('')
  const [font, setFont] = useState<Font>(fonts[0])
  const [size, setSize] = useState<Size>(sizes[1])
  const [alignment, setAlignment] = useState<Alignment>(alignments[0])
  const [customChar, setCustomChar] = useState<string>('')
  const [colorMode, setColorMode] = useState<ColorMode>('plain')
  const [recentCreations, setRecentCreations] = useState<string[]>([])

  useEffect(() => {
    generateArt()
  }, [inputText, font, size, alignment, customChar, colorMode])

  const generateArt = (): void => {
    const art = generateAsciiArt(inputText, font, size)
    setAsciiArt(art)
    setRecentCreations(prev => [art, ...prev].slice(0, 5))
  }

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(asciiArt)
  }

  const downloadAsciiArt = (): void => {
    const blob = new Blob([asciiArt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ascii-art.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const randomizeFont = (): void => {
    const randomFont: Font = fonts[Math.floor(Math.random() * fonts.length)]
    setFont(randomFont)
  }

  return (
    <div className="container mx-auto space-y-6">
     
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>Enter the text you want to convert to ASCII art</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here..."
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>ASCII Art Output</CardTitle>
            <CardDescription>Preview of your ASCII art</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full rounded border p-4">
              <pre className="whitespace-pre-wrap font-mono">{asciiArt}</pre>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy ASCII art to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={downloadAsciiArt}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download ASCII art as .txt file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ASCII Art Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="font">Font Style</Label>
              <Select value={font} onValueChange={(v:Font) => setFont(v)}>
                <SelectTrigger id="font">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map(f => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="size">Size</Label>
              <Select value={size} onValueChange={(v:Size) => setSize(v)}>
                <SelectTrigger id="size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="alignment">Alignment</Label>
              <Select value={alignment} onValueChange={(v:Alignment) => setAlignment(v)}>
                <SelectTrigger id="alignment">
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  {alignments.map(a => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="custom-char">Custom Character</Label>
              <Input
                id="custom-char"
                value={customChar}
                onChange={(e) => setCustomChar(e.target.value)}
                placeholder="Enter a custom character..."
                maxLength={1}
              />
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="color-mode">Color Mode</Label>
              <Select value={colorMode} onValueChange={(v: ColorMode) => setColorMode(v)}>
                <SelectTrigger id="color-mode">
                  <SelectValue placeholder="Select color mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plain">Plain</SelectItem>
                  <SelectItem value="colored">Colored</SelectItem>
                  <SelectItem value="inverted">Inverted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={randomizeFont} className="flex-1 min-w-[200px]">
              <Shuffle className="mr-2 h-4 w-4" /> Randomize Font
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Creations</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {recentCreations.map((art, index) => (
              <div key={index} className="mb-4 p-2 border rounded">
                <pre className="text-xs font-mono whitespace-pre-wrap">{art.substring(0, 100)}...</pre>
                <Button variant="ghost" size="sm" onClick={() => setAsciiArt(art)}>Use This</Button>
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
                <h4 className="font-medium leading-none">Help Guide</h4>
                <p className="text-sm text-muted-foreground">
                  Quick guide on how to use the ASCII Art Generator
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Enter Text</Label>
                  <div className="col-span-2 text-sm">
                    Type or paste your text in the input area
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Customize</Label>
                  <div className="col-span-2 text-sm">
                    Choose font, size, alignment, and other options
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Generate</Label>
                  <div className="col-span-2 text-sm">
                    ASCII art is generated automatically as you type or change options
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Export</Label>
                  <div className="col-span-2 text-sm">
                    Copy to clipboard or download the ASCII art
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