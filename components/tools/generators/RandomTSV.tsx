'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from '@/components/CopyButton'

export default function RandomTSV() {
  const [rows, setRows] = useState(5)
  const [columns, setColumns] = useState(3)
  const [result, setResult] = useState('')

  const generateRandomValue = () => {
    const types = ['string', 'number', 'boolean']
    const type = types[Math.floor(Math.random() * types.length)]

    switch (type) {
      case 'string':
        return Math.random().toString(36).substring(7)
      case 'number':
        return Math.floor(Math.random() * 1000)
      case 'boolean':
        return Math.random() > 0.5 ? 'true' : 'false'
    }
  }

  const generateTSV = () => {
    const header = Array(columns).fill(0).map((_, i) => `Column${i + 1}`).join('\t')
    const data = Array(rows).fill(0).map(() => 
      Array(columns).fill(0).map(() => generateRandomValue()).join('\t')
    )
    setResult([header, ...data].join('\n'))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="rows">Rows:</Label>
        <Input
          id="rows"
          type="number"
          min="1"
          max="20"
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value))}
          className="w-20"
        />
        <Label htmlFor="columns">Columns:</Label>
        <Input
          id="columns"
          type="number"
          min="1"
          max="10"
          value={columns}
          onChange={(e) => setColumns(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
      <Button onClick={generateTSV}>Generate TSV</Button>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated TSV:</h3>
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

