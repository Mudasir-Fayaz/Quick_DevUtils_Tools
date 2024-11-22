'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Upload, Minimize, AlertCircle, RotateCcw, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JsonMinify() {
  const [jsonInput, setJsonInput] = useState('')
  const [minifiedJson, setMinifiedJson] = useState('')
  const [error, setError] = useState('')
  const [isMinifying, setIsMinifying] = useState(false)
  const [removeComments, setRemoveComments] = useState(true)
  const [removeWhitespace, setRemoveWhitespace] = useState(true)
  const [shortenKeys, setShortenKeys] = useState(false)
  const [compressionLevel, setCompressionLevel] = useState(50)
  const [activeTab, setActiveTab] = useState('input')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (jsonInput) {
      minifyJSON()
    }
  }, [jsonInput, removeComments, removeWhitespace, shortenKeys, compressionLevel])

  const minifyJSON = () => {
    setError('')
    setIsMinifying(true)

    try {
      const parsed = JSON.parse(jsonInput)
      let minified = JSON.stringify(parsed, (key, value) => {
        if (removeComments && key.startsWith('//')) {
          return undefined
        }
        if (shortenKeys && key.length > 3) {
          return value
        }
        return value
      }, removeWhitespace ? 0 : 2)

      if (shortenKeys) {
        const keyMap: { [key: string]: string } = {}
        let shortKeyIndex = 0
        minified = minified.replace(/"(\w+)":/g, (match, p1) => {
          if (p1.length <= 3) return match
          if (!keyMap[p1]) {
            keyMap[p1] = String.fromCharCode(97 + shortKeyIndex % 26) + (shortKeyIndex >= 26 ? Math.floor(shortKeyIndex / 26) : '')
            shortKeyIndex++
          }
          return `"${keyMap[p1]}":`
        })
      }

      setMinifiedJson(minified)
    } catch (err) {
      console.log(err)
      setError('Invalid JSON input. Please check your JSON and try again.')
    } finally {
      setIsMinifying(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setJsonInput(content)
      }
      reader.readAsText(file)
    }
  }

  const downloadJSON = () => {
    const blob = new Blob([minifiedJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'minified.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('Copied to clipboard')
    }, (err) => {
      console.error('Could not copy text: ', err)
    })
  }

  return (
    <div className="container mx-auto space-y-6 flex flex-col">
      <div className="flex-grow flex flex-col md:flex-row gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 rounded-lg shadow-xl p-6"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>
            <TabsContent value="input">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="json-input">JSON Input</Label>
                  <Textarea
                    id="json-input"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Paste your JSON here"
                    className="h-[calc(100vh-20rem)] font-mono text-sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload JSON
                  </Button>
                  <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".json"
                    className="hidden"
                  />
                  <Button onClick={() => copyToClipboard(jsonInput)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Input
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="output">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="json-output">Minified JSON</Label>
                  <Textarea
                    id="json-output"
                    value={minifiedJson}
                    readOnly
                    className="h-[calc(100vh-20rem)] font-mono text-sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button onClick={downloadJSON} disabled={!minifiedJson}>
                    <Download className="w-4 h-4 mr-2" />
                    Download JSON
                  </Button>
                  <Button onClick={() => copyToClipboard(minifiedJson)} disabled={!minifiedJson}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Output
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-64 rounded-lg shadow-xl p-6 space-y-6"
        >
          <h2 className="text-xl font-semibold mb-4">Minification Options</h2>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="remove-comments">Remove Comments</Label>
            <Switch
              id="remove-comments"
              checked={removeComments}
              onCheckedChange={setRemoveComments}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="remove-whitespace">Remove Whitespace</Label>
            <Switch
              id="remove-whitespace"
              checked={removeWhitespace}
              onCheckedChange={setRemoveWhitespace}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="shorten-keys">Shorten Keys</Label>
            <Switch
              id="shorten-keys"
              checked={shortenKeys}
              onCheckedChange={setShortenKeys}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="compression-level">Compression Level</Label>
            <Slider
              id="compression-level"
              min={0}
              max={100}
              step={1}
              value={[compressionLevel]}
              onValueChange={(value) => setCompressionLevel(value[0])}
            />
            <div className="text-sm text-gray-500 text-right">{compressionLevel}%</div>
          </div>

          <Button onClick={minifyJSON} className="w-full" disabled={isMinifying}>
            {isMinifying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
              </motion.div>
            ) : (
              <Minimize className="w-4 h-4 mr-2" />
            )}
            Minify JSON
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}