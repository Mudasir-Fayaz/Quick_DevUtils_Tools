"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, Download, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TOML from '@iarna/toml';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from 'next-themes';

const JsonTomlConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'jsonToToml' | 'tomlToJson'>('jsonToToml');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();

  const convertJsonToToml = (jsonStr: string): string => {
    const obj = JSON.parse(jsonStr);
    return TOML.stringify(obj);
  };

  const convertTomlToJson = (tomlStr: string): string => {
    const obj = TOML.parse(tomlStr);
    return JSON.stringify(obj, null, 2);
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

      if (mode === 'jsonToToml') {
        setResult(convertJsonToToml(input));
      } else {
        setResult(convertTomlToJson(input));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Conversion failed',
        variant: "destructive",
      });
    }
  }, [input, mode]);

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
    a.download = mode === 'jsonToToml' ? 'converted.toml' : 'converted.json';
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
          <Tabs value={mode} onValueChange={(value) => setMode(value as 'jsonToToml' | 'tomlToJson')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="jsonToToml">JSON → TOML</TabsTrigger>
              <TabsTrigger value="tomlToJson">TOML → JSON</TabsTrigger>
            </TabsList>
          </Tabs>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                {mode === 'jsonToToml' ? 'JSON Input:' : 'TOML Input:'}
              </label>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept={mode === 'jsonToToml' ? '.json' : '.toml'}
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
            <div 
              className="relative"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <SyntaxHighlighter
                language={mode === 'jsonToToml' ? 'json' : 'toml'}
                style={theme === 'dark' ? atomOneDark : atomOneLight}
                className="min-h-[200px] rounded-md"
              >
                {input}
              </SyntaxHighlighter>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'jsonToToml' 
                  ? "Enter JSON..."
                  : "Enter TOML..."}
                className="font-mono min-h-[200px] absolute inset-0 opacity-0"
              />
            </div>
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
                          {error ? 'Error:' : mode === 'jsonToToml' ? 'TOML Output:' : 'JSON Output:'}
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
                      <div className="relative">
                        <SyntaxHighlighter
                          language={mode === 'jsonToToml' ? 'toml' : 'json'}
                          style={theme === 'dark' ? atomOneDark : atomOneLight}
                          className="rounded-md"
                        >
                          {error || result}
                        </SyntaxHighlighter>
                      </div>
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

export default JsonTomlConverter; 