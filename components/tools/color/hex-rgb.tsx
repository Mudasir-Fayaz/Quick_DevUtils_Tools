"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Copy, RotateCcw, ArrowLeftRight, Check, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function HexRgb() {
  const [hexValue, setHexValue] = useState("#3B82F6")
  const [rgbValues, setRgbValues] = useState({ r: 59, g: 130, b: 246, a: 1 })
  const [isValidHex, setIsValidHex] = useState(true)
  const [usePercentage, setUsePercentage] = useState(false)
  const [activeTab, setActiveTab] = useState("hex-to-rgb")
  const [rgbInputs, setRgbInputs] = useState({ r: "59", g: "130", b: "246", a: "1" })
  const [copied, setCopied] = useState(false)

  // Convert hex to RGB
  useEffect(() => {
    if (activeTab === "hex-to-rgb") {
      const hexRegex = /^#?([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/i

      if (hexRegex.test(hexValue)) {
        setIsValidHex(true)
        let hex = hexValue.replace("#", "")

        // Convert shorthand hex to full form
        if (hex.length === 3 || hex.length === 4) {
          let expandedHex = ""
          for (let i = 0; i < hex.length; i++) {
            expandedHex += hex[i] + hex[i]
          }
          hex = expandedHex
        }

        const r = Number.parseInt(hex.substring(0, 2), 16)
        const g = Number.parseInt(hex.substring(2, 4), 16)
        const b = Number.parseInt(hex.substring(4, 6), 16)
        const a = hex.length === 8 ? Number.parseFloat((Number.parseInt(hex.substring(6, 8), 16) / 255).toFixed(2)) : 1

        setRgbValues({ r, g, b, a })
      } else {
        setIsValidHex(false)
      }
    }
  }, [hexValue, activeTab])

  // Convert RGB to hex
  useEffect(() => {
    if (activeTab === "rgb-to-hex") {
      const r = Number.parseInt(rgbInputs.r) || 0
      const g = Number.parseInt(rgbInputs.g) || 0
      const b = Number.parseInt(rgbInputs.b) || 0
      const a = Number.parseFloat(rgbInputs.a) || 1

      setRgbValues({ r, g, b, a })

      const hexR = r.toString(16).padStart(2, "0")
      const hexG = g.toString(16).padStart(2, "0")
      const hexB = b.toString(16).padStart(2, "0")
      const hexA =
        a < 1
          ? Math.round(a * 255)
              .toString(16)
              .padStart(2, "0")
          : ""

      setHexValue(`#${hexR}${hexG}${hexB}${hexA}`.toUpperCase())
    }
  }, [rgbInputs, activeTab])

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (!value.startsWith("#") && value) {
      value = "#" + value
    }
    setHexValue(value)
  }

  const handleRgbChange = (key: string, value: string) => {
    let parsedValue = value

    // Limit RGB values to 0-255
    if (key !== "a" && parsedValue !== "") {
      const numValue = Number.parseInt(parsedValue)
      if (numValue > 255) parsedValue = "255"
      if (numValue < 0) parsedValue = "0"
    }

    // Limit alpha to 0-1
    if (key === "a" && parsedValue !== "") {
      const numValue = Number.parseFloat(parsedValue)
      if (numValue > 1) parsedValue = "1"
      if (numValue < 0) parsedValue = "0"
    }

    setRgbInputs((prev) => ({ ...prev, [key]: parsedValue }))
  }

  const handleAlphaChange = (value: number[]) => {
    const alpha = value[0]
    setRgbInputs((prev) => ({ ...prev, a: alpha.toString() }))
  }

  const resetValues = () => {
    if (activeTab === "hex-to-rgb") {
      setHexValue("#3B82F6")
    } else {
      setRgbInputs({ r: "59", g: "130", b: "246", a: "1" })
    }
  }

  const swapConverter = () => {
    setActiveTab(activeTab === "hex-to-rgb" ? "rgb-to-hex" : "hex-to-rgb")
  }

  const formatRgbValue = (value: number) => {
    return usePercentage ? `${Math.round((value / 255) * 100)}%` : value.toString()
  }

  const getRgbString = () => {
    const { r, g, b, a } = rgbValues
    const formattedR = formatRgbValue(r)
    const formattedG = formatRgbValue(g)
    const formattedB = formatRgbValue(b)

    return a < 1
      ? `rgba(${formattedR}, ${formattedG}, ${formattedB}, ${a})`
      : `rgb(${formattedR}, ${formattedG}, ${formattedB})`
  }

  const copyToClipboard = () => {
    const textToCopy = activeTab === "hex-to-rgb" ? getRgbString() : hexValue
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Color Converter</span>
              <Button variant="outline" size="icon" onClick={swapConverter}>
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription>Convert between HEX and RGB color formats</CardDescription>
          </CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="hex-to-rgb">HEX to RGB</TabsTrigger>
                <TabsTrigger value="rgb-to-hex">RGB to HEX</TabsTrigger>
              </TabsList>
            </div>

            <CardContent className="pt-6">
              <TabsContent value="hex-to-rgb" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hex-input">HEX Color Code</Label>
                  <div className="relative">
                    <Input
                      id="hex-input"
                      value={hexValue}
                      onChange={handleHexChange}
                      className={cn("pr-10", !isValidHex && "border-red-500 focus-visible:ring-red-500")}
                      placeholder="#000000"
                    />
                    <AnimatePresence>
                      {!isValidHex && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
                        >
                          <AlertCircle className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {!isValidHex && <p className="text-sm text-red-500">Please enter a valid HEX color code</p>}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="rgb-output">RGB Value</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="percentage-mode" checked={usePercentage} onCheckedChange={setUsePercentage} />
                      <Label htmlFor="percentage-mode" className="text-sm">
                        Show as %
                      </Label>
                    </div>
                  </div>

                  <div className="rounded-md border p-4 bg-muted/50">
                    <p className="font-mono text-sm">{getRgbString()}</p>
                  </div>
                </div>

                {isValidHex && (
                  <div className="space-y-2">
                    <Label>Alpha Channel</Label>
                    <div className="flex items-center space-x-4">
                      <Slider
                        value={[rgbValues.a]}
                        min={0}
                        max={1}
                        step={0.01}
                        onValueChange={handleAlphaChange}
                        className="flex-1"
                      />
                      <span className="w-12 text-center">{rgbValues.a}</span>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="rgb-to-hex" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="r-input">R</Label>
                    <Input
                      id="r-input"
                      value={rgbInputs.r}
                      onChange={(e) => handleRgbChange("r", e.target.value)}
                      type="number"
                      min="0"
                      max="255"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="g-input">G</Label>
                    <Input
                      id="g-input"
                      value={rgbInputs.g}
                      onChange={(e) => handleRgbChange("g", e.target.value)}
                      type="number"
                      min="0"
                      max="255"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b-input">B</Label>
                    <Input
                      id="b-input"
                      value={rgbInputs.b}
                      onChange={(e) => handleRgbChange("b", e.target.value)}
                      type="number"
                      min="0"
                      max="255"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Alpha Channel</Label>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[Number.parseFloat(rgbInputs.a)]}
                      min={0}
                      max={1}
                      step={0.01}
                      onValueChange={(value) => handleRgbChange("a", value[0].toString())}
                      className="flex-1"
                    />
                    <Input
                      value={rgbInputs.a}
                      onChange={(e) => handleRgbChange("a", e.target.value)}
                      className="w-20"
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hex-output">HEX Value</Label>
                  <div className="rounded-md border p-4 bg-muted/50">
                    <p className="font-mono text-sm">{hexValue}</p>
                  </div>
                </div>
              </TabsContent>

              <motion.div
                className="mt-6 rounded-md overflow-hidden"
                animate={{ height: "100px" }}
                style={{
                  backgroundColor: isValidHex ? hexValue : "#CCCCCC",
                  opacity: isValidHex ? 1 : 0.5,
                }}
              />
            </CardContent>
          </Tabs>

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetValues}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button onClick={copyToClipboard}>
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              Copy
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

