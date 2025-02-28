"use client"

import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, Download, HelpCircle, RefreshCw, Upload } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

type Options = {
  caseSensitive: boolean
  trimWhitespace: boolean
  sort: 'none' | 'alphabetical' | 'reverse' | string
  keepOriginalCase: boolean
}

const removeDuplicates = (lines: string[], options: Options): string[] => {
  let processedLines = lines
  
  if (options.trimWhitespace) {
    processedLines = processedLines.map(line => line.trim())
  }

  if (!options.caseSensitive) {
    processedLines = processedLines.map(line => line.toLowerCase())
  }

  const uniqueLines = new Set(processedLines)
  let result = Array.from(uniqueLines)

  if (options.sort === 'alphabetical') {
    result.sort((a, b) => a.localeCompare(b))
  } else if (options.sort === 'reverse') {
    result.sort((a, b) => b.localeCompare(a))
  }

  if (options.keepOriginalCase) {
    result = result.map(line => {
      const originalLine = lines.find(l => l.toLowerCase() === line.toLowerCase())
      return originalLine || line
    })
  }

  return result
}

export default function DuplicateLines() {
  const [inputText, setInputText] = useState<string>("")
  const fileRef = useRef<HTMLInputElement>(null)
  const [processedText, setProcessedText] = useState<string>("")
  const [originalCount, setOriginalCount] = useState<number>(0)
  const [newCount, setNewCount] = useState<number>(0)
  const [options, setOptions] = useState<Options>({
    caseSensitive: false,
    trimWhitespace: true,
    sort: 'none',
    keepOriginalCase: true,
  })
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  useEffect(() => {
    handleProcess()
  }, [inputText, options])

  const handleProcess = () => {
    setIsProcessing(true)
    setTimeout(() => {
      const lines = inputText.split('\n')
      setOriginalCount(lines.length)
      const processedLines = removeDuplicates(lines, options)
      setProcessedText(processedLines.join('\n'))
      setNewCount(processedLines.length)
      setIsProcessing(false)
    }, 500) // Simulating processing time for demo purposes
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(processedText)
  }

  const downloadText = () => {
    const blob = new Blob([processedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'deduplicated-lines.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setInputText(e.target.result as string)
        }
      }
      reader.readAsText(file)
    }
  }


  return (
    <div className="container mx-auto space-y-6">
     
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>Enter your lines here, one per line</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-64 p-2 border rounded"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here..."
            />
          </CardContent>
          <CardFooter>
            <Input
              type="file"
              accept=".txt,.csv"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              ref={fileRef}
            />
            <Label htmlFor="file-upload" className="cursor-pointer">
              <span  onClick={() => {
fileRef.current?.click();

              }}>

              <Button>
                <Upload className="mr-2 h-4 w-4" /> Upload File
              </Button>
              </span>
            </Label>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Processed Text</CardTitle>
            <CardDescription>
              Original: {originalCount} lines | Deduplicated: {newCount} lines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 w-full rounded border p-4">
              <pre className="whitespace-pre-wrap">{processedText}</pre>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex-row gap-2 justify-between sm:flex-col">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Text
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy processed text to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={downloadText}>
                    <Download className="mr-2 h-4 w-4" /> Download Text
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download processed text as .txt file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Processing Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="case-sensitive"
                checked={options.caseSensitive}
                onCheckedChange={(checked) => setOptions({...options, caseSensitive: checked})}
              />
              <Label htmlFor="case-sensitive">Case Sensitive</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="trim-whitespace"
                checked={options.trimWhitespace}
                onCheckedChange={(checked) => setOptions({...options, trimWhitespace: checked})}
              />
              <Label htmlFor="trim-whitespace">Trim Whitespace</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="keep-original-case"
                checked={options.keepOriginalCase}
                onCheckedChange={(checked) => setOptions({...options, keepOriginalCase: checked})}
              />
              <Label htmlFor="keep-original-case">Keep Original Case</Label>
            </div>
            
            <div>
              <Label htmlFor="sort">Sort Result</Label>
              <Select value={options.sort} onValueChange={(value) => setOptions({...options, sort: value})}>
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Select sort option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Sorting</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="reverse">Reverse Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center space-x-4">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                  <div className="flex-1">
                    <Progress value={66} className="w-full" />
                  </div>
                  <div className="text-sm font-medium">Processing...</div>
                </div>
              </CardContent>
            </Card>
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
                  Quick guide on how to use the Line Deduplicator
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Input</Label>
                  <div className="col-span-2 text-sm">
                    Enter your text or upload a file
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Options</Label>
                  <div className="col-span-2 text-sm">
                    Adjust processing options as needed
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Process</Label>
                  <div className="col-span-2 text-sm">
                    Processing happens automatically as you type or change options
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Use</Label>
                  <div className="col-span-2 text-sm">
                    Copy to clipboard or download the processed text
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