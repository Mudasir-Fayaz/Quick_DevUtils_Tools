'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { CopyButton } from '@/components/CopyButton'

export default function RandomMAC() {
  const [result, setResult] = useState('')

  const generateMAC = () => {
    const mac = Array(6).fill(0).map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':')
    setResult(mac.toUpperCase())
  }

  return (
    <div className="space-y-4">
      <Button onClick={generateMAC}>Generate MAC Address</Button>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated MAC Address:</h3>
          <div className="flex items-center">
            <p className="text-2xl font-mono">{result}</p>
            <CopyButton text={result} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

