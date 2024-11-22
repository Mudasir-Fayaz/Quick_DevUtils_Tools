'use client'

import React, { useState, useEffect, useRef } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import { Resizable } from 're-resizable'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, Link, Image, List, ListOrdered, Code, Eye, EyeOff, Download, Save } from 'lucide-react'

const initialMarkdown = `# Welcome to the Markdown Editor

## Table of Contents

## Features

1. **Live Markdown Preview**
2. *Syntax Highlighting*
3. [Customizable Font Size](#)
4. Scroll Syncing
5. Table of Contents
6. Inline HTML Support
7. Link and Image Previews
8. Keyboard Shortcuts
9. Toggle Preview
10. Export to HTML
11. Auto-Save Drafts
12. Resizable Editor and Preview Panes
13. Custom CSS for Preview

\`\`\`javascript
console.log('Hello, Markdown!');
\`\`\`

<div style="color: red;">This is inline HTML</div>

![Markdown Logo](https://markdown-here.com/img/icon256.png)
`

export default function MarkdownViewer() {
  const [markdown, setMarkdown] = useState(initialMarkdown)
  const [html, setHtml] = useState('')
  const [fontSize, setFontSize] = useState(16)
  const [showPreview, setShowPreview] = useState(true)
  const [customCss, setCustomCss] = useState('')
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const parseMarkdown = async () => {
      const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkToc, { heading: 'Table of Contents' })
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(markdown)

      setHtml(result.toString())
    }

    parseMarkdown()
  }, [markdown])

  useEffect(() => {
    const savedMarkdown = localStorage.getItem('markdown-draft')
    if (savedMarkdown) {
      setMarkdown(savedMarkdown)
    }
  }, [])

  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem('markdown-draft', markdown)
    }, 5000)

    return () => clearInterval(saveInterval)
  }, [markdown])

  const handleEditorScroll = () => {
    if (!editorRef.current || !previewRef.current || !showPreview) return
    const editorScrollPercentage = editorRef.current.scrollTop / (editorRef.current.scrollHeight - editorRef.current.clientHeight)
    previewRef.current.scrollTop = editorScrollPercentage * (previewRef.current.scrollHeight - previewRef.current.clientHeight)
  }

  const handlePreviewScroll = () => {
    if (!editorRef.current || !previewRef.current || !showPreview) return
    const previewScrollPercentage = previewRef.current.scrollTop / (previewRef.current.scrollHeight - previewRef.current.clientHeight)
    editorRef.current.scrollTop = previewScrollPercentage * (editorRef.current.scrollHeight - editorRef.current.clientHeight)
  }

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    if (!editorRef.current) return
    const start = editorRef.current.selectionStart
    const end = editorRef.current.selectionEnd
    const text = editorRef.current.value
    const before = text.substring(0, start)
    const selection = text.substring(start, end)
    const after = text.substring(end)
    const newText = before + prefix + selection + suffix + after
    setMarkdown(newText)
    editorRef.current.focus()
    editorRef.current.setSelectionRange(start + prefix.length, end + prefix.length)
  }

  const exportHtml = () => {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'exported.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto space-y-4">
    <div className="flex flex-wrap gap-2 mb-4">
      <Button onClick={() => insertMarkdown('**', '**')}><Bold className="w-4 h-4" /></Button>
      <Button onClick={() => insertMarkdown('*', '*')}><Italic className="w-4 h-4" /></Button>
      <Button onClick={() => insertMarkdown('[', ']()')}><Link className="w-4 h-4" /></Button>
      <Button onClick={() => insertMarkdown('![Alt text](', ')')}><Image className="w-4 h-4" /></Button>
      <Button onClick={() => insertMarkdown('- ')}><List className="w-4 h-4" /></Button>
      <Button onClick={() => insertMarkdown('1. ')}><ListOrdered className="w-4 h-4" /></Button>
      <Button onClick={() => insertMarkdown('```\n', '\n```')}><Code className="w-4 h-4" /></Button>
      <Button onClick={() => setShowPreview(!showPreview)}>
        {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </Button>
      <Button onClick={exportHtml}><Download className="w-4 h-4" /></Button>
      <Button onClick={() => localStorage.setItem('markdown-draft', markdown)}><Save className="w-4 h-4" /></Button>
    </div>
    <div className="flex flex-col lg:flex-row gap-4">
      <Resizable
        defaultSize={{ width: '100%', height: 'auto' }}
        minWidth="300px"
        maxWidth="100%"
        enable={{ right: true }}
        className="transition-all duration-300 ease-in-out flex-1 h-full"
      >
        <Textarea
          ref={editorRef}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          onScroll={handleEditorScroll}
          className="w-full h-[600px] font-mono text-sm resize-none"
          placeholder="Type your Markdown here..."
        />
      </Resizable>
      {showPreview && (
        <Card className="overflow-hidden flex-1 h-full">
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="custom-css">Custom CSS</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="p-2">
              <div
                ref={previewRef}
                className="prose max-w-none h-[600px] overflow-auto bg-white rounded-lg text-black p-1"
                style={{ fontSize: `${fontSize}px` }}
                dangerouslySetInnerHTML={{ __html:  html  }}
                onScroll={handlePreviewScroll}
              />
            </TabsContent>
            <TabsContent value="custom-css" className="p-4">
              <Textarea
                value={customCss}
                onChange={(e) => setCustomCss(e.target.value)}
                className="w-full h-[600px] font-mono text-sm resize-none"
                placeholder="Enter custom CSS here..."
              />
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
    <div className="flex items-center space-x-2">
      <Label htmlFor="font-size">Font Size:</Label>
      <Slider
        id="font-size"
        min={12}
        max={24}
        step={1}
        value={[fontSize]}
        onValueChange={([value]) => setFontSize(value)}
        className="w-[200px]"
      />
      <span>{fontSize}px</span>
    </div>
    <style jsx global>{`
      .prose img {
        max-width: 100%;
        height: auto;
      }
      ${customCss}
    `}</style>
  </div>
  
  )
}