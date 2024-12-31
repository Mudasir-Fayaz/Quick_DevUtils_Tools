"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Search } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface VendorInfo {
  vendorName: string
  vendorAddress: string
  vendorCountry: string
}

export default function MacAddressLookup() {
  const [macAddress, setMacAddress] = useState("")
  const [vendorInfo, setVendorInfo] = useState<VendorInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleLookup = async () => {
    setIsLoading(true)
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Mock data - replace with actual API call in production
    setVendorInfo({
      vendorName: "Example Vendor Inc.",
      vendorAddress: "123 Tech Street, Silicon Valley",
      vendorCountry: "United States",
    })
    setIsLoading(false)
  }

  const copyVendorInfo = () => {
    if (vendorInfo) {
      const info = `Vendor: ${vendorInfo.vendorName}\nAddress: ${vendorInfo.vendorAddress}\nCountry: ${vendorInfo.vendorCountry}`
      navigator.clipboard.writeText(info)
      toast({
        title: "Copied!",
        description: "Vendor information copied to clipboard.",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>MAC Address Lookup</CardTitle>
          <CardDescription>Find the vendor and manufacturer of a device by its MAC address.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter MAC address"
                value={macAddress}
                onChange={(e) => setMacAddress(e.target.value)}
              />
              <Button onClick={handleLookup} disabled={isLoading}>
                <Search className="mr-2 h-4 w-4" /> Lookup
              </Button>
            </div>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : vendorInfo ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <p><strong>Vendor:</strong> {vendorInfo.vendorName}</p>
                <p><strong>Address:</strong> {vendorInfo.vendorAddress}</p>
                <p><strong>Country:</strong> {vendorInfo.vendorCountry}</p>
                <Button variant="outline" onClick={copyVendorInfo}>
                  <Copy className="mr-2 h-4 w-4" /> Copy vendor info
                </Button>
              </motion.div>
            ) : null}
          </div>
        </CardContent>
        <CardFooter>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>More related features</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>MAC address format validation</li>
                  <li>Batch lookup for multiple MAC addresses</li>
                  <li>Historical lookup data</li>
                  <li>Integration with network management tools</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

