'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const BasicAuthGenerator: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authString, setAuthString] = useState('')

  const generateAuth = () => {
    const auth = btoa(`${username}:${password}`)
    setAuthString(`Basic ${auth}`)
  }

  const decodeAuth = () => {
    try {
      const decoded = atob(authString.replace('Basic ', ''))
      const [decodedUsername, decodedPassword] = decoded.split(':')
      setUsername(decodedUsername)
      setPassword(decodedPassword)
    } catch {
      console.error('Invalid Basic Auth string')
    }
  }

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={generateAuth}>Generate Auth String</Button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Input
            type="text"
            value={authString}
            readOnly
            className="w-full"
          />
        </motion.div>
        <Button onClick={decodeAuth}>Decode Auth String</Button>
      </CardContent>
    </Card>
  )
}

export default BasicAuthGenerator

