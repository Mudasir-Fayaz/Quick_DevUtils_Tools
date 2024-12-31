"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Copy, ArrowUpDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RomanNumeralConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'toRoman' | 'fromRoman'>('toRoman');
  const [error, setError] = useState('');

  const romanNumerals: [string, number][] = [
    ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
    ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
    ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
  ];

  const toRoman = (num: number): string => {
    if (num < 1 || num > 3999) {
      throw new Error('Number must be between 1 and 3999');
    }

    let result = '';
    let remaining = num;

    for (const [roman, value] of romanNumerals) {
      while (remaining >= value) {
        result += roman;
        remaining -= value;
      }
    }

    return result;
  };

  const fromRoman = (roman: string): number => {
    const validRoman = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
    if (!validRoman.test(roman)) {
      throw new Error('Invalid Roman numeral');
    }

    let result = 0;
    let index = 0;
    const upperRoman = roman.toUpperCase();

    while (index < upperRoman.length) {
      const current = getRomanValue(upperRoman[index]);
      const next = index + 1 < upperRoman.length ? getRomanValue(upperRoman[index + 1]) : 0;

      if (next > current) {
        result += next - current;
        index += 2;
      } else {
        result += current;
        index += 1;
      }
    }

    return result;
  };

  const getRomanValue = (char: string): number => {
    const values: { [key: string]: number } = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    return values[char] || 0;
  };

  const convert = () => {
    setError('');
    if (!input) {
      setResult('');
      return;
    }

    try {
      if (mode === 'toRoman') {
        const num = parseInt(input);
        setResult(toRoman(num));
      } else {
        const num = fromRoman(input);
        setResult(num.toString());
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
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    });
  };

  const handleSwapMode = () => {
    setMode(mode === 'toRoman' ? 'fromRoman' : 'toRoman');
    setInput('');
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
            <Tabs value={mode} onValueChange={(value) => setMode(value as 'toRoman' | 'fromRoman')}>
              <TabsList>
                <TabsTrigger value="toRoman">Number → Roman</TabsTrigger>
                <TabsTrigger value="fromRoman">Roman → Number</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button variant="outline" onClick={handleSwapMode}>
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Swap
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {mode === 'toRoman' ? 'Enter Number (1-3999):' : 'Enter Roman Numeral:'}
            </label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'toRoman' ? 'Enter a number...' : 'Enter a Roman numeral...'}
              className="font-mono"
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
                    <div className="flex justify-between items-center">
                      <div className="space-y-1 flex-1">
                        <label className="block text-sm font-medium">
                          {error ? 'Error:' : 'Result:'}
                        </label>
                        <code className="block text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded break-all font-mono">
                          {error || result}
                        </code>
                      </div>
                      {!error && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={handleCopy}
                          className="ml-4"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default RomanNumeralConverter; 