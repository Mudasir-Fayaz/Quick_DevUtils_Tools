"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Copy, RefreshCw, ArrowDownUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CryptoJS from 'crypto-js';

type Algorithm = 'AES' | 'TripleDES' | 'Rabbit' | 'RC4';

const algorithms: Algorithm[] = ['AES', 'TripleDES', 'Rabbit', 'RC4'];

const TextCrypto: React.FC = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [algorithm, setAlgorithm] = useState<Algorithm>('AES');
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const processText = () => {
    if (!text || !key) {
      toast({
        title: "Error",
        description: "Please enter both text and secret key",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      let processed = '';
      if (mode === 'encrypt') {
        switch (algorithm) {
          case 'AES':
            processed = CryptoJS.AES.encrypt(text, key).toString();
            break;
          case 'TripleDES':
            processed = CryptoJS.TripleDES.encrypt(text, key).toString();
            break;
          case 'Rabbit':
            processed = CryptoJS.Rabbit.encrypt(text, key).toString();
            break;
          case 'RC4':
            processed = CryptoJS.RC4.encrypt(text, key).toString();
            break;
        }
      } else {
        try {
          let decrypted;
          switch (algorithm) {
            case 'AES':
              decrypted = CryptoJS.AES.decrypt(text, key);
              break;
            case 'TripleDES':
              decrypted = CryptoJS.TripleDES.decrypt(text, key);
              break;
            case 'Rabbit':
              decrypted = CryptoJS.Rabbit.decrypt(text, key);
              break;
            case 'RC4':
              decrypted = CryptoJS.RC4.decrypt(text, key);
              break;
          }
          processed = decrypted.toString(CryptoJS.enc.Utf8);
          if (!processed) throw new Error('Invalid decryption');
        } catch{
          throw new Error('Failed to decrypt. Check your key and encrypted text.');
        }
      }
      setResult(processed);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Processing failed",
        variant: "destructive",
      });
    }
    setIsProcessing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      toast({
        title: "Copied!",
        description: `${mode === 'encrypt' ? 'Encrypted' : 'Decrypted'} text copied to clipboard`,
      });
    });
  };

  const handleSwitch = () => {
    setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
    setText('');
    setResult('');
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
          <div className="flex justify-between items-center">
            <Select value={algorithm} onValueChange={(value: Algorithm) => setAlgorithm(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                {algorithms.map((algo) => (
                  <SelectItem key={algo} value={algo}>{algo}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={handleSwitch}>
              <ArrowDownUp className="mr-2 h-4 w-4" />
              Switch to {mode === 'encrypt' ? 'Decrypt' : 'Encrypt'}
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {mode === 'encrypt' ? 'Your text:' : 'Your encrypted text:'}
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={mode === 'encrypt' ? 'Enter text to encrypt...' : 'Enter encrypted text...'}
              className="mb-4"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your secret key:</label>
            <Input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter your secret key..."
              className="mb-4"
            />
          </div>

          <Button
            onClick={processText}
            disabled={isProcessing || !text || !key}
            className="w-full"
          >
            {isProcessing ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              mode === 'encrypt' ? 'Encrypt' : 'Decrypt'
            )}
          </Button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <div className="relative">
                  <label className="block text-sm font-medium mb-2">
                    {mode === 'encrypt' ? 'Encrypted text:' : 'Decrypted text:'}
                  </label>
                  <Textarea
                    value={result}
                    readOnly
                    className="pr-12"
                    rows={4}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleCopy}
                    className="absolute right-2 top-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default TextCrypto; 