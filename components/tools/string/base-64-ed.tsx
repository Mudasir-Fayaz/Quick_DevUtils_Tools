"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Copy, Download, HelpCircle, RefreshCw, Upload } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const encodeBase64 = (str: string, urlSafe: boolean = false) => {
  let encoded = btoa(str)
  if (urlSafe) {
    encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  }
  return encoded
}

const decodeBase64 = (str: string) => {
  try {
    const sanitized = str.replace(/-/g, '+').replace(/_/g, '/')
    return atob(sanitized)
  } catch (error) {
    console.log(error)
    throw new Error('Invalid Base64 input')
  }
}

export default function Base64EncodeDecode() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [urlSafe, setUrlSafe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [myFile, setFile] = useState<File | null>(null)

  
  const handleConversion = () => {
    setError(null)
    if (!inputText) {
      setOutputText("")
      return
    }
    try {
      if (mode === 'encode') {
        setOutputText(encodeBase64(inputText, urlSafe))
      } else {
        setOutputText(decodeBase64(inputText))
      }
    } catch (error) {
      console.log(error)
      setError('Invalid input for decoding')
      setOutputText("")
    }
  }
  useEffect(() => {
    handleConversion()
  }, [inputText, mode, urlSafe, handleConversion])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInputText(content)
      }
      if(myFile)
      reader.readAsText(file)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${mode === 'encode' ? 'encoded' : 'decoded'}_content.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
  }

  const resetAll = () => {
    setInputText("")
    setOutputText("")
    setError(null)
    setFile(null)
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
            <CardDescription>Enter text to {mode}</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-40 p-2 border rounded"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Enter text to ${mode}...`}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Upload File
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload a file to {mode}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
            {mode === 'encode' && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="url-safe"
                  checked={urlSafe}
                  onCheckedChange={setUrlSafe}
                />
                <Label htmlFor="url-safe">URL Safe</Label>
              </div>
            )}
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
                  <Button onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Text
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
                  <Button onClick={handleDownload}>
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
                  Quick guide on how to use the Base64 Encoder/Decoder
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
                    Enter text or upload a file
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Options</Label>
                  <div className="col-span-2 text-sm">
                    Toggle URL Safe encoding if needed
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Output</Label>
                  <div className="col-span-2 text-sm">
                    Copy or download the result
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