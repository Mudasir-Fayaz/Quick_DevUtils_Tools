'use client'

import { useState } from 'react'
import { FileText, Download,  AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CsvJson() {
  const [csvInput, setCsvInput] = useState('')
  const [jsonOutput, setJsonOutput] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [prettyPrint, setPrettyPrint] = useState(true)
  const [firstRowAsHeader, setFirstRowAsHeader] = useState(true)
  const [outputFormat, setOutputFormat] = useState('array')
  const [error, setError] = useState('')

  const convertToJSON = () => {
    setError('')
    if (!csvInput.trim()) {
      setError('Please enter CSV data or upload a CSV file.')
      return
    }

    try {
      const lines = csvInput.trim().split('\n')
      const headers = firstRowAsHeader ? lines[0].split(delimiter) : []
      const jsonArray = []

      const startIndex = firstRowAsHeader ? 1 : 0
      for (let i = startIndex; i < lines.length; i++) {
        const currentLine = lines[i].split(delimiter)
        if (firstRowAsHeader) {
          const obj: { [key: string]: string } = {}
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentLine[j]?.trim() || ''
          }
          jsonArray.push(obj)
        } else {
          jsonArray.push(currentLine.map(item => item.trim()))
        }
      }

      let result
      if (outputFormat === 'array') {
        result = jsonArray
      } else if (outputFormat === 'object') {
        result = { data: jsonArray }
      } else { // single object
        result = jsonArray[0] || {}
      }

      const jsonString = prettyPrint
        ? JSON.stringify(result, null, 2)
        : JSON.stringify(result)
      setJsonOutput(jsonString)
    } catch (err) {
      console.log(err)
      setError('An error occurred during conversion. Please check your CSV data and settings.')
    }
  }

  const downloadJSON = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setCsvInput(content)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="container mx-auto space-y-6">
      
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="p-4 rounded-lg shadow">
            <Label htmlFor="csv-input">CSV Input</Label>
            <Textarea
              id="csv-input"
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder="Paste your CSV data here"
              className="h-48 md:h-64"
            />
          </div>
          
          <div className=" p-4 rounded-lg shadow">
            <Label htmlFor="file-upload" className="block mb-2">Upload CSV File</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
            />
          </div>

          <div className=" p-4 rounded-lg shadow space-y-4">
            <div>
              <Label htmlFor="delimiter">Delimiter</Label>
              <Input
                id="delimiter"
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
                placeholder="Enter delimiter (e.g., , or ;)"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="pretty-print"
                checked={prettyPrint}
                onCheckedChange={setPrettyPrint}
              />
              <Label htmlFor="pretty-print">Pretty Print JSON</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="first-row-header"
                checked={firstRowAsHeader}
                onCheckedChange={setFirstRowAsHeader}
              />
              <Label htmlFor="first-row-header">Use First Row as Header</Label>
            </div>

            <div>
              <Label htmlFor="output-format">Output Format</Label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger id="output-format">
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="array">Array of Objects</SelectItem>
                  <SelectItem value="object">Object with Data Array</SelectItem>
                  <SelectItem value="single">Single Object (First Row)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={convertToJSON} className="w-full">
            <FileText className="w-4 h-4 mr-2" />
            Convert to JSON
          </Button>
        </div>

        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className=" p-4 rounded-lg shadow">
            <Label htmlFor="json-output">JSON Output</Label>
            <Textarea
              id="json-output"
              value={jsonOutput}
              readOnly
              className="h-48 md:h-[calc(100vh-20rem)] font-mono text-sm"
            />
          </div>
          
          {jsonOutput && (
            <Button onClick={downloadJSON} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download JSON
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}