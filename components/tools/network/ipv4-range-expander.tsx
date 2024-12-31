'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertCircle } from 'lucide-react'

interface RangeResult {
  startAddress: string
  endAddress: string
  addressesInRange: number
  cidr: string
}

function ipToLong(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0
}

function longToIp(long: number): string {
  return [long >>> 24, (long >> 16) & 255, (long >> 8) & 255, long & 255].join('.')
}

function calculateCIDR(start: number, end: number): string {
  const diff = end - start + 1
  const bits = 32 - Math.floor(Math.log2(diff))
  return `/${bits}`
}

function expandRange(startIp: string, endIp: string): RangeResult | null {
  const start = ipToLong(startIp)
  const end = ipToLong(endIp)

  if (start > end) return null

  //const addressesInRange = end - start + 1
  const cidr = calculateCIDR(start, end)

  // Adjust start and end to fit CIDR block
  const mask = ~((1 << (32 - parseInt(cidr.slice(1)))) - 1)
  const newStart = start & mask
  const newEnd = newStart | ~mask

  return {
    startAddress: longToIp(newStart),
    endAddress: longToIp(newEnd),
    addressesInRange: newEnd - newStart + 1,
    cidr: `${longToIp(newStart)}${cidr}`
  }
}

export default function Ipv4RangeExpander() {
  const [startAddress, setStartAddress] = useState('')
  const [endAddress, setEndAddress] = useState('')
  const [result, setResult] = useState<RangeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleExpand = useCallback(() => {
    const expandedResult = expandRange(startAddress, endAddress)
    if (expandedResult) {
      setResult(expandedResult)
      setError(null)
    } else {
      setResult(null)
      setError('Invalid IP range or start address is greater than end address')
    }
  }, [startAddress, endAddress])

  const tableData = useMemo(() => [
    { label: 'Start address', oldValue: startAddress, newValue: result?.startAddress },
    { label: 'End address', oldValue: endAddress, newValue: result?.endAddress },
    { label: 'Addresses in range', oldValue: '-', newValue: result?.addressesInRange.toString() },
    { label: 'CIDR', oldValue: '-', newValue: result?.cidr },
  ], [startAddress, endAddress, result])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startAddress">Start address</Label>
            <Input
              id="startAddress"
              value={startAddress}
              onChange={(e) => setStartAddress(e.target.value)}
              placeholder="e.g., 192.168.1.1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endAddress">End address</Label>
            <Input
              id="endAddress"
              value={endAddress}
              onChange={(e) => setEndAddress(e.target.value)}
              placeholder="e.g., 192.168.1.100"
            />
          </div>
          <Button onClick={handleExpand}>Expand Range</Button>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Field</TableHead>
                  <TableHead>Old Value</TableHead>
                  <TableHead>New Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.label}</TableCell>
                    <TableCell>{row.oldValue}</TableCell>
                    <TableCell>{row.newValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

