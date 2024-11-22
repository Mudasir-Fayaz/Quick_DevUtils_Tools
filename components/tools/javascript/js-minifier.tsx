"use client"

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Copy, Download, HelpCircle, Upload, Minimize2, Maximize2 } from 'lucide-react'


// Mock minification function (replace with actual minification logic)
const minifyJavaScript = (code: string, options: MinificationOptions) => {
  let minified = code
    .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '') // Remove comments
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/^\s+|\s+$/g, '') // Trim start and end

  if (options.removeNewlines) {
    minified = minified.replace(/\n/g, '')
  }

  if (options.shortenVariables) {
    // This is a simplified example. Real variable shortening is more complex.
    const vars = minified.match(/var\s+(\w+)/g) || []
    vars.forEach((v, i) => {
      const original = v.split(' ')[1]
      const shortened = `_${i}`
      minified = minified.replace(new RegExp(`\\b${original}\\b`, 'g'), shortened)
    })
  }

  return minified
}

interface MinificationOptions {
  removeComments: boolean
  removeNewlines: boolean
  shortenVariables: boolean
}

export default function JSMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [options, setOptions] = useState<MinificationOptions>({
    removeComments: true,
    removeNewlines: true,
    shortenVariables: false,
  })
  const [showPreview, setShowPreview] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleMinify = () => {
    setError('')
    try {
      const minified = minifyJavaScript(input, options)
      setOutput(minified)
    } catch (err) {
      console.log(err)
      setError('Minification error occurred')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInput(content)
      }
      reader.readAsText(file)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'minified.js'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getCompressionRatio = () => {
    if (!input || !output) return 0
    const originalSize = new Blob([input]).size
    const minifiedSize = new Blob([output]).size
    return ((originalSize - minifiedSize) / originalSize * 100).toFixed(2)
  }

  return (
    <div className="container mx-auto space-y-6">
     

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input JavaScript</CardTitle>
            <CardDescription>
              Paste your JavaScript code or upload a file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[300px] font-mono text-sm"
              value={input}
              onChange={handleInputChange}
              placeholder="Paste your JavaScript here..."
            />
          </CardContent>
          <CardFooter>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Upload JS File
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload a JavaScript file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".js"
            />
          </CardFooter>
        </Card>

        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Minified JavaScript</CardTitle>
                  <CardDescription>
                    Preview of minified JavaScript code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] w-full rounded border p-4">
                  <pre className="whitespace-pre-wrap font-mono text-sm">{output}</pre>

                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={handleCopy}>
                          <Copy className="mr-2 h-4 w-4" /> Copy
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy minified JavaScript to clipboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={handleDownload}>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download minified JavaScript file</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Minification Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="remove-comments"
                checked={options.removeComments}
                onCheckedChange={(checked) => setOptions({...options, removeComments: checked})}
              />
              <Label htmlFor="remove-comments">Remove Comments</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="remove-newlines"
                checked={options.removeNewlines}
                onCheckedChange={(checked) => setOptions({...options, removeNewlines: checked})}
              />
              <Label htmlFor="remove-newlines">Remove Newlines</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="shorten-variables"
                checked={options.shortenVariables}
                onCheckedChange={(checked) => setOptions({...options, shortenVariables: checked})}
              />
              <Label htmlFor="shorten-variables">Shorten Variables</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleMinify}>
            <Minimize2 className="mr-2 h-4 w-4" /> Minify JavaScript
          </Button>
          <Button onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? <Maximize2 className="mr-2 h-4 w-4" /> : <Minimize2 className="mr-2 h-4 w-4" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Minification Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Original Size</Label>
              <div className="text-2xl font-bold">{input ? new Blob([input]).size : 0} bytes</div>
            </div>
            <div>
              <Label>Minified Size</Label>
              <div className="text-2xl font-bold">{output ? new Blob([output]).size : 0} bytes</div>
            </div>
            <div>
              <Label>Compression Ratio</Label>
              <div className="text-2xl font-bold">{getCompressionRatio()}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center"
          >
            <AlertCircle className="mr-2 h-5 w-5" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-10 h-10 rounded-full p-0">
              <HelpCircle className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Help Guide</h4>
                <p className="text-sm text-muted-foreground">
                  Quick guide on how to use the JavaScript Minifier
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Input</Label>
                  <div className="col-span-2 text-sm">
                    Paste JavaScript code or upload a JS file
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Options</Label>
                  <div className="col-span-2 text-sm">
                    Adjust minification options as needed
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Minify</Label>
                  <div className="col-span-2 text-sm">
                    Click &apos;Minify JavaScript&apos; to apply changes
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Output</Label>
                  <div className="col-span-2 text-sm">
                    View minified JS, copy to clipboard, or download
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}