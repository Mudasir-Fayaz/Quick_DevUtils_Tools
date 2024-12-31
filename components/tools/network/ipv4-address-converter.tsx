'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Copy, Check } from 'lucide-react'

interface ConversionResult {
  decimal: string
  hexadecimal: string
  binary: string
  ipv6: string
  ipv6Short: string
}

function convertIPv4(ip: string): ConversionResult | null {
  const parts = ip.split('.')
  if (parts.length !== 4) return null

  const numbers = parts.map(Number)
  if (numbers.some(isNaN) || numbers.some(n => n < 0 || n > 255)) return null

  const decimal = numbers.join('.')
  const hexadecimal = numbers.map(n => n.toString(16).padStart(2, '0')).join(':')
  const binary = numbers.map(n => n.toString(2).padStart(8, '0')).join('.')
  const ipv6 = `::ffff:${numbers[0].toString(16).padStart(2, '0')}${numbers[1].toString(16).padStart(2, '0')}:${numbers[2].toString(16).padStart(2, '0')}${numbers[3].toString(16).padStart(2, '0')}`
  const ipv6Short = `::ffff:${decimal}`

  return { decimal, hexadecimal, binary, ipv6, ipv6Short }
}

export default function Ipv4AddressConverter() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleConvert = useCallback(() => {
    const convertedResult = convertIPv4(input)
    if (convertedResult) {
      setResult(convertedResult)
      setError(null)
    } else {
      setResult(null)
      setError('Invalid IPv4 address')
    }
  }, [input])

  const copyToClipboard = useCallback(async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }, [])

  const resultFields = [
    { label: 'Decimal', value: result?.decimal },
    { label: 'Hexadecimal', value: result?.hexadecimal },
    { label: 'Binary', value: result?.binary },
    { label: 'IPv6', value: result?.ipv6 },
    { label: 'IPv6 (short)', value: result?.ipv6Short },
  ]

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="ipInput">IPv4 address</Label>
          <div className="flex space-x-2">
            <Input
              id="ipInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 192.168.1.1"
            />
            <Button onClick={handleConvert}>Convert</Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {resultFields.map((field, index) => (
              <div key={index} className="space-y-1">
                <Label>{field.label}</Label>
                <div className="flex items-center space-x-2">
                  <Input value={field.value || ''} readOnly />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(field.value || '', field.label)}
                  >
                    {copiedField === field.label ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

