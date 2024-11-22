"use client"

import React, { useState, useEffect } from 'react'

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeftRight, Copy, Download, Trash2, Type } from 'lucide-react'

interface ReverseOptions {
  ignoreNumbers: boolean;
  ignoreSpecialChars: boolean;
}

const reverseString = (str: string, options: ReverseOptions): string => {
  if (options.ignoreNumbers && options.ignoreSpecialChars) {
    return str.replace(/[a-zA-Z]+/g, word => word.split('').reverse().join(''));
  } else if (options.ignoreNumbers) {
    return str.replace(/[a-zA-Z\W]+/g, word => word.split('').reverse().join(''));
  } else if (options.ignoreSpecialChars) {
    return str.replace(/[a-zA-Z0-9]+/g, word => word.split('').reverse().join(''));
  }
  return str.split('').reverse().join('');
}

const reverseWords = (str: string): string => {
  return str.split(' ').reverse().join(' ');
}

const reverseIndividualWords = (str: string): string => {
  return str.split(' ').map(word => word.split('').reverse().join('')).join(' ');
}

const reverseLettersOnly = (str: string): string => {
  const letters = str.match(/[a-zA-Z]/g) || [];
  const reversed = letters.reverse();
  return str.replace(/[a-zA-Z]/g, () => reversed.shift() || '');
}

export default function StringReverse() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [reverseType, setReverseType] = useState<'entire' | 'words' | 'individual' | 'letters'>('entire')
  const [options, setOptions] = useState<ReverseOptions>({
    ignoreNumbers: false,
    ignoreSpecialChars: false,
  })
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    reverseText()
  }, [inputText, reverseType, options])

  const reverseText = () => {
    let result = inputText
    switch (reverseType) {
      case 'entire':
        result = reverseString(inputText, options)
        break
      case 'words':
        result = reverseWords(inputText)
        break
      case 'individual':
        result = reverseIndividualWords(inputText)
        break
      case 'letters':
        result = reverseLettersOnly(inputText)
        break
    }
    setOutputText(result)
    if (result && !history.includes(result)) {
      setHistory(prev => [result, ...prev].slice(0, 5))
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
  }

  const downloadResult = () => {
    const blob = new Blob([outputText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'reversed-text.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInputText("")
    setOutputText("")
    setHistory([])
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
            <CardTitle>Reversed Text</CardTitle>
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
                  <p>Copy reversed text to clipboard</p>
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
                  <p>Download reversed text as .txt file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reverse Options</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="entire" onValueChange={(value) => setReverseType(value as any)}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="entire">Entire String</TabsTrigger>
              <TabsTrigger value="words">Word Order</TabsTrigger>
              <TabsTrigger value="individual">Individual Words</TabsTrigger>
              <TabsTrigger value="letters">Letters Only</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="ignore-numbers"
                checked={options.ignoreNumbers}
                onCheckedChange={(checked) => setOptions(prev => ({ ...prev, ignoreNumbers: checked }))}
              />
              <Label htmlFor="ignore-numbers">Ignore Numbers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="ignore-special"
                checked={options.ignoreSpecialChars}
                onCheckedChange={(checked) => setOptions(prev => ({ ...prev, ignoreSpecialChars: checked }))}
              />
              <Label htmlFor="ignore-special">Ignore Special Characters</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reversal History</CardTitle>
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

      <div className="flex justify-center space-x-4">
        <Button onClick={clearAll} variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" /> Clear All
        </Button>
      </div>

      <div className="fixed bottom-4 right-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-10 h-10 rounded-full p-0">
              <ArrowLeftRight className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Help Guide</h4>
                <p className="text-sm text-muted-foreground">
                  Quick guide on how to use the String Reverser
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
                    Choose reversal type and additional options
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Reverse</Label>
                  <div className="col-span-2 text-sm">
                    Reversal happens automatically as you type or change options
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Use</Label>
                  <div className="col-span-2 text-sm">
                    Copy to clipboard or download the reversed text
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