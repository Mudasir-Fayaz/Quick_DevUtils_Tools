"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {  Copy, Download, HelpCircle,  Trash2, Undo, Redo, Link } from 'lucide-react'

interface EncodingOptions {
  encodeSpaces: boolean;
  encodeSpecialChars: boolean;
  encodingScheme: 'UTF-8' | 'ASCII' | 'ISO-8859-1';
}

const encodeURL = (url: string, options: EncodingOptions): string => {
  let encoded = url;
  if (options.encodeSpaces) {
    encoded = encoded.replace(/ /g, options.encodeSpecialChars ? '%20' : '+');
  }
  if (options.encodeSpecialChars) {
    encoded = encodeURIComponent(encoded);
  }
  return encoded;
}

const decodeURL = (url: string, options: EncodingOptions): string => {
  let decoded = url;
  if (options.encodeSpecialChars) {
    decoded = decodeURIComponent(decoded);
  }
  if (options.encodeSpaces) {
    decoded = decoded.replace(/\+/g, ' ');
  }
  return decoded;
}

export default function UrlEncodeDecode() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [options, setOptions] = useState<EncodingOptions>({
    encodeSpaces: true,
    encodeSpecialChars: true,
    encodingScheme: 'UTF-8',
  })
  const [history, setHistory] = useState<string[]>([])
  const [undoStack, setUndoStack] = useState<string[]>([])
  const [redoStack, setRedoStack] = useState<string[]>([])

  

  const handleConversion = () => {
    if (!inputText) {
      setOutputText("")
      return
    }
    const result = mode === 'encode' ? encodeURL(inputText, options) : decodeURL(inputText, options)
    setOutputText(result)
    if (result && !history.includes(result)) {
      setHistory(prev => [result, ...prev].slice(0, 5))
    }
    setUndoStack(prev => [inputText, ...prev])
    setRedoStack([])
  }

  useEffect(() => {
    handleConversion()
  }, [inputText, mode, options, handleConversion])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadResult = () => {
    const blob = new Blob([outputText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${mode}d_url.txt`
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
            <CardDescription>Enter URL or text to {mode}</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="w-full h-40 p-2 border rounded"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Enter URL or text to ${mode}...`}
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
            <CardTitle>Output</CardTitle>
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
                  <Button onClick={() => copyToClipboard(outputText)}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy {mode}d text to clipboard</p>
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
                  <p>Download {mode}d text as .txt file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Options</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="encode-spaces"
              checked={options.encodeSpaces}
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, encodeSpaces: checked }))}
            />
            <Label htmlFor="encode-spaces">Encode Spaces</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="encode-special"
              checked={options.encodeSpecialChars}
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, encodeSpecialChars: checked }))}
            />
            <Label htmlFor="encode-special">Encode Special Characters</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="encoding-scheme">Encoding Scheme</Label>
            <Select
              value={options.encodingScheme}
              onValueChange={(value: EncodingOptions['encodingScheme']) => setOptions(prev => ({ ...prev, encodingScheme: value }))}
            >
              <SelectTrigger id="encoding-scheme">
                <SelectValue placeholder="Select encoding scheme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTF-8">UTF-8</SelectItem>
                <SelectItem value="ASCII">ASCII</SelectItem>
                <SelectItem value="ISO-8859-1">ISO-8859-1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40">
            {history.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-muted">
                <span className="truncate flex-1">{item}</span>
                <Button variant="ghost" size="sm" onClick={() => setInputText(item)}>
                  <Link className="h-4 w-4" />
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
              <HelpCircle className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Help Guide</h4>
                <p className="text-sm text-muted-foreground">
                  Quick guide on how to use the URL Encoder/Decoder
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Choose Mode</Label>
                  <div className="col-span-2 text-sm">
                    Select Encode or Decode
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Input</Label>
                  <div className="col-span-2 text-sm">
                    Enter URL or text to encode/decode
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Options</Label>
                  <div className="col-span-2 text-sm">
                    Set encoding options as needed
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Output</Label>
                  <div className="col-span-2 text-sm">
                    View result and use additional features
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