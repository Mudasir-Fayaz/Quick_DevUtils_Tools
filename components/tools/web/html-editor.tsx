'use client'

import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import HardBreak from '@tiptap/extension-hard-break'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3, Heading4, List, ListOrdered, Quote, Undo, Redo, Copy } from 'lucide-react'

const HtmlEditor = () => {
  const [htmlContent, setHtmlContent] = useState('<h1>Hey!</h1><p>Welcome to this html wysiwyg editor</p>')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Heading,
      CodeBlock,
      Blockquote,
      HardBreak,
    ],
    content: htmlContent,
    onUpdate: ({ editor }) => {
      setHtmlContent(editor.getHTML())
    },
  })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlContent)
  }

  if (!editor) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4"
    >
      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'bg-primary text-primary-foreground' : ''}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'bg-primary text-primary-foreground' : ''}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'bg-primary text-primary-foreground' : ''}
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={editor.isActive('code') ? 'bg-primary text-primary-foreground' : ''}
            >
              <Code className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'bg-primary text-primary-foreground' : ''}
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'bg-primary text-primary-foreground' : ''}
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? 'bg-primary text-primary-foreground' : ''}
            >
              <Heading3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={editor.isActive('heading', { level: 4 }) ? 'bg-primary text-primary-foreground' : ''}
            >
              <Heading4 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'bg-primary text-primary-foreground' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'bg-primary text-primary-foreground' : ''}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'bg-primary text-primary-foreground' : ''}
            >
              <Code className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'bg-primary text-primary-foreground' : ''}
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => editor.chain().focus().setHardBreak().run()}>
              HB
            </Button>
            <Button variant="outline" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
              Clear format
            </Button>
            <Button variant="outline" size="icon" onClick={() => editor.chain().focus().undo().run()}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => editor.chain().focus().redo().run()}>
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          <EditorContent editor={editor} className="prose max-w-none dark:prose-invert" />
        </CardContent>
      </Card>

      <Tabs defaultValue="preview" className="mt-4">
        <TabsList className="grid grid-cols-2 gap-2 md:gap-4">
          <TabsTrigger value="preview" className="w-full text-center">Preview</TabsTrigger>
          <TabsTrigger value="source" className="w-full text-center">Source Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <Card>
        <CardContent className="p-4 md:p-6">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="source">
          <Card>
        <CardContent className="p-4 md:p-6">
            <div className="relative">
            <pre className="language-html rounded bg-muted p-4 overflow-x-auto max-w-full">
              <code className="overflow-x-auto break-words">{htmlContent}</code>
            </pre>
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            </div>
        </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

export default HtmlEditor

