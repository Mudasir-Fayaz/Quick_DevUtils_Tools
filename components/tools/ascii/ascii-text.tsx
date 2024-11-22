"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Copy, Download, RefreshCw, Upload } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function AsciiText() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [delimiter, setDelimiter] = useState(" ")
  const [encoding, setEncoding] = useState("decimal")
  const [error, setError] = useState<string | null>(null)
  const [realTime, setRealTime] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const convertAsciiToText = (ascii: string, delim: string, enc: string) => {
    try {
      const values = ascii.split(delim).map((val) => val.trim()).filter(Boolean)
      const text = values.map((val) => {
        let charCode
        if (enc === "decimal") {
          charCode = parseInt(val, 10)
        } else if (enc === "hexadecimal") {
          charCode = parseInt(val, 16)
        } else if (enc === "binary") {
          charCode = parseInt(val, 2)
        }
        if (isNaN(charCode as number) || charCode === undefined || charCode < 0 || charCode > 255) {
          throw new Error(`Invalid ASCII value: ${val}`);
        }
        return String.fromCharCode(charCode);
      }).join("")
      setOutput(text)
      setError(null)
    } catch (err) {
      setError((err as Error).message)
      setOutput("")
    }
  }

  useEffect(() => {
    if (realTime) {
      convertAsciiToText(input, delimiter, encoding)
    }
  }, [input, delimiter, encoding, realTime])

  const handleConvert = () => {
    convertAsciiToText(input, delimiter, encoding)
  }

  const handleClear = () => {
    setInput("")
    setOutput("")
    setError(null)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    toast({
      title: "Copied to clipboard",
      description: "The converted text has been copied to your clipboard.",
    })
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "converted_text.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInput(content)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="container mx-auto space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center"></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="delimiter">Delimiter</Label>
              <Select value={delimiter} onValueChange={setDelimiter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select delimiter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Space</SelectItem>
                  <SelectItem value=",">Comma</SelectItem>
                  <SelectItem value="\n">New Line</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="encoding">Encoding</Label>
              <Select value={encoding} onValueChange={setEncoding}>
                <SelectTrigger>
                  <SelectValue placeholder="Select encoding" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="decimal">Decimal</SelectItem>
                  <SelectItem value="hexadecimal">Hexadecimal</SelectItem>
                  <SelectItem value="binary">Binary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="real-time"
              checked={realTime}
              onCheckedChange={setRealTime}
            />
            <Label htmlFor="real-time">Real-time conversion</Label>
          </div>
          <Textarea
            placeholder="Enter ASCII codes here (e.g., 72 101 108 108 111 for 'Hello')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
          />
          <div className="flex justify-between">
            <Button onClick={() => fileInputRef.current?.click()} variant="outline">
              <Upload className="mr-2 h-4 w-4" /> Upload File
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".txt,.csv,.json"
            />
            <Button onClick={handleConvert} disabled={realTime}>
              Convert
            </Button>
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
          <Textarea
            placeholder="Converted text will appear here"
            value={output}
            readOnly
            rows={5}
          />
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