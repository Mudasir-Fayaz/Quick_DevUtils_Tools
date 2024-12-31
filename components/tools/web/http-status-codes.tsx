'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { httpStatusCodes, HttpStatusCode } from '@/data/http-codes'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function HttpStatusCodes() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCodes = useMemo(() => {
    return httpStatusCodes.filter((code) =>
      code.code.toString().includes(searchTerm) ||
      code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  return (
   
      <Card className="w-full">
        <CardHeader>
          <CardTitle>HTTP Status Codes</CardTitle>
          <CardDescription>
            The list of all HTTP status codes, their name, and their meaning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="search"
            placeholder="Search HTTP status codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <ScrollArea className="h-[600px] pr-4">
            <AnimatePresence>
              {filteredCodes.map((code) => (
                <motion.div
                  key={code.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <StatusCodeCard code={code} />
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
      </Card>
   
  )
}

function StatusCodeCard({ code }: { code: HttpStatusCode }) {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          {code.code} {code.name}
        </CardTitle>
        <Badge variant="outline">{code.category}</Badge>
      </CardHeader>
      <CardContent>
        <p>{code.meaning}</p>
      </CardContent>
    </Card>
  )
}

