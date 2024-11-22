"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, Copy, Download, HelpCircle, Upload, Undo, Redo,  Code, FileCode, Minimize2, Maximize2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'python', label: 'Python' },
]


const beautifyCode = (code: string, language: string, indentSize: number): string => {
  // This is a placeholder function. In a real implementation, you would use a proper
  // code formatting library for each supported language.
  if(!language) {
    language = 'JavaScript'
  }

  return code.split('\n').map(line => ' '.repeat(indentSize) + line).join('\n')
}

const minifyCode = (code: string, language: string): string => {
  // This is a placeholder function. In a real implementation, you would use a proper
  // minification library for each supported language.
  if(!language) {
    language = 'JavaScript'
  }
  return code.replace(/\s+/g, ' ').trim()
}

export default function CodeBeautifier() {
  const [inputCode, setInputCode] = useState('')
  const [outputCode, setOutputCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [indentSize, setIndentSize] = useState(2)
  const [isMinified, setIsMinified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    try {
      const formattedCode = isMinified
        ? minifyCode(inputCode, language)
        : beautifyCode(inputCode, language, indentSize)
      setOutputCode(formattedCode)
      setError(null)
      if (formattedCode !== inputCode) {
        setHistory(prev => [...prev.slice(0, historyIndex + 1), inputCode])
        setHistoryIndex(prev => prev + 1)
      }
    } catch (err) {
      console.log(err)
      setError('Error formatting code')
      setOutputCode('')
    }
  }, [inputCode, language, indentSize, isMinified])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInputCode(content)
      }
      reader.readAsText(file)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCode)
  }

  const downloadCode = () => {
    const blob = new Blob([outputCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `beautified_code.${language}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1)
      setInputCode(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1)
      setInputCode(history[historyIndex + 1])
    }
  }

  return (
    <div className={`container mx-auto space-y-6`}>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input Code</CardTitle>
            <CardDescription>Paste your code or upload a file</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Paste your code here..."
              className="min-h-[300px] font-mono"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => document.getElementById('file-upload')?.click()}>
              <Upload className="mr-2 h-4 w-4" /> Upload File
            </Button>
            <input
              id="file-upload"
              type="file"
              accept=".js,.html,.css,.json,.py"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output Code</CardTitle>
            <CardDescription>Beautified or minified code</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <pre className="font-mono whitespace-pre-wrap">
                {outputCode}
              </pre>
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
                  <p>Copy to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={downloadCode}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download formatted code</p>
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
            <Label htmlFor="indent-size">Indent Size:</Label>
            <Slider
              id="indent-size"
              min={1}
              max={8}
              step={1}
              value={[indentSize]}
              onValueChange={(value) => setIndentSize(value[0])}
              className="w-[200px]"
            />
            <span>{indentSize}</span>
          </div>
         
         
          <div className="flex items-center space-x-2">
            <Switch
              id="minify"
              checked={isMinified}
              onCheckedChange={setIsMinified}
            />
            <Label htmlFor="minify">Minify Code</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={undo} disabled={historyIndex <= 0}>
                <Undo className="mr-2 h-4 w-4" /> Undo
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo last change</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={redo} disabled={historyIndex >= history.length - 1}>
                <Redo className="mr-2 h-4 w-4" /> Redo
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo last change</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
                <h4 className="font-medium leading-none">Help</h4>
                <p className="text-sm text-muted-foreground">
                  How to use the Code Beautifier:
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Code className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    Paste your code or upload a file
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <FileCode className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    Select the appropriate language
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Maximize2 className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    Adjust formatting options as needed
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Minimize2 className="h-4 w-4" />
                  <div className="col-span-2 text-sm">
                    Toggle minification if desired
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