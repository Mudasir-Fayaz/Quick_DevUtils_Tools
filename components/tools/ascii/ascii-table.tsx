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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tableStyles = {
  basic: { top: "+", topMid: "+", topLeft: "+", topRight: "+", bottom: "+", bottomMid: "+", bottomLeft: "+", bottomRight: "+", left: "|", leftMid: "+", mid: "+", midMid: "+", right: "|", rightMid: "+", middle: "|" },
  light: { top: "-", topMid: "+", topLeft: "+", topRight: "+", bottom: "-", bottomMid: "+", bottomLeft: "+", bottomRight: "+", left: "|", leftMid: "+", mid: "-", midMid: "+", right: "|", rightMid: "+", middle: "|" },
  fancy: { top: "═", topMid: "╤", topLeft: "╔", topRight: "╗", bottom: "═", bottomMid: "╧", bottomLeft: "╚", bottomRight: "╝", left: "║", leftMid: "╟", mid: "─", midMid: "┼", right: "║", rightMid: "╢", middle: "│" },
}

export default function AsciiTable() {
  const [input, setInput] = useState("Column 1,Column 2,Column 3\nValue 1,Value 2,Value 3\nLonger Value,Short,Medium Value")
  const [output, setOutput] = useState("")
  const [tableStyle, setTableStyle] = useState("basic")
  const [alignment, setAlignment] = useState("left")
  const [padding, setPadding] = useState(1)
  const [hasHeader, setHasHeader] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fontSize, setFontSize] = useState(14)

  const generateTable = (input: string, style: keyof typeof tableStyles, align: string, pad: number, header: boolean) => {
    try {
      const rows = input.trim().split('\n').map(row => row.split(','))
      const numColumns = Math.max(...rows.map(row => row.length))
      const columnWidths = Array(numColumns).fill(0)

      rows.forEach(row => {
        row.forEach((cell, i) => {
          columnWidths[i] = Math.max(columnWidths[i], cell.length)
        })
      })

      const chars = tableStyles[style as keyof typeof tableStyles]
      const alignChar = align === 'left' ? '' : align === 'right' ? '-' : '^'

      let table = ''

      // Top border
      table += chars.topLeft + columnWidths.map(w => chars.top.repeat(w + pad * 2)).join(chars.topMid) + chars.topRight + '\n'

      // Rows
      rows.forEach((row, rowIndex) => {
        const cells = row.map((cell, i) => {
          const width = columnWidths[i] + pad * 2
          return cell.padStart(cell.length + pad).padEnd(width)[`${alignChar}${width}` as any]
        })
        table += chars.left + cells.join(chars.middle) + chars.right + '\n'

        // Header separator
        if (rowIndex === 0 && header) {
          table += chars.leftMid + columnWidths.map(w => chars.mid.repeat(w + pad * 2)).join(chars.midMid) + chars.rightMid + '\n'
        }
      })

      // Bottom border
      table += chars.bottomLeft + columnWidths.map(w => chars.bottom.repeat(w + pad * 2)).join(chars.bottomMid) + chars.bottomRight + '\n'

      setOutput(table)
      setError(null)
    } catch (err) {
      console.log(err)
      setError("Error generating table. Please check your input.")
      setOutput("")
    }
  }

  useEffect(() => {
    generateTable(input, tableStyle as keyof typeof tableStyles, alignment, padding, hasHeader)
  }, [input, tableStyle, alignment, padding, hasHeader])

  const handleClear = () => {
    setInput("")
    setOutput("")
    setError(null)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    toast({
      title: "Copied to clipboard",
      description: "The ASCII table has been copied to your clipboard.",
    })
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ascii_table.txt"
    a.click()
    URL.revokeObjectURL(url)
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
                  placeholder="Enter your table data (comma-separated values, one row per line)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={5}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tableStyle">Table Style</Label>
                    <Select value={tableStyle} onValueChange={setTableStyle}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="fancy">Fancy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="alignment">Text Alignment</Label>
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
                  <Label htmlFor="padding">Cell Padding: {padding}</Label>
                  <Slider
                    id="padding"
                    min={0}
                    max={5}
                    step={1}
                    value={[padding]}
                    onValueChange={(value) => setPadding(value[0])}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasHeader"
                    checked={hasHeader}
                    onCheckedChange={setHasHeader}
                  />
                  <Label htmlFor="hasHeader">First row is header</Label>
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
              <div className="mt-4">
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
              <div className="flex flex-wrap justify-between mt-4 gap-2">
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}