"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Copy, Download, HelpCircle, RefreshCw, Trash2, Undo, Redo, Upload, } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ConverterOptions {
  delimiter: ',' | ';' | '\t';
  includeHeaders: boolean;
  flattenNested: boolean;
  nestedSeparator: string;
}

const convertJSONToCSV = (json: string, options: ConverterOptions): string => {
  try {
    const jsonData = JSON.parse(json);
    if (!Array.isArray(jsonData)) {
      throw new Error('Input JSON must be an array of objects');
    }

    const headers = new Set<string>();
    const rows: string[][] = [];

    // Extract headers and flatten nested objects
    jsonData.forEach((item) => {
      const flatItem: { [key: string]: string } = {};
      const flattenObject = (obj: any, prefix = '') => {
        for (const key in obj) {
          if (typeof obj[key] === 'object' && obj[key] !== null && options.flattenNested) {
            flattenObject(obj[key], `${prefix}${key}${options.nestedSeparator}`);
          } else {
            const fullKey = `${prefix}${key}`;
            headers.add(fullKey);
            flatItem[fullKey] = obj[key];
          }
        }
      };
      flattenObject(item);
      rows.push(Object.values(flatItem));
    });

    const headerRow = Array.from(headers);
    const csvRows = rows.map(row => 
      headerRow.map(header => 
        JSON.stringify(row[headerRow.indexOf(header)] ?? '')
      ).join(options.delimiter)
    );

    if (options.includeHeaders) {
      csvRows.unshift(headerRow.map(header => JSON.stringify(header)).join(options.delimiter));
    }

    return csvRows.join('\n');
  } catch (error) {
    throw new Error(`Failed to convert JSON to CSV: ${(error as Error).message}`);
  }
};

export default function JsonCsv() {
  const [inputJSON, setInputJSON] = useState("")
  const [outputCSV, setOutputCSV] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [options, setOptions] = useState<ConverterOptions>({
    delimiter: ',',
    includeHeaders: true,
    flattenNested: true,
    nestedSeparator: '.',
  })
  const [history, setHistory] = useState<string[]>([])
  const [undoStack, setUndoStack] = useState<string[]>([])
  const [redoStack, setRedoStack] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    handleConvert()
  }, [inputJSON, options])

  const handleConvert = () => {
    setError(null)
    if (!inputJSON) {
      setOutputCSV("")
      return
    }
    try {
      const csv = convertJSONToCSV(inputJSON, options)
      setOutputCSV(csv)
      if (csv && !history.includes(csv)) {
        setHistory(prev => [csv, ...prev].slice(0, 5))
      }
      setUndoStack(prev => [inputJSON, ...prev])
      setRedoStack([])
    } catch (error) {
      setError((error as Error).message)
      setOutputCSV("")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadCSV = () => {
    const blob = new Blob([outputCSV], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted_data.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInputJSON("")
    setOutputCSV("")
    setError(null)
    setHistory([])
    setUndoStack([])
    setRedoStack([])
  }

  const undo = () => {
    if (undoStack.length > 0) {
      const prevText = undoStack[0]
      setRedoStack(prev => [inputJSON, ...prev])
      setUndoStack(prev => prev.slice(1))
      setInputJSON(prevText)
    }
  }

  const redo = () => {
    if (redoStack.length > 0) {
      const nextText = redoStack[0]
      setUndoStack(prev => [inputJSON, ...prev])
      setRedoStack(prev => prev.slice(1))
      setInputJSON(nextText)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInputJSON(content)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="container mx-auto space-y-6">
     
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input JSON</CardTitle>
            <CardDescription>Enter or upload your JSON here</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="w-full h-64 p-2 border rounded font-mono"
              value={inputJSON}
              onChange={(e) => setInputJSON(e.target.value)}
              placeholder="Enter your JSON here..."
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Character count: {inputJSON.length}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Upload JSON
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload a JSON file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".json"
              onChange={handleFileUpload}
            />
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Output CSV</CardTitle>
            <CardDescription>
              {outputCSV.length} characters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 w-full rounded border p-4">
              <pre className="whitespace-pre-wrap font-mono">{outputCSV}</pre>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => copyToClipboard(outputCSV)} disabled={!outputCSV}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy CSV to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={downloadCSV} disabled={!outputCSV}>
                    <Download className="mr-2 h-4 w-4" /> Download CSV
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download CSV file</p>
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
        <CardContent className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="delimiter">Delimiter</Label>
            <Select
              value={options.delimiter}
              onValueChange={(value: ',' | ';' | '\t') => setOptions(prev => ({ ...prev, delimiter: value }))}
            >
              <SelectTrigger id="delimiter">
                <SelectValue placeholder="Select delimiter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=",">Comma (,)</SelectItem>
                <SelectItem value=";">Semicolon (;)</SelectItem>
                <SelectItem value="\t">Tab (\t)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="include-headers"
              checked={options.includeHeaders}
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, includeHeaders: checked }))}
            />
            <Label htmlFor="include-headers">Include Headers</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="flatten-nested"
              checked={options.flattenNested}
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, flattenNested: checked }))}
            />
            <Label htmlFor="flatten-nested">Flatten Nested Objects</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="nested-separator">Nested Separator</Label>
            <Input
              id="nested-separator"
              value={options.nestedSeparator}
              onChange={(e) => setOptions(prev => ({ ...prev, nestedSeparator: e.target.value }))}
              className="w-16"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleConvert}>Convert JSON to CSV</Button>
        </CardFooter>
      </Card>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Card>
        <CardHeader>
          <CardTitle>Conversion History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40">
            {history.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-muted">
                <span className="truncate flex-1">{item.substring(0, 50)}...</span>
                <Button variant="ghost" size="sm" onClick={() => setOutputCSV(item)}>
                  <RefreshCw className="h-4 w-4" />
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
              <p>Clear all data and history</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="fixed bottom-4 right-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-10 h-10  rounded-full p-0">
              <HelpCircle className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Help Guide</h4>
                <p className="text-sm text-muted-foreground">
                  Quick guide on how to use the JSON to CSV Converter
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Input</Label>
                  <div className="col-span-2 text-sm">
                    Enter JSON or upload a JSON file
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Options</Label>
                  <div className="col-span-2 text-sm">
                    Set conversion options as needed
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Convert</Label>
                  <div className="col-span-2 text-sm">
                    Click &#39;Convert JSON to CSV&#39; to process
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Output</Label>
                  <div className="col-span-2 text-sm">
                    View CSV output and use additional features
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