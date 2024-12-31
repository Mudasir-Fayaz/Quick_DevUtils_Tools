"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, Download, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type CaseType = 'lower' | 'upper' | 'title' | 'sentence' | 'camel' | 'pascal' | 'snake' | 'kebab';

interface CaseOption {
  value: CaseType;
  label: string;
  convert: (text: string) => string;
}

const CaseConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseType>('lower');

  const caseOptions: CaseOption[] = [
    {
      value: 'lower',
      label: 'lowercase',
      convert: (text) => text.toLowerCase()
    },
    {
      value: 'upper',
      label: 'UPPERCASE',
      convert: (text) => text.toUpperCase()
    },
    {
      value: 'title',
      label: 'Title Case',
      convert: (text) => text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    },
    {
      value: 'sentence',
      label: 'Sentence case',
      convert: (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    },
    {
      value: 'camel',
      label: 'camelCase',
      convert: (text) => text.toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    },
    {
      value: 'pascal',
      label: 'PascalCase',
      convert: (text) => text.toLowerCase()
        .replace(/(^|[^a-zA-Z0-9]+)(.)/g, (_, __, chr) => chr.toUpperCase())
    },
    {
      value: 'snake',
      label: 'snake_case',
      convert: (text) => text.toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '_')
    },
    {
      value: 'kebab',
      label: 'kebab-case',
      convert: (text) => text.toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '-')
    }
  ];

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

  const handleDownload = () => {
    const result = caseOptions.find(opt => opt.value === selectedCase)?.convert(input) || '';
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-text.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const result = caseOptions.find(opt => opt.value === selectedCase)?.convert(input) || '';
    navigator.clipboard.writeText(result).then(() => {
      toast({
        title: "Copied!",
        description: "Converted text copied to clipboard",
      });
    });
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
      reader.readAsText(file);
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
      className="container mx-auto space-y-6"
    >
      <div>
        

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {caseOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedCase === option.value ? "default" : "outline"}
                onClick={() => setSelectedCase(option.value)}
                className="flex-1 min-w-[120px]"
              >
                {option.label}
              </Button>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Input Text:</label>
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
              placeholder="Enter text to convert..."
              className="min-h-[200px]"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            />
          </div>

          <AnimatePresence>
            {input && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium">
                          Result:
                        </label>
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
                      </div>
                      <Textarea
                        value={caseOptions.find(opt => opt.value === selectedCase)?.convert(input)}
                        readOnly
                        className="min-h-[100px]"
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

export default CaseConverter; 