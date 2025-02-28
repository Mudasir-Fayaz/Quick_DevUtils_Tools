"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

function generateIPv4(): string {
  return Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 256))
    .join(".")
}

function generateIPv6(): string {
  return Array(8)
    .fill(0)
    .map(() =>
      Math.floor(Math.random() * 65536)
        .toString(16)
        .padStart(4, "0"),
    )
    .join(":")
}

function generateCIDR(ipVersion: string): string {
  const ip = ipVersion === "ipv4" ? generateIPv4() : generateIPv6()
  const maxCIDR = ipVersion === "ipv4" ? 32 : 128
  const cidr = Math.floor(Math.random() * maxCIDR) + 1
  return `${ip}/${cidr}`
}

export default function RandomIP() {
  const [ipVersion, setIpVersion] = useState("ipv4")
  const [excludePrivate, setExcludePrivate] = useState(false)
  const [useCIDR, setUseCIDR] = useState(false)
  const [count, setCount] = useState(1)
  const [results, setResults] = useState<string[]>([])

  const generateIPs = () => {
    const newResults = []
    for (let i = 0; i < count; i++) {
      let ip
      do {
        ip = useCIDR ? generateCIDR(ipVersion) : ipVersion === "ipv4" ? generateIPv4() : generateIPv6()
      } while (
        excludePrivate &&
        (ip.startsWith("10.") ||
          ip.startsWith("172.16.") ||
          ip.startsWith("192.168.") ||
          ip.startsWith("fd") ||
          ip.startsWith("fe80:"))
      )
      newResults.push(ip)
    }
    setResults(newResults)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="ipVersion">IP Version</Label>
          <Select value={ipVersion} onValueChange={setIpVersion}>
            <SelectTrigger id="ipVersion">
              <SelectValue placeholder="Select IP version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ipv4">IPv4</SelectItem>
              <SelectItem value="ipv6">IPv6</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="excludePrivate" checked={excludePrivate} onCheckedChange={setExcludePrivate} />
          <Label htmlFor="excludePrivate">Exclude private IP ranges</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="useCIDR" checked={useCIDR} onCheckedChange={setUseCIDR} />
          <Label htmlFor="useCIDR">Use CIDR notation</Label>
        </div>
        <div>
          <Label htmlFor="count">Number of IP addresses to generate</Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          />
        </div>
        <Button onClick={generateIPs}>Generate IP Addresses</Button>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            {results.map((result, index) => (
              <div key={index} className="p-4 bg-secondary rounded-md flex justify-between items-center">
                <p className="text-lg font-mono">{result}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(result)
                    toast({
                      title: "Copied to clipboard",
                      description: "The generated IP address has been copied to your clipboard.",
                    })
                  }}
                >
                  Copy
                </Button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

