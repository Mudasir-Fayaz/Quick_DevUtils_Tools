"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Copy, Download, HelpCircle, Trash2, Undo, Redo, Search, Replace } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SearchOptions {
  caseSensitive: boolean;
  wholeWord: boolean;
  regex: boolean;
}

interface SearchResult {
  count: number;
  positions: number[];
  highlightedText: string;
}

const searchSubstring = (mainText: string, substring: string, options: SearchOptions): SearchResult => {
  let regex: RegExp;
  let count = 0;
  const positions: number[] = [];
  let highlightedText = mainText;

  if (options.regex) {
    try {
      regex = new RegExp(substring, options.caseSensitive ? 'g' : 'gi');
    } catch (error) {
      console.log(error)
      throw new Error('Invalid regular expression');
    }
  } else {
    const escapedSubstring = substring.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const wordBoundary = options.wholeWord ? '\\b' : '';
    regex = new RegExp(`${wordBoundary}${escapedSubstring}${wordBoundary}`, options.caseSensitive ? 'g' : 'gi');
  }

  highlightedText = highlightedText.replace(regex, (match) => {
    count++;
    positions.push(highlightedText.indexOf(match, positions[positions.length - 1] + 1));
    return `<mark>${match}</mark>`;
  });

  return { count, positions, highlightedText };
}

export default function SubstringFinder() {
  const [mainText, setMainText] = useState("")
  const [substring, setSubstring] = useState("")
  const [replaceText, setReplaceText] = useState("")
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    caseSensitive: false,
    wholeWord: false,
    regex: false,
  })
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [undoStack, setUndoStack] = useState<string[]>([])
  const [redoStack, setRedoStack] = useState<string[]>([])

  useEffect(() => {
    handleSearch();
  }, [mainText, substring, searchOptions])

  const handleSearch = () => {
    setError(null);
    if (!mainText || !substring) {
      setSearchResult(null);
      return;
    }
    try {
      const result = searchSubstring(mainText, substring, searchOptions);
      setSearchResult(result);
    } catch (error) {
      setError((error as Error).message);
      setSearchResult(null);
    }
  }

  const handleReplace = () => {
    if (!searchResult) return;
    const newText = mainText.replace(new RegExp(substring, searchOptions.caseSensitive ? 'g' : 'gi'), replaceText);
    setUndoStack(prev => [mainText, ...prev]);
    setRedoStack([]);
    setMainText(newText);
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  }

  const downloadResult = () => {
    const blob = new Blob([mainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'substring-finder-result.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const clearAll = () => {
    setMainText("");
    setSubstring("");
    setReplaceText("");
    setSearchResult(null);
    setError(null);
    setUndoStack([]);
    setRedoStack([]);
  }

  const undo = () => {
    if (undoStack.length > 0) {
      const prevText = undoStack[0];
      setRedoStack(prev => [mainText, ...prev]);
      setUndoStack(prev => prev.slice(1));
      setMainText(prevText);
    }
  }

  const redo = () => {
    if (redoStack.length > 0) {
      const nextText = redoStack[0];
      setUndoStack(prev => [mainText, ...prev]);
      setRedoStack(prev => prev.slice(1));
      setMainText(nextText);
    }
  }

  return (
    <div className="container mx-auto space-y-6">
      
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Main Text</CardTitle>
            <CardDescription>Enter the text you want to search within</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="w-full h-40 p-2 border rounded"
              value={mainText}
              onChange={(e) => setMainText(e.target.value)}
              placeholder="Enter your main text here..."
            />
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Characters: {mainText.length} | Words: {mainText.split(/\s+/).filter(Boolean).length}
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Search and Replace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="substring">Substring to Find</Label>
              <Input
                id="substring"
                value={substring}
                onChange={(e) => setSubstring(e.target.value)}
                placeholder="Enter substring..."
              />
            </div>
            <div>
              <Label htmlFor="replace">Replace With</Label>
              <Input
                id="replace"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Enter replacement text..."
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="case-sensitive"
                  checked={searchOptions.caseSensitive}
                  onCheckedChange={(checked) => setSearchOptions(prev => ({ ...prev, caseSensitive: checked }))}
                />
                <Label htmlFor="case-sensitive">Case Sensitive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="whole-word"
                  checked={searchOptions.wholeWord}
                  onCheckedChange={(checked) => setSearchOptions(prev => ({ ...prev, wholeWord: checked }))}
                />
                <Label htmlFor="whole-word">Whole Word</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="regex"
                  checked={searchOptions.regex}
                  onCheckedChange={(checked) => setSearchOptions(prev => ({ ...prev, regex: checked }))}
                />
                <Label htmlFor="regex">Use Regex</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
            <Button onClick={handleReplace} disabled={!searchResult}>
              <Replace className="mr-2 h-4 w-4" /> Replace All
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded border p-4">
            {searchResult ? (
              <div className="space-y-4">
                <div>Occurrences: {searchResult.count}</div>
                <div>Positions: {searchResult.positions.join(', ')}</div>
                <div dangerouslySetInnerHTML={{ __html: searchResult.highlightedText }} />
              </div>
            ) : (
              <div className="text-center text-muted-foreground">No results to display</div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => copyToClipboard(mainText)}>
                  <Copy className="mr-2 h-4 w-4" /> Copy Text
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy main text to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={downloadResult}>
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download main text as .txt file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap justify-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={undo} disabled={undoStack.length === 0}>
                <Undo className="mr-2 h-4 w-4" /> Undo
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo last action</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={redo} disabled={redoStack.length === 0}>
                <Redo className="mr-2 h-4 w-4" /> Redo
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo last undone action</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={clearAll} variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Clear All
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear all text and history</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

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
                  Quick guide on how to use the Substring Finder
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">1. Main Text</Label>
                  <div className="col-span-2 text-sm">
                    Enter the text you want to search within
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Substring</Label>
                  <div className="col-span-2 text-sm">
                    Enter the substring you want to find
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Options</Label>
                  <div className="col-span-2 text-sm">
                    Set search options like case sensitivity
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. Results</Label>
                  <div className="col-span-2 text-sm">
                    View search results and perform actions
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