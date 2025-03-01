"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {  Copy, Download, HelpCircle, Trash2, Undo, Redo } from 'lucide-react'

const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'])

const generateSlug = (text: string, options: SlugOptions): string => {
  let slug = text.toLowerCase()

  if (options.removeStopWords) {
    slug = slug.split(' ').filter(word => !stopWords.has(word)).join(' ')
  }

  if (options.removeAccents) {
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  slug = slug.replace(/[^\w\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, options.separator)

  if (options.maxLength > 0) {
    slug = slug.slice(0, options.maxLength)
  }

  return options.prefix + slug + options.suffix
}

interface SlugOptions {
  separator: string
  removeStopWords: boolean
  removeAccents: boolean
  maxLength: number
  prefix: string
  suffix: string
}

export default function SlugGenerator() {
  const [inputText, setInputText] = useState("")
  const [slugs, setSlugs] = useState<string[]>([])
  const [options, setOptions] = useState<SlugOptions>({
    separator: '-',
    removeStopWords: false,
    removeAccents: true,
    maxLength: 0,
    prefix: '',
    suffix: '',
  })
  const [history, setHistory] = useState<string[][]>([])
  const [undoStack, setUndoStack] = useState<string[]>([])
  const [redoStack, setRedoStack] = useState<string[]>([])

  

  const generateSlugs = () => {
    const newSlugs = inputText.split('\n').map(text => generateSlug(text, options))
    setSlugs(newSlugs)
    setHistory(prev => [newSlugs, ...prev].slice(0, 5))
    setUndoStack(prev => [inputText, ...prev])
    setRedoStack([])
  }

  useEffect(() => {
    generateSlugs()
  }, [inputText, options, generateSlugs])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slugs.join('\n'))
  }

  const downloadSlugs = () => {
    const blob = new Blob([slugs.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'generated-slugs.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInputText("")
    setSlugs([])
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
            <CardDescription>Enter text to generate slugs (one per line for bulk generation)</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="w-full h-40 p-2 border rounded"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here..."
            />
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Lines: {inputText.split('\n').filter(line => line.trim()).length}
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Generated Slugs</CardTitle>
            <CardDescription>
              {slugs.length} slugs generated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-40 w-full rounded border p-4">
              {slugs.map((slug, index) => (
                <div key={index} className="mb-2">
                  <code className="text-sm bg-muted p-1 rounded">{slug}</code>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy All
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy all slugs to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={downloadSlugs}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download slugs as .txt file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Slug Options</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="separator">Separator</Label>
            <Select value={options.separator} onValueChange={(value) => setOptions(prev => ({ ...prev, separator: value }))}>
              <SelectTrigger id="separator">
                <SelectValue placeholder="Select separator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-">Hyphen (-)</SelectItem>
                <SelectItem value="_">Underscore (_)</SelectItem>
                <SelectItem value=".">Dot (.)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="remove-stop-words"
              checked={options.removeStopWords}
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, removeStopWords: checked }))}
            />
            <Label htmlFor="remove-stop-words">Remove Stop Words</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="remove-accents"
              checked={options.removeAccents}
              onCheckedChange={(checked) => setOptions(prev => ({ ...prev, removeAccents: checked }))}
            />
            <Label htmlFor="remove-accents">Remove Accents</Label>
          </div>
          <div>
            <Label htmlFor="max-length">Max Length (0 for no limit)</Label>
            <Slider
              id="max-length"
              min={0}
              max={100}
              step={1}
              value={[options.maxLength]}
              onValueChange={(value) => setOptions(prev => ({ ...prev, maxLength: value[0] }))}
            />
            <div className="text-center mt-2">{options.maxLength} characters</div>
          </div>
          <div>
            <Label htmlFor="prefix">Prefix</Label>
            <Input
              id="prefix"
              value={options.prefix}
              onChange={(e) => setOptions(prev => ({ ...prev, prefix: e.target.value }))}
              placeholder="Enter prefix..."
            />
          </div>
          <div>
            <Label htmlFor="suffix">Suffix</Label>
            <Input
              id="suffix"
              value={options.suffix}
              onChange={(e) => setOptions(prev => ({ ...prev, suffix: e.target.value }))}
              placeholder="Enter suffix..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Slug History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40">
            {history.map((slugSet, index) => (
              <div key={index} className="mb-2 p-2 hover:bg-muted rounded">
                <div className="text-sm font-medium">Set {index + 1}</div>
                {slugSet.map((slug, slugIndex) => (
                  <div key={slugIndex} className="text-sm text-muted-foreground">{slug}</div>
                ))}
                <Button variant="ghost" size="sm" onClick={() => setInputText(slugSet.join('\n'))}>
                  Use This Set
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
                  Quick guide on how to use the Slug Generator
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Input</Label>
                  <div className="col-span-2 text-sm">
                    Enter text (one per line for bulk generation)
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Options</Label>
                  <div className="col-span-2 text-sm">
                    Customize slug generation options
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Generate</Label>
                  <div className="col-span-2 text-sm">
                    Slugs are generated automatically
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Use</Label>
                  <div className="col-span-2 text-sm">
                    Copy or download generated slugs
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