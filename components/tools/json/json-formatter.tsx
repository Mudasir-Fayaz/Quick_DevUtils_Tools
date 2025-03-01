"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Copy, Download, HelpCircle, RefreshCw, Trash2, Undo, Redo, ChevronRight, ChevronDown } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FormatterOptions {
  indentSize: number;
  sortKeys: boolean;
  wrapLines: boolean;
}

const formatJSON = (json: string, options: FormatterOptions): string => {
  try {
    const obj = JSON.parse(json);
    if (options.sortKeys) {
      const sortedObj = sortObjectKeys(obj);
      return JSON.stringify(sortedObj, null, options.indentSize);
    }
    return JSON.stringify(obj, null, options.indentSize);
  } catch (error) {
    console.log(error)
    throw new Error('Invalid JSON');
  }
}

const sortObjectKeys = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }
  return Object.keys(obj)
    .sort()
    .reduce((result: any, key) => {
      result[key] = sortObjectKeys(obj[key]);
      return result;
    }, {});
}

const minifyJSON = (json: string): string => {
  try {
    const obj = JSON.parse(json);
    return JSON.stringify(obj);
  } catch (error) {
    console.log(error)
    throw new Error('Invalid JSON');
  }
}

const TreeView: React.FC<{ data: any }> = ({ data }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderNode = (key: string, value: any, path: string) => {
    const isObject = typeof value === 'object' && value !== null;
    const isExpanded = expanded[path];

    return (
      <div key={path} className="ml-4">
        <div className="flex items-center">
          {isObject && (
            <button onClick={() => toggleExpand(path)} className="mr-2">
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          )}
          <span className="font-semibold">{key}:</span>
          {!isObject && <span className="ml-2">{JSON.stringify(value)}</span>}
        </div>
        {isObject && isExpanded && (
          <div className="ml-4">
            {Object.entries(value).map(([k, v]) => renderNode(k, v, `${path}.${k}`))}
          </div>
        )}
      </div>
    );
  };

  return <div>{Object.entries(data).map(([key, value]) => renderNode(key, value, key))}</div>;
};

export default function JsonFormatter() {
  const [inputJSON, setInputJSON] = useState("")
  const [outputJSON, setOutputJSON] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [options, setOptions] = useState<FormatterOptions>({
    indentSize: 2,
    sortKeys: false,
    wrapLines: true,
  })
  const [viewMode, setViewMode] = useState<'raw' | 'tree'>('raw')
  const [history, setHistory] = useState<string[]>([])
  const [undoStack, setUndoStack] = useState<string[]>([])
  const [redoStack, setRedoStack] = useState<string[]>([])

 
  const handleFormat = () => {
    setError(null)
    if (!inputJSON) {
      setOutputJSON("")
      return
    }
    try {
      const formatted = formatJSON(inputJSON, options)
      setOutputJSON(formatted)
      if (formatted && !history.includes(formatted)) {
        setHistory(prev => [formatted, ...prev].slice(0, 5))
      }
      setUndoStack(prev => [inputJSON, ...prev])
      setRedoStack([])
    } catch (error) {
      setError((error as Error).message)
      setOutputJSON("")
    }
  }
  useEffect(() => {
    handleFormat()
  }, [inputJSON, options, handleFormat])

  const handleMinify = () => {
    setError(null)
    if (!inputJSON) {
      setOutputJSON("")
      return
    }
    try {
      const minified = minifyJSON(inputJSON)
      setOutputJSON(minified)
      if (minified && !history.includes(minified)) {
        setHistory(prev => [minified, ...prev].slice(0, 5))
      }
      setUndoStack(prev => [inputJSON, ...prev])
      setRedoStack([])
    } catch (error) {
      setError((error as Error).message)
      setOutputJSON("")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadJSON = () => {
    const blob = new Blob([outputJSON], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted_json.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInputJSON("")
    setOutputJSON("")
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

  return (
    <div className="container mx-auto space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input JSON</CardTitle>
            <CardDescription>Enter or paste your JSON here</CardDescription>
          </CardHeader>
          <CardContent>
          <Textarea
  className="w-full max-w-[400px] h-64 p-2 border rounded font-mono overflow-x-auto resize-y"
  value={inputJSON}
  onChange={(e) => setInputJSON(e.target.value)}
  placeholder="Enter your JSON here..."
/>

          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Character count: {inputJSON.length}
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Formatted JSON</CardTitle>
            <CardDescription>
              {outputJSON.length} characters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'raw' | 'tree')}>
              <TabsList>
                <TabsTrigger value="raw">Raw</TabsTrigger>
                <TabsTrigger value="tree">Tree</TabsTrigger>
              </TabsList>
              <TabsContent value="raw">
                <ScrollArea className="h-64 w-full rounded border p-4">
                  <pre className="whitespace-pre-wrap font-mono">{outputJSON}</pre>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="tree">
                <ScrollArea className="h-64 w-full rounded border p-4">
                  {outputJSON && <TreeView data={JSON.parse(outputJSON)} />}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => copyToClipboard(outputJSON)}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy formatted JSON to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={downloadJSON}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download formatted JSON as .json file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formatting Options</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="indent-size">Indent Size</Label>
            <Select
              value={options.indentSize.toString()}
              onValueChange={(value) => setOptions(prev => ({ ...prev, indentSize: parseInt(value) }))}
            >
              <SelectTrigger id="indent-size">
                <SelectValue placeholder="Select indent size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 spaces</SelectItem>
                <SelectItem value="4">4 spaces</SelectItem>
                <SelectItem value="8">8 spaces</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="sort-keys"
              checked={options.sortKeys}
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, sortKeys: checked }))}
            />
            <Label htmlFor="sort-keys">Sort Keys</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="wrap-lines"
              checked={options.wrapLines}
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, wrapLines: checked }))}
            />
            <Label htmlFor="wrap-lines">Wrap Lines</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleFormat}>Format JSON</Button>
          <Button onClick={handleMinify} variant="outline">Minify JSON</Button>
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
          <CardTitle>JSON History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40">
            {history.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-muted">
                <span className="truncate flex-1">{item.substring(0, 50)}...</span>
                <Button variant="ghost" size="sm" onClick={() => setInputJSON(item)}>
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
              <p>Clear all JSON and history</p>
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
                  Quick guide on how to use the JSON Formatter
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Input</Label>
                  <div className="col-span-2 text-sm">
                    Enter or paste your JSON in the input area
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Options</Label>
                  <div className="col-span-2 text-sm">
                    Set formatting options as needed
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Format</Label>
                  <div className="col-span-2 text-sm">
                    Click &apos;Format JSON&apos; or &apos;Minify JSON&apos;
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Output</Label>
                  <div className="col-span-2 text-sm">
                    View formatted JSON and use additional features
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