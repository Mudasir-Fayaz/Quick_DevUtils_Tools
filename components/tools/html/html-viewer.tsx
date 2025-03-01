'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {  Download, RefreshCw } from 'lucide-react'

export default function HTMLViewer() {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [preview, setPreview] = useState('')

  

  const updatePreview = () => {
    const combinedCode = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `
    setPreview(combinedCode)
  }

  useEffect(() => {
    updatePreview()
  }, [html, css, js, updatePreview])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        // Simple parsing, you might want to improve this for production use
        const htmlMatch = content.match(/<body>([\s\S]*)<\/body>/i)
        const cssMatch = content.match(/<style>([\s\S]*)<\/style>/i)
        const jsMatch = content.match(/<script>([\s\S]*)<\/script>/i)

        setHtml(htmlMatch ? htmlMatch[1] : '')
        setCss(cssMatch ? cssMatch[1] : '')
        setJs(jsMatch ? jsMatch[1] : '')
      }
      reader.readAsText(file)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([preview], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'index.html'
    a.click()
  }

  return (
    <div className="min-h-screen p-4 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Real-time HTML Viewer</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="file"
              accept=".html"
              onChange={handleFileUpload}
              className="max-w-xs"
            />
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
          <Tabs defaultValue="html" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="js">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="html">
              <ScrollArea className="h-[60vh] lg:h-[70vh] border rounded-md">
                <Textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  placeholder="Enter your HTML here..."
                  className="w-full h-full resize-none border-none focus:outline-none focus:ring-0"
                />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="css">
              <ScrollArea className="h-[60vh] lg:h-[70vh] border rounded-md">
                <Textarea
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  placeholder="Enter your CSS here..."
                  className="w-full h-full resize-none border-none focus:outline-none focus:ring-0"
                />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="js">
              <ScrollArea className="h-[60vh] lg:h-[70vh] border rounded-md">
                <Textarea
                  value={js}
                  onChange={(e) => setJs(e.target.value)}
                  placeholder="Enter your JavaScript here..."
                  className="w-full h-full resize-none border-none focus:outline-none focus:ring-0"
                />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Preview</h2>
            <Button onClick={updatePreview} size="sm">
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </div>
          <div className="border rounded-md h-[70vh] lg:h-[80vh] overflow-hidden">
            <iframe
              srcDoc={preview}
              title="preview"
              className="w-full h-full bg-white"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  )
}