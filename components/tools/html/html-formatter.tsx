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
import { Slider } from "@/components/ui/slider"
import { AlertCircle, Copy, Download, HelpCircle, RefreshCw, Upload, Eye, EyeOff, Code } from 'lucide-react'

const formatHTML = (html: string, options: FormattingOptions) => {
  // This is a placeholder for the actual formatting logic
  // In a real implementation, you would use a library like js-beautify or write custom logic
  let formatted = html

  if (options.removeComments) {
    formatted = formatted.replace(/<!--[\s\S]*?-->/g, '')
  }

  if (options.removeEmptyLines) {
    formatted = formatted.replace(/^\s*[\r\n]/gm, '')
  }

  if (options.removeInlineStyles) {
    formatted = formatted.replace(/ style="[^"]*"/g, '')
  }

  // Simulate indentation (this is overly simplified)
  if (!options.minify) {
    formatted = formatted.replace(/></g, '>\n<')
    const lines = formatted.split('\n')
    let indent = 0
    formatted = lines.map(line => {
      if (line.match(/<\//)) indent--
      const spaces = ' '.repeat(indent * options.indentSize)
      if (line.match(/<[^/]/) && !line.match(/\/>/)) indent++
      return spaces + line.trim()
    }).join('\n')
  } else {
    // Simple minification (remove all whitespace between tags)
    formatted = formatted.replace(/>\s+</g, '><')
  }

  return formatted
}

interface FormattingOptions {
  indentSize: number
  minify: boolean
  removeComments: boolean
  removeEmptyLines: boolean
  removeInlineStyles: boolean
}

export default function HtmlFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(true)
  const [options, setOptions] = useState<FormattingOptions>({
    indentSize: 2,
    minify: false,
    removeComments: false,
    removeEmptyLines: false,
    removeInlineStyles: false,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  
  const handleFormat = () => {
    setError('')
    try {
      const formatted = formatHTML(input, options)
      setOutput(formatted)
    } catch (err) {
      console.log(err)
      setError('Formatting error occurred')
    }
  }

  useEffect(() => {
    handleFormat()
  }, [input, options, handleFormat])


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
    a.download = 'formatted.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-2 ">
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
            <CardTitle>Formatted HTML</CardTitle>
            <CardDescription>
            Preview of formatted HTML code
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
              <p>Copy formatted HTML to clipboard</p>
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
              <p>Download formatted HTML file</p>
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
        <CardTitle>Formatting Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="indent-size">Indent Size</Label>
          <Slider
          id="indent-size"
          min={1}
          max={8}
          step={1}
          value={[options.indentSize]}
          onValueChange={(value) => setOptions({...options, indentSize: value[0]})}
          className="mt-2"
          />
          <div className="text-center mt-1">{options.indentSize}</div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
          id="minify"
          checked={options.minify}
          onCheckedChange={(checked) => setOptions({...options, minify: checked})}
          />
          <Label htmlFor="minify">Minify HTML</Label>
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
          id="remove-empty-lines"
          checked={options.removeEmptyLines}
          onCheckedChange={(checked) => setOptions({...options, removeEmptyLines: checked})}
          />
          <Label htmlFor="remove-empty-lines">Remove Empty Lines</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
          id="remove-inline-styles"
          checked={options.removeInlineStyles}
          onCheckedChange={(checked) => setOptions({...options, removeInlineStyles: checked})}
          />
          <Label htmlFor="remove-inline-styles">Remove Inline Styles</Label>
        </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
        <Button onClick={handleFormat}>
        <Code className="mr-2 h-4 w-4" /> Format HTML
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
            Quick guide on how to use the HTML Formatter
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
            Adjust formatting options as needed
            </div>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height">3. Format</Label>
            <div className="col-span-2 text-sm">
            Click &#39;Format HTML&#39; to apply changes
            </div>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxHeight">4. Output</Label>
            <div className="col-span-2 text-sm">
            View formatted HTML, copy to clipboard, or download
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