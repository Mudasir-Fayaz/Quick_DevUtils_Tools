"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { v1, v3, v4, v5, NIL } from "uuid"
import { Copy, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"

const namespaces = {
  DNS: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  URL: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
  OID: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
  X500: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
}

export default function UuidGenerator() {
  const [version, setVersion] = useState("4")
  const [namespace, setNamespace] = useState("DNS")
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [uuids, setUUIDs] = useState<string[]>([])

  const generateUUID = () => {
    const newUUIDs = []
    for (let i = 0; i < quantity; i++) {
      switch (version) {
        case "NIL":
          newUUIDs.push(NIL)
          break
        case "1":
          newUUIDs.push(v1())
          break
        case "3":
          newUUIDs.push(v3(name, namespaces[namespace as keyof typeof namespaces]))
          break
        case "4":
          newUUIDs.push(v4())
          break
        case "5":
          newUUIDs.push(v5(name, namespaces[namespace as keyof typeof namespaces]))
          break
      }
    }
    setUUIDs(newUUIDs)
  }

  const copyToClipboard = (uuid: string) => {
    navigator.clipboard.writeText(uuid)
    toast({
      title: "Copied to clipboard",
      description: uuid,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <Label>UUID Version</Label>
            <RadioGroup
              defaultValue="4"
              onValueChange={setVersion}
              className="flex flex-wrap gap-2 mt-2"
            >
              {["NIL", "1", "3", "4", "5"].map((v) => (
                <div key={v}>
                  <RadioGroupItem value={v} id={`version-${v}`} className="peer sr-only" />
                  <Label
                    htmlFor={`version-${v}`}
                    className="flex items-center justify-center px-3 py-2 text-sm border rounded-md cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                  >
                    {v === "NIL" ? v : `v${v}`}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {(version === "3" || version === "5") && (
            <>
              <div>
                <Label htmlFor="namespace">Namespace</Label>
                <Select onValueChange={setNamespace} defaultValue={namespace}>
                  <SelectTrigger id="namespace">
                    <SelectValue placeholder="Select namespace" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(namespaces).map((ns) => (
                      <SelectItem key={ns} value={ns}>
                        {ns}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
            </>
          )}

          <div>
            <Label>Quantity: {quantity}</Label>
            <Slider
              min={1}
              max={100}
              step={1}
              value={[quantity]}
              onValueChange={([value]) => setQuantity(value)}
              className="mt-2"
            />
          </div>

          <Button onClick={generateUUID} className="w-full">
            Generate UUID{quantity > 1 ? "s" : ""}
          </Button>
        </form>

        <div className="mt-6 space-y-2">
          {uuids.map((uuid, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-2 border rounded"
            >
              <span className="font-mono text-sm">{uuid}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(uuid)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {uuids.length > 0 && (
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={generateUUID}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

