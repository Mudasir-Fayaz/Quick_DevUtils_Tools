"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Copy, Download, RefreshCw } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"

// ASCII art fonts (simplified for this example)
const asciiFonts = {
  standard: (text: string) => text,
  block: (text: string) => text.split('').map(char => char.toUpperCase().repeat(2)).join(''),
  shadow: (text: string) => text.split('').map(char => `${char}\\`).join(''),
  slant: (text: string) => text.split('').map(char => `/${char}`).join(''),
  small: (text: string) => text.toLowerCase(),
  big: (text: string) => text.toUpperCase(),
}

export default function TextAscii() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [font, setFont] = useState("standard")
  const [alignment, setAlignment] = useState("left")
  const [width, setWidth] = useState(80)
  const [color, setColor] = useState("default")
  const [caseSensitive, setCaseSensitive] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const convertTextToAscii = (text: string, selectedFont: keyof typeof asciiFonts, align: string, maxWidth: number, textColor: string, caseSens: boolean) => {
    try {
      const processedText = caseSens ? text : text.toLowerCase()
      let asciiArt = asciiFonts[selectedFont](processedText)

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
    convertTextToAscii(input, font as keyof typeof asciiFonts, alignment, width, color, caseSensitive)
  }, [input, font, alignment, width, color, caseSensitive])

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

  return (
    <div className="container mx-auto space-y-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center"></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <div className="flex items-center space-x-2">
            <Switch
              id="case-sensitive"
              checked={caseSensitive}
              onCheckedChange={setCaseSensitive}
            />
            <Label htmlFor="case-sensitive">Case Sensitive</Label>
          </div>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 flex items-center"
              >
                <AlertCircle className="mr-2 h-4 w-4" /> {error}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="bg-secondary p-4 rounded-md">
            <pre className="whitespace-pre-wrap break-all">{output}</pre>
          </div>
          <div className="flex justify-between">
            <Button onClick={handleClear} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Clear
            </Button>
            <Button onClick={handleCopy} variant="outline">
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button onClick={handleDownload} variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}