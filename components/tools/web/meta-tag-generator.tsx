"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const pageTypes = ["Website", "Article", "Book", "Profile", "Music", "Video"]
const twitterCardTypes = ["Summary", "Summary with large image", "Application", "Player"]

export default function MetaTagGenerator() {
  const [generalInfo, setGeneralInfo] = useState({
    pageType: "Website",
    title: "",
    description: "",
    url: "",
  })
  const [imageInfo, setImageInfo] = useState({
    url: "",
    alt: "",
    width: "",
    height: "",
  })
  const [twitterInfo, setTwitterInfo] = useState({
    cardType: "Summary",
    site: "",
    creator: "",
  })
  const [articleInfo, setArticleInfo] = useState({
    publishedTime: "",
    modifiedTime: "",
    expirationTime: "",
    authors: "",
    section: "",
    tags: "",
  })

  const generateMetaTags = () => {
    let tags = `<!-- og meta -->
<meta property="og:type" content="${generalInfo.pageType.toLowerCase()}" />
<meta property="og:title" content="${generalInfo.title}" />
<meta property="og:description" content="${generalInfo.description}" />
<meta property="og:url" content="${generalInfo.url}" />
<meta property="og:image" content="${imageInfo.url}" />
<meta property="og:image:alt" content="${imageInfo.alt}" />
<meta property="og:image:width" content="${imageInfo.width}" />
<meta property="og:image:height" content="${imageInfo.height}" />

<!-- twitter meta -->
<meta name="twitter:card" content="${twitterInfo.cardType.toLowerCase().replace(/ /g, '_')}" />
<meta name="twitter:site" content="${twitterInfo.site}" />
<meta name="twitter:creator" content="${twitterInfo.creator}" />`

    if (generalInfo.pageType === "Article") {
      tags += `

<!-- article meta -->
<meta property="article:published_time" content="${articleInfo.publishedTime}" />
<meta property="article:modified_time" content="${articleInfo.modifiedTime}" />
<meta property="article:expiration_time" content="${articleInfo.expirationTime}" />
<meta property="article:author" content="${articleInfo.authors}" />
<meta property="article:section" content="${articleInfo.section}" />
<meta property="article:tag" content="${articleInfo.tags}" />`
    }

    return tags
  }

  const [metaTags, setMetaTags] = useState("")

  const handleGenerateClick = () => {
    setMetaTags(generateMetaTags())
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(metaTags)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Open Graph Meta Generator</CardTitle>
        <CardDescription>Generate open-graph and socials HTML meta tags for your website.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="twitter">Twitter</TabsTrigger>
            {generalInfo.pageType === "Article" && <TabsTrigger value="article">Article</TabsTrigger>}
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <Select
              value={generalInfo.pageType}
              onValueChange={(value) => setGeneralInfo({ ...generalInfo, pageType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select page type" />
              </SelectTrigger>
              <SelectContent>
                {pageTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Enter the title of your website..."
              value={generalInfo.title}
              onChange={(e) => setGeneralInfo({ ...generalInfo, title: e.target.value })}
            />
            <Textarea
              placeholder="Enter the description of your website..."
              value={generalInfo.description}
              onChange={(e) => setGeneralInfo({ ...generalInfo, description: e.target.value })}
            />
            <Input
              placeholder="Enter the url of your website..."
              value={generalInfo.url}
              onChange={(e) => setGeneralInfo({ ...generalInfo, url: e.target.value })}
            />
          </TabsContent>
          <TabsContent value="image" className="space-y-4">
            <Input
              placeholder="The url of your website social image..."
              value={imageInfo.url}
              onChange={(e) => setImageInfo({ ...imageInfo, url: e.target.value })}
            />
            <Input
              placeholder="The alternative text of your website social image..."
              value={imageInfo.alt}
              onChange={(e) => setImageInfo({ ...imageInfo, alt: e.target.value })}
            />
            <Input
              placeholder="Width in px of your website social image..."
              value={imageInfo.width}
              onChange={(e) => setImageInfo({ ...imageInfo, width: e.target.value })}
            />
            <Input
              placeholder="Height in px of your website social image..."
              value={imageInfo.height}
              onChange={(e) => setImageInfo({ ...imageInfo, height: e.target.value })}
            />
          </TabsContent>
          <TabsContent value="twitter" className="space-y-4">
            <Select
              value={twitterInfo.cardType}
              onValueChange={(value) => setTwitterInfo({ ...twitterInfo, cardType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Twitter card type" />
              </SelectTrigger>
              <SelectContent>
                {twitterCardTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="The name of the Twitter account of the site (ex: @ittoolsdottech)..."
              value={twitterInfo.site}
              onChange={(e) => setTwitterInfo({ ...twitterInfo, site: e.target.value })}
            />
            <Input
              placeholder="The name of the Twitter account of the creator (ex: @cthmsst)..."
              value={twitterInfo.creator}
              onChange={(e) => setTwitterInfo({ ...twitterInfo, creator: e.target.value })}
            />
          </TabsContent>
          {generalInfo.pageType === "Article" && (
            <TabsContent value="article" className="space-y-4">
              <Input
                type="datetime-local"
                placeholder="When the article was first published..."
                value={articleInfo.publishedTime}
                onChange={(e) => setArticleInfo({ ...articleInfo, publishedTime: e.target.value })}
              />
              <Input
                type="datetime-local"
                placeholder="When the article was last changed..."
                value={articleInfo.modifiedTime}
                onChange={(e) => setArticleInfo({ ...articleInfo, modifiedTime: e.target.value })}
              />
              <Input
                type="datetime-local"
                placeholder="When the article is out of date after..."
                value={articleInfo.expirationTime}
                onChange={(e) => setArticleInfo({ ...articleInfo, expirationTime: e.target.value })}
              />
              <Input
                placeholder="Writers of the article..."
                value={articleInfo.authors}
                onChange={(e) => setArticleInfo({ ...articleInfo, authors: e.target.value })}
              />
              <Input
                placeholder="A high-level section name. E.g. Technology..."
                value={articleInfo.section}
                onChange={(e) => setArticleInfo({ ...articleInfo, section: e.target.value })}
              />
              <Input
                placeholder="Tag words associated with this article..."
                value={articleInfo.tags}
                onChange={(e) => setArticleInfo({ ...articleInfo, tags: e.target.value })}
              />
            </TabsContent>
          )}
        </Tabs>
        <div className="mt-6">
          <Button onClick={handleGenerateClick}>Generate Meta Tags</Button>
        </div>
        {metaTags && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <Label>Your meta tags:</Label>
            <div className="relative">
              <Textarea value={metaTags} readOnly className="h-64 font-mono text-sm" />
              <Button
                size="icon"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={handleCopyClick}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

