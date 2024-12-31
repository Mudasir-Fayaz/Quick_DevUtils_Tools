'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RandExp from 'randexp'
import { CopyButton } from '@/components/CopyButton'

export default function RandomRegex() {
  const [regex, setRegex] = useState('^[a-z]{5,10}$')
  const [result, setResult] = useState('')

  const generateFromRegex = () => {
    try {
      const randexp = new RandExp(regex)
      setResult(randexp.gen())
    } catch (error) {
      setResult('Invalid regular expression')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="regex">Regular Expression:</Label>
        <Input
          id="regex"
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
          className="flex-1"
        />
      </div>
      <Button onClick={generateFromRegex}>Generate</Button>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated Result:</h3>
          <div className="flex items-center">
            <p className="text-2xl font-mono break-all">{result}</p>
            <CopyButton text={result} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

