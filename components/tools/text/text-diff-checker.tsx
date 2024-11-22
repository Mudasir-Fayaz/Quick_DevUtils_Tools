"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Download, FileUp, Redo2, Undo2, AlignJustify, AlignLeft, CaseSensitive, Languages, Type, File } from 'lucide-react'

type DiffOptions = {
  ignoreCase: boolean
  ignorePunctuation: boolean
  ignoreWhitespace: boolean
}

type HistoryEntry = {
  text1: string
  text2: string
  options: DiffOptions
}

type DiffLine = {
  type: 'added' | 'removed' | 'unchanged'
  content: string
}

export default function DiffChecker() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [diffResult, setDiffResult] = useState<DiffLine[]>([])
  const [options, setOptions] = useState<DiffOptions>({
    ignoreCase: false,
    ignorePunctuation: false,
    ignoreWhitespace: false
  })
  const [view, setView] = useState<'split' | 'unified'>('split')
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [keywordDensity, setKeywordDensity] = useState<Record<string, number>>({})
  const [readabilityScore, setReadabilityScore] = useState(0)
  const [similarityScore, setSimilarityScore] = useState(0)

  const computeDiff = (oldText: string, newText: string): DiffLine[] => {
    const oldLines = oldText.split('\n')
    const newLines = newText.split('\n')
    const diff: DiffLine[] = []
    let i = 0, j = 0

    while (i < oldLines.length || j < newLines.length) {
      if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
        diff.push({ type: 'unchanged', content: oldLines[i] })
        i++
        j++
      } else if (j < newLines.length && (i >= oldLines.length || oldLines[i] !== newLines[j])) {
        diff.push({ type: 'added', content: newLines[j] })
        j++
      } else {
        diff.push({ type: 'removed', content: oldLines[i] })
        i++
      }
    }

    return diff
  }

  const updateDiff = useCallback(() => {
    let processedText1 = text1
    let processedText2 = text2

    if (options.ignoreCase) {
      processedText1 = processedText1.toLowerCase()
      processedText2 = processedText2.toLowerCase()
    }

    if (options.ignorePunctuation) {
      const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
      processedText1 = processedText1.replace(punctuationRegex, '')
      processedText2 = processedText2.replace(punctuationRegex, '')
    }

    if (options.ignoreWhitespace) {
      processedText1 = processedText1.replace(/\s+/g, ' ').trim()
      processedText2 = processedText2.replace(/\s+/g, ' ').trim()
    }

    const diff = computeDiff(processedText1, processedText2)
    setDiffResult(diff)

    // Calculate similarity score
    const similarity = calculateSimilarity(processedText1, processedText2)
    setSimilarityScore(similarity)

    // Calculate keyword density
    setKeywordDensity(calculateKeywordDensity(processedText1 + ' ' + processedText2))

    // Calculate readability score
    setReadabilityScore(calculateReadabilityScore(text1 + ' ' + text2))

  }, [text1, text2, options])

  useEffect(() => {
    updateDiff()
  }, [updateDiff])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, textNumber: 1 | 2) => {
    const newText = e.target.value
    if (textNumber === 1) {
      setText1(newText)
    } else {
      setText2(newText)
    }
    addToHistory()
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, textNumber: 1 | 2) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        if (textNumber === 1) {
          setText1(content)
        } else {
          setText2(content)
        }
        addToHistory()
      }
      reader.readAsText(file)
    }
  }

  const addToHistory = () => {
    const newEntry: HistoryEntry = { text1, text2, options }
    setHistory(prevHistory => [...prevHistory.slice(0, historyIndex + 1), newEntry])
    setHistoryIndex(prevIndex => prevIndex + 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prevIndex => prevIndex - 1)
      const prevEntry = history[historyIndex - 1]
      setText1(prevEntry.text1)
      setText2(prevEntry.text2)
      setOptions(prevEntry.options)
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prevIndex => prevIndex + 1)
      const nextEntry = history[historyIndex + 1]
      setText1(nextEntry.text1)
      setText2(nextEntry.text2)
      setOptions(nextEntry.options)
    }
  }

  const toggleOption = (option: keyof DiffOptions) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [option]: !prevOptions[option]
    }))
    addToHistory()
  }

  const exportPDF = () => {
    // Implement PDF export logic here
    console.log('Exporting to PDF...')
  }

  const downloadTexts = () => {
    const element = document.createElement('a')
    const file = new Blob([`Text 1:\n${text1}\n\nText 2:\n${text2}`], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = 'diff_texts.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1
    const longerLength = longer.length
    if (longerLength === 0) {
      return 1.0
    }
    return (longerLength - editDistance(longer, shorter)) / longerLength
  }

  const editDistance = (str1: string, str2: string): number => {
    const m = str1.length
    const n = str2.length
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0) {
          dp[i][j] = j
        } else if (j === 0) {
          dp[i][j] = i
        } else if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1]
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        }
      }
    }

    return dp[m][n]
  }

  const calculateKeywordDensity = (text: string): Record<string, number> => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || []
    const wordCount = words.length
    const density: Record<string, number> = {}

    words.forEach(word => {
      density[word] = ((density[word] || 0) + 1) / wordCount
    })

    return Object.fromEntries(
      Object.entries(density)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
    )
  }

  const calculateReadabilityScore = (text: string): number => {
    const sentences = text.split(/[.!?]+/).length
    const words = text.match(/\b\w+\b/g)?.length || 0
    const syllables = text.toLowerCase().split(/\b\w+\b/).reduce((count, word) => {
      return count + (word.match(/[aeiou]/g)?.length || 0)
    }, 0)

    if (words === 0 || sentences === 0) return 0

    const averageWordsPerSentence = words / sentences
    const averageSyllablesPerWord = syllables / words

    return 206.835 - 1.015 * averageWordsPerSentence - 84.6 * averageSyllablesPerWord
  }

  return (
    <div className="container mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="text1">Text 1</Label>
          <Textarea
            id="text1"
            value={text1}
            onChange={(e) => handleTextChange(e, 1)}
            placeholder="Enter or paste your first text here"
            className="h-40"
          />
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              onChange={(e) => handleFileUpload(e, 1)}
              className="w-full"
            />
            <Button size="icon">
              <FileUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="text2">Text 2</Label>
          <Textarea
            id="text2"
            value={text2}
            onChange={(e) => handleTextChange(e, 2)}
            placeholder="Enter or paste your second text here"
            className="h-40"
          />
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              onChange={(e) => handleFileUpload(e, 2)}
              className="w-full"
            />
            <Button size="icon">
              <FileUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden p-4">
        {view === 'unified' ? (
          <div>
            {diffResult.map((line, index) => (
              <div
                key={index}
                className={`${
                  line.type === 'added'
                    ? 'bg-green-100 text-green-800'
                    : line.type === 'removed'
                    ? 'bg-red-100 text-red-800'
                    : ''
                }`}
              >
                <span className="mr-2">{line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}</span>
                {line.content}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              {diffResult.map((line, index) => 
                line.type !== 'added' && (
                  <div
                    key={index}
                    className={line.type === 'removed' ? 'bg-red-100 text-red-800' : ''}
                  >
                    <span className="mr-2">{line.type === 'removed' ? '-' : ' '}</span>
                    {line.content}
                  </div>
                )
              )}
            </div>
            <div>
              {diffResult.map((line, index) => 
                line.type !== 'removed' && (
                  <div
                    key={index}
                    className={line.type === 'added' ? 'bg-green-100 text-green-800' : ''}
                  >
                    <span className="mr-2">{line.type === 'added' ? '+' : ' '}</span>
                    {line.content}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={undo} disabled={historyIndex <= 0}>
          <Undo2 className="h-4 w-4 mr-2" />
          Undo
        </Button>
        <Button onClick={redo} disabled={historyIndex >= history.length - 1}>
          <Redo2 className="h-4 w-4 mr-2" />
          Redo
        </Button>
        <Button onClick={() => setView(view === 'split' ? 'unified' : 'split')}>
          {view === 'split' ? <AlignJustify className="h-4 w-4 mr-2" /> : <AlignLeft className="h-4 w-4 mr-2" />}
          {view === 'split' ? 'Unified View' : 'Split View'}
        </Button>
        <Button onClick={exportPDF}>
          <File className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
        <Button onClick={downloadTexts}>
          <Download className="h-4 w-4 mr-2" />
          Download Texts
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex items-center space-x-2">
          <Switch
            id="ignore-case"
            checked={options.ignoreCase}
            onCheckedChange={() => toggleOption('ignoreCase')}
          />
          <Label htmlFor="ignore-case">
            <CaseSensitive className="h-4 w-4 mr-2 inline" />
            Ignore Case
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="ignore-punctuation"
            checked={options.ignorePunctuation}
            onCheckedChange={() => toggleOption('ignorePunctuation')}
          />
          <Label htmlFor="ignore-punctuation">
            <Type className="h-4 w-4 mr-2 inline" />
            Ignore Punctuation
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="ignore-whitespace"
            checked={options.ignoreWhitespace}
            onCheckedChange={() => toggleOption('ignoreWhitespace')}
          />
          <Label htmlFor="ignore-whitespace">
            <Languages className="h-4 w-4 mr-2 inline" />
            Ignore Whitespace
          </Label>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-1">Similarity Score</h3>
            <p className="text-3xl font-bold">{(similarityScore * 100).toFixed(2)}%</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">Readability Score</h3>
            <p className="text-3xl font-bold">{readabilityScore.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">Top Keywords</h3>
            <ul className="text-sm">
              {Object.entries(keywordDensity).slice(0, 5).map(([word, density]) => (
                <li key={word}>{word}: {(density * 100).toFixed(2)}%</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

