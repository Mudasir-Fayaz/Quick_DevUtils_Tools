'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from '@/components/CopyButton'

export default function RandomXML() {
  const [depth, setDepth] = useState(2)
  const [result, setResult] = useState('')

  const generateRandomElement = (currentDepth: number): string => {
    const tagName = `element${Math.floor(Math.random() * 10)}`
    const hasChildren = currentDepth < depth && Math.random() > 0.5

    if (hasChildren) {
      const numChildren = Math.floor(Math.random() * 3) + 1
      const children = Array(numChildren).fill(0).map(() => generateRandomElement(currentDepth + 1))
      return `<${tagName}>\n  ${children.join('\n  ')}\n</${tagName}>`
    } else {
      const content = Math.random().toString(36).substring(7)
      return `<${tagName}>${content}</${tagName}>`
    }
  }

  const generateXML = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  ${generateRandomElement(0)}\n</root>`
    setResult(xml)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="depth">Max Depth:</Label>
        <Input
          id="depth"
          type="number"
          min="1"
          max="5"
          value={depth}
          onChange={(e) => setDepth(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
      <Button onClick={generateXML}>Generate XML</Button>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated XML:</h3>
          <div className="flex items-center">
            <Textarea
              value={result}
              readOnly
              className="font-mono text-sm h-64"
            />
            <CopyButton text={result} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

