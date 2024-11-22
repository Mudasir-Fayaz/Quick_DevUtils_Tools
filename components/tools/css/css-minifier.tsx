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
import { AlertCircle, Copy, Download, HelpCircle,  Upload, Minimize2, Maximize2 } from 'lucide-react'

const minifyCSS = (css: string, options: MinificationOptions) => {
  // This is a simplified minification function. In a real-world scenario,
  // you'd use a more robust CSS parser and minifier.
  let minified = css
    .replace(/\/\*[\s\S]*?\*\/|([^:\\]|^)\/\/.*$/gm, '') // Remove comments
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\s*([:;{}])\s*/g, '$1') // Remove spaces before and after :, ;, {, and }
    .replace(/;}/g, '}') // Remove last semicolon of a rule
    .trim()

  if (options.removeLineBreaks) {
    minified = minified.replace(/\n/g, '')
  }

  if (options.keepImportantComments) {
    const importantComments = css.match(/\/\*![\s\S]*?\*\//g) || []
    minified = importantComments.join('\n') + minified
  }

  return minified
}

interface MinificationOptions {
  removeLineBreaks: boolean
  keepImportantComments: boolean
}

export default function CssMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [options, setOptions] = useState<MinificationOptions>({
    removeLineBreaks: true,
    keepImportantComments: true,
  })
  const [showPreview, setShowPreview] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    handleMinify()
  }, [input, options])

  const handleMinify = () => {
    setError('')
    try {
      const minified = minifyCSS(input, options)
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
    const blob = new Blob([output], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'minified.css'
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
                  <CardTitle>Minified CSS</CardTitle>
                  <CardDescription>
                    Preview of minified CSS code
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
                        <p>Copy minified CSS to clipboard</p>
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
                        <p>Download minified CSS file</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="remove-line-breaks"
                checked={options.removeLineBreaks}
                onCheckedChange={(checked) => setOptions({...options, removeLineBreaks: checked})}
              />
              <Label htmlFor="remove-line-breaks">Remove Line Breaks</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="keep-important-comments"
                checked={options.keepImportantComments}
                onCheckedChange={(checked) => setOptions({...options, keepImportantComments: checked})}
              />
              <Label htmlFor="keep-important-comments">Keep Important Comments</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleMinify}>
            <Minimize2 className="mr-2 h-4 w-4" /> Minify CSS
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
                  Quick guide on how to use the CSS Minifier
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
                    Adjust minification options as needed
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Minify</Label>
                  <div className="col-span-2 text-sm">
                    Click &#39;Minify CSS&#39; to apply changes
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Output</Label>
                  <div className="col-span-2 text-sm">
                    View minified CSS, copy to clipboard, or download
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