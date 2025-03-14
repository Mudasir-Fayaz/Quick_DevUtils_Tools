"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, Download, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import yaml from 'js-yaml';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from 'next-themes';

const JsonYamlConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'jsonToYaml' | 'yamlToJson'>('jsonToYaml');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isPretty, setIsPretty] = useState(true);
  const { theme } = useTheme();

  const convertJsonToYaml = (jsonStr: string): string => {
    const obj = JSON.parse(jsonStr);
    return yaml.dump(obj, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
    });
  };

  const convertYamlToJson = (yamlStr: string): string => {
    const obj = yaml.load(yamlStr);
    return JSON.stringify(obj, null, isPretty ? 2 : 0);
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

      if (mode === 'jsonToYaml') {
        setResult(convertJsonToYaml(input));
      } else {
        setResult(convertYamlToJson(input));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Conversion failed',
        variant: "destructive",
      });
    }
  }, [input, mode, isPretty, convertYamlToJson]);

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
    a.download = mode === 'jsonToYaml' ? 'converted.yaml' : 'converted.json';
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
          <div className="flex justify-between items-center">
            <Tabs value={mode} onValueChange={(value) => setMode(value as 'jsonToYaml' | 'yamlToJson')}>
              <TabsList>
                <TabsTrigger value="jsonToYaml">JSON → YAML</TabsTrigger>
                <TabsTrigger value="yamlToJson">YAML → JSON</TabsTrigger>
              </TabsList>
            </Tabs>

            {mode === 'yamlToJson' && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="pretty-mode"
                  checked={isPretty}
                  onCheckedChange={setIsPretty}
                />
                <Label htmlFor="pretty-mode">Pretty JSON</Label>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                {mode === 'jsonToYaml' ? 'JSON Input:' : 'YAML Input:'}
              </label>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept={mode === 'jsonToYaml' ? '.json' : '.yaml,.yml'}
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
                language={mode === 'jsonToYaml' ? 'json' : 'yaml'}
                style={theme === 'dark' ? atomOneDark : atomOneLight}
                className="min-h-[200px] rounded-md"
              >
                {input}
              </SyntaxHighlighter>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'jsonToYaml' 
                  ? "Enter JSON..."
                  : "Enter YAML..."}
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
                          {error ? 'Error:' : mode === 'jsonToYaml' ? 'YAML Output:' : 'JSON Output:'}
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
                          language={mode === 'jsonToYaml' ? 'yaml' : 'json'}
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

export default JsonYamlConverter; 