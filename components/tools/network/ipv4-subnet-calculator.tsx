'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface SubnetInfo {
  netmask: string
  networkAddress: string
  networkMask: string
  networkMaskBinary: string
  cidrNotation: string
  wildcardMask: string
  networkSize: number
  firstAddress: string
  lastAddress: string
  broadcastAddress: string
  ipClass: string
  previousBlock: string
  nextBlock: string
}

function calculateSubnet(input: string): SubnetInfo | null {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/
  if (!ipRegex.test(input)) return null

  let [ip, cidr] = input.split('/')
  let mask = cidr ? parseInt(cidr) : 24 // Default to /24 if no CIDR is provided

  if (mask < 0 || mask > 32) return null

  const ipParts = ip.split('.').map(Number)
  const maskBinary = '1'.repeat(mask) + '0'.repeat(32 - mask)
  const maskParts = maskBinary.match(/.{8}/g)!.map(part => parseInt(part, 2))

  const networkParts = ipParts.map((part, i) => part & maskParts[i])
  const wildcardParts = maskParts.map(part => 255 - part)
  const broadcastParts = networkParts.map((part, i) => part | wildcardParts[i])

  const networkSize = Math.pow(2, 32 - mask) - 2
  const firstAddressParts = [...networkParts]
  firstAddressParts[3]++
  const lastAddressParts = [...broadcastParts]
  lastAddressParts[3]--

  const ipClass = 
    ipParts[0] < 128 ? 'A' :
    ipParts[0] < 192 ? 'B' :
    ipParts[0] < 224 ? 'C' :
    ipParts[0] < 240 ? 'D' : 'E'

  const previousBlockParts = [...networkParts]
  previousBlockParts[3] -= networkSize + 2
  const nextBlockParts = [...broadcastParts]
  nextBlockParts[3] += 2

  return {
    netmask: maskParts.join('.'),
    networkAddress: networkParts.join('.'),
    networkMask: maskParts.join('.'),
    networkMaskBinary: maskBinary,
    cidrNotation: `/${mask}`,
    wildcardMask: wildcardParts.join('.'),
    networkSize,
    firstAddress: firstAddressParts.join('.'),
    lastAddress: lastAddressParts.join('.'),
    broadcastAddress: broadcastParts.join('.'),
    ipClass,
    previousBlock: previousBlockParts.join('.') + `/${mask}`,
    nextBlock: nextBlockParts.join('.') + `/${mask}`
  }
}

export default function Ipv4SubnetCalculator() {
  const [input, setInput] = useState('')
  const [subnetInfo, setSubnetInfo] = useState<SubnetInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = useCallback(() => {
    const result = calculateSubnet(input)
    if (result) {
      setSubnetInfo(result)
      setError(null)
    } else {
      setSubnetInfo(null)
      setError('Invalid IPv4 address or CIDR notation')
    }
  }, [input])

  const infoItems = useMemo(() => [
    { label: 'Netmask', value: subnetInfo?.netmask },
    { label: 'Network address', value: subnetInfo?.networkAddress },
    { label: 'Network mask', value: subnetInfo?.networkMask },
    { label: 'Network mask in binary', value: subnetInfo?.networkMaskBinary },
    { label: 'CIDR notation', value: subnetInfo?.cidrNotation },
    { label: 'Wildcard mask', value: subnetInfo?.wildcardMask },
    { label: 'Network size', value: subnetInfo?.networkSize },
    { label: 'First address', value: subnetInfo?.firstAddress },
    { label: 'Last address', value: subnetInfo?.lastAddress },
    { label: 'Broadcast address', value: subnetInfo?.broadcastAddress },
    { label: 'IP class', value: subnetInfo?.ipClass },
    { label: 'Previous block', value: subnetInfo?.previousBlock },
    { label: 'Next block', value: subnetInfo?.nextBlock },
  ], [subnetInfo])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="ipInput">IPv4 address (with or without mask)</Label>
          <div className="flex space-x-2">
            <Input
              id="ipInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 192.168.1.0/24"
            />
            <Button onClick={handleCalculate}>Calculate</Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {subnetInfo && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {infoItems.map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-2">
                <Label>{item.label}</Label>
                <div className="font-mono">{item.value}</div>
              </div>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

