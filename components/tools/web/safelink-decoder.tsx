'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const SafelinkDecoder: React.FC = () => {
  const [safelink, setSafelink] = useState('')
  const [decodedUrl, setDecodedUrl] = useState('')

  const decodeSafelink = () => {
    try {
      const url = new URL(safelink)
      const encodedUrl = url.searchParams.get('url') || ''
      const decoded = decodeURIComponent(encodedUrl)
      setDecodedUrl(decoded)
    } catch {
      setDecodedUrl('Invalid safelink')
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Safelink Decoder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter safelink URL"
          value={safelink}
          onChange={(e) => setSafelink(e.target.value)}
          className="h-24"
        />
        <Button onClick={decodeSafelink}>Decode Safelink</Button>
        {decodedUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-semibold">Decoded URL:</p>
            <p className="break-all">{decodedUrl}</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default SafelinkDecoder

