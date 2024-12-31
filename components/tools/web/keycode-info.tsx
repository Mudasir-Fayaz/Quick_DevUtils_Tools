'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const KeycodeInfo: React.FC = () => {
  const [keyInfo, setKeyInfo] = useState<{ code: string; key: string; which: number } | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeyInfo({
        code: e.code,
        key: e.key,
        which: e.which,
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-4">Press any key to see its information</p>
        {keyInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <p><strong>Key:</strong> {keyInfo.key}</p>
            <p><strong>Code:</strong> {keyInfo.code}</p>
            <p><strong>Which:</strong> {keyInfo.which}</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default KeycodeInfo

