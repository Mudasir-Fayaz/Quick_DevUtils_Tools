'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from '@/components/CopyButton'

export default function RandomJSON() {
  const [depth, setDepth] = useState(2)
  const [result, setResult] = useState('')

  const generateRandomValue = (currentDepth: number): string | number | boolean | null | object | any[] => {
    const types = ['string', 'number', 'boolean', 'null'];
    if (currentDepth < depth) {
      types.push('object', 'array');
    }
    const type = types[Math.floor(Math.random() * types.length)];
  
    switch (type) {
      case 'string':
        return Math.random().toString(36).substring(7);
      case 'number':
        return Math.floor(Math.random() * 1000);
      case 'boolean':
        return Math.random() > 0.5;
      case 'null':
        return null;
      case 'object': {
        const obj: Record<string, any> = {};
        const numProps = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < numProps; i++) {
          obj[`prop${i}`] = generateRandomValue(currentDepth + 1);
        }
        return obj;
      }
      case 'array': {
        const arr: any[] = [];
        const numItems = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < numItems; i++) {
          arr.push(generateRandomValue(currentDepth + 1));
        }
        return arr;
      }
    }
  
    // Fallback return (should never be reached if all cases are handled)
    throw new Error('Unexpected type');
  };
  
  const generateJSON = () => {
    const json = generateRandomValue(0)
    setResult(JSON.stringify(json, null, 2))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="depth">Max Depth:</Label>
        <Input
          id="depth"
          type="number"
          min="1"
          max="5"
          value={depth}
          onChange={(e) => setDepth(parseInt(e.target.value))}
          className="w-20"
        />
      </div>
      <Button onClick={generateJSON}>Generate JSON</Button>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-secondary rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">Generated JSON:</h3>
          <div className="flex items-center">
            <Textarea
              value={result}
              readOnly
              className="font-mono text-sm h-64"
            />
            <CopyButton text={result} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

