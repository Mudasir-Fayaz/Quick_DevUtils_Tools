'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertCircle, Copy, Download, HelpCircle, Redo, Undo } from 'lucide-react'

const MAX_INPUT_LENGTH = 10000 // Limit input to 10,000 characters

type History = string[]; // History is an array of strings
type Stack = string[];   // Undo/Redo stacks are arrays of strings

// BinaryAscii component
export default function BinaryAscii() {
  const [binaryInput, setBinaryInput] = useState<string>(''); // binary input as string
  const [asciiOutput, setAsciiOutput] = useState<string>(''); // ascii output as string
  const [error, setError] = useState<string>('');            // error message as string
  const [history, setHistory] = useState<History>([]);        // history as an array of strings
  const [undoStack, setUndoStack] = useState<Stack>([]);      // undo stack as an array of strings
  const [redoStack, setRedoStack] = useState<Stack>([]);      // redo stack as an array of strings
  const [textAlignment, setTextAlignment] = useState<string>('left'); // alignment as a string

  // Function to convert binary to ASCII
  const convertBinaryToAscii = useCallback((binary: string): string => {
    if (!binary) return '';
    const binaryArray = binary.split(' ');
    return binaryArray.map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
  }, []);

  // Function to validate binary input
  const validateBinary = useCallback((input: string): boolean => {
    return /^[01\s]+$/.test(input);
  }, []);

  // Handle input change (binary input)
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length > MAX_INPUT_LENGTH) {
      setError(`Input exceeds maximum length of ${MAX_INPUT_LENGTH} characters`);
      return;
    }
    setUndoStack(prev => [...prev, binaryInput]); // Store the current state for undo
    setRedoStack([]); // Clear the redo stack
    setBinaryInput(input);
    if (validateBinary(input)) {
      setAsciiOutput(convertBinaryToAscii(input));
      setError('');
    } else {
      setError('Invalid binary input. Please use only 0s and 1s.');
    }
  }, [binaryInput, convertBinaryToAscii, validateBinary]);

  // Handle copy to clipboard
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(asciiOutput);
  }, [asciiOutput]);

  // Handle clearing the inputs
  const handleClear = useCallback(() => {
    setBinaryInput('');
    setAsciiOutput('');
    setError('');
  }, []);

  // Handle example input (a predefined binary string)
  const handleExampleInput = useCallback(() => {
    const exampleBinary = '01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100';
    setBinaryInput(exampleBinary);
    setAsciiOutput(convertBinaryToAscii(exampleBinary));
    setError('');
  }, [convertBinaryToAscii]);

  // Handle file download (download ascii output as a text file)
  const handleDownload = useCallback(() => {
    const element = document.createElement('a');
    const file = new Blob([asciiOutput], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'ascii_output.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [asciiOutput]);

  // Handle undo (revert to previous input)
  const handleUndo = useCallback(() => {
    if (undoStack.length > 0) {
      const prevState = undoStack[undoStack.length - 1];
      setRedoStack(prev => [...prev, binaryInput]); // Store the current state for redo
      setBinaryInput(prevState);
      setUndoStack(prev => prev.slice(0, -1)); // Remove last undo item
    }
  }, [binaryInput, undoStack]);

  // Handle redo (reapply previous undo)
  const handleRedo = useCallback(() => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack(prev => [...prev, binaryInput]); // Store the current state for undo
      setBinaryInput(nextState);
      setRedoStack(prev => prev.slice(0, -1)); // Remove last redo item
    }
  }, [binaryInput, redoStack]);

  // Handle keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      } else if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Update history after input change
  useEffect(() => {
    if (binaryInput && !error) {
      setHistory(prev => [binaryInput, ...prev.slice(0, 4)]); // Keep only the last 5 inputs in history
    }
  }, [binaryInput, error]);


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center"></CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="binary-input">Binary Input</Label>
            <Textarea
              id="binary-input"
              value={binaryInput}
              onChange={handleInputChange}
              placeholder="Enter binary (e.g., 01001000 01100101 01101100 01101100 01101111)"
              className={`h-32 text-${textAlignment}`}
            />
            {error && (
              <div className="text-red-500 flex items-center mt-2">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="ascii-output">ASCII Output</Label>
            <Textarea
              id="ascii-output"
              value={asciiOutput}
              readOnly
              className={`h-32 text-${textAlignment}`}
            />
            <div className="text-sm text-muted-foreground mt-2">
              Character count: {asciiOutput.length}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              Copy ASCII
            </Button>
            <Button onClick={handleClear}>Clear</Button>
            <Button onClick={handleExampleInput}>Example Input</Button>
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download ASCII
            </Button>
            <Button onClick={handleUndo} disabled={undoStack.length === 0}>
              <Undo className="w-4 h-4 mr-2" />
              Undo
            </Button>
            <Button onClick={handleRedo} disabled={redoStack.length === 0}>
              <Redo className="w-4 h-4 mr-2" />
              Redo
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter binary code (0s and 1s) separated by spaces.</p>
                  <p>Each 8-bit group represents one ASCII character.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <Label htmlFor="text-alignment">Text Alignment</Label>
            <Select value={textAlignment} onValueChange={setTextAlignment}>
              <SelectTrigger id="text-alignment">
                <SelectValue placeholder="Select text alignment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {history.length > 0 && (
            <div>
              <Label>Recent Inputs</Label>
              <div className="space-y-2">
                {history.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left truncate"
                    onClick={() => setBinaryInput(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}