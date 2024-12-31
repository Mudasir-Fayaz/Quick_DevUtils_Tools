'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const HtmlEntities: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const handleEncode = () => {
    setOutput(input.replace(/[\u00A0-\u9999<>\&]/gim, (i) => `&#${i.charCodeAt(0)};`))
  }

  const handleDecode = () => {
    const txt = document.createElement('textarea')
    txt.innerHTML = input
    setOutput(txt.value)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>HTML Entities {mode === 'encode' ? 'Encoder' : 'Decoder'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter text here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32"
        />
        <div className="flex space-x-2">
          <Button onClick={() => { setMode('encode'); handleEncode(); }}>Encode</Button>
          <Button onClick={() => { setMode('decode'); handleDecode(); }}>Decode</Button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Textarea
            value={output}
            readOnly
            className="w-full h-32"
          />
        </motion.div>
      </CardContent>
    </Card>
  )
}

export default HtmlEntities

