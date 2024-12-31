'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { CopyButton } from '@/components/CopyButton'

export default function RandomUUID() {
  const [result, setResult] = useState('')

  const generateUUID = () => {
    setResult(crypto.randomUUID())
  }

  return (
    <div className="space-y-4">
      <Button onClick={generateUUID}>Generate UUID</Button>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated UUID:</h3>
          <div className="flex items-center">
            <p className="text-2xl font-mono">{result}</p>
            <CopyButton text={result} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

