"use client"

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Copy, Download, HelpCircle, Upload,  Code, Eye, EyeOff} from 'lucide-react'


// Mock obfuscation function (replace with actual obfuscation logic)
const obfuscateJavaScript = (code: string, options: ObfuscationOptions) => {
  let obfuscated = code

  if (options.renameVariables) {
    // Simple variable renaming (for demonstration)
    const variables = obfuscated.match(/var\s+(\w+)/g) || []
    variables.forEach((v, i) => {
      const original = v.split(' ')[1]
      const renamed = `_${i}`
      obfuscated = obfuscated.replace(new RegExp(`\\b${original}\\b`, 'g'), renamed)
    })
  }

  if (options.encryptStrings) {
    // Simple string encryption (for demonstration)
    const strings = obfuscated.match(/"([^"]*)"/g) || []
    strings.forEach((s) => {
      const original = s.slice(1, -1)
      const encrypted = Buffer.from(original).toString('base64')
      obfuscated = obfuscated.replace(s, `atob("${encrypted}")`)
    })
  }

  if (options.controlFlowFlattening) {
    // Simple control flow flattening (for demonstration)
    obfuscated = `(function(){
      var _0x${Math.random().toString(36).substr(2, 9)}=0;
      while(true){
        switch(_0x${Math.random().toString(36).substr(2, 9)}++){
          case 0:
            ${obfuscated.replace(/\n/g, '\nbreak;\ncase _0x' + Math.random().toString(36).substr(2, 9) + '++:')}
            break;
          default:
            return;
        }
      }
    })();`
  }

  if (options.deadCodeInjection) {
    // Simple dead code injection (for demonstration)
    const deadCode = `if(false){console.log("This is dead code");}`
    obfuscated = deadCode + obfuscated
  }

  return obfuscated
}

interface ObfuscationOptions {
  renameVariables: boolean
  encryptStrings: boolean
  controlFlowFlattening: boolean
  deadCodeInjection: boolean
  obfuscationLevel: 'light' | 'medium' | 'heavy'
}

export default function JSObfuscator() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [options, setOptions] = useState<ObfuscationOptions>({
    renameVariables: true,
    encryptStrings: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    obfuscationLevel: 'medium',
  })
  const [showPreview, setShowPreview] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)


  const handleObfuscate = () => {
    setError('')
    try {
      const obfuscated = obfuscateJavaScript(input, options)
      setOutput(obfuscated)
    } catch (err) {
      console.log(err)
      setError('Obfuscation error occurred')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInput(content)
      }
      reader.readAsText(file)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'obfuscated.js'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto space-y-6">
     

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input JavaScript</CardTitle>
            <CardDescription>
              Paste your JavaScript code or upload a file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[300px] font-mono text-sm"
              value={input}
              onChange={handleInputChange}
              placeholder="Paste your JavaScript here..."
            />
          </CardContent>
          <CardFooter>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Upload JS File
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload a JavaScript file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".js"
            />
          </CardFooter>
        </Card>

        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Obfuscated JavaScript</CardTitle>
                  <CardDescription>
                    Preview of obfuscated JavaScript code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] w-full rounded border p-4">
                  <pre className="whitespace-pre-wrap font-mono text-sm">{output}</pre>

                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={handleCopy}>
                          <Copy className="mr-2 h-4 w-4" /> Copy
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy obfuscated JavaScript to clipboard</p>
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
                        <p>Download obfuscated JavaScript file</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Obfuscation Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="rename-variables"
                checked={options.renameVariables}
                onCheckedChange={(checked) => setOptions({...options, renameVariables: checked})}
              />
              <Label htmlFor="rename-variables">Rename Variables</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="encrypt-strings"
                checked={options.encryptStrings}
                onCheckedChange={(checked) => setOptions({...options, encryptStrings: checked})}
              />
              <Label htmlFor="encrypt-strings">Encrypt Strings</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="control-flow-flattening"
                checked={options.controlFlowFlattening}
                onCheckedChange={(checked) => setOptions({...options, controlFlowFlattening: checked})}
              />
              <Label htmlFor="control-flow-flattening">Control Flow Flattening</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="dead-code-injection"
                checked={options.deadCodeInjection}
                onCheckedChange={(checked) => setOptions({...options, deadCodeInjection: checked})}
              />
              <Label htmlFor="dead-code-injection">Dead Code Injection</Label>
            </div>
            <div className="col-span-2">
              <Label htmlFor="obfuscation-level">Obfuscation Level</Label>
              <Select
                value={options.obfuscationLevel}
                onValueChange={(value: 'light' | 'medium' | 'heavy') => setOptions({...options, obfuscationLevel: value})}
              >
                <SelectTrigger id="obfuscation-level">
                  <SelectValue placeholder="Select obfuscation level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleObfuscate}>
            <Code className="mr-2 h-4 w-4" /> Obfuscate JavaScript
          </Button>
          <Button onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </CardFooter>
      </Card>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center"
          >
            <AlertCircle className="mr-2 h-5 w-5" />
            {error}
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
                <h4 className="font-medium leading-none">Help Guide</h4>
                <p className="text-sm text-muted-foreground">
                  Quick guide on how to use the JavaScript Obfuscator
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Input</Label>
                  <div className="col-span-2 text-sm">
                    Paste JavaScript code or upload a JS file
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Options</Label>
                  <div className="col-span-2 text-sm">
                    Adjust obfuscation options as needed
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Obfuscate</Label>
                  <div className="col-span-2 text-sm">
                    Click &apos;Obfuscate JavaScript&apos; to apply changes
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4.   Output</Label>
                  <div className="col-span-2 text-sm">
                    View obfuscated JS, copy to clipboard, or download
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