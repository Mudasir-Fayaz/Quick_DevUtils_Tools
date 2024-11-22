'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, Download, Copy  } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ColorThief from 'colorthief'

interface Color {
  rgb: [number, number, number]
  hex: string
}

export default function ImageColor() {
  const [image, setImage] = useState<string | null>(null)
  const [colors, setColors] = useState<Color[]>([])
  const [paletteSize, setPaletteSize] = useState(5)
  const [quality, setQuality] = useState(10)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
        extractColors(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const extractColors = async (imageUrl: string) => {
    const img:HTMLImageElement = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = imageUrl
    img.onload = () => {
      const colorThief = new ColorThief()
      const palette = colorThief.getPalette(img, paletteSize, quality)
      const extractedColors = palette.map((color: [number, number, number]) => ({
        rgb: color,
        hex: rgbToHex(color[0], color[1], color[2])
      }))
      setColors(extractedColors)
    }
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadPalette = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const size = 100
    canvas.width = size * colors.length
    canvas.height = size

    colors.forEach((color, index) => {
      if (ctx) {
        ctx.fillStyle = color.hex
        ctx.fillRect(index * size, 0, size, size)
      }
    })

    const link = document.createElement('a')
    link.download = 'color-palette.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  const exportCSS = () => {
    const css = colors.map((color, index) => `--color-${index + 1}: ${color.hex};`).join('\n')
    const blob = new Blob([`:root {\n${css}\n}`], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'color-palette.css'
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-6"
      >

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Upload an image to extract colors from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center w-full">
              <Label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <Input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                  ref={fileInputRef}
                />
              </Label>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence>
          {image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Image Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={image} alt="Uploaded image" className="max-w-full h-auto rounded-lg" />
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Extraction Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="palette-size">Palette Size</Label>
                      <Slider
                        id="palette-size"
                        min={2}
                        max={20}
                        step={1}
                        value={[paletteSize]}
                        onValueChange={(value) => setPaletteSize(value[0])}
                      />
                      <div className="text-center mt-2">{paletteSize} colors</div>
                    </div>
                    <div>
                      <Label htmlFor="quality">Quality</Label>
                      <Slider
                        id="quality"
                        min={1}
                        max={10}
                        step={1}
                        value={[quality]}
                        onValueChange={(value) => setQuality(value[0])}
                      />
                      <div className="text-center mt-2">Quality: {quality}</div>
                    </div>
                    <Button onClick={() => extractColors(image)}>Re-extract Colors</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Extracted Colors</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {colors.map((color, index) => (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="flex flex-col items-center"
                                onClick={() => copyToClipboard(color.hex)}
                              >
                                <div
                                  className="w-20 h-20 rounded-lg shadow-md cursor-pointer"
                                  style={{ backgroundColor: color.hex }}
                                ></div>
                                <span className="mt-2 text-sm">{color.hex}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Click to copy</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex justify-center mt-4 space-x-2">
                    <Button onClick={downloadPalette}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Palette
                    </Button>
                    <Button onClick={exportCSS}>
                      <Copy className="w-4 h-4 mr-2" />
                      Export CSS
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}