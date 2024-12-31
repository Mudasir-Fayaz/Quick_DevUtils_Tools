'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Check, Copy } from 'lucide-react'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    .then(() => {
        
      setCopied(true)
    })
    .catch(err => {
        console.error('Error copying text: ', err);
    });
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleCopy}
      className="ml-2"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}

