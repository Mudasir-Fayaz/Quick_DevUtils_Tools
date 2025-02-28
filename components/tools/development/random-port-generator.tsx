"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, RefreshCw, Share2, Trash2 } from "lucide-react"

interface PortRange {
  min: number
  max: number
}

const defaultRange: PortRange = {
  min: 1024,
  max: 65535,
}

const reservedPorts = Array.from({ length: 1024 }, (_, i) => i) // 0-1023 are reserved

export default function RandomPortGenerator() {
  const [range, setRange] = useState<PortRange>(defaultRange)
  const [count, setCount] = useState(1)
  const [excludedPorts, setExcludedPorts] = useState<number[]>([...reservedPorts])
  const [generatedPorts, setGeneratedPorts] = useState<number[]>([])
  const [recentPorts, setRecentPorts] = useState<number[][]>([])

  useEffect(() => {
    const saved = localStorage.getItem("recentPorts")
    if (saved) {
      setRecentPorts(JSON.parse(saved))
    }
  }, [])

  const generatePorts = () => {
    const ports: number[] = []
    const availablePorts = Array.from({ length: range.max - range.min + 1 }, (_, i) => i + range.min).filter(
      (port) => !excludedPorts.includes(port),
    )

    while (ports.length < count && availablePorts.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePorts.length)
      ports.push(availablePorts[randomIndex])
      availablePorts.splice(randomIndex, 1)
    }

    setGeneratedPorts(ports)
    const newRecentPorts = [ports, ...recentPorts.slice(0, 4)]
    setRecentPorts(newRecentPorts)
    localStorage.setItem("recentPorts", JSON.stringify(newRecentPorts))
  }

  const copyToClipboard = (ports: number[]) => {
    navigator.clipboard.writeText(ports.join(", "))
  }

  const sharePorts = async (ports: number[]) => {
    try {
      await navigator.share({
        title: "Generated Ports",
        text: `Generated ports: ${ports.join(", ")}`,
      })
    } catch (error) {
    }
  }

  const excludePort = (port: string) => {
    const numPort = Number.parseInt(port)
    if (numPort >= 0 && numPort <= 65535 && !excludedPorts.includes(numPort)) {
      setExcludedPorts([...excludedPorts, numPort])
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Port Generator</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Port Range</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={range.min}
                  onChange={(e) =>
                    setRange((prev) => ({ ...prev, min: Number.parseInt(e.target.value) || defaultRange.min }))
                  }
                  min="1024"
                  max="65535"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={range.max}
                  onChange={(e) =>
                    setRange((prev) => ({ ...prev, max: Number.parseInt(e.target.value) || defaultRange.max }))
                  }
                  min="1024"
                  max="65535"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Number of Ports</label>
              <Input
                type="number"
                value={count}
                onChange={(e) => setCount(Number.parseInt(e.target.value) || 1)}
                min="1"
                max="100"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Exclude Port</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter port to exclude"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      excludePort((e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ""
                    }
                  }}
                />
              </div>
            </div>

            <Button onClick={generatePorts} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Ports
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Generated Ports</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {generatedPorts.length > 0 && (
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Current Ports</label>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => copyToClipboard(generatedPorts)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => sharePorts(generatedPorts)}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {generatedPorts.map((port, index) => (
                      <motion.div
                        key={`${port}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                      >
                        <Badge variant="secondary">{port}</Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            <div className="grid gap-2">
              <label className="text-sm font-medium">Excluded Ports</label>
              <div className="flex flex-wrap gap-2">
                {excludedPorts
                  .filter((port) => port >= range.min)
                  .map((port) => (
                    <Badge key={port} variant="destructive">
                      {port}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-4 w-4 ml-1 hover:bg-transparent"
                        onClick={() => setExcludedPorts(excludedPorts.filter((p) => p !== port))}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
              </div>
            </div>

            {recentPorts.length > 0 && (
              <div className="grid gap-2">
                <label className="text-sm font-medium">Recent Generations</label>
                <div className="space-y-2">
                  {recentPorts.map((ports, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="flex-1 flex flex-wrap gap-2">
                        {ports.map((port, portIndex) => (
                          <Badge key={portIndex} variant="outline">
                            {port}
                          </Badge>
                        ))}
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => copyToClipboard(ports)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

