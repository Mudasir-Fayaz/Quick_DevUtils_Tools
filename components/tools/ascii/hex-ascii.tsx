"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, ArrowLeftRight, Copy, Download, HelpCircle, RefreshCw, Upload } from 'lucide-react'

const hexToAscii = (hex: string) => {
  let ascii = ''
  for (let i = 0; i < hex.length; i += 2) {
    ascii += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  }
  return ascii
}

const asciiToHex = (ascii: string) => {
  return ascii.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join('')
}

const isValidHex = (input: string) => /^[0-9A-Fa-f\s]*$/.test(input)

export default function HexAscii() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'hexToAscii' | 'asciiToHex'>('hexToAscii')
  const [error, setError] = useState('')
  const [grouping, setGrouping] = useState(2)
  const [liveConversion, setLiveConversion] = useState(true)
  const [encoding, setEncoding] = useState('UTF-8')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (liveConversion) {
      handleConvert()
    }
  }, [input, mode, grouping, encoding])

  const handleConvert = () => {
    setError('')
    if (mode === 'hexToAscii') {
      if (!isValidHex(input)) {
        setError('Invalid hexadecimal input')
        return
      }
      const cleanedInput = input.replace(/\s/g, '')
      try {
        const result = hexToAscii(cleanedInput)
        setOutput(result)
      } catch (err) {
        console.log(err)
        setError('Conversion error')
      }
    } else {
      setOutput(asciiToHex(input))
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
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `converted_${mode === 'hexToAscii' ? 'ascii' : 'hex'}.txt`
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
          <TabsTrigger value="table">Encoding Table</TabsTrigger>
        </TabsList>
        <TabsContent value="convert">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{mode === 'hexToAscii' ? 'Hex Input' : 'ASCII Input'}</CardTitle>
                <CardDescription>
                  Enter your {mode === 'hexToAscii' ? 'hexadecimal' : 'ASCII'} data here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full h-40 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={input}
                  onChange={handleInputChange}
                  placeholder={`Enter ${mode === 'hexToAscii' ? 'hexadecimal' : 'ASCII'} here...`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{mode === 'hexToAscii' ? 'ASCII Output' : 'Hex Output'}</CardTitle>
                <CardDescription>
                  Converted {mode === 'hexToAscii' ? 'ASCII' : 'hexadecimal'} output
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
                <div>
                  <Label htmlFor="grouping">Grouping</Label>
                  <Select value={grouping.toString()} onValueChange={(value) => setGrouping(parseInt(value))}>
                    <SelectTrigger id="grouping">
                      <SelectValue placeholder="Select grouping" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">No grouping</SelectItem>
                      <SelectItem value="2">2 characters</SelectItem>
                      <SelectItem value="4">4 characters</SelectItem>
                      <SelectItem value="8">8 characters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="encoding">Encoding</Label>
                  <Select value={encoding} onValueChange={setEncoding}>
                    <SelectTrigger id="encoding">
                      <SelectValue placeholder="Select encoding" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTF-8">UTF-8</SelectItem>
                      <SelectItem value="ASCII">ASCII</SelectItem>
                      <SelectItem value="ISO-8859-1">ISO-8859-1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => setMode(mode === 'hexToAscii' ? 'asciiToHex' : 'hexToAscii')}>
                <ArrowLeftRight className="mr-2 h-4 w-4" /> Switch Mode
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
                accept=".txt,.hex"
              />
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

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>ASCII Encoding Table</CardTitle>
              <CardDescription>Common ASCII characters and their hexadecimal representations</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded border">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-2 border">Char</th>
                      <th className="p-2 border">Hex</th>
                      <th className="p-2 border">Char</th>
                      <th className="p-2 border">Hex</th>
                      <th className="p-2 border">Char</th>
                      <th className="p-2 border">Hex</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(32)].map((_, i) => (
                      <tr key={i}>
                        <td className="p-2 border text-center">{String.fromCharCode(i + 32)}</td>
                        <td className="p-2 border text-center">{(i + 32).toString(16).padStart(2, '0')}</td>
                        <td className="p-2 border text-center">{String.fromCharCode(i + 64)}</td>
                        <td className="p-2 border text-center">{(i + 64).toString(16).padStart(2, '0')}</td>
                        <td className="p-2 border text-center">{String.fromCharCode(i + 96)}</td>
                        <td className="p-2 border text-center">{(i + 96).toString(16).padStart(2, '0')}</td>
                      </tr>
                    ))}
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
                  Quick guide on how to use the Hex to ASCII Converter
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Input</Label>
                  <div className="col-span-2 text-sm">
                    Enter hex or ASCII in the input field
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
                    Adjust grouping, encoding, or switch conversion mode
                  
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