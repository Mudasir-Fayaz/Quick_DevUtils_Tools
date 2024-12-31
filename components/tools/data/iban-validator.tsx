'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { isValid, electronicFormat, friendlyFormat, countrySpecification } from 'iban'
import { Check, Copy, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function IbanValidator() {
  const [input, setInput] = useState('')
  const [parsedIban, setParsedIban] = useState<any>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      if (input.length > 0) {
        const formatted = electronicFormat(input)
        if (isValid(formatted)) {
          const country = formatted.slice(0, 2)
          const spec = countrySpecification[country]
          setParsedIban({
            formatted: friendlyFormat(formatted),
            country: spec ? spec.name : 'Unknown',
            countryCode: country,
            checkDigits: formatted.slice(2, 4),
            bban: formatted.slice(4),
          })
          setError('')
        } else {
          throw new Error('Invalid IBAN')
        }
      } else {
        setParsedIban(null)
        setError('')
      }
    } catch (err) {
      setParsedIban(null)
      setError('Invalid IBAN')
    }
  }, [input])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(parsedIban.formatted)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">IBAN Validator</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="iban-input">Enter IBAN</Label>
          <Input
            id="iban-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="DE44 5001 0517 5407 3249 31"
            className="w-full"
          />
        </div>

        {parsedIban && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-100 p-4 rounded-md"
          >
            <p className="font-semibold">Formatted IBAN:</p>
            <p className="text-lg">{parsedIban.formatted}</p>
            <p>Country: {parsedIban.country} ({parsedIban.countryCode})</p>
            <p>Check Digits: {parsedIban.checkDigits}</p>
            <p>BBAN: {parsedIban.bban}</p>
            <Button onClick={copyToClipboard} className="mt-2">
              {copied ? <Check className="mr-2" /> : <Copy className="mr-2" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-red-500 flex items-center"
          >
            <AlertCircle className="mr-2" />
            {error}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

