'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const JwtParser: React.FC = () => {
  const [jwt, setJwt] = useState('')
  const [parsedJwt, setParsedJwt] = useState<{ header: any; payload: any; signature: string } | null>(null)

  const parseJwt = () => {
    try {
      const [headerB64, payloadB64, signatureB64] = jwt.split('.')
      const header = JSON.parse(atob(headerB64))
      const payload = JSON.parse(atob(payloadB64))
      setParsedJwt({ header, payload, signature: signatureB64 })
    } catch{
      console.error('Invalid JWT')
      setParsedJwt(null)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter JWT"
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
          className="h-24"
        />
        <Button onClick={parseJwt}>Parse JWT</Button>
        {parsedJwt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div>
              <h3 className="font-semibold">Header:</h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded">{JSON.stringify(parsedJwt.header, null, 2)}</pre>
            </div>
            <div>
              <h3 className="font-semibold">Payload:</h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded">{JSON.stringify(parsedJwt.payload, null, 2)}</pre>
            </div>
            <div>
              <h3 className="font-semibold">Signature:</h3>
              <p className="break-all">{parsedJwt.signature}</p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default JwtParser

