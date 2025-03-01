"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, Copy, Download, HelpCircle,  Upload, Code, Eye, EyeOff } from 'lucide-react'


const formatCSS = (css: string, options: FormattingOptions) => {
  // This is a simplified formatting function. In a real-world scenario,
  // you'd use a more robust CSS parser and formatter.
  let formatted = css.trim()

  if (options.removeComments) {
    formatted = formatted.replace(/\/\*[\s\S]*?\*\//g, '')
  }

  if (options.sortProperties) {
    formatted = formatted.replace(/(\{|\})/g, '$1\n')
    const rules = formatted.split('\n')
    formatted = rules.map(rule => {
      if (rule.includes('{')) {
        const [selector, properties] = rule.split('{')
        const sortedProperties = properties.split(';')
          .filter(prop => prop.trim())
          .sort()
          .join(';\n' + ' '.repeat(options.indentSize))
        return `${selector.trim()} {\n${' '.repeat(options.indentSize)}${sortedProperties}\n}`
      }
      return rule
    }).join('\n')
  }

  if (!options.compact) {
    formatted = formatted
      .replace(/\{/g, ' {\n')
      .replace(/\}/g, '\n}\n')
      .replace(/;/g, ';\n')
      .replace(/:\s/g, ': ')
      .replace(/\s+/g, ' ')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => ' '.repeat(options.indentSize) + line)
      .join('\n')
  } else {
    formatted = formatted.replace(/\s+/g, ' ').replace(/\s*([{}:;])\s*/g, '$1')
  }

  return formatted
}

interface FormattingOptions {
  indentSize: number
  compact: boolean
  removeComments: boolean
  sortProperties: boolean
}

export default function CSSFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [options, setOptions] = useState<FormattingOptions>({
    indentSize: 2,
    compact: false,
    removeComments: false,
    sortProperties: false,
  })
  const [showPreview, setShowPreview] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  
  const handleFormat = () => {
    setError('')
    try {
      const formatted = formatCSS(input, options)
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
    const blob = new Blob([output], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.css'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto space-y-6">
    

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input CSS</CardTitle>
            <CardDescription>
              Paste your CSS code or upload a file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[300px] font-mono text-sm"
              value={input}
              onChange={handleInputChange}
              placeholder="Paste your CSS here..."
            />
          </CardContent>
          <CardFooter>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Upload CSS File
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload a CSS file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".css"
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
                  <CardTitle>Formatted CSS</CardTitle>
                  <CardDescription>
                    Preview of formatted CSS code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] w-full rounded border">
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
                        <p>Copy formatted CSS to clipboard</p>
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
                        <p>Download formatted CSS file</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="indent-size">Indent Size</Label>
              <Slider
                id="indent-size"
                min={0}
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
                id="compact"
                checked={options.compact}
                onCheckedChange={(checked) => setOptions({...options, compact: checked})}
              />
              <Label htmlFor="compact">Compact Output</Label>
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
                id="sort-properties"
                checked={options.sortProperties}
                onCheckedChange={(checked) => setOptions({...options, sortProperties: checked})}
              />
              <Label htmlFor="sort-properties">Sort Properties</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleFormat}>
            <Code className="mr-2 h-4 w-4" /> Format CSS
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
                  Quick guide on how to use the CSS Formatter
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Input</Label>
                  <div className="col-span-2 text-sm">
                    Paste CSS code or upload a CSS file
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
                    Click &#39;Format CSS&#39; to apply changes
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Output</Label>
                  <div className="col-span-2 text-sm">
                    View formatted CSS, copy to clipboard, or download
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