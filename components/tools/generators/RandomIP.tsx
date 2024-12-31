'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CopyButton } from '@/components/CopyButton'

export default function RandomIP() {
  const [ipVersion, setIpVersion] = useState('ipv4')
  const [result, setResult] = useState('')

  const generateIP = () => {
    if (ipVersion === 'ipv4') {
      const ip = Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.')
      setResult(ip)
    } else {
      const ip = Array(8).fill(0).map(() => Math.floor(Math.random() * 65536).toString(16).padStart(4, '0')).join(':')
      setResult(ip)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="ipVersion">IP Version:</Label>
        <Select onValueChange={setIpVersion} defaultValue={ipVersion}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select IP version" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ipv4">IPv4</SelectItem>
            <SelectItem value="ipv6">IPv6</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={generateIP}>Generate IP</Button>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated IP:</h3>
          <div className="flex items-center">
            <p className="text-2xl font-mono">{result}</p>
            <CopyButton text={result} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

