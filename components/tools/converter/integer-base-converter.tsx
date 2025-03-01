"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Copy, ArrowUpDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface BaseOption {
  value: number;
  label: string;
}

const baseOptions: BaseOption[] = [
  { value: 2, label: 'Binary (Base 2)' },
  { value: 8, label: 'Octal (Base 8)' },
  { value: 10, label: 'Decimal (Base 10)' },
  { value: 16, label: 'Hexadecimal (Base 16)' },
  { value: 32, label: 'Base 32' },
  { value: 36, label: 'Base 36' },
];

const IntegerBaseConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [fromBase, setFromBase] = useState<number>(10);
  const [toBase, setToBase] = useState<number>(2);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const validateInput = (value: string, base: number): boolean => {
    const regex = new RegExp(`^-?[0-9${base > 10 ? 'a-' + String.fromCharCode(86 + base) : ''}]+(\\.?[0-9${base > 10 ? 'a-' + String.fromCharCode(86 + base) : ''}]*)?$`, 'i');
    return regex.test(value);
  };

  const convertBase = () => {
    setError('');

    try {
      if (!input) {
        setResult('');
        return;
      }

      if (!validateInput(input, fromBase)) {
        throw new Error(`Invalid input for base ${fromBase}`);
      }

      // Handle negative numbers
      const isNegative = input.startsWith('-');
      const absInput = isNegative ? input.slice(1) : input;

      // Split integer and fractional parts
      const [integerPart, fractionalPart] = absInput.split('.');

      // Convert integer part
      const decimal = parseInt(integerPart, fromBase);
      let result = decimal.toString(toBase);

      // Convert fractional part if exists
      if (fractionalPart) {
        let fraction = 0;
        for (let i = 0; i < fractionalPart.length; i++) {
          fraction += parseInt(fractionalPart[i], fromBase) * Math.pow(fromBase, -(i + 1));
        }

        if (fraction > 0) {
          result += '.';
          // Convert up to 8 decimal places for fractional part
          for (let i = 0; i < 8; i++) {
            fraction *= toBase;
            const digit = Math.floor(fraction);
            result += digit.toString(toBase);
            fraction -= digit;
            if (fraction === 0) break;
          }
        }
      }

      setResult((isNegative ? '-' : '') + result.toUpperCase());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Conversion failed',
        variant: "destructive",
      });
    }

  };

  useEffect(() => {
    convertBase();
  }, [input, fromBase, toBase, convertBase]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    });
  };

  const handleSwapBases = () => {
    setFromBase(toBase);
    setToBase(fromBase);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium mb-2">From Base:</label>
              <Select value={fromBase.toString()} onValueChange={(value) => setFromBase(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select base" />
                </SelectTrigger>
                <SelectContent>
                  {baseOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center">
              <Button variant="outline" onClick={handleSwapBases} className="mt-6">
                <ArrowUpDown className="h-4 w-4" />
                <span className="ml-2">Swap</span>
              </Button>
            </div>

            <div className="md:col-start-2">
              <label className="block text-sm font-medium mb-2">To Base:</label>
              <Select value={toBase.toString()} onValueChange={(value) => setToBase(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select base" />
                </SelectTrigger>
                <SelectContent>
                  {baseOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number to Convert:</label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter a number in base ${fromBase}...`}
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

export default IntegerBaseConverter; 