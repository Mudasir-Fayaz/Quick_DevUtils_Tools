"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Copy, Download, HelpCircle, RefreshCw, Upload, Eye, EyeOff, Search } from 'lucide-react'

const decodeHTMLEntities = (text: string) => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

const commonEntities = [
  { entity: '&amp;', ascii: '&', description: 'Ampersand' },
  { entity: '&lt;', ascii: '<', description: 'Less than' },
  { entity: '&gt;', ascii: '>', description: 'Greater than' },
  { entity: '&quot;', ascii: '"', description: 'Quotation mark' },
  { entity: '&apos;', ascii: "'", description: 'Apostrophe' },
  { entity: '&nbsp;', ascii: ' ', description: 'Non-breaking space' },
  { entity: '&copy;', ascii: '©', description: 'Copyright symbol' },
  { entity: '&reg;', ascii: '®', description: 'Registered trademark' },
  { entity: '&trade;', ascii: '™', description: 'Trademark symbol' },
  { entity: '&euro;', ascii: '€', description: 'Euro sign' },
]

export default function HtmlAscii() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [liveConversion, setLiveConversion] = useState(true)
  const [stripTags, setStripTags] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [encoding, setEncoding] = useState('UTF-8')
  const [showPreview, setShowPreview] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleConvert = () => {
    setError('')
    try {
      let result = decodeHTMLEntities(input)
      if (stripTags) {
        result = result.replace(/<[^>]*>/g, '')
      }
      if (!caseSensitive) {
        result = result.toLowerCase()
      }
      setOutput(result)
    } catch (err) {
      console.log(err)
      setError('Conversion error occurred')
    }
  }
  useEffect(() => {
    if (liveConversion) {
      handleConvert()
    }
  }, [input, stripTags, caseSensitive, encoding,liveConversion,handleConvert])

 

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
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted_ascii.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto space-y-6">
     

      <Tabs defaultValue="convert" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="convert">Convert</TabsTrigger>
          <TabsTrigger value="reference">Common Entities</TabsTrigger>
        </TabsList>
        <TabsContent value="convert">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>HTML Entities Input</CardTitle>
                <CardDescription>
                  Enter your HTML-encoded text here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full h-40 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Enter HTML entities here..."
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
                      <CardTitle>ASCII Output</CardTitle>
                      <CardDescription>
                        Converted ASCII text
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-40 w-full rounded border p-4">
                        <pre className="whitespace-pre-wrap">{output}</pre>
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

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Conversion Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="live-conversion"
                    checked={liveConversion}
                    onCheckedChange={setLiveConversion}
                  />
                  <Label htmlFor="live-conversion">Live Conversion</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="strip-tags"
                    checked={stripTags}
                    onCheckedChange={setStripTags}
                  />
                  <Label htmlFor="strip-tags">Strip HTML Tags</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="case-sensitive"
                    checked={caseSensitive}
                    onCheckedChange={setCaseSensitive}
                  />
                  <Label htmlFor="case-sensitive">Case Sensitive</Label>
                </div>
                <div>
                  <Label htmlFor="encoding">Encoding</Label>
                  <Select value={encoding} onValueChange={setEncoding}>
                    <SelectTrigger id="encoding">
                      <SelectValue placeholder="Select encoding" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTF-8">UTF-8</SelectItem>
                      <SelectItem value="ISO-8859-1">ISO-8859-1</SelectItem>
                      <SelectItem value="Windows-1252">Windows-1252</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={handleConvert} disabled={liveConversion}>
                Convert
              </Button>
              <Button onClick={handleClear} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Clear All
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="mr-2 h-4 w-4" /> Upload File
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload a file for conversion</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".txt,.html"
              />
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
        </TabsContent>

        <TabsContent value="reference">
          <Card>
            <CardHeader>
              <CardTitle>Common HTML Entities Reference</CardTitle>
              <CardDescription>Frequently used HTML entities and their ASCII equivalents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="search">Search Entities</Label>
                <div className="flex items-center">
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mr-2"
                  />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[400px] w-full rounded border">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-2 border">Entity</th>
                      <th className="p-2 border">ASCII</th>
                      <th className="p-2 border">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commonEntities
                      .filter(entity => 
                        entity.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        entity.ascii.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        entity.description.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((entity, index) => (
                        <tr key={index}>
                          <td className="p-2 border text-center">{entity.entity}</td>
                          <td className="p-2 border text-center">{entity.ascii}</td>
                          <td className="p-2 border">{entity.description}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
                  Quick guide on how to use the HTML Entities to ASCII Converter
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Input</Label>
                  <div  className="col-span-2 text-sm">
                    Enter HTML-encoded text or upload a file
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Convert</Label>
                  <div className="col-span-2 text-sm">
                    Conversion happens automatically if live conversion is on
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Options</Label>
                  <div className="col-span-2 text-sm">
                    Adjust conversion settings as needed
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Output</Label>
                  <div className="col-span-2 text-sm">
                    View results, copy to clipboard, or download as a file
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