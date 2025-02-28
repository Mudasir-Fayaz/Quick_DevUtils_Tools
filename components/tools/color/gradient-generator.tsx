"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Copy, Trash, Plus, Check, Shuffle, RotateCcw, Save, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type ColorStop = {
  id: string
  color: string
  position: number
}

type SavedGradient = {
  id: string
  name: string
  type: string
  angle: number
  colorStops: ColorStop[]
  blendMode: string
  repeating: boolean
}

const BLEND_MODES = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
]

const PRESET_GRADIENTS = [
  {
    name: "Sunset",
    type: "linear",
    angle: 135,
    colorStops: [
      { id: "1", color: "#FF512F", position: 0 },
      { id: "2", color: "#F09819", position: 50 },
      { id: "3", color: "#FF512F", position: 100 },
    ],
    blendMode: "normal",
    repeating: false,
  },
  {
    name: "Ocean",
    type: "linear",
    angle: 90,
    colorStops: [
      { id: "1", color: "#2E3192", position: 0 },
      { id: "2", color: "#1BFFFF", position: 100 },
    ],
    blendMode: "normal",
    repeating: false,
  },
  {
    name: "Rainbow",
    type: "linear",
    angle: 90,
    colorStops: [
      { id: "1", color: "#FF0000", position: 0 },
      { id: "2", color: "#FF7F00", position: 16.6 },
      { id: "3", color: "#FFFF00", position: 33.3 },
      { id: "4", color: "#00FF00", position: 50 },
      { id: "5", color: "#0000FF", position: 66.6 },
      { id: "6", color: "#4B0082", position: 83.3 },
      { id: "7", color: "#9400D3", position: 100 },
    ],
    blendMode: "normal",
    repeating: false,
  },
  {
    name: "Radial Burst",
    type: "radial",
    angle: 0,
    colorStops: [
      { id: "1", color: "#FFFFFF", position: 0 },
      { id: "2", color: "#FF4500", position: 100 },
    ],
    blendMode: "normal",
    repeating: false,
  },
  {
    name: "Conic Spectrum",
    type: "conic",
    angle: 0,
    colorStops: [
      { id: "1", color: "#FF0000", position: 0 },
      { id: "2", color: "#FFFF00", position: 25 },
      { id: "3", color: "#00FF00", position: 50 },
      { id: "4", color: "#0000FF", position: 75 },
      { id: "5", color: "#FF0000", position: 100 },
    ],
    blendMode: "normal",
    repeating: false,
  },
]

export default function GradientGenerator() {
  const [gradientType, setGradientType] = useState<string>("linear")
  const [angle, setAngle] = useState<number>(90)
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: "1", color: "#3B82F6", position: 0 },
    { id: "2", color: "#EC4899", position: 100 },
  ])
  const [blendMode, setBlendMode] = useState<string>("normal")
  const [repeating, setRepeating] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const [savedGradients, setSavedGradients] = useState<SavedGradient[]>([])
  const [newGradientName, setNewGradientName] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const { toast } = useToast()

  const gradientPreviewRef = useRef<HTMLDivElement>(null)

  // Load saved gradients from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedGradients")
    if (saved) {
      setSavedGradients(JSON.parse(saved))
    }
  }, [])

  // Save gradients to localStorage when updated
  useEffect(() => {
    if (savedGradients.length > 0) {
      localStorage.setItem("savedGradients", JSON.stringify(savedGradients))
    }
  }, [savedGradients])

  const generateGradientCSS = () => {
    // Sort color stops by position
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position)

    const stopsString = sortedStops.map((stop) => `${stop.color} ${stop.position}%`).join(", ")

    let gradientString = ""

    if (gradientType === "linear") {
      gradientString = `${repeating ? "repeating-" : ""}linear-gradient(${angle}deg, ${stopsString})`
    } else if (gradientType === "radial") {
      gradientString = `${repeating ? "repeating-" : ""}radial-gradient(circle at center, ${stopsString})`
    } else if (gradientType === "conic") {
      gradientString = `${repeating ? "repeating-" : ""}conic-gradient(from ${angle}deg at center, ${stopsString})`
    }

    return {
      background: gradientString,
      mixBlendMode: blendMode,
    }
  }

  const getCSSCode = () => {
    const { background, mixBlendMode } = generateGradientCSS()
    return `.gradient {\n  background: ${background};\n  mix-blend-mode: ${mixBlendMode};\n}`
  }

  const handleAddColorStop = () => {
    // Find a position between existing stops
    let newPosition = 50
    if (colorStops.length >= 2) {
      // Sort stops by position
      const sortedStops = [...colorStops].sort((a, b) => a.position - b.position)
      // Find the largest gap
      let maxGap = 0
      let gapPosition = 0

      for (let i = 0; i < sortedStops.length - 1; i++) {
        const gap = sortedStops[i + 1].position - sortedStops[i].position
        if (gap > maxGap) {
          maxGap = gap
          gapPosition = sortedStops[i].position + gap / 2
        }
      }

      newPosition = gapPosition
    }

    // Generate a random color
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`

    setColorStops([
      ...colorStops,
      {
        id: Date.now().toString(),
        color: randomColor,
        position: newPosition,
      },
    ])
  }

  const handleRemoveColorStop = (id: string) => {
    if (colorStops.length <= 2) {
      toast({
        title: "Cannot remove stop",
        description: "You need at least two color stops for a gradient",
        variant: "destructive",
      })
      return
    }

    setColorStops(colorStops.filter((stop) => stop.id !== id))
  }

  const handleColorChange = (id: string, color: string) => {
    setColorStops(colorStops.map((stop) => (stop.id === id ? { ...stop, color } : stop)))
  }

  const handlePositionChange = (id: string, position: number) => {
    setColorStops(colorStops.map((stop) => (stop.id === id ? { ...stop, position } : stop)))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCSSCode())
    setCopied(true)

    toast({
      title: "Copied to clipboard",
      description: "CSS code copied successfully",
      duration: 2000,
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const resetGradient = () => {
    setGradientType("linear")
    setAngle(90)
    setColorStops([
      { id: "1", color: "#3B82F6", position: 0 },
      { id: "2", color: "#EC4899", position: 100 },
    ])
    setBlendMode("normal")
    setRepeating(false)
  }

  const randomizeGradient = () => {
    // Random gradient type
    const types = ["linear", "radial", "conic"]
    const randomType = types[Math.floor(Math.random() * types.length)]

    // Random angle
    const randomAngle = Math.floor(Math.random() * 360)

    // Random number of color stops (2-5)
    const numStops = Math.floor(Math.random() * 4) + 2

    const newStops: ColorStop[] = []
    for (let i = 0; i < numStops; i++) {
      const position = i === 0 ? 0 : i === numStops - 1 ? 100 : Math.floor(Math.random() * 100)
      const randomColor = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`

      newStops.push({
        id: i.toString(),
        color: randomColor,
        position,
      })
    }

    // Random blend mode
    const randomBlendMode = BLEND_MODES[Math.floor(Math.random() * BLEND_MODES.length)]

    setGradientType(randomType)
    setAngle(randomAngle)
    setColorStops(newStops)
    setBlendMode(randomBlendMode)
    setRepeating(Math.random() > 0.8) // 20% chance of being repeating
  }

  const saveGradient = () => {
    if (!newGradientName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your gradient",
        variant: "destructive",
      })
      return
    }

    const newGradient: SavedGradient = {
      id: Date.now().toString(),
      name: newGradientName,
      type: gradientType,
      angle,
      colorStops,
      blendMode,
      repeating,
    }

    setSavedGradients([...savedGradients, newGradient])
    setNewGradientName("")
    setIsDialogOpen(false)

    toast({
      title: "Gradient saved",
      description: `"${newGradientName}" has been saved to your collection`,
    })
  }

  const loadGradient = (gradient: SavedGradient) => {
    setGradientType(gradient.type)
    setAngle(gradient.angle)
    setColorStops(gradient.colorStops)
    setBlendMode(gradient.blendMode)
    setRepeating(gradient.repeating)

    toast({
      title: "Gradient loaded",
      description: `"${gradient.name}" has been loaded`,
    })
  }

  const loadPreset = (preset: any) => {
    setGradientType(preset.type)
    setAngle(preset.angle)
    setColorStops(preset.colorStops)
    setBlendMode(preset.blendMode)
    setRepeating(preset.repeating)

    toast({
      title: "Preset loaded",
      description: `"${preset.name}" preset has been loaded`,
    })
  }

  const reverseGradient = () => {
    setColorStops(
      colorStops.map((stop) => ({
        ...stop,
        position: 100 - stop.position,
      })),
    )
  }

  return (
    <div className="container mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gradient Preview */}
              <div className="space-y-4">
                <Label>Gradient Preview</Label>
                <motion.div
                  ref={gradientPreviewRef}
                  className="w-full h-64 rounded-lg shadow-md"
                  style={generateGradientCSS() as React.CSSProperties}
                  animate={{
                    background: generateGradientCSS().background,
                    mixBlendMode: generateGradientCSS().mixBlendMode as any,
                  }}
                  transition={{ duration: 0.5 }}
                />

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={reverseGradient}>
                    Reverse
                  </Button>
                  <Button variant="outline" size="sm" onClick={randomizeGradient}>
                    <Shuffle className="mr-2 h-4 w-4" />
                    Randomize
                  </Button>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Gradient Type</Label>
                    <Select value={gradientType} onValueChange={setGradientType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                        <SelectItem value="conic">Conic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(gradientType === "linear" || gradientType === "conic") && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="angle-slider">Angle: {angle}°</Label>
                      </div>
                      <Slider
                        id="angle-slider"
                        min={0}
                        max={360}
                        step={1}
                        value={[angle]}
                        onValueChange={(value) => setAngle(value[0])}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Blend Mode</Label>
                      <Select value={blendMode} onValueChange={setBlendMode}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select blend mode" />
                        </SelectTrigger>
                        <SelectContent>
                          {BLEND_MODES.map((mode) => (
                            <SelectItem key={mode} value={mode}>
                              {mode}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="repeating"
                      checked={repeating}
                      onChange={(e) => setRepeating(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="repeating">Repeating Gradient</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Color Stops</Label>
                    <Button variant="outline" size="sm" onClick={handleAddColorStop}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Stop
                    </Button>
                  </div>

                  <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
                    {colorStops.map((stop) => (
                      <motion.div
                        key={stop.id}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                          style={{ backgroundColor: stop.color }}
                          onClick={() => {
                            const input = document.getElementById(`color-${stop.id}`) as HTMLInputElement
                            if (input) input.click()
                          }}
                        />
                        <Input
                          id={`color-${stop.id}`}
                          type="color"
                          value={stop.color}
                          onChange={(e) => handleColorChange(stop.id, e.target.value)}
                          className="w-0 h-0 opacity-0 absolute"
                        />
                        <div className="flex-1">
                          <Slider
                            min={0}
                            max={100}
                            step={1}
                            value={[stop.position]}
                            onValueChange={(value) => handlePositionChange(stop.id, value[0])}
                          />
                        </div>
                        <div className="w-12 text-center text-sm">{Math.round(stop.position)}%</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveColorStop(stop.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="css">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="css">CSS Code</TabsTrigger>
                <TabsTrigger value="presets">Presets & Saved</TabsTrigger>
              </TabsList>
              <TabsContent value="css" className="space-y-4 pt-4">
                <Textarea value={getCSSCode()} readOnly className="font-mono text-sm h-32" />
                <Button onClick={copyToClipboard} className="w-full">
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  Copy CSS
                </Button>
              </TabsContent>
              <TabsContent value="presets" className="pt-4">
                <div className="space-y-4">
                  <div>
                    <Label>Preset Gradients</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {PRESET_GRADIENTS.map((preset, index) => (
                        <div
                          key={index}
                          className="cursor-pointer rounded-md overflow-hidden h-16 border hover:border-primary transition-colors"
                          style={{
                            background: `${preset.type}-gradient(${
                              preset.type === "linear" ? `${preset.angle}deg` : "circle"
                            }, ${preset.colorStops.map((stop) => `${stop.color} ${stop.position}%`).join(", ")})`,
                          }}
                          onClick={() => loadPreset(preset)}
                          title={preset.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <Label>Saved Gradients</Label>
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Save className="mr-2 h-4 w-4" />
                            Save Current
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Save Gradient</DialogTitle>
                            <DialogDescription>Give your gradient a name to save it for future use.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Gradient Name</Label>
                              <Input
                                id="name"
                                value={newGradientName}
                                onChange={(e) => setNewGradientName(e.target.value)}
                                placeholder="My awesome gradient"
                              />
                            </div>
                            <div className="w-full h-16 rounded-md" style={generateGradientCSS() as React.CSSProperties} />
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={saveGradient}>Save</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {savedGradients.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No saved gradients yet. Create and save your first gradient!
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                        {savedGradients.map((gradient) => (
                          <div
                            key={gradient.id}
                            className="relative cursor-pointer rounded-md overflow-hidden h-16 border hover:border-primary transition-colors group"
                            style={{
                              background: `${gradient.type}-gradient(${
                                gradient.type === "linear" ? `${gradient.angle}deg` : "circle"
                              }, ${gradient.colorStops.map((stop) => `${stop.color} ${stop.position}%`).join(", ")})`,
                            }}
                            onClick={() => loadGradient(gradient)}
                            title={gradient.name}
                          >
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                              {gradient.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetGradient}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={copyToClipboard}>Copy CSS</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (gradientPreviewRef.current) {
                      // This is a simplified version - in a real app you'd use html2canvas or similar
                      toast({
                        title: "Export feature",
                        description: "In a real app, this would export the gradient as an image",
                      })
                    }
                  }}
                >
                  Export as Image
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

