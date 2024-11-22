"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CaseLower, CaseUpper, Copy, Download, HelpCircle, RefreshCw, Type,  } from 'lucide-react'

interface StringAnalysis {
  totalLength: number;
  wordCount: number;
  spaceCount: number;
  trimmedLength: number;
  uniqueCharCount: number;
  uppercaseCount: number;
  lowercaseCount: number;
  specialCharCount: number;
  frequencyAnalysis: { [key: string]: number };
  byteLength: number;
}

const analyzeString = (str: string, excludeSpaces: boolean, excludePunctuation: boolean): StringAnalysis => {
  const words = str.trim().split(/\s+/).filter(word => word.length > 0);
  const trimmedStr = str.trim();
  const uniqueChars = new Set(str);
  const uppercaseChars = str.match(/[A-Z]/g) || [];
  const lowercaseChars = str.match(/[a-z]/g) || [];
  const specialChars = str.match(/[^a-zA-Z0-9\s]/g) || [];
  const frequencyAnalysis: { [key: string]: number } = {};

  str.split('').forEach(char => {
    frequencyAnalysis[char] = (frequencyAnalysis[char] || 0) + 1;
  });

  let totalLength = str.length;
  if (excludeSpaces) totalLength -= (str.match(/\s/g) || []).length;
  if (excludePunctuation) totalLength -= (str.match(/[^\w\s]/g) || []).length;

  return {
    totalLength,
    wordCount: words.length,
    spaceCount: (str.match(/\s/g) || []).length,
    trimmedLength: trimmedStr.length,
    uniqueCharCount: uniqueChars.size,
    uppercaseCount: uppercaseChars.length,
    lowercaseCount: lowercaseChars.length,
    specialCharCount: specialChars.length,
    frequencyAnalysis,
    byteLength: new Blob([str]).size
  };
};

export default function StrLenCalc() {
  const [inputText, setInputText] = useState("")
  const [analysis, setAnalysis] = useState<StringAnalysis | null>(null)
  const [excludeSpaces, setExcludeSpaces] = useState(false)
  const [excludePunctuation, setExcludePunctuation] = useState(false)

  useEffect(() => {
    setAnalysis(analyzeString(inputText, excludeSpaces, excludePunctuation))
  }, [inputText, excludeSpaces, excludePunctuation])

  const handleCaseConversion = (type: 'upper' | 'lower' | 'title') => {
    switch (type) {
      case 'upper':
        setInputText(inputText.toUpperCase())
        break
      case 'lower':
        setInputText(inputText.toLowerCase())
        break
      case 'title':
        setInputText(inputText.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()))
        break
    }
  }

  const removeExtraSpaces = () => {
    setInputText(inputText.replace(/\s+/g, ' ').trim())
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inputText)
  }

  const downloadResults = () => {
    const blob = new Blob([JSON.stringify(analysis, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'string-analysis.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetAll = () => {
    setInputText("")
    setAnalysis(null)
    setExcludeSpaces(false)
    setExcludePunctuation(false)
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
          <CardFooter className="flex flex-wrap gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => handleCaseConversion('upper')}>
                    <CaseUpper className="mr-2 h-4 w-4" /> Uppercase
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Convert to uppercase</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => handleCaseConversion('lower')}>
                    <CaseLower className="mr-2 h-4 w-4" /> Lowercase
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Convert to lowercase</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => handleCaseConversion('title')}>
                    <Type className="mr-2 h-4 w-4" /> Title Case
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Convert to title case</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={removeExtraSpaces}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Remove Extra Spaces
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove extra spaces</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              String analysis and character counts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded border p-4">
              {analysis && (
                <div className="space-y-2">
                  <p>Total Length: {analysis.totalLength}</p>
                  <p>Word Count: {analysis.wordCount}</p>
                  <p>Space Count: {analysis.spaceCount}</p>
                  <p>Trimmed Length: {analysis.trimmedLength}</p>
                  <p>Unique Character Count: {analysis.uniqueCharCount}</p>
                  <p>Uppercase Count: {analysis.uppercaseCount}</p>
                  <p>Lowercase Count: {analysis.lowercaseCount}</p>
                  <p>Special Character Count: {analysis.specialCharCount}</p>
                  <p>Byte Length: {analysis.byteLength}</p>
                  <div>
                    <h4 className="font-semibold">Character Frequency:</h4>
                    <ul className="list-disc list-inside">
                      {Object.entries(analysis.frequencyAnalysis).map(([char, count]) => (
                        <li key={char}>
                          {char === ' ' ? 'Space' : char}: {count}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Text
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy input text to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={downloadResults}>
                    <Download className="mr-2 h-4 w-4" /> Download Analysis
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download analysis results as JSON</p>
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
              id="exclude-spaces"
              checked={excludeSpaces}
              onCheckedChange={setExcludeSpaces}
            />
            <Label htmlFor="exclude-spaces">Exclude Spaces</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="exclude-punctuation"
              checked={excludePunctuation}
              onCheckedChange={setExcludePunctuation}
            />
            <Label htmlFor="exclude-punctuation">Exclude Punctuation</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={resetAll} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Reset All
        </Button>
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
                  Quick guide on how to use the String Length Calculator
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
                  <Label htmlFor="maxWidth">2. Analyze</Label>
                  <div className="col-span-2 text-sm">
                    View real-time analysis results
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Options</Label>
                  <div className="col-span-2 text-sm">
                    Customize analysis with exclude options
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Actions</Label>
                  <div className="col-span-2 text-sm">
                    Use buttons to manipulate text or export results
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