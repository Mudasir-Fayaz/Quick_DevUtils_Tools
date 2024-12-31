"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateHash, HashFunction, DigestEncoding } from '@/utils/hashUtils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, RefreshCw, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const HashText: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [hashFunction, setHashFunction] = useState<HashFunction>('SHA256');
  const [digestEncoding, setDigestEncoding] = useState<DigestEncoding>('Hex');
  const [hashResult, setHashResult] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const hashFunctions: HashFunction[] = ['MD5', 'SHA1', 'SHA256', 'SHA224', 'SHA512', 'SHA384', 'SHA3', 'RIPEMD160'];
  const digestEncodings: DigestEncoding[] = ['Hex', 'Base64', 'Latin1', 'Utf8', 'Utf16', 'Utf16LE', 'Base64url'];

  useEffect(() => {
    if (inputText) {
      generateHashResult();
    }
  }, [inputText, hashFunction, digestEncoding]);

  const generateHashResult = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const result = generateHash(inputText, hashFunction, digestEncoding);
      setHashResult(result);
      setIsGenerating(false);
    }, 300);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hashResult).then(() => {
      toast({
        title: "Copied!",
        description: "Hash result copied to clipboard",
      });
    });
  };

  const handleClear = () => {
    setInputText('');
    setHashResult('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      
      <div className="space-y-6">
        <div>
          <label htmlFor="inputText" className="block text-sm font-medium mb-2">Your text to hash:</label>
          <Textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-32"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="hashFunction" className="block text-sm font-medium mb-2">Hash Function:</label>
            <Select value={hashFunction} onValueChange={(value: HashFunction) => setHashFunction(value)}>
              <SelectTrigger id="hashFunction">
                <SelectValue placeholder="Select hash function" />
              </SelectTrigger>
              <SelectContent>
                {hashFunctions.map((func) => (
                  <SelectItem key={func} value={func}>{func}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="digestEncoding" className="block text-sm font-medium mb-2">Digest Encoding:</label>
            <Select value={digestEncoding} onValueChange={(value: DigestEncoding) => setDigestEncoding(value)}>
              <SelectTrigger id="digestEncoding">
                <SelectValue placeholder="Select digest encoding" />
              </SelectTrigger>
              <SelectContent>
                {digestEncodings.map((encoding) => (
                  <SelectItem key={encoding} value={encoding}>{encoding}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <label htmlFor="hashResult" className="block text-sm font-medium mb-2">Hash Result:</label>
          <div className="relative">
            <Input
              id="hashResult"
              value={hashResult}
              readOnly
              className="w-full pr-20 font-mono text-sm"
            />
            <motion.div
              className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleCopy}
                      className="h-8 w-8"
                      disabled={!hashResult}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button onClick={generateHashResult} disabled={!inputText || isGenerating}>
            {isGenerating ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Generate Hash'
            )}
          </Button>
          <Button onClick={handleClear} variant="outline">Clear</Button>
        </div>
        <AnimatePresence>
          {hashResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Info className="mr-2 h-4 w-4" />
                      Hash Information
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1 text-sm">
                      <li>Input Length: {inputText.length} characters</li>
                      <li>Hash Function: {hashFunction}</li>
                      <li>Digest Encoding: {digestEncoding}</li>
                      <li>Output Length: {hashResult.length} characters</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HashText;

