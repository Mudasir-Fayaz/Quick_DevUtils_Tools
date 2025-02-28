"use client"

import { useState, useEffect, useRef } from "react"
import figlet, { type Fonts } from "figlet"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Copy, RefreshCw, Check } from "lucide-react"
import html2canvas from "html2canvas"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import asciiFonts from "@/data/ascii-fonts"
const colorPresets = [
  { bg: "bg-white", text: "text-black", name: "Light" },
  { bg: "bg-black", text: "text-green-500", name: "Matrix" },
  { bg: "bg-blue-950", text: "text-cyan-400", name: "Ocean" },
  { bg: "bg-purple-950", text: "text-pink-500", name: "Neon" },
  { bg: "bg-amber-950", text: "text-amber-500", name: "Retro" },
]

export default function AsciiArt() {
  const [input, setInput] = useState("ASCII ART")
  const [font, setFont] = useState("Standard")
  const [width, setWidth] = useState(80)
  const [output, setOutput] = useState("")
  const [errored, setErrored] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [colorScheme, setColorScheme] = useState(0)
  const [animateText, setAnimateText] = useState(true)
  const artRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    figlet.defaults({ fontPath: "//unpkg.com/figlet@1.6.0/fonts/" })
  }, [])

  useEffect(() => {
    let isMounted = true
    setProcessing(true)

    const generateArt = async () => {
      try {
        const options: figlet.Options = {
          font: font as Fonts,
          width: Number(width),
          whitespaceBreak: true,
        }

        const result = await new Promise<string>((resolve, reject) => {
          figlet.text(input || "ASCII ART", options, (err, text) => {
            if (err) reject(err)
            resolve(text || "")
          })
        })

        if (isMounted) {
          setOutput(result)
          setErrored(false)
        }
      } catch (error) {
        if (isMounted) setErrored(true)
      } finally {
        if (isMounted) setProcessing(false)
      }
    }

    const timer = setTimeout(() => {
      generateArt()
    }, 300) // Debounce

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [input, font, width])

  const downloadAsImage = async () => {
    if (!artRef.current) return

    try {
      const canvas = await html2canvas(artRef.current, {
        backgroundColor: null,
        scale: 2,
      })

      const link = document.createElement("a")
      link.download = `ascii-art-${input.substring(0, 10)}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("Error generating image:", error)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto space-y-6">
      <Card className="overflow-hidden border-2 shadow-lg">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-input">Your Text</Label>
              <Input
                id="text-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type something amazing..."
                className="text-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="font-select">Font Style</Label>
                <Select value={font} onValueChange={setFont}>
                  <SelectTrigger id="font-select">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {asciiFonts.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="width-slider">Width: {width}</Label>
                <Slider
                  id="width-slider"
                  value={[width]}
                  onValueChange={(values) => setWidth(values[0])}
                  min={40}
                  max={200}
                  step={5}
                  className="py-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="animate-switch" className="cursor-pointer">
                  Animate
                </Label>
                <Switch id="animate-switch" checked={animateText} onCheckedChange={setAnimateText} />
              </div>

              <div className="flex space-x-2">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setColorScheme(index)}
                    className={`w-6 h-6 rounded-full ${preset.bg} border-2 ${
                      colorScheme === index ? "border-primary" : "border-transparent"
                    }`}
                    aria-label={`${preset.name} color theme`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {processing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center p-8"
                >
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                </motion.div>
              ) : errored ? (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Alert variant="destructive">
                    <AlertDescription>
                      There was an error generating your ASCII art. Try different settings.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              ) : (
                <motion.div
                  key="output"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <Tabs defaultValue="preview">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="text">Text</TabsTrigger>
                    </TabsList>

                    <TabsContent value="preview" className="mt-4">
                      <div
                        ref={artRef}
                        className={`p-4 rounded-md overflow-auto ${colorPresets[colorScheme].bg} ${colorPresets[colorScheme].text}`}
                      >
                        {animateText ? (
                          <motion.pre
                            key={`${input}-${font}-${width}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="font-mono whitespace-pre overflow-x-auto"
                          >
                            {output}
                          </motion.pre>
                        ) : (
                          <pre className="font-mono whitespace-pre overflow-x-auto">{output}</pre>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="text" className="mt-4">
                      <Textarea value={output} readOnly className="min-h-[200px] font-mono" />
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={copyToClipboard} className="gap-2">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy Text"}
                    </Button>
                    <Button onClick={downloadAsImage} className="gap-2">
                      <Download className="h-4 w-4" />
                      Download Image
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

