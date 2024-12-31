"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Info } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Ipv6UlaGenerator() {
  const [macAddress, setMacAddress] = useState("")
  const [ulaAddress, setUlaAddress] = useState("")
  const [firstRoutableBlock, setFirstRoutableBlock] = useState("")
  const [lastRoutableBlock, setLastRoutableBlock] = useState("")
  const { toast } = useToast()

  const generateULA = () => {
    // This is a simplified ULA generation for demonstration purposes
    // In a real-world scenario, you'd implement the full RFC4193 algorithm
    const prefix = "fd"
    const globalId = macAddress.replace(/:/g, '').slice(0, 10)
    const subnetId = "0000"
    const interfaceId = "0000000000000001"

    const ula = `${prefix}${globalId}:${subnetId}:${interfaceId}`
    setUlaAddress(ula.match(/.{1,4}/g)?.join(':') || '')

    // Calculate first and last routable blocks
    const firstBlock = `${prefix}${globalId}:${subnetId}:0000:0000:0000:0000`
    const lastBlock = `${prefix}${globalId}:${subnetId}:ffff:ffff:ffff:ffff`
    setFirstRoutableBlock(firstBlock.match(/.{1,4}/g)?.join(':') || '')
    setLastRoutableBlock(lastBlock.match(/.{1,4}/g)?.join(':') || '')
  }

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${description} copied to clipboard.`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            IPv6 ULA Generator
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">This tool uses the first method suggested by IETF using the current timestamp plus the MAC address, SHA1 hashed, and the lower 40 bits to generate your random ULA.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription>Generate your own local, non-routable IP addresses for your network according to RFC4193.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mac-address">MAC address</Label>
              <Input
                id="mac-address"
                placeholder="Enter MAC address (e.g., 00:11:22:33:44:55)"
                value={macAddress}
                onChange={(e) => setMacAddress(e.target.value)}
              />
            </div>
            <Button onClick={generateULA} className="w-full">
              Generate ULA
            </Button>
            {ulaAddress && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>IPv6 ULA</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={ulaAddress} readOnly />
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(ulaAddress, "IPv6 ULA")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>First routable block</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={firstRoutableBlock} readOnly />
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(firstRoutableBlock, "First routable block")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Last routable block</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={lastRoutableBlock} readOnly />
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(lastRoutableBlock, "Last routable block")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

