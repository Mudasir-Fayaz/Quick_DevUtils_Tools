"use client"

import React, { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

type ParsedURL = {
  protocol: string
  username: string
  password: string
  hostname: string
  port: string
  path: string
  params: string
  hash: string
}

const useClipboard = () => {
  const { toast } = useToast()

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          description: "Copied to clipboard!",
        })
      },
      (err) => {
        console.error("Could not copy text: ", err)
      }
    )
  }, [toast])

  return copyToClipboard
}

const ParsedItem = ({ label, value }: { label: string; value: string }) => {
  const copyToClipboard = useClipboard()

  return (
    <div className="mb-4">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center mt-1">
        <Input value={value} readOnly className="flex-grow" />
        <Button
          variant="outline"
          size="icon"
          className="ml-2"
          onClick={() => copyToClipboard(value)}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default function UrlParser() {
  const [url, setUrl] = useState("https://me:pwd@devutils.mudasir.in:3000/url-parser?key1=value&key2=value2#the-hash")
  const [parsedURL, setParsedURL] = useState<ParsedURL | null>(null)

  const parseURL = useCallback(() => {
    try {
      const parsedUrl = new URL(url)
     // const params = new URLSearchParams(parsedUrl.search)
      
      setParsedURL({
        protocol: parsedUrl.protocol,
        username: parsedUrl.username,
        password: parsedUrl.password,
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.pathname,
        params: parsedUrl.search,
        hash: parsedUrl.hash,
      })
    } catch (error) {
      console.error("Invalid URL:", error)
      setParsedURL(null)
    }
  }, [url])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="url-input">Your URL to parse:</Label>
          <div className="flex mt-1">
            <Input
              id="url-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={parseURL} className="ml-2">
              Parse
            </Button>
          </div>
        </div>

        {parsedURL && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ParsedItem label="Protocol" value={parsedURL.protocol} />
            <ParsedItem label="Username" value={parsedURL.username} />
            <ParsedItem label="Password" value={parsedURL.password} />
            <ParsedItem label="Hostname" value={parsedURL.hostname} />
            <ParsedItem label="Port" value={parsedURL.port} />
            <ParsedItem label="Path" value={parsedURL.path} />
            <ParsedItem label="Params" value={parsedURL.params} />
            <ParsedItem label="Hash" value={parsedURL.hash} />

            {parsedURL.params && (
              <div className="mt-4">
                <Label className="text-sm font-medium">Query Parameters</Label>
                {Array.from(new URLSearchParams(parsedURL.params)).map(([key, value]) => (
                  <div key={key} className="mt-2">
                    <ParsedItem label={key} value={value} />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

