"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, Download, Upload, ArrowUpDown, SortAsc } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type ListFormat = 'comma' | 'line' | 'array';

interface FormatOption {
  value: ListFormat;
  label: string;
  delimiter: string;
}

const ListConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [customDelimiter, setCustomDelimiter] = useState('');
  const [inputFormat, setInputFormat] = useState<ListFormat>('comma');
  const [outputFormat, setOutputFormat] = useState<ListFormat>('line');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [trim, setTrim] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [sort, setSort] = useState<'none' | 'asc' | 'desc' | 'length'>('none');

  const formatOptions: FormatOption[] = [
    { value: 'comma', label: 'Comma Separated', delimiter: ',' },
    { value: 'line', label: 'Line Separated', delimiter: '\n' },
    { value: 'array', label: 'JSON Array', delimiter: ',' }
  ];

  const parseInput = (text: string, format: ListFormat): string[] => {
    let items: string[] = [];
    
    if (format === 'array') {
      try {
        const arr = JSON.parse(text);
        if (!Array.isArray(arr)) throw new Error('Input is not a valid JSON array');
        items = arr.map(item => String(item));
      } catch {
        throw new Error('Invalid JSON array format');
      }
    } else {
      const delimiter = customDelimiter || formatOptions.find(f => f.value === format)?.delimiter || ',';
      items = text.split(delimiter);
    }

    if (trim) {
      items = items.map(item => item.trim()).filter(item => item !== '');
    }

    if (removeDuplicates) {
      items = [...new Set(items)];
    }

    if (sort !== 'none') {
      items.sort((a, b) => {
        if (sort === 'length') return a.length - b.length;
        return sort === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
      });
    }

    return items;
  };

  const formatOutput = (items: string[], format: ListFormat): string => {
    if (format === 'array') {
      return JSON.stringify(items, null, 2);
    }
    const delimiter = customDelimiter || formatOptions.find(f => f.value === format)?.delimiter || ',';
    return items.join(delimiter);
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
      setError('');
      if (!input) {
        setResult('');
        return;
      }

      const items = parseInput(input, inputFormat);
      setResult(formatOutput(items, outputFormat));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Conversion failed',
        variant: "destructive",
      });
    }
  }, [input, inputFormat, outputFormat, trim, removeDuplicates, sort, customDelimiter]);

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
    a.download = 'converted-list.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSwapFormats = () => {
    setInputFormat(outputFormat);
    setOutputFormat(inputFormat);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Input Format</Label>
              <Select value={inputFormat} onValueChange={(value) => setInputFormat(value as ListFormat)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select input format" />
                </SelectTrigger>
                <SelectContent>
                  {formatOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Output Format</Label>
              <div className="flex gap-2">
                <Select value={outputFormat} onValueChange={(value) => setOutputFormat(value as ListFormat)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    {formatOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={handleSwapFormats}>
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Custom Delimiter (optional)</Label>
            <Input
              value={customDelimiter}
              onChange={(e) => setCustomDelimiter(e.target.value)}
              placeholder="Enter custom delimiter..."
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="trim" checked={trim} onCheckedChange={setTrim} />
              <Label htmlFor="trim">Trim whitespace</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="duplicates" checked={removeDuplicates} onCheckedChange={setRemoveDuplicates} />
              <Label htmlFor="duplicates">Remove duplicates</Label>
            </div>
            <div className="space-x-2">
              <Label>Sort:</Label>
              <Select value={sort} onValueChange={(value) => setSort(value as typeof sort)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="asc">Alphabetical (A-Z)</SelectItem>
                  <SelectItem value="desc">Alphabetical (Z-A)</SelectItem>
                  <SelectItem value="length">By Length</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Input:</label>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".txt,.json,.csv"
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
              placeholder="Enter your list items..."
              className="min-h-[200px] font-mono"
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
                        className="min-h-[200px] font-mono"
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

export default ListConverter; 