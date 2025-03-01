"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy } from 'lucide-react'

type Permission = {
  read: boolean
  write: boolean
  execute: boolean
}

export default function ChmodCalculator() {
  const [owner, setOwner] = useState<Permission>({ read: false, write: false, execute: false })
  const [group, setGroup] = useState<Permission>({ read: false, write: false, execute: false })
  const [public_, setPublic] = useState<Permission>({ read: false, write: false, execute: false })
  const [numericValue, setNumericValue] = useState("000")
  const [symbolicValue, setSymbolicValue] = useState("---------")

  const calculatePermissions = () => {
    const calculate = (perm: Permission) => {
      return (perm.read ? 4 : 0) + (perm.write ? 2 : 0) + (perm.execute ? 1 : 0)
    }

    const ownerValue = calculate(owner)
    const groupValue = calculate(group)
    const publicValue = calculate(public_)

    setNumericValue(`${ownerValue}${groupValue}${publicValue}`)

    const getSymbolic = (perm: Permission) => {
      return `${perm.read ? "r" : "-"}${perm.write ? "w" : "-"}${perm.execute ? "x" : "-"}`
    }

    setSymbolicValue(`${getSymbolic(owner)}${getSymbolic(group)}${getSymbolic(public_)}`)
  }

  useEffect(() => {
    calculatePermissions()
  }, [owner, group, public_, calculatePermissions])

  const handleCopy = () => {
    navigator.clipboard.writeText(`chmod ${numericValue} path`)
  }

  const PermissionCheckboxes = ({ label, permissions, setPermissions }: {
    label: string
    permissions: Permission
    setPermissions: React.Dispatch<React.SetStateAction<Permission>>
  }) => (
    <div className="flex flex-col items-center">
      <Label className="mb-2">{label}</Label>
      <div className="flex gap-4">
        {(["read", "write", "execute"] as const).map((perm) => (
          <div key={perm} className="flex items-center space-x-2">
            <Checkbox
              id={`${label}-${perm}`}
              checked={permissions[perm]}
              onCheckedChange={(checked) =>
                setPermissions((prev) => ({ ...prev, [perm]: checked }))
              }
            />
            <Label htmlFor={`${label}-${perm}`}>{perm.charAt(0).toUpperCase() + perm.slice(1)} ({perm === "read" ? "4" : perm === "write" ? "2" : "1"})</Label>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold"></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <PermissionCheckboxes label="Owner (u)" permissions={owner} setPermissions={setOwner} />
          <PermissionCheckboxes label="Group (g)" permissions={group} setPermissions={setGroup} />
          <PermissionCheckboxes label="Public (o)" permissions={public_} setPermissions={setPublic} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-secondary p-4 rounded-md"
        >
          <div className="text-2xl font-mono mb-2">{numericValue}</div>
          <div className="text-2xl font-mono mb-4">{symbolicValue}</div>
          <div className="flex items-center space-x-2">
            <code className="bg-primary text-primary-foreground px-2 py-1 rounded">
              chmod {numericValue} path
            </code>
            <Button onClick={handleCopy} size="sm">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}

