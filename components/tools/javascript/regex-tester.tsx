'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle,Undo, Redo, Save, Download } from 'lucide-react'

interface SavedPattern {
  regex: string
  flags: string
}
export default function RegexTester() {
  // State types
  const [regex, setRegex] = useState<string>('')  // Regex pattern as string
  const [text, setText] = useState<string>('')  // Text to test regex on
  const [flags, setFlags] = useState<{ g: boolean, i: boolean, m: boolean, s: boolean }>({ g: true, i: false, m: false, s: false })  // Flags state
  const [matches, setMatches] = useState<RegExpMatchArray[]>([])  // Array of matches (RegExpMatchArray)
  const [replacementText, setReplacementText] = useState<string>('')  // Replacement text
  const [replacedText, setReplacedText] = useState<string>('')  // Resulting replaced text
  const [error, setError] = useState<string>('')  // Error message
  const [history, setHistory] = useState<string[]>([])  // History of regex inputs
  const [historyIndex, setHistoryIndex] = useState<number>(-1)  // Current index in history
  const [savedPatterns, setSavedPatterns] = useState<SavedPattern[]>([])  // Saved patterns

  const flagsString: string = Object.entries(flags).filter(([, value]) => value).map(([key]) => key).join('')

  // Update regex and manage history
  const updateRegex = useCallback((newRegex: string) => {
    setRegex(newRegex)
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newRegex])
    setHistoryIndex(prev => prev + 1)
  }, [historyIndex])

  // Undo functionality
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1)
      setRegex(history[historyIndex - 1])
    }
  }

  // Redo functionality
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1)
      setRegex(history[historyIndex + 1])
    }
  }

  // Save current pattern
  const savePattern = () => {
    setSavedPatterns(prev => [...prev, { regex, flags: flagsString }])
  }

  // Load saved pattern
  const loadPattern = (pattern: SavedPattern) => {
    setRegex(pattern.regex)
    setFlags(() => {
      const newFlags: { g: boolean; i: boolean; m: boolean; s: boolean } = Object.fromEntries(
        pattern.flags.split('').map(flag => [flag, true])
      ) as { g: boolean; i: boolean; m: boolean; s: boolean }; // Ensuring the return matches expected shape
      return newFlags;
    }); }

  // Export configuration as JSON
  const exportConfig = () => {
    const config = JSON.stringify({ regex, flags, text, replacementText })
    const blob = new Blob([config], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'regex-config.json'
    a.click()
  }

  // Update matches and replaced text based on regex
  useEffect(() => {
    try {
      if (regex) {
        const regexObj = new RegExp(regex, flagsString)
        const newMatches = [...text.matchAll(regexObj)]
        setMatches(newMatches)
        setError('')

        if (replacementText) {
          setReplacedText(text.replace(regexObj, replacementText))
        } else {
          setReplacedText('')
        }
      } else {
        setMatches([])
        setReplacedText('')
      }
    } catch(err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setMatches([]);
      setReplacedText('');
    }
  }, [regex, text, flags, replacementText])

  // Highlight matches in the text
  const highlightMatches = () => {
    if (!regex || matches.length === 0) return text

    let lastIndex = 0
    const parts: JSX.Element[] = []

    matches.forEach((match, index) => {
      const [fullMatch] = match
      const matchIndex = match.index
    
      // Validate matchIndex to ensure it's a number
      if (typeof matchIndex === 'number' && !isNaN(matchIndex)) {
        // Only proceed if matchIndex is a valid number
        if (matchIndex > lastIndex) {
          parts.push(<span key={`text-${index}`}>{text.slice(lastIndex, matchIndex)}</span>)
        }
    
        parts.push(
          <span key={`match-${index}`} className="bg-yellow-200 dark:bg-yellow-800">
            {fullMatch}
          </span>
        )
    
        // Update lastIndex to the position after the current match
        lastIndex = matchIndex + fullMatch.length
      } else {
        // If matchIndex is not valid, use lastIndex and continue
        parts.push(
          <span key={`match-${index}`} className="bg-yellow-200 dark:bg-yellow-800">
            {fullMatch}
          </span>
        )
    
        // Update lastIndex with the length of the current match, as matchIndex is invalid
        lastIndex += fullMatch.length
      }
    })
    if (lastIndex < text.length) {
      parts.push(<span key="text-end">{text.slice(lastIndex)}</span>)
    }

    return parts
  }

  // Determine regex complexity
  const complexityIndicator = () => {
    const complexity = regex.length + Object.values(flags).filter(Boolean).length
    if (complexity < 5) return 'Easy'
    if (complexity < 10) return 'Moderate'
    if (complexity < 20) return 'Complex'
    return 'Very Complex'
  }

  return (
    <div className="container mx-auto space-y-6">
       <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            type="text"
            value={regex}
            onChange={(e) => updateRegex(e.target.value)}
            placeholder="Enter regex pattern"
            className="flex-grow"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={undo} disabled={historyIndex <= 0}><Undo className="w-4 h-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={redo} disabled={historyIndex >= history.length - 1}><Redo className="w-4 h-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={savePattern}><Save className="w-4 h-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>Save Pattern</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={exportConfig}><Download className="w-4 h-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>Export Configuration</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-wrap gap-4">
          {Object.entries(flags).map(([flag, value]) => (
            <div key={flag} className="flex items-center space-x-2">
              <Switch
                id={`flag-${flag}`}
                checked={value}
                onCheckedChange={(checked) => setFlags(prev => ({ ...prev, [flag]: checked }))}
              />
              <Label htmlFor={`flag-${flag}`}>{flag}</Label>
            </div>
          ))}
        </div>

        {error && (
          <div className="text-red-500 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}

        <div className="flex items-center space-x-2">
          <span className="font-semibold">Complexity:</span>
          <span>{complexityIndicator()}</span>
        </div>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to test"
          rows={5}
        />

        <div className="border p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Matches</h2>
          <ScrollArea className="h-40">
            <div>{highlightMatches()}</div>
          </ScrollArea>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Match Information</h2>
          <p>Total Matches: {matches.length}</p>
          {matches.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Match</TableHead>
                  <TableHead>Index</TableHead>
                  <TableHead>Groups</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matches.map((match, index) => (
                  <TableRow key={index}>
                    <TableCell>{match[0]}</TableCell>
                    <TableCell>{match.index}</TableCell>
                    <TableCell>
                      {match.slice(1).map((group, groupIndex) => (
                        <div key={groupIndex}>Group {groupIndex + 1}: {group}</div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Replace</h2>
          <Input
            type="text"
            value={replacementText}
            onChange={(e) => setReplacementText(e.target.value)}
            placeholder="Enter replacement text"
          />
          {replacedText && (
            <div className="mt-2">
              <h3 className="font-semibold">Result:</h3>
              <p>{replacedText}</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Saved Patterns</h2>
          <ScrollArea className="h-40">
            {savedPatterns.map((pattern, index) => (
              <Button key={index} onClick={() => loadPattern(pattern)} className="mr-2 mb-2">
                {pattern.regex} ({pattern.flags})
              </Button>
            ))}
          </ScrollArea>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Regex Cheatsheet</h2>
          <ScrollArea className="h-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pattern</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>.</TableCell>
                  <TableCell>Any character except newline</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>\w</TableCell>
                  <TableCell>Word character [a-zA-Z0-9_]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>\d</TableCell>
                  <TableCell>Digit [0-9]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>\s</TableCell>
                  <TableCell>Whitespace character</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>[abc]</TableCell>
                  <TableCell>Any of a, b, or c</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>[^abc]</TableCell>
                  <TableCell>Not a, b, or c</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>^</TableCell>
                  <TableCell>Start of string</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>$</TableCell>
                  <TableCell>End of string</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>*</TableCell>
                  <TableCell>0 or more</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>+</TableCell>
                  <TableCell>1 or more</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>?</TableCell>
                  <TableCell>0 or 1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{'{n}'}</TableCell>
                  <TableCell>Exactly n times</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{'{n,}'}</TableCell>
                  <TableCell>n or more times</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{'{n,m}'}</TableCell>
                  <TableCell>Between n and m times</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}