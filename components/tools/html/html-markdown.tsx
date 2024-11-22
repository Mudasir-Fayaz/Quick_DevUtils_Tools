"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Copy, Download, HelpCircle, RefreshCw,  Eye, EyeOff, Code } from 'lucide-react'

// Note: In a real-world scenario, you'd use a proper HTML to Markdown conversion library
// This is a simplified conversion function for demonstration purposes
const convertHTMLtoMarkdown = (html: string, options: ConversionOptions) => {
  let markdown = html

  // Basic conversions
  markdown = markdown.replace(/<h1>(.*?)<\/h1>/gi, '# $1')
  markdown = markdown.replace(/<h2>(.*?)<\/h2>/gi, '## $1')
  markdown = markdown.replace(/<h3>(.*?)<\/h3>/gi, '### $1')
  markdown = markdown.replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
  markdown = markdown.replace(/<em>(.*?)<\/em>/gi, '*$1*')
  markdown = markdown.replace(/<a href="(.*?)">(.*?)<\/a>/gi, '[$2]($1)')
  markdown = markdown.replace(/<ul>([\s\S]*?)<\/ul>/gi, (match, p1) => {
    return p1.replace(/<li>([\s\S]*?)<\/li>/gi, '- $1')
})

markdown = markdown.replace(/<ol>([\s\S]*?)<\/ol>/gi, (match, p1) => {
    let counter = 1
    return p1.replace(/<li>([\s\S]*?)<\/li>/gi, () => `${counter++}. $1`)
})

  // Handle options
  if (options.preserveComments) {
    markdown = markdown.replace(/<!--(.*?)-->/gi, '<!-- $1 -->')
  } else {
    markdown = markdown.replace(/<!--.*?-->/gi, '')
  }

  if (!options.convertDivs) {
    markdown = markdown.replace(/<div>(.*?)<\/div>/gi, '$1')
  }

  return markdown.trim()
}

interface ConversionOptions {
  preserveComments: boolean
  convertDivs: boolean
}

export default function HtmlMarkdown() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(true)
  const [options, setOptions] = useState<ConversionOptions>({
    preserveComments: false,
    convertDivs: true,
  })

  useEffect(() => {
    handleConvert()
  }, [input, options])

  const handleConvert = () => {
    setError('')
    try {
      const markdown = convertHTMLtoMarkdown(input, options)
      setOutput(markdown)
    } catch (err) {
      console.log(err)
      setError('Conversion error occurred')
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

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted.md'
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
                  <CardTitle>Converted Markdown</CardTitle>
                  <CardDescription>
                    Preview of converted Markdown
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
                        <p>Copy Markdown to clipboard</p>
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
                        <p>Download Markdown file</p>
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
          <CardTitle>Conversion Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="preserve-comments"
                checked={options.preserveComments}
                onCheckedChange={(checked) => setOptions({...options, preserveComments: checked})}
              />
              <Label htmlFor="preserve-comments">Preserve Comments</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="convert-divs"
                checked={options.convertDivs}
                onCheckedChange={(checked) => setOptions({...options, convertDivs: checked})}
              />
              <Label htmlFor="convert-divs">Convert Divs</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleConvert}>
            <Code className="mr-2 h-4 w-4" /> Convert to Markdown
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
                  Quick guide on how to use the HTML to Markdown Converter
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Input</Label>
                  <div className="col-span-2 text-sm">
                    Enter HTML code in the input area
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Options</Label>
                  <div className="col-span-2 text-sm">
                    Adjust conversion options as needed
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Convert</Label>
                  <div className="col-span-2 text-sm">
                    Click &#39;Convert to Markdown&#39; to apply changes
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Output</Label>
                  <div className="col-span-2 text-sm">
                    View converted Markdown, copy to clipboard, or download
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