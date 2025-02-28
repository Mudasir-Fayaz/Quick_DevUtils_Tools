"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Copy, Download, HelpCircle, RefreshCw, Upload, Eye, EyeOff,Minimize2 } from 'lucide-react'

const minifyHTML = (html: string, options: MinificationOptions) => {
  // This is a placeholder for the actual minification logic
  // In a real implementation, you would use a library like html-minifier or write custom logic
  let minified = html

  if (options.removeWhitespace) {
    minified = minified.replace(/\s+/g, ' ').trim()
  }

  if (options.removeComments) {
    minified = minified.replace(/<!--[\s\S]*?-->/g, '')
  }

  if (options.collapseBooleanAttributes) {
    minified = minified.replace(/(\w+)="(\w+)"/g, (match, p1, p2) => {
      if (p1 === p2) return p1
      return match
    })
  }

  if (options.shortenDoctype) {
    minified = minified.replace(/<!DOCTYPE[^>]+>/i, '<!DOCTYPE html>')
  }

  if (options.removeOptionalTags) {
    minified = minified.replace(/<\/?(?:html|head|body)[^>]*>/gi, '')
  }

  return minified
}

interface MinificationOptions {
  removeWhitespace: boolean
  removeComments: boolean
  collapseBooleanAttributes: boolean
  shortenDoctype: boolean
  removeOptionalTags: boolean
}

export default function HtmlMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(true)
  const [options, setOptions] = useState<MinificationOptions>({
    removeWhitespace: true,
    removeComments: true,
    collapseBooleanAttributes: true,
    shortenDoctype: true,
    removeOptionalTags: false,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    handleMinify()
  }, [input, options])

  const handleMinify = () => {
    setError('')
    try {
      const minified = minifyHTML(input, options)
      setOutput(minified)
    } catch (err) {
      console.log(err)
      setError('Minification error occurred')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
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

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'minified.html'
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
    <div className="container mx-auto p-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <Card>
        <CardHeader>
        <CardTitle>Input HTML</CardTitle>
        <CardDescription>
          Enter your HTML code here
        </CardDescription>
        </CardHeader>
        <CardContent>
        <textarea
          className="w-full h-64 p-2 border rounded resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter HTML code here..."
        />
        </CardContent>
        <CardFooter>
        <TooltipProvider>
          <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Upload HTML File
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload an HTML file</p>
          </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".html,.htm"
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
            <CardTitle>Minified HTML</CardTitle>
            <CardDescription>
            Preview of minified HTML code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 w-full rounded border p-4">
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
              <p>Copy minified HTML to clipboard</p>
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
              <p>Download minified HTML file</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Switch
          id="remove-whitespace"
          checked={options.removeWhitespace}
          onCheckedChange={(checked) => setOptions({...options, removeWhitespace: checked})}
          />
          <Label htmlFor="remove-whitespace">Remove Whitespace</Label>
        </div>
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
          id="collapse-boolean-attributes"
          checked={options.collapseBooleanAttributes}
          onCheckedChange={(checked) => setOptions({...options, collapseBooleanAttributes: checked})}
          />
          <Label htmlFor="collapse-boolean-attributes">Collapse Boolean Attributes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
          id="shorten-doctype"
          checked={options.shortenDoctype}
          onCheckedChange={(checked) => setOptions({...options, shortenDoctype: checked})}
          />
          <Label htmlFor="shorten-doctype">Shorten Doctype</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
          id="remove-optional-tags"
          checked={options.removeOptionalTags}
          onCheckedChange={(checked) => setOptions({...options, removeOptionalTags: checked})}
          />
          <Label htmlFor="remove-optional-tags">Remove Optional Tags</Label>
        </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
        <Button onClick={handleMinify}>
        <Minimize2 className="mr-2 h-4 w-4" /> Minify HTML
        </Button>
        <Button onClick={handleClear} variant="outline">
        <RefreshCw className="mr-2 h-4 w-4" /> Clear All
        </Button>
        <Button onClick={() => setShowPreview(!showPreview)}>
        {showPreview ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
        {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
      </CardFooter>
      </Card>

      <Card>
      <CardHeader>
        <CardTitle>Minification Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            Quick guide on how to use the HTML Minifier
          </p>
          </div>
          <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">1. Input</Label>
            <div className="col-span-2 text-sm">
            Enter HTML code or upload an HTML file
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
            Click &#39;Minify HTML&#39; to apply changes
            </div>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxHeight">4. Output</Label>
            <div className="col-span-2 text-sm">
            View minified HTML, copy to clipboard, or download
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