"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const encodeUrl = (text: string): string => {
    return encodeURIComponent(text);
  };

  const handleEncode = () => {
    if (!input) {
      toast({
        title: "Error",
        description: "Please enter text to encode",
        variant: "destructive",
      });
      return;
    }
    setResult(encodeUrl(input));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      toast({
        title: "Copied!",
        description: "Encoded URL copied to clipboard",
      });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto space-y-6"
    >
      <div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Text to Encode:</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encode..."
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={handleEncode} className="w-full">
            Encode URL
          </Button>

          {result && (
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium">Encoded URL:</label>
                  <Button size="sm" variant="ghost" onClick={handleCopy}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea value={result} readOnly className="min-h-[100px]" />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UrlEncoder; 