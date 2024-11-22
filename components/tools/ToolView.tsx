"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'

export default function ToolView() {
  const [metaTags, setMetaTags] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    ogType: '',
    twitterCard: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    favicon: '',
    appleIcon: '',
  })

  const [copied, setCopied] = useState(false)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setMetaTags(prev => ({ ...prev, [name]: value }))
  }

  const generateMetaTags = () => {
    const tags = `
<title>${metaTags.title}</title>
<meta name="description" content="${metaTags.description}">
<meta name="keywords" content="${metaTags.keywords}">
<meta name="author" content="${metaTags.author}">
<meta property="og:title" content="${metaTags.ogTitle}">
<meta property="og:description" content="${metaTags.ogDescription}">
<meta property="og:image" content="${metaTags.ogImage}">
<meta property="og:url" content="${metaTags.ogUrl}">
<meta property="og:type" content="${metaTags.ogType}">
<meta name="twitter:card" content="${metaTags.twitterCard}">
<meta name="twitter:title" content="${metaTags.twitterTitle}">
<meta name="twitter:description" content="${metaTags.twitterDescription}">
<meta name="twitter:image" content="${metaTags.twitterImage}">
<link rel="icon" href="${metaTags.favicon}">
<link rel="apple-touch-icon" href="${metaTags.appleIcon}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    `.trim()
    return tags
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMetaTags())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">HTML Meta Tag Generator</h1>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="basic">Basic Tags</TabsTrigger>
              <TabsTrigger value="social">Social Media Tags</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={metaTags.title} onChange={handleInputChange} placeholder="Enter page title" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={metaTags.description} onChange={handleInputChange} placeholder="Enter page description" />
                </div>
                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input id="keywords" name="keywords" value={metaTags.keywords} onChange={handleInputChange} placeholder="Enter keywords, comma-separated" />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" name="author" value={metaTags.author} onChange={handleInputChange} placeholder="Enter author name" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="social">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ogTitle">OG Title</Label>
                  <Input id="ogTitle" name="ogTitle" value={metaTags.ogTitle} onChange={handleInputChange} placeholder="Enter Open Graph title" />
                </div>
                <div>
                  <Label htmlFor="ogDescription">OG Description</Label>
                  <Textarea id="ogDescription" name="ogDescription" value={metaTags.ogDescription} onChange={handleInputChange} placeholder="Enter Open Graph description" />
                </div>
                <div>
                  <Label htmlFor="ogImage">OG Image URL</Label>
                  <Input id="ogImage" name="ogImage" value={metaTags.ogImage} onChange={handleInputChange} placeholder="Enter Open Graph image URL" />
                </div>
                <div>
                  <Label htmlFor="twitterCard">Twitter Card</Label>
                  <Input id="twitterCard" name="twitterCard" value={metaTags.twitterCard} onChange={handleInputChange} placeholder="Enter Twitter card type" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <motion.div
            initial={false}
            animate={{ height: isAdvancedOpen ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="favicon">Favicon URL</Label>
                <Input id="favicon" name="favicon" value={metaTags.favicon} onChange={handleInputChange} placeholder="Enter favicon URL" />
              </div>
              <div>
                <Label htmlFor="appleIcon">Apple Touch Icon URL</Label>
                <Input id="appleIcon" name="appleIcon" value={metaTags.appleIcon} onChange={handleInputChange} placeholder="Enter Apple Touch Icon URL" />
              </div>
            </div>
          </motion.div>
          <Button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            variant="outline"
            className="w-full mt-4 flex items-center justify-center"
          >
            {isAdvancedOpen ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Hide Advanced Options
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Show Advanced Options
              </>
            )}
          </Button>
          <div className="mt-8">
            <Label htmlFor="preview">Generated Meta Tags</Label>
            <Textarea
              id="preview"
              value={generateMetaTags()}
              readOnly
              className="h-48 font-mono text-sm"
            />
          </div>
          <Button onClick={copyToClipboard} className="w-full mt-4">
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}