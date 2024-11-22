"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {  ArrowDownAZ, ArrowUpAZ, Copy, Download, HelpCircle, RefreshCw, Shuffle } from 'lucide-react'

type SortType = 'alphabetical' | 'numeric' | 'length' | 'wordCount' | string

interface Options {
  sortType: SortType;
  caseSensitive: boolean;
  reverse: boolean;
  removeDuplicates: boolean;
  trimWhitespace: boolean;
  randomize: boolean;
}

const sortLines = (lines: string[], options: Options): string[] => {
  let sortedLines = [...lines]

  if (options.trimWhitespace) {
    sortedLines = sortedLines.map(line => line.trim())
  }

  if (options.removeDuplicates) {
    sortedLines = [...new Set(sortedLines)]
  }

  const getSortValue = (line: string): string | number => {
    if (options.sortType === 'numeric') {
      const number = parseFloat(line.match(/\d+/)?.[0] || '0')
      return isNaN(number) ? 0 : number
    }
    if (options.sortType === 'length') {
      return line.length
    }
    if (options.sortType === 'wordCount') {
      return line.split(/\s+/).filter(word => word.length > 0).length
    }
    return options.caseSensitive ? line : line.toLowerCase()
  }

  sortedLines.sort((a, b) => {
    const valueA = getSortValue(a)
    const valueB = getSortValue(b)
    if (valueA < valueB) return -1
    if (valueA > valueB) return 1
    return 0
  })

  if (options.reverse) {
    sortedLines.reverse()
  }

  if (options.randomize) {
    for (let i = sortedLines.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
  [sortedLines[i], sortedLines[j]] = [sortedLines[j], sortedLines[i]];
  }
  }

  return sortedLines
}

export default function LineSorter() {
  const [inputText, setInputText] = useState<string>("")
  const [sortedText, setSortedText] = useState<string>("")
  const [options, setOptions] = useState<Options>({
    sortType: 'alphabetical',
    caseSensitive: false,
    reverse: false,
    removeDuplicates: false,
    trimWhitespace: false,
    randomize: false,
  })

  useEffect(() => {
    handleSort()
  }, [inputText, options])

  const handleSort = () => {
    const lines = inputText.split('\n')
    const sortedLines = sortLines(lines, options)
    setSortedText(sortedLines.join('\n'))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sortedText)
  }

  const downloadText = () => {
    const blob = new Blob([sortedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sorted-lines.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetAll = () => {
    setInputText("")
    setSortedText("")
    setOptions({
      sortType: 'alphabetical',
      caseSensitive: false,
      reverse: false,
      removeDuplicates: false,
      trimWhitespace: false,
      randomize: false,
    })
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
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sorted Text</CardTitle>
            <CardDescription>
              {sortedText.split('\n').length} lines | {sortedText.length} characters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 w-full rounded border p-4">
              <pre className="whitespace-pre-wrap">{sortedText}</pre>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy sorted text to clipboard</p>
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
                  <p>Download sorted text as .txt file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sorting Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="sort-type">Sort Type</Label>
              <Select value={options.sortType} onValueChange={(value) => setOptions({...options, sortType: value})}>
                <SelectTrigger id="sort-type">
                  <SelectValue placeholder="Select sort type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="numeric">Numeric</SelectItem>
                  <SelectItem value="length">Line Length</SelectItem>
                  <SelectItem value="wordCount">Word Count</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
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
                id="reverse"
                checked={options.reverse}
                onCheckedChange={(checked) => setOptions({...options, reverse: checked})}
              />
              <Label htmlFor="reverse">Reverse Order</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="remove-duplicates"
                checked={options.removeDuplicates}
                onCheckedChange={(checked) => setOptions({...options, removeDuplicates: checked})}
              />
              <Label htmlFor="remove-duplicates">Remove Duplicates</Label>
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
                id="randomize"
                checked={options.randomize}
                onCheckedChange={(checked) => setOptions({...options, randomize: checked})}
              />
              <Label htmlFor="randomize">Randomize</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={resetAll} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset All
          </Button>
        </CardFooter>
      </Card>

      <div className="flex flex-wrap justify-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setOptions({...options, sortType: 'alphabetical', reverse: false})}>
                <ArrowDownAZ className="mr-2 h-4 w-4" /> A-Z
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sort alphabetically A-Z</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setOptions({...options, sortType: 'alphabetical', reverse: true})}>
                <ArrowUpAZ className="mr-2 h-4 w-4" /> Z-A
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sort alphabetically Z-A</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setOptions({...options, sortType: 'numeric', reverse: false})}>
                <ArrowDownAZ className="mr-2 h-4 w-4" /> 1-9
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sort numerically ascending</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setOptions({...options, sortType: 'numeric', reverse: true})}>
                <ArrowDownAZ className="mr-2 h-4 w-4 rotate-180" /> 9-1
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sort numerically descending</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setOptions({...options, randomize: true})}>
                <Shuffle className="mr-2 h-4 w-4" /> Randomize
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Randomize line order</p>
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
                  Quick guide on how to use the Line Sorter
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Input</Label>
                  <div className="col-span-2 text-sm">
                    Enter your text, one line per entry
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Options</Label>
                  <div className="col-span-2 text-sm">
                    Choose sorting type and additional options
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Sort</Label>
                  <div className="col-span-2 text-sm">
                    Sorting happens automatically as you type or change options
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Use</Label>
                  <div className="col-span-2 text-sm">
                    Copy to clipboard or download the sorted text
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