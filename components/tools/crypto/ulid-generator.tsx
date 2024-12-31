"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Copy, RefreshCw, Download, Trash2, Info } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { monotonicFactory, ulid } from 'ulid';

type FormatType = 'Raw' | 'JSON' | 'UUID' | 'Base32' | 'Binary';

const monotonic = monotonicFactory();

const UlidGenerator: React.FC = () => {
  const [ulids, setUlids] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [format, setFormat] = useState<FormatType>('Raw');
  const [useMonotonic, setUseMonotonic] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const formatUlid = (id: string, format: FormatType): string => {
    switch (format) {
      case 'JSON':
        return JSON.stringify({ ulid: id }, null, 2);
      case 'UUID':
        // Convert ULID to UUID-like format
        return `${id.slice(0,8)}-${id.slice(8,12)}-${id.slice(12,16)}-${id.slice(16,20)}-${id.slice(20)}`;
      case 'Base32':
        return id;
      case 'Binary':
        // Convert to binary representation
        return Array.from(id)
          .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          .join(' ');
      default:
        return id;
    }
  };

  const generateUlid = () => {
    setIsGenerating(true);
    const newUlids: string[] = [];
    
    for (let i = 0; i < quantity; i++) {
      let id = useMonotonic ? monotonic() : ulid();
      if (lowercase) id = id.toLowerCase();
      newUlids.push(formatUlid(id, format));
    }
    
    setUlids(newUlids);
    setIsGenerating(false);
  };

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      toast({
        title: "Copied!",
        description: "ULID copied to clipboard",
      });
    });
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(ulids.join('\n')).then(() => {
      toast({
        title: "Copied All!",
        description: "All ULIDs copied to clipboard",
      });
    });
  };

  const handleDownload = () => {
    const blob = new Blob([ulids.join('\n')], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ulids-${format.toLowerCase()}-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setUlids([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto space-y-6"
    >
      <div>
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Format:</label>
              <Select value={format} onValueChange={(value: FormatType) => setFormat(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Raw">Raw</SelectItem>
                  <SelectItem value="JSON">JSON</SelectItem>
                  <SelectItem value="UUID">UUID-like</SelectItem>
                  <SelectItem value="Base32">Base32</SelectItem>
                  <SelectItem value="Binary">Binary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Quantity: {quantity}
              </label>
              <Slider
                value={[quantity]}
                onValueChange={([value]) => setQuantity(value)}
                max={100}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="monotonic"
                checked={useMonotonic}
                onCheckedChange={(checked) => setUseMonotonic(checked as boolean)}
              />
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <label htmlFor="monotonic">Monotonic</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ensures strictly increasing values even within the same millisecond</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={lowercase}
                onCheckedChange={(checked) => setLowercase(checked as boolean)}
              />
              <label htmlFor="lowercase">Lowercase</label>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <Button onClick={generateUlid} disabled={isGenerating} className="flex-1">
            {isGenerating ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Generate'
            )}
          </Button>
          <Button onClick={handleCopyAll} variant="outline" disabled={!ulids.length}>
            <Copy className="mr-2 h-4 w-4" />
            Copy All
          </Button>
          <Button onClick={handleDownload} variant="outline" disabled={!ulids.length}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button onClick={handleClear} variant="outline" disabled={!ulids.length}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>

        <AnimatePresence>
          <div className="space-y-2">
            {ulids.map((id, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="p-4 flex justify-between items-center">
                    <code className="font-mono text-sm break-all">{id}</code>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopy(id)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default UlidGenerator; 