"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, Download, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Delimiter = 'space' | 'none' | 'comma' | 'newline';

interface DelimiterOption {
  value: Delimiter;
  label: string;
  separator: string;
}

const TextToBinaryConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [delimiter, setDelimiter] = useState<Delimiter>('space');
  const [error, setError] = useState('');

  const delimiterOptions: DelimiterOption[] = [
    { value: 'space', label: 'Space', separator: ' ' },
    { value: 'none', label: 'None', separator: '' },
    { value: 'comma', label: 'Comma', separator: ',' },
    { value: 'newline', label: 'New Line', separator: '\n' }
  ];

  const textToBinary = (text: string, separator: string): string => {
    return text.split('').map(char => {
      const binary = char.charCodeAt(0).toString(2).padStart(8, '0');
      return binary;
    }).join(separator);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInput(text);
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    try {
      const selectedDelimiter = delimiterOptions.find(d => d.value === delimiter)?.separator || ' ';
      setResult(textToBinary(input, selectedDelimiter));
      setError('');
    } catch (err) {
      setError('Failed to convert text to binary');
      toast({
        title: "Error",
        description: "Failed to convert text to binary",
        variant: "destructive",
      });
    }
  }, [input, delimiter]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      toast({
        title: "Copied!",
        description: "Binary text copied to clipboard",
      });
    });
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'binary.txt';
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
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium">Delimiter:</label>
            <Select value={delimiter} onValueChange={(value) => setDelimiter(value as Delimiter)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select delimiter" />
              </SelectTrigger>
              <SelectContent>
                {delimiterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Text to Convert:</label>
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
              placeholder="Enter text to convert to binary..."
              className="min-h-[100px]"
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
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium">
                          {error ? 'Error:' : 'Binary:'}
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
                        className="min-h-[100px] font-mono"
                      />
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

export default TextToBinaryConverter; 