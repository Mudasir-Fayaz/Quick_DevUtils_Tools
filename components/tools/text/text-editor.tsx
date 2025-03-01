'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import { motion } from 'framer-motion'
import debounce from 'lodash.debounce'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Bold,
  Italic,
  Heading,
  List,
  Link,
  Image,
  Code,
  Undo,
  Redo,
  Maximize,
  Copy,
  
  Search,
  Replace,
  FileText,
  FileCode,
  Paintbrush,
} from 'lucide-react'

export default function TextEditor() {
  const [markdown, setMarkdown] = useState('')
  const [html, setHtml] = useState('')
  const [fontSize, setFontSize] = useState(16)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState('editor')
  const [customCSS, setCustomCSS] = useState('')
  const [showCustomCSSModal, setShowCustomCSSModal] = useState(false)
  const [findText, setFindText] = useState('')
  const [replaceText, setReplaceText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [history, setHistory] = useState<string[]>([''])
  const [historyIndex, setHistoryIndex] = useState(0)

  const editorRef = useRef<HTMLTextAreaElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const debouncedMarkdownToHtml = useCallback(
    debounce(async (md: string) => {
      const result = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(md)
      setHtml(result.toString())
    }, 300),
    [setHtml]
  )

  useEffect(() => {
    debouncedMarkdownToHtml(markdown)
    setWordCount(markdown.trim().split(/\s+/).filter(Boolean).length)
    setCharCount(markdown.length)
  }, [markdown, debouncedMarkdownToHtml])

  useEffect(() => {
    const savedMarkdown = localStorage.getItem('markdown-content')
    if (savedMarkdown) {
      setMarkdown(savedMarkdown)
      setHistory([savedMarkdown])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('markdown-content', markdown)
  }, [markdown])

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = e.target.value
    setMarkdown(newMarkdown)
    addToHistory(newMarkdown)
  }

  const addToHistory = (newState: string) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newState)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setMarkdown(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setMarkdown(history[historyIndex + 1])
    }
  }

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0])
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleCustomCSSChange = (css: string) => {
    setCustomCSS(css)
    setShowCustomCSSModal(false)
  }

  const insertText = (before: string, after: string = '') => {
    const textarea = editorRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = markdown.substring(start, end)
      const newText = markdown.substring(0, start) + before + selectedText + after + markdown.substring(end)
      setMarkdown(newText)
      addToHistory(newText)
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        insertText(`![${file.name}](${base64})`)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFind = () => {
    const textarea = editorRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const nextIndex = markdown.indexOf(findText, start)
      if (nextIndex !== -1) {
        textarea.setSelectionRange(nextIndex, nextIndex + findText.length)
        textarea.focus()
      }
    }
  }

  const handleReplace = () => {
    const newMarkdown = markdown.replace(new RegExp(findText, 'g'), replaceText)
    setMarkdown(newMarkdown)
    addToHistory(newMarkdown)
  }

  const exportMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'exported_markdown.md'
    link.click()
  }

  const exportHtml = () => {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'exported_html.html'
    link.click()
  }

  return (
    <motion.div
      className={`flex flex-col min-h-screen ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap items-center gap-2 p-2 border-b">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => insertText('**', '**')}>
        <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('*', '*')}>
        <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('# ')}>
        <Heading className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('- ')}>
        <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('[', '](url)')}>
        <Link className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('![alt text](', ')')}>
        <Image className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertText('```\n', '\n```')}>
        <Code className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-grow" />
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="icon" onClick={undo}>
        <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={redo}>
        <Redo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
        <Maximize className="h-4 w-4" />
        </Button>
        <Button variant="ghost" onClick={() => setShowCustomCSSModal(true)}>
        <Paintbrush className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">Custom CSS</span>
        </Button>
      </div>
      </div>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-grow overflow-hidden">
      <TabsList className="flex-wrap">
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="split" className="hidden md:block">Split View</TabsTrigger>
      </TabsList>
      <TabsContent value="editor" className="h-full">
        <textarea
        ref={editorRef}
        value={markdown}
        onChange={handleMarkdownChange}
        className="w-full h-full p-2 md:p-4 resize-none focus:outline-none"
        style={{ fontSize: `${fontSize}px` }}
        placeholder="Write your markdown here..."
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        spellCheck="true"
        />
      </TabsContent>
      <TabsContent value="preview" className="h-full overflow-auto">
        <div
        ref={previewRef}
        className="prose max-w-none p-2 md:p-4 bg-white text-black h-full"
        style={{ fontSize: `${fontSize}px` }}
        dangerouslySetInnerHTML={{ __html: html }}
        />
      </TabsContent>
      <TabsContent value="split" className="h-full hidden md:flex">
        <div className="w-1/2 h-full overflow-auto border-r">
        <textarea
          ref={editorRef}
          value={markdown}
          onChange={handleMarkdownChange}
          className="w-full h-full p-4 resize-none focus:outline-none"
          style={{ fontSize: `${fontSize}px` }}
          placeholder="Write your markdown here..."
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          spellCheck="true"
        />
        </div>
        <div className="w-1/2 h-full overflow-auto">
        <div
          ref={previewRef}
          className="prose max-w-none p-4 bg-white text-black h-full"
          style={{ fontSize: `${fontSize}px` }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        </div>
      </TabsContent>
      </Tabs>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-2 gap-2 border-t">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <span className="text-sm">Font Size:</span>
        <Slider
        value={[fontSize]}
        onValueChange={handleFontSizeChange}
        min={12}
        max={24}
        step={1}
        className="w-32"
        />
        <span className="text-sm">{fontSize}px</span>
      </div>
      <div className="text-sm text-muted-foreground">
        Words: {wordCount} | Characters: {charCount}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(markdown)}>
        <Copy className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">Copy Markdown</span>
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(html)}>
        <Copy className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">Copy HTML</span>
        </Button>
        <Button variant="outline" size="sm" onClick={exportMarkdown}>
        <FileText className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">Export .md</span>
        </Button>
        <Button variant="outline" size="sm" onClick={exportHtml}>
        <FileCode className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">Export .html</span>
        </Button>
      </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 p-2 border-t">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Input
        placeholder="Find"
        value={findText}
        onChange={(e) => setFindText(e.target.value)}
        className="min-w-[100px]"
        />
        <Button onClick={handleFind}>
        <Search className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">Find</span>
        </Button>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Input
        placeholder="Replace"
        value={replaceText}
        onChange={(e) => setReplaceText(e.target.value)}
        className="min-w-[100px]"
        />
        <Button onClick={handleReplace}>
        <Replace className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">Replace All</span>
        </Button>
      </div>
      </div>
      <Dialog open={showCustomCSSModal} onOpenChange={setShowCustomCSSModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
        <DialogTitle>Custom CSS</DialogTitle>
        </DialogHeader>
        <Textarea
        value={customCSS}
        onChange={(e) => setCustomCSS(e.target.value)}
        placeholder="Enter your custom CSS here..."
        className="h-64"
        />
        <DialogFooter>
        <Button onClick={() => handleCustomCSSChange(customCSS)}>Save</Button>
        </DialogFooter>
      </DialogContent>
      </Dialog>
      <style jsx global>{`
      ${customCSS}
      @media (max-width: 768px) {
        .prose {
        font-size: 0.9em;
        }
      }
      `}</style>
    </motion.div>
  )
}