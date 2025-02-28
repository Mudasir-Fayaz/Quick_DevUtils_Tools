"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Encoding = 'UTF-8' | 'ASCII' | 'ISO-8859-1';

const Base64Converter: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encoding, setEncoding] = useState<Encoding>('UTF-8');
  const [error, setError] = useState('');

  const encodings: Encoding[] = ['UTF-8', 'ASCII', 'ISO-8859-1'];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInput(text);
      };
      reader.readAsText(file, encoding);
    }
  };

  const convert = () => {
    setError('');
    if (!input) {
      setResult('');
      return;
    }

    try {
      if (mode === 'encode') {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(input);
        setResult(btoa(String.fromCharCode(...bytes)));
      } else {
        const decoded = atob(input);
        const bytes = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) {
          bytes[i] = decoded.charCodeAt(i);
        }
        const decoder = new TextDecoder(encoding.toLowerCase());
        setResult(decoder.decode(bytes));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Conversion failed';
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    convert();
  }, [input, mode, encoding]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    });
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `base64-${mode === 'encode' ? 'encoded' : 'decoded'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInput(text);
      };
      reader.readAsText(file, encoding);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 space-y-6"
    >
      <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <Tabs value={mode} onValueChange={(value) => setMode(value as 'encode' | 'decode')}>
        <TabsList className="flex space-x-2">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>
        </Tabs>

        <Select value={encoding} onValueChange={(value) => setEncoding(value as Encoding)}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Select encoding" />
        </SelectTrigger>
        <SelectContent>
          {encodings.map((enc) => (
          <SelectItem key={enc} value={enc}>{enc}</SelectItem>
          ))}
        </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-2 space-y-4 md:space-y-0">
        <label className="block text-sm font-medium">
          {mode === 'encode' ? 'Text to Encode:' : 'Base64 to Decode:'}
        </label>
        <input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="outline" asChild>
          <span>
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </span>
          </Button>
        </label>
        </div>
        <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
        className="font-mono min-h-[200px] w-full"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        />
      </div>

      <AnimatePresence>
        {(result || error) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-2"
        >
          <Card className={error ? 'border-red-500' : ''}>
          <CardContent className="p-4">
            <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <label className="block text-sm font-medium">
              {error ? 'Error:' : 'Result:'}
              </label>
              {!error && (
              <div className="flex space-x-2">
                <Button
                size="sm"
                variant="ghost"
                onClick={handleCopy}
                >
                <Copy className="h-4 w-4 mr-2" />
                Copy
                </Button>
                <Button
                size="sm"
                variant="ghost"
                onClick={handleDownload}
                >
                <Upload className="h-4 w-4 mr-2" />
                Download
                </Button>
              </div>
              )}
            </div>
            <Textarea
              value={error || result}
              readOnly
              className="font-mono min-h-[100px] w-full"
            />
            </div>
          </CardContent>
          </Card>
        </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Base64Converter; 