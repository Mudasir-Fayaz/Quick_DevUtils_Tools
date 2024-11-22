'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TextFormatter() {
  type Operation = 
  | 'uppercase' 
  | 'lowercase' 
  | 'titlecase' 
  | 'sentencecase' 
  | 'removeWhitespace' 
  | 'trim' 
  | 'addLineBreaks' 
  | 'removeLineBreaks' 
  | 'alignLeft' 
  | 'alignRight' 
  | 'alignCenter' 
  | 'justify' 
  | 'indent' 
  | 'unindent' 
  | 'addBullets' 
  | 'removeBullets' 
  | 'findReplace' 
  | 'removeDuplicates' 
  | 'sortLines' 
  | 'reverseLines' 
  | 'reverseWords' 
  | 'reverseCharacters' 
  | 'addPrefix' 
  | 'addSuffix' 
  | 'removeStopWords' 
  | 'wrapText' 
  | 'extractEmails' 
  | 'extractURLs' 
  | 'addNumbering' 
  | 'wordWrap' 
  | 'clearFormatting';

interface TextStatistics {
  words: number;
  characters: number;
  sentences: number;
  avgWordLength: number;
  readingTime: number;
}

  
  const [inputText, setInputText] = useState<string>('')
  const [outputText, setOutputText] = useState<string>('')
  const [findText, setFindText] = useState<string>('')
  const [replaceText, setReplaceText] = useState<string>('')
  const [prefix, setPrefix] = useState<string>('')
  const [suffix, setSuffix] = useState<string>('')
  const [wrapChar, setWrapChar] = useState<string>('')
  const [wordWrapWidth, setWordWrapWidth] = useState<number>(80)

  const processText = (operation: Operation): void => {
    let result = inputText
    switch (operation) {
      case 'uppercase':
        result = inputText.toUpperCase()
        break
      case 'lowercase':
        result = inputText.toLowerCase()
        break
      case 'titlecase':
        result = inputText.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
        break
      case 'sentencecase':
        result = inputText.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
        break
      case 'removeWhitespace':
        result = inputText.replace(/\s+/g, ' ').trim()
        break
      case 'trim':
        result = inputText.split('\n').map(line => line.trim()).join('\n')
        break
      case 'addLineBreaks':
        result = inputText.replace(/\./g, '.\n')
        break
      case 'removeLineBreaks':
        result = inputText.replace(/\n/g, ' ')
        break
      case 'alignLeft':
        result = inputText.split('\n').map(line => line.trimLeft()).join('\n')
        break
      case 'alignRight':
        const maxLength = Math.max(...inputText.split('\n').map(line => line.trim().length))
        result = inputText.split('\n').map(line => line.trim().padStart(maxLength)).join('\n')
        break
      case 'alignCenter':
        const maxLen = Math.max(...inputText.split('\n').map(line => line.trim().length))
        result = inputText.split('\n').map(line => line.trim().padStart((maxLen + line.trim().length) / 2).padEnd(maxLen)).join('\n')
        break
      case 'justify':
        result = inputText.split('\n').map(line => {
          const words = line.trim().split(/\s+/)
          if (words.length <= 1) return line
          const spaces = maxLength - words.join('').length
          const padding = ' '.repeat(Math.floor(spaces / (words.length - 1)))
          return words.join(padding)
        }).join('\n')
        break
      case 'indent':
        result = inputText.split('\n').map(line => '    ' + line).join('\n')
        break
      case 'unindent':
        result = inputText.split('\n').map(line => line.replace(/^(\s*)/, '')).join('\n')
        break
      case 'addBullets':
        result = inputText.split('\n').map(line => '• ' + line).join('\n')
        break
      case 'removeBullets':
        result = inputText.split('\n').map(line => line.replace(/^[•\-\*]\s*/, '')).join('\n')
        break
      case 'findReplace':
        result = inputText.replace(new RegExp(findText, 'g'), replaceText)
        break
      case 'removeDuplicates':
        result = [...new Set(inputText.split('\n'))].join('\n')
        break
      case 'sortLines':
        result = inputText.split('\n').sort().join('\n')
        break
      case 'reverseLines':
        result = inputText.split('\n').reverse().join('\n')
        break
      case 'reverseWords':
        result = inputText.split('\n').map(line => line.split(' ').reverse().join(' ')).join('\n')
        break
      case 'reverseCharacters':
        result = inputText.split('').reverse().join('')
        break
      case 'addPrefix':
        result = inputText.split('\n').map(line => prefix + line).join('\n')
        break
      case 'addSuffix':
        result = inputText.split('\n').map(line => line + suffix).join('\n')
        break
      case 'removeStopWords':
        const stopWords = ['a', 'an', 'and', 'the', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by']
        result = inputText.split('\n').map(line => 
          line.split(' ').filter(word => !stopWords.includes(word.toLowerCase())).join(' ')
        ).join('\n')
        break
      case 'wrapText':
        result = inputText.split('').map(char => wrapChar + char + wrapChar).join('')
        break
      case 'extractEmails':
        const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g
        result = (inputText.match(emailRegex) || []).join('\n')
        break
      case 'extractURLs':
        const urlRegex = /(https?:\/\/[^\s]+)/g
        result = (inputText.match(urlRegex) || []).join('\n')
        break
      case 'addNumbering':
        result = inputText.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n')
        break
      case 'wordWrap':
        result = inputText.split('\n').map(line => {
          let wrapped = ''
          let currentLine = ''
          line.split(' ').forEach(word => {
            if ((currentLine + word).length > wordWrapWidth) {
              wrapped += (wrapped ? '\n' : '') + currentLine.trim()
              currentLine = ''
            }
            currentLine += word + ' '
          })
          return wrapped + (wrapped ? '\n' : '') + currentLine.trim()
        }).join('\n')
        break
      case 'clearFormatting':
        result = inputText.replace(/[^a-zA-Z0-9\s]/g, '')
        break
      default:
        break
    }
    setOutputText(result)
  }

  const getTextStatistics = (): TextStatistics => {
    const words = inputText.trim().split(/\s+/).length
    const characters = inputText.length
    const sentences = inputText.split(/[.!?]+\s/).length
    const avgWordLength = characters / words
    const readingTime = Math.ceil(words / 200) // Assuming 200 words per minute reading speed
    return { words, characters, sentences, avgWordLength, readingTime }
  }

  const stats = getTextStatistics()
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="input-text">Input Text</Label>
          <Textarea
            id="input-text"
            placeholder="Enter your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="h-64"
          />
        </div>
        <div>
          <Label htmlFor="output-text">Output Text</Label>
          <Textarea
            id="output-text"
            value={outputText}
            readOnly
            className="h-64"
          />
        </div>
      </div>
      <div className="mt-6">
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 sm:text-sm">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="formatting">Formatting</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <ScrollArea className="h-72 w-full rounded-md border p-4 sm:text-sm">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Button onClick={() => processText('uppercase')}>Uppercase</Button>
                <Button onClick={() => processText('lowercase')}>Lowercase</Button>
                <Button onClick={() => processText('titlecase')}>Title Case</Button>
                <Button onClick={() => processText('sentencecase')}>Sentence Case</Button>
                <Button onClick={() => processText('removeWhitespace')}>Remove Whitespace</Button>
                <Button onClick={() => processText('trim')}>Trim</Button>
                <Button onClick={() => processText('addLineBreaks')}>Add Line Breaks</Button>
                <Button onClick={() => processText('removeLineBreaks')}>Remove Line Breaks</Button>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="advanced">
            <ScrollArea className="h-72 w-full rounded-md border p-4 sm:text-sm">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Button onClick={() => processText('removeDuplicates')}>Remove Duplicates</Button>
                <Button onClick={() => processText('sortLines')}>Sort Lines</Button>
                <Button onClick={() => processText('reverseLines')}>Reverse Lines</Button>
                <Button onClick={() => processText('reverseWords')}>Reverse Words</Button>
                <Button onClick={() => processText('reverseCharacters')}>Reverse Characters</Button>
                <Button onClick={() => processText('removeStopWords')}>Remove Stop Words</Button>
                <Button onClick={() => processText('extractEmails')}>Extract Emails</Button>
                <Button onClick={() => processText('extractURLs')}>Extract URLs</Button>
                <div className="col-span-2">
                  <Input
                    placeholder="Find text"
                    value={findText}
                    onChange={(e) => setFindText(e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    placeholder="Replace with"
                    value={replaceText}
                    onChange={(e) => setReplaceText(e.target.value)}
                    className="mb-2"
                  />
                  <Button onClick={() => processText('findReplace')} className="w-full">Find and Replace</Button>
                </div>
                <div className="col-span-2">
                  <Input
                    placeholder="Prefix"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    placeholder="Suffix"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                    className="mb-2"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => processText('addPrefix')}>Add Prefix</Button>
                    <Button onClick={() => processText('addSuffix')}>Add Suffix</Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="formatting">
            <ScrollArea className="h-72 w-full rounded-md border p-4 sm:text-sm">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Button onClick={() => processText('alignLeft')}>Align Left</Button>
                <Button onClick={() => processText('alignRight')}>Align Right</Button>
                <Button onClick={() => processText('alignCenter')}>Align Center</Button>
                <Button onClick={() => processText('justify')}>Justify</Button>
                <Button onClick={() => processText('indent')}>Indent</Button>
                <Button onClick={() => processText('unindent')}>Unindent</Button>
                <Button onClick={() => processText('addBullets')}>Add Bullets</Button>
                <Button onClick={() => processText('removeBullets')}>Remove Bullets</Button>
                <Button onClick={() => processText('addNumbering')}>Add Numbering</Button>
                <div className="col-span-2">
                  <Input
                    placeholder="Wrap character"
                    value={wrapChar}
                    onChange={(e) => setWrapChar(e.target.value)}
                    className="mb-2"
                  />
                  <Button onClick={() => processText('wrapText')} className="w-full">Wrap Text</Button>
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="Word wrap width"
                    value={wordWrapWidth}
                    onChange={(e) => setWordWrapWidth(parseInt(e.target.value))}
                    className="mb-2"
                  />
                  <Button onClick={() => processText('wordWrap')} className="w-full">Word Wrap</Button>
                </div>
                <Button onClick={() => processText('clearFormatting')}>Clear Formatting</Button>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="statistics">
            <ScrollArea className="h-72 w-full rounded-md border p-4">
              <div className="space-y-4">
                <p><strong>Words:</strong> {stats.words}</p>
                <p><strong>Characters:</strong> {stats.characters}</p>
                <p><strong>Sentences:</strong> {stats.sentences}</p>
                <p><strong>Average Word Length:</strong> {stats.avgWordLength.toFixed(2)} characters</p>
                <p><strong>Estimated Reading Time:</strong> {stats.readingTime} minute(s)</p>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}