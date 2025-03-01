'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Upload, Download, Copy, Check, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import jsonpath from 'jsonpath'

export default function JsonPath() {
  const [jsonInput, setJsonInput] = useState('')
  const [jsonPath, setJsonPath] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('input')

  

  const findJSONPath = () => {
    setError('')
    setResult('')

    try {
      const jsonData = JSON.parse(jsonInput)
      const pathResult = jsonpath.query(jsonData, jsonPath)
      setResult(JSON.stringify(pathResult, null, 2))
    } catch (err) {
      console.log(err)
      setError('Invalid JSON input or JSONPath query. Please check your input and try again.')
    }
  }
  useEffect(() => {
    if (jsonInput && jsonPath) {
      findJSONPath()
    }
  }, [jsonInput, jsonPath, findJSONPath])
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setJsonInput(content)
      }
      reader.readAsText(file)
    }
  }

  const downloadResult = () => {
    const blob = new Blob([result], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'json-path-result.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }, (err) => {
      console.error('Could not copy text: ', err)
    })
  }

  return (
    <div className="container mx-auto space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">JSON Input</TabsTrigger>
              <TabsTrigger value="result">Result</TabsTrigger>
            </TabsList>
            <TabsContent value="input">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="json-input">JSON Input</Label>
                  <Textarea
                    id="json-input"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Paste your JSON here"
                    className="h-[calc(100vh-20rem)] font-mono text-sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Input
                      id="file-upload"
                      type="file"
                      onChange={handleFileUpload}
                      accept=".json"
                      className="hidden"
                    />
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload JSON
                      </span>
                    </Button>
                  </Label>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="result">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="json-result">Result</Label>
                  <Textarea
                    id="json-result"
                    value={result}
                    readOnly
                    className="h-[calc(100vh-20rem)] font-mono text-sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button onClick={downloadResult} disabled={!result}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Result
                  </Button>
                  <Button onClick={() => copyToClipboard(result)} disabled={!result}>
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <Label htmlFor="json-path">JSONPath Query</Label>
            <Input
              id="json-path"
              value={jsonPath}
              onChange={(e) => setJsonPath(e.target.value)}
              placeholder="Enter JSONPath query (e.g., $.store.book[*].author)"
              className="font-mono"
            />
          </div>

          <Button onClick={findJSONPath} className="w-full">
            <Search className="w-4 h-4 mr-2" />
            Find JSON Path
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Example JSONPath Queries</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>$.store.book[*].author - Get all authors of books</li>
              <li>$..author - Get all authors</li>
              <li>$.store.book[2].title - Get the title of the third book</li>
              <li>$..book[?(@.price &lt; 10)] - Get all books cheaper than $10</li>
              <li>$..book[(@.length-1)] - Get the last book in the array</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Documentation</h2>
            <p className="text-sm">
              JSONPath is a query language for JSON, similar to XPath for XML. It allows you to select and extract data from a JSON structure. Here are some key concepts:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>$ represents the root object/element</li>
              <li>@ represents the current object/element</li>
              <li>. or [] represents child operator</li>
              <li>.. represents recursive descent</li>
              <li>* represents wildcard. All objects/elements regardless of their names.</li>
              <li>[start:end:step] represents array slice operator</li>
              <li>[?(&lt;expression&gt;)] represents filter expression</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}