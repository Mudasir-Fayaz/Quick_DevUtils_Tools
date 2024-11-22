"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Copy, Download, RefreshCw, Image as ImageIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ASCII art fonts (simplified for this example)
const asciiFonts = {
  standard: (text: string) => text,
  block: (text: string) => text.split('').map(char => char.toUpperCase().repeat(2)).join(''),
  shadow: (text: string) => text.split('').map(char => `${char}\\`).join(''),
  slant: (text: string) => text.split('').map(char => `/${char}`).join(''),
  digital: (text: string) => text.split('').map(char => `[${char}]`).join(''),
}

export default function AsciiArt() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [font, setFont] = useState("standard")
  const [alignment, setAlignment] = useState("left")
  const [width, setWidth] = useState(80)
  const [color, setColor] = useState("default")
  const [charSet, setCharSet] = useState("#*o.")
  const [fontSize, setFontSize] = useState(14)
  const [error, setError] = useState<string | null>(null)

  const convertTextToAscii = (text: string, selectedFont: keyof typeof asciiFonts, align: string, maxWidth: number, textColor: string, characters: string) => {
    try {
      let asciiArt = asciiFonts[selectedFont](text)

      // Apply custom character set
      if (selectedFont === "standard") {
        asciiArt = text.split('').map(() => characters[Math.floor(Math.random() * characters.length)]).join('')
      }

      // Apply alignment
      asciiArt = asciiArt.split('\n').map(line => {
        if (align === "center") {
          return line.padStart((maxWidth + line.length) / 2).padEnd(maxWidth)
        } else if (align === "right") {
          return line.padStart(maxWidth)
        }
        return line.padEnd(maxWidth)
      }).join('\n')

      // Apply color (in this example, we're just wrapping the text in color tags)
      if (textColor !== "default") {
        asciiArt = `<span style="color: ${textColor}">${asciiArt}</span>`
      }

      setOutput(asciiArt)
      setError(null)
    } catch (err) {
      setError((err as Error).message)
      setOutput("")
    }
  }

  useEffect(() => {
    convertTextToAscii(input, font as keyof typeof asciiFonts, alignment, width, color, charSet)
  }, [input, font, alignment, width, color, charSet])

  const handleClear = () => {
    setInput("")
    setOutput("")
    setError(null)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    toast({
      title: "Copied to clipboard",
      description: "The ASCII art has been copied to your clipboard.",
    })
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ascii_art.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImageDownload = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = width * 10
    canvas.height = output.split('\n').length * fontSize

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = color === "default" ? "black" : color
    ctx.font = `${fontSize}px monospace`
    output.split('\n').forEach((line, i) => {
      ctx.fillText(line, 10, (i + 1) * fontSize)
    })

    const dataUrl = canvas.toDataURL("image/png")
    const a = document.createElement("a")
    a.href = dataUrl
    a.download = "ascii_art.png"
    a.click()
  }

  return (
    <div className="container mx-auto space-y-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center"></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="input" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>
            <TabsContent value="input">
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your text here"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={3}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="font">Font Style</Label>
                    <Select value={font} onValueChange={setFont}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(asciiFonts).map((fontName) => (
                          <SelectItem key={fontName} value={fontName}>{fontName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="alignment">Alignment</Label>
                    <Select value={alignment} onValueChange={setAlignment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select alignment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="width">Width: {width} characters</Label>
                  <Slider
                    id="width"
                    min={20}
                    max={120}
                    step={1}
                    value={[width]}
                    onValueChange={(value) => setWidth(value[0])}
                  />
                </div>
                <div>
                  <Label htmlFor="color">Text Color</Label>
                  <Select value={color} onValueChange={setColor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="charSet">Custom Character Set</Label>
                  <Input
                    id="charSet"
                    value={charSet}
                    onChange={(e) => setCharSet(e.target.value)}
                    placeholder="Enter custom characters"
                  />
                </div>
                <div>
                  <Label htmlFor="fontSize">Font Size: {fontSize}px</Label>
                  <Slider
                    id="fontSize"
                    min={8}
                    max={24}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="output">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 flex items-center mb-4"
                  >
                    <AlertCircle className="mr-2 h-4 w-4" /> {error}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="bg-secondary p-4 rounded-md overflow-x-auto">
                <pre className="whitespace-pre-wrap break-all" style={{ fontSize: `${fontSize}px` }}>{output}</pre>
              </div>
              <div className="flex flex-wrap justify-between mt-4 gap-2">
                <Button onClick={handleClear} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" /> Clear
                </Button>
                <Button onClick={handleCopy} variant="outline">
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                <Button onClick={handleDownload} variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Download Text
                </Button>
                <Button onClick={handleImageDownload} variant="outline">
                  <ImageIcon className="mr-2 h-4 w-4" /> Download Image
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}