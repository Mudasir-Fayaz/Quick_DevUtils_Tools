"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUpDown, Copy, Download,  Trash2, Type, Undo, Redo } from 'lucide-react'

const caseConversions = {
  uppercase: (text: string) => text.toUpperCase(),
  lowercase: (text: string) => text.toLowerCase(),
  titleCase: (text: string) => text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
  sentenceCase: (text: string) => text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()),
  camelCase: (text: string) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, ''),
  pascalCase: (text: string) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase()).replace(/\s+/g, ''),
  snakeCase: (text: string) => text.toLowerCase().replace(/\s+/g, '_'),
  kebabCase: (text: string) => text.toLowerCase().replace(/\s+/g, '-'),
  alternatingCase: (text: string) => text.split('').map((char, index) => index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join(''),
  inverseCase: (text: string) => text.split('').map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join('')
}

interface ConversionOptions {
  trimWhitespace: boolean;
  replaceSpaces: 'none' | 'underscore' | 'hyphen';
  removePunctuation: boolean;
  ignoreSpecialChars: boolean;
}

const applyOptions = (text: string, options: ConversionOptions): string => {
  let result = text;
  if (options.trimWhitespace) result = result.trim();
  if (options.replaceSpaces !== 'none') result = result.replace(/\s+/g, options.replaceSpaces === 'underscore' ? '_' : '-');
  if (options.removePunctuation) result = result.replace(/[^\w\s]|_/g, "");
  if (options.ignoreSpecialChars) result = result.replace(/[^a-zA-Z0-9\s]/g, "");
  return result;
}

export default function StrCaseConvert() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [conversionType, setConversionType] = useState<keyof typeof caseConversions>('uppercase')
  const [options, setOptions] = useState<ConversionOptions>({
    trimWhitespace: false,
    replaceSpaces: 'none',
    removePunctuation: false,
    ignoreSpecialChars: false,
  })
  const [history, setHistory] = useState<string[]>([])
  const [undoStack, setUndoStack] = useState<string[]>([])
  const [redoStack, setRedoStack] = useState<string[]>([])

  useEffect(() => {
    convertText()
  }, [inputText, conversionType, options])

  const convertText = () => {
    let result = applyOptions(inputText, options)
    result = caseConversions[conversionType](result)
    setOutputText(result)
    if (result && !history.includes(result)) {
      setHistory(prev => [result, ...prev].slice(0, 5))
    }
    setUndoStack(prev => [inputText, ...prev])
    setRedoStack([])
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
  }

  const downloadResult = () => {
    const blob = new Blob([outputText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted-text.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInputText("")
    setOutputText("")
    setHistory([])
    setUndoStack([])
    setRedoStack([])
  }

  const undo = () => {
    if (undoStack.length > 0) {
      const prevText = undoStack[0]
      setRedoStack(prev => [inputText, ...prev])
      setUndoStack(prev => prev.slice(1))
      setInputText(prevText)
    }
  }

  const redo = () => {
    if (redoStack.length > 0) {
      const nextText = redoStack[0]
      setUndoStack(prev => [inputText, ...prev])
      setRedoStack(prev => prev.slice(1))
      setInputText(nextText)
    }
  }

  return (
    <div className="container mx-auto space-y-6">
     
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>Enter or paste your text here</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-40 p-2 border rounded"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here..."
            />
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Character count: {inputText.length}
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Converted Text</CardTitle>
            <CardDescription>
              {outputText.length} characters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-40 w-full rounded border p-4">
              <pre className="whitespace-pre-wrap">{outputText}</pre>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy converted text to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={downloadResult}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download converted text as .txt file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Options</CardTitle>
        </CardHeader>
        <CardContent>
        <Select onValueChange={(value) => setConversionType(value as keyof typeof caseConversions)}>
  <SelectTrigger className="w-full px-3 py-2 text-sm">
    <SelectValue placeholder="Select a case type" />
  </SelectTrigger>
  
  <SelectContent className="w-full">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
      <SelectItem className="min-w-max px-3 py-2 text-sm" value="uppercase">UPPERCASE</SelectItem>
      <SelectItem className="min-w-max px-3 py-2 text-sm" value="lowercase">lowercase</SelectItem>
      <SelectItem className="min-w-max px-3 py-2 text-sm" value="titleCase">Title Case</SelectItem>
      <SelectItem className="min-w-max px-3 py-2 text-sm" value="sentenceCase">Sentence case</SelectItem>
      <SelectItem className="min-w-max px-3 py-2 text-sm" value="camelCase">camelCase</SelectItem>
      <SelectItem className="min-w-max px-3 py-2 text-sm" value="pascalCase">PascalCase</SelectItem>
      <SelectItem className="min-w-max px-3 py-2 text-sm" value="snakeCase">snake_case</SelectItem>
      <SelectItem className="min-w-max px-3 py-2 text-sm" value="kebabCase">kebab-case</SelectItem>
      <SelectItem className="min-w-max px-3 py-2 text-sm" value="alternatingCase">aLtErNaTiNg</SelectItem>
      <SelectItem className="min-w-max px-3 py-2 text-sm" value="inverseCase">iNVERSE</SelectItem>
    </div>
  </SelectContent>
</Select>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="trim-whitespace"
                checked={options.trimWhitespace}
                onCheckedChange={(checked) => setOptions(prev => ({ ...prev, trimWhitespace: checked }))}
              />
              <Label htmlFor="trim-whitespace">Trim Whitespace</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="remove-punctuation"
                checked={options.removePunctuation}
                onCheckedChange={(checked) => setOptions(prev => ({ ...prev, removePunctuation: checked }))}
              />
              <Label htmlFor="remove-punctuation">Remove Punctuation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="ignore-special"
                checked={options.ignoreSpecialChars}
                onCheckedChange={(checked) => setOptions(prev => ({ ...prev, ignoreSpecialChars: checked }))}
              />
              <Label htmlFor="ignore-special">Ignore Special Characters</Label>
            </div>
            <div>
              <Label htmlFor="replace-spaces">Replace Spaces</Label>
              <Select value={options.replaceSpaces} onValueChange={(value: ConversionOptions['replaceSpaces']) => setOptions(prev => ({ ...prev, replaceSpaces: value }))}>
                <SelectTrigger id="replace-spaces">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Don&apos;t Replace</SelectItem>
                  <SelectItem value="underscore">With Underscores</SelectItem>
                  <SelectItem value="hyphen">With Hyphens</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40">
            {history.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-muted">
                <span className="truncate flex-1">{item}</span>
                <Button variant="ghost" size="sm" onClick={() => setInputText(item)}>
                  <Type className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex flex-wrap justify-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={undo} disabled={undoStack.length === 0}>
                <Undo className="mr-2 h-4 w-4" /> Undo
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo last action</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={redo} disabled={redoStack.length === 0}>
                <Redo className="mr-2 h-4 w-4" /> Redo
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo last undone action</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={clearAll} variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Clear All
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear all text and history</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="fixed bottom-4 right-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-10 h-10 rounded-full p-0">
              <ArrowUpDown className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Help Guide</h4>
                <p className="text-sm text-muted-foreground">
                  Quick guide on how to use the  String Case Converter
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Input</Label>
                  <div className="col-span-2 text-sm">
                    Enter or paste your text in the input area
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Options</Label>
                  <div className="col-span-2 text-sm">
                    Choose conversion type and additional options
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Convert</Label>
                  <div className="col-span-2 text-sm">
                    Conversion happens automatically as you type or change options
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Use</Label>
                  <div className="col-span-2 text-sm">
                    Copy to clipboard or download the converted text
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