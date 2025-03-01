"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UnicodeInfo {
  codePoint: string;
  name: string;
  category: string;
  block: string;
}

const TextToUnicodeConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'toUnicode' | 'fromUnicode'>('toUnicode');
  const [result, setResult] = useState('');
  const [charInfo, setCharInfo] = useState<UnicodeInfo[]>([]);
  const [error, setError] = useState('');

  const getUnicodeInfo = (char: string): UnicodeInfo => {
    const codePoint = char.codePointAt(0) || 0;
    return {
      codePoint: `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`,
      name: getCharacterName(codePoint),
      category: getUnicodeCategory(char),
      block: getUnicodeBlock(codePoint)
    };
  };

  const getCharacterName = (codePoint: number): string => {
    try {
      return String.fromCodePoint(codePoint);
    } catch {
      return 'Unknown';
    }
  };

  const getUnicodeCategory = (char: string): string => {
    if (/\p{L}/u.test(char)) return 'Letter';
    if (/\p{N}/u.test(char)) return 'Number';
    if (/\p{P}/u.test(char)) return 'Punctuation';
    if (/\p{S}/u.test(char)) return 'Symbol';
    if (/\p{Z}/u.test(char)) return 'Separator';
    return 'Other';
  };

  const getUnicodeBlock = (codePoint: number): string => {
    if (codePoint <= 0x007F) return 'Basic Latin';
    if (codePoint <= 0x00FF) return 'Latin-1 Supplement';
    if (codePoint <= 0x017F) return 'Latin Extended-A';
    if (codePoint <= 0x024F) return 'Latin Extended-B';
    return 'Other';
  };

  const convertToUnicode = (text: string): string => {
    return text.split('').map(char => {
      const codePoint = char.codePointAt(0);
      return `U+${codePoint?.toString(16).toUpperCase().padStart(4, '0')}`;
    }).join(' ');
  };

  const convertFromUnicode = (text: string): string => {
    try {
      return text.split(/\s+/).map(code => {
        if (!code) return '';
        const hex = code.replace(/^U\+/i, '');
        return String.fromCodePoint(parseInt(hex, 16));
      }).join('');
    } catch  {
      throw new Error('Invalid Unicode format');
    }
  };

  useEffect(() => {
    try {
      setError('');
      if (!input) {
        setResult('');
        setCharInfo([]);
        return;
      }

      if (mode === 'toUnicode') {
        setResult(convertToUnicode(input));
        setCharInfo(input.split('').map(char => getUnicodeInfo(char)));
      } else {
        setResult(convertFromUnicode(input));
        setCharInfo([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Conversion failed',
        variant: "destructive",
      });
    }
  }, [input, mode, getUnicodeInfo]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    });
  };

  const handleDownload = () => {
    const content = mode === 'toUnicode' && charInfo.length > 0
      ? `${result}\n\nDetailed Information:\n${charInfo.map(info => 
          `Character: ${info.name}\nCode Point: ${info.codePoint}\nCategory: ${info.category}\nBlock: ${info.block}\n`
        ).join('\n')}`
      : result;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unicode-${mode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          <Tabs value={mode} onValueChange={(value) => setMode(value as 'toUnicode' | 'fromUnicode')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="toUnicode">Text → Unicode</TabsTrigger>
              <TabsTrigger value="fromUnicode">Unicode → Text</TabsTrigger>
            </TabsList>
          </Tabs>

          <div>
            <label className="block text-sm font-medium mb-2">
              {mode === 'toUnicode' ? 'Text to Convert:' : 'Unicode to Convert (U+0000 format):'}
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'toUnicode' 
                ? "Enter text to convert to Unicode..."
                : "Enter Unicode values (e.g., U+0048 U+0065 U+006C U+006C U+006F)"}
              className="font-mono min-h-[100px]"
            />
          </div>

          <AnimatePresence>
            {(result || error) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <Card className={error ? 'border-red-500' : ''}>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium">
                          {error ? 'Error:' : 'Result:'}
                        </label>
                        {!error && (
                          <div className="space-x-2">
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
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                      <Textarea
                        value={error || result}
                        readOnly
                        className="font-mono min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                </Card>

                {mode === 'toUnicode' && charInfo.length > 0 && !error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {charInfo.map((info, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-2xl">{getCharacterName(parseInt(info.codePoint.slice(2), 16))}</span>
                              <span className="font-mono text-sm">{info.codePoint}</span>
                            </div>
                            <div className="text-sm space-y-1">
                              <p>Category: {info.category}</p>
                              <p>Block: {info.block}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default TextToUnicodeConverter; 