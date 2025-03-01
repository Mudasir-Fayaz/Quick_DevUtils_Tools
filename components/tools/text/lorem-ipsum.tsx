"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, Download, HelpCircle, RefreshCw } from 'lucide-react'

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const themes: { [key: string]: string } = {
  default: loremIpsum,
  nature: "Mountain stream forest meadow sunlight breeze leaves rustling birds chirping flowers blooming grass swaying clouds drifting sky blue trees tall animals grazing insects buzzing ecosystem thriving seasons changing landscape picturesque serene peaceful wild untamed beautiful breathtaking awe-inspiring majestic.",
  tech: "Algorithm database network server cloud computing artificial intelligence machine learning blockchain cybersecurity encryption data analytics programming code software hardware interface user experience digital transformation innovation disruption startup scalability agile development version control responsive design.",
  food: "Savory aroma spices simmering herbs fresh ingredients chopping sautéing baking roasting grilling boiling steaming seasoning tasting plating garnishing appetizer entree dessert cuisine fusion flavor profile texture mouthfeel umami sweet sour salty bitter balance culinary artistry gastronomy.",
};

type TextType = 'words' | 'sentences' | 'paragraphs' | string;
type ThemeType = 'default' | 'nature' | 'tech' | 'food' | string;

interface GenerateOptions {
  type: TextType;
  count: number;
  theme: ThemeType;
  htmlMarkup: boolean;
  customWords: string;
}

const generateLoremIpsum = (options: GenerateOptions): string => {
  const { type, count, theme, htmlMarkup, customWords } = options;
  let text = themes[theme] || themes.default;

  if (customWords) {
    text = `${customWords} ${text}`;
  }

  const words = text.split(' ');
  let result = '';

  switch (type) {
    case 'words':
      result = words.slice(0, count).join(' ');
      break;
    case 'sentences':
      result = words.slice(0, count * 10).join(' ').replace(/([.!?]\s+)/g, "$1|").split("|").slice(0, count).join(' ');
      break;
    case 'paragraphs':
      result = Array(count).fill('').map(() =>
        words.slice(0, Math.floor(Math.random() * 40) + 20).join(' ')
      ).join('\n\n');
      break;
    default:
      result = text;
  }

  if (htmlMarkup) {
    result = type === 'paragraphs'
      ? `<p>${result.split('\n\n').join('</p><p>')}</p>`
      : `<p>${result}</p>`;
  }

  return result;
};

export default function LoremIpsum() {
  const [generatedText, setGeneratedText] = useState<string>('');
  const [options, setOptions] = useState<GenerateOptions>({
    type: 'paragraphs',
    count: 3,
    theme: 'default',
    htmlMarkup: false,
    customWords: '',
  });
  const [recentHistory, setRecentHistory] = useState<string[]>([]);

  

  const generateText = () => {
    const text = generateLoremIpsum(options);
    setGeneratedText(text);
    setRecentHistory(prev => [text, ...prev].slice(0, 5));
  };

  useEffect(() => {
    generateText();
  }, [generateText]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
  };

  const downloadText = () => {
    const blob = new Blob([generatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lorem-ipsum.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="container mx-auto space-y-6">
    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Generator Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="type">Text Type</Label>
              <Select value={options.type} onValueChange={(value) => setOptions({...options, type: value})}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select text type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="words">Words</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                  <SelectItem value="paragraphs">Paragraphs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="count">Count</Label>
              <Slider
                id="count"
                min={1}
                max={10}
                step={1}
                value={[options.count]}
                onValueChange={(value) => setOptions({...options, count: value[0]})}
              />
              <div className="text-center mt-2">{options.count} {options.type}</div>
            </div>
            
            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select value={options.theme} onValueChange={(value) => setOptions({...options, theme: value})}>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="html-markup"
                checked={options.htmlMarkup}
                onCheckedChange={(checked) => setOptions({...options, htmlMarkup: checked})}
              />
              <Label htmlFor="html-markup">Include HTML Markup</Label>
            </div>
            
            <div>
              <Label htmlFor="custom-words">Custom Words (optional)</Label>
              <Input
                id="custom-words"
                value={options.customWords}
                onChange={(e) => setOptions({...options, customWords: e.target.value})}
                placeholder="Enter custom words..."
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={generateText} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Generate Lorem Ipsum
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Generated Lorem Ipsum</CardTitle>
            <CardDescription>
              {generatedText.length} characters | {generatedText.split(' ').length} words
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded border p-4">
              <pre className="whitespace-pre-wrap">{generatedText}</pre>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Text
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy generated text to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={downloadText}>
                    <Download className="mr-2 h-4 w-4" /> Download Text
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download generated text as .txt file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {recentHistory.map((text, index) => (
              <div key={index} className="mb-4 p-2 border rounded">
                <p className="text-sm text-muted-foreground">{text.substring(0, 100)}...</p>
                <Button variant="ghost" size="sm" onClick={() => setGeneratedText(text)}>Use This</Button>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="fixed bottom-4 right-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-10 h-10 rounded-full p-0">
              <HelpCircle className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Help Guide</h4>
                <p className="text-sm text-muted-foreground">
                  Quick guide on how to use the Lorem Ipsum generator
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Set Options</Label>
                  <div className="col-span-2 text-sm">
                    Choose text type, count, theme, and other options
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Generate</Label>
                  <div className="col-span-2 text-sm">
                    Click the &apos;Generate Lorem Ipsum&apos; button
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Use Text</Label>
                  <div className="col-span-2 text-sm">
                    Copy to clipboard or download the generated text
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. History</Label>
                  <div className="col-span-2 text-sm">
                    View and reuse recently generated text from history
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}