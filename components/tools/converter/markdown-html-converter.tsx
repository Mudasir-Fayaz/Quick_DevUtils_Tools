"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, Download, Upload, Eye, Code2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from 'next-themes';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownOptions {
  gfm: boolean;
  breaks: boolean;
  tables: boolean;
  sanitize: boolean;
  customStyles: boolean;
}

const MarkdownHtmlConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [customCss, setCustomCss] = useState('');
  const [viewMode, setViewMode] = useState<'code' | 'preview'>('code');
  const [options, setOptions] = useState<MarkdownOptions>({
    gfm: true,
    breaks: true,
    tables: true,
    sanitize: true,
    customStyles: false,
  });
  const { theme } = useTheme();

  const convertMarkdownToHtml = async (markdown: string): Promise<string> => {
    marked.setOptions({
      gfm: options.gfm,
      breaks: options.breaks,
    });

    const html = await marked(markdown);
    return options.sanitize ? DOMPurify.sanitize(html) : html;
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
    const convert = async () => {
      try {
        setError('');
        if (!input) {
          setResult('');
          setPreview('');
          return;
        }

        const html = await convertMarkdownToHtml(input);
        setResult(html);
        
        const previewHtml = options.customStyles 
          ? `<style>${customCss}</style>${html}`
          : html;
        setPreview(previewHtml);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Conversion failed');
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : 'Conversion failed',
          variant: "destructive",
        });
      }
    };

    convert();
  }, [input, options, customCss,convertMarkdownToHtml]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    });
  };

  const handleDownload = () => {
    const content = options.customStyles 
      ? `<style>${customCss}</style>\n${result}`
      : result;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
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
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'code' | 'preview')}>
              <TabsList>
                <TabsTrigger value="code">
                  <Code2 className="h-4 w-4 mr-2" />
                  HTML Code
                </TabsTrigger>
                <TabsTrigger value="preview">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center space-x-2">
              <Switch
                id="custom-styles"
                checked={options.customStyles}
                onCheckedChange={(checked) => setOptions(prev => ({
                  ...prev,
                  customStyles: checked
                }))}
              />
              <Label htmlFor="custom-styles">Custom Styles</Label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="gfm"
                checked={options.gfm}
                onCheckedChange={(checked) => setOptions(prev => ({
                  ...prev,
                  gfm: checked
                }))}
              />
              <Label htmlFor="gfm">GitHub Flavored Markdown</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="breaks"
                checked={options.breaks}
                onCheckedChange={(checked) => setOptions(prev => ({
                  ...prev,
                  breaks: checked
                }))}
              />
              <Label htmlFor="breaks">Line Breaks</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="tables"
                checked={options.tables}
                onCheckedChange={(checked) => setOptions(prev => ({
                  ...prev,
                  tables: checked
                }))}
              />
              <Label htmlFor="tables">Tables Support</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="sanitize"
                checked={options.sanitize}
                onCheckedChange={(checked) => setOptions(prev => ({
                  ...prev,
                  sanitize: checked
                }))}
              />
              <Label htmlFor="sanitize">Sanitize HTML</Label>
            </div>
          </div>

          {options.customStyles && (
            <div>
              <label className="block text-sm font-medium mb-2">Custom CSS:</label>
              <Textarea
                value={customCss}
                onChange={(e) => setCustomCss(e.target.value)}
                placeholder="Enter custom CSS..."
                className="font-mono min-h-[100px]"
              />
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Markdown Input:</label>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".md,.markdown,.txt"
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
                language="markdown"
                style={theme === 'dark' ? atomOneDark : atomOneLight}
                className="min-h-[200px] rounded-md"
              >
                {input}
              </SyntaxHighlighter>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter Markdown..."
                className="font-mono min-h-[200px] absolute inset-0 opacity-0"
              />
            </div>
          </div>

          <AnimatePresence>
            {((result && viewMode === 'code') || error) && (
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
                          {error ? 'Error:' : 'HTML Output:'}
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
                          language="html"
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

            {(preview && viewMode === 'preview' && !error) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Card>
                  <CardContent className="p-4">
                    <div 
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: preview }}
                    />
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

export default MarkdownHtmlConverter; 