"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Copy, Download, HelpCircle, RefreshCw,  Eye, EyeOff, Code} from 'lucide-react'
type CommonEntity = {
  name: string;
  entity: string;
}

// Define the common entities array with the CommonEntity type
const commonEntities: CommonEntity[] = [
  { name: 'Non-breaking space', entity: '&nbsp;' },
  { name: 'Ampersand', entity: '&amp;' },
  { name: 'Less than', entity: '&lt;' },
  { name: 'Greater than', entity: '&gt;' },
  { name: 'Quotation mark', entity: '&quot;' },
  { name: 'Apostrophe', entity: '&#39;' },
  { name: 'Copyright', entity: '&copy;' },
  { name: 'Registered trademark', entity: '&reg;' },
  { name: 'Euro', entity: '&euro;' },
  { name: 'Pound', entity: '&pound;' },
]

// Types for the encoding and decoding functions
const encodeHTML = (text: string): string => {
  const textArea = document.createElement('textarea')
  textArea.textContent = text
  return textArea.innerHTML
}

const decodeHTML = (text: string): string => {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = text
  return textArea.value
}

// Define the component state types
type Mode = 'encode' | 'decode'

// Define the HtmlEntityEd component
export default function HtmlEntityEd() {
  // State declarations with appropriate types
  const [input, setInput] = useState<string>('')  // input text
  const [output, setOutput] = useState<string>('') // output text
  const [mode, setMode] = useState<Mode>('encode') // mode for encode or decode
  const [error, setError] = useState<string>('') // error message
  const [showPreview, setShowPreview] = useState<boolean>(true) // whether to show preview

  // Effect to handle input and mode change
  useEffect(() => {
    handleConvert()
  }, [input, mode])

  // Function to handle text conversion based on mode (encode/decode)
  const handleConvert = (): void => {
    setError('')
    try {
      if (mode === 'encode') {
        setOutput(encodeHTML(input))
      } else {
        setOutput(decodeHTML(input))
      }
    } catch (err) {
      console.log(err)
      setError('Conversion error occurred')
    }
  }

  // Function to handle input text changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInput(e.target.value)
  }

  // Function to copy output to clipboard
  const handleCopy = (): void => {
    navigator.clipboard.writeText(output)
  }

  // Function to clear input, output, and error
  const handleClear = (): void => {
    setInput('')
    setOutput('')
    setError('')
  }

  // Function to handle downloading the output as a text file
  const handleDownload = (): void => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${mode}d_html_entities.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Function to insert a common HTML entity into the input
  const handleInsertEntity = (entity: string): void => {
    setInput((prev) => prev + entity)
  }

  return (
    <div className="container mx-auto space-y-6">
      

      <Tabs value={mode} onValueChange={(value) => setMode(value as 'encode' | 'decode')} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>
              Enter your text here to {mode}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-64 p-2 border rounded resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={handleInputChange}
              placeholder={`Enter text to ${mode} here...`}
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
                  <CardTitle>Output</CardTitle>
                  <CardDescription>
                    {mode === 'encode' ? 'Encoded' : 'Decoded'} result
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
                        <p>Copy output to clipboard</p>
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
                        <p>Download output as text file</p>
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
          <CardTitle>Common HTML Entities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {commonEntities.map((item, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleInsertEntity(item.entity)}
                    >
                      {item.entity}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button onClick={handleConvert}>
          <Code className="mr-2 h-4 w-4" /> {mode === 'encode' ? 'Encode' : 'Decode'}
        </Button>
        <Button onClick={handleClear} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Clear All
        </Button>
        <Button onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
      </div>

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
                  Quick guide on how to use the HTML Entity Encoder/Decoder
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Input</Label>
                  <div className="col-span-2 text-sm">
                    Enter text in the input area
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Mode</Label>
                  <div className="col-span-2 text-sm">
                    Choose between Encode and Decode
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Convert</Label>
                  <div className="col-span-2 text-sm">
                    Click &#39;Encode&#39; or &#39;Decode&#39; to process the text
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Output</Label>
                  <div className="col-span-2 text-sm">
                    View result, copy to clipboard, or download
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