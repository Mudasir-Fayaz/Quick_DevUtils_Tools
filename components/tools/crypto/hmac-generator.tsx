"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Copy, RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import CryptoJS from 'crypto-js';
import { HashFunction, DigestEncoding } from '@/utils/hashUtils';

const HmacGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [hashFunction, setHashFunction] = useState<HashFunction>('SHA256');
  const [encoding, setEncoding] = useState<DigestEncoding>('Hex');
  const [hmacResult, setHmacResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const hashFunctions: HashFunction[] = ['MD5', 'SHA1', 'SHA256', 'SHA224', 'SHA512', 'SHA384', 'SHA3', 'RIPEMD160'];
  const encodings: DigestEncoding[] = ['Hex', 'Base64', 'Latin1', 'Utf8', 'Utf16', 'Utf16LE', 'Base64url'];

  const generateHmac = () => {
    if (!text || !key) {
      toast({
        title: "Error",
        description: "Please enter both text and secret key",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      let hmac;
      switch (hashFunction) {
        case 'MD5':
          hmac = CryptoJS.HmacMD5(text, key);
          break;
        case 'SHA1':
          hmac = CryptoJS.HmacSHA1(text, key);
          break;
        case 'SHA256':
          hmac = CryptoJS.HmacSHA256(text, key);
          break;
        case 'SHA224':
          hmac = CryptoJS.HmacSHA224(text, key);
          break;
        case 'SHA512':
          hmac = CryptoJS.HmacSHA512(text, key);
          break;
        case 'SHA384':
          hmac = CryptoJS.HmacSHA384(text, key);
          break;
        case 'SHA3':
          hmac = CryptoJS.HmacSHA3(text, key);
          break;
        case 'RIPEMD160':
          hmac = CryptoJS.HmacRIPEMD160(text, key);
          break;
      }

      let result = '';
      switch (encoding) {
        case 'Hex':
          result = hmac.toString();
          break;
        case 'Base64':
          result = hmac.toString(CryptoJS.enc.Base64);
          break;
        case 'Latin1':
          result = hmac.toString(CryptoJS.enc.Latin1);
          break;
        case 'Utf8':
          result = hmac.toString(CryptoJS.enc.Utf8);
          break;
        case 'Utf16':
          result = hmac.toString(CryptoJS.enc.Utf16);
          break;
        case 'Utf16LE':
          result = hmac.toString(CryptoJS.enc.Utf16LE);
          break;
        case 'Base64url':
          result = hmac.toString(CryptoJS.enc.Base64url);
          break;
      }

      setHmacResult(result);
    } catch  {
      toast({
        title: "Error",
        description: "Failed to generate HMAC",
        variant: "destructive",
      });
    }
    setIsGenerating(false);
  };

  useEffect(() => {
    if (text && key) {
      generateHmac();
    }
  }, [text, key, hashFunction, encoding]);

  const handleCopy = () => {
    navigator.clipboard.writeText(hmacResult).then(() => {
      toast({
        title: "Copied!",
        description: "HMAC copied to clipboard",
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Hash Function:</label>
              <Select value={hashFunction} onValueChange={(value: HashFunction) => setHashFunction(value)}>
                <SelectTrigger>
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
              <label className="block text-sm font-medium mb-2">Output Encoding:</label>
              <Select value={encoding} onValueChange={(value: DigestEncoding) => setEncoding(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select encoding" />
                </SelectTrigger>
                <SelectContent>
                  {encodings.map((enc) => (
                    <SelectItem key={enc} value={enc}>{enc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Plain Text:</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to hash..."
              className="mb-4"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Secret Key:</label>
            <Input
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter your secret key..."
              className="mb-4"
            />
          </div>

          <AnimatePresence>
            {hmacResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2 flex-1">
                        <label className="block text-sm font-medium">HMAC Result:</label>
                        <code className="block text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded break-all">
                          {hmacResult}
                        </code>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleCopy}
                        className="ml-4"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            onClick={generateHmac}
            disabled={isGenerating || !text || !key}
            className="w-full"
          >
            {isGenerating ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Generate HMAC'
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default HmacGenerator; 