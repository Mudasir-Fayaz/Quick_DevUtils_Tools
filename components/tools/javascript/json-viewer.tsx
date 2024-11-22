'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, ChevronDown, Copy, Download, Upload, Undo, Redo, Search, Bookmark, Edit, Check, X, Play } from 'lucide-react'

const DataTypeColors: Record<string, string> = {
  string: 'text-blue-500',
  number: 'text-green-500',
  boolean: 'text-yellow-500',
  object: 'text-red-500',
  array: 'text-purple-500',
  null: 'text-gray-500',
}
interface SearchResult {
  path: string
  key: string
  value: unknown
  type: string
}

type History = string[]

export default function JSONViewer() {
  const [jsonInput, setJsonInput] = useState<string>('')
  const [parsedJson, setParsedJson] = useState<Record<string, unknown> | null>(null)
  const [error, setError] = useState<string>('')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editedJson, setEditedJson] = useState<string>('')
  const [history, setHistory] = useState<History>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [bookmarkedKeys, setBookmarkedKeys] = useState<Set<string>>(new Set())
  const selectedPath:string[] = [];

  const parseJSON = useCallback((input: string): unknown | null => {
    try {
      const parsed = JSON.parse(input)
      setParsedJson(parsed)
      setError('')
      return parsed
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message)
      return null
    }
  }, [])

  const updateJsonInput = (newInput: string) => {
    setJsonInput(newInput)
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), newInput])
    setHistoryIndex((prev) => prev + 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1)
      setJsonInput(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1)
      setJsonInput(history[historyIndex + 1])
    }
  }

  const toggleNode = (path: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(path)) {
        newSet.delete(path)
      } else {
        newSet.add(path)
      }
      return newSet
    })
  }

  const toggleBookmark = (path: string) => {
    setBookmarkedKeys((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(path)) {
        newSet.delete(path)
      } else {
        newSet.add(path)
      }
      return newSet
    })
  }

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path)
  }

  const copyValue = (value: unknown) => {
    navigator.clipboard.writeText(JSON.stringify(value))
  }

  const downloadJson = () => {
    const blob = new Blob([jsonInput], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.json'
    a.click()
  }

  const importFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      updateJsonInput(text)
    } catch (err) {
      setError('Failed to read from clipboard: ' + (err as Error).message)
    }
  }

  const searchJson = useCallback((obj: unknown, term: string, path = ''): SearchResult[] => {
    const results: SearchResult[] = []
    
    if (typeof obj !== 'object' || obj === null) {
      return results
    }

    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key
      const valueType = Array.isArray(value) ? 'array' : typeof value
      
      if (key.toLowerCase().includes(term.toLowerCase()) || 
          (typeof value === 'string' && value.toLowerCase().includes(term.toLowerCase()))) {
        results.push({
          path: currentPath,
          key,
          value,
          type: valueType
        })
      }

      if (typeof value === 'object' && value !== null) {
        results.push(...searchJson(value, term, currentPath))
      }
    })

    return results
  }, [])

  useEffect(() => {
    if (searchTerm && parsedJson) {
      const results = searchJson(parsedJson, searchTerm)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchTerm, parsedJson, searchJson])

  const renderNode = (key: string, value: unknown, path: string, depth: number = 0): JSX.Element => {
    const fullPath = path ? `${path}.${key}` : key
    const isExpanded = expandedNodes.has(fullPath)
    const isBookmarked = bookmarkedKeys.has(fullPath)
    const dataType = Array.isArray(value) ? 'array' : typeof value
    const isObject = dataType === 'object' && value !== null
    const hasChildren = isObject && Object.keys(value as object).length > 0
    const matchesSearch = searchTerm && (key.toLowerCase().includes(searchTerm.toLowerCase()) || JSON.stringify(value).toLowerCase().includes(searchTerm.toLowerCase()))

    return (
      <div key={fullPath} className={`ml-${depth * 4} ${matchesSearch ? 'bg-yellow-100 dark:bg-yellow-900' : ''}`}>
        <div className="flex items-center">
          {hasChildren && (
            <button onClick={() => toggleNode(fullPath)} className="mr-1">
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
          <span className="font-bold">{key}: </span>
          <span className={DataTypeColors[dataType] || 'text-gray-500'}>{isObject ? (Array.isArray(value) ? '[]' : '{}') : JSON.stringify(value)}</span>
          <span className="ml-2 text-gray-500">({dataType})</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => copyPath(fullPath)}><Copy className="w-4 h-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>Copy Path</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => copyValue(value)}><Copy className="w-4 h-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>Copy Value</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => toggleBookmark(fullPath)}>
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isBookmarked ? 'Remove Bookmark' : 'Bookmark'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {isExpanded && hasChildren && (
          <div>
            {Object.entries(value as Record<string, unknown>).map(([childKey, childValue]) =>
      renderNode(childKey, childValue, fullPath, depth + 1)
    )}
          </div>
        )}
      </div>
    )
  }

  const renderTree = (data: Record<string, unknown>): JSX.Element[] => {
    return Object.entries(data).map(([key, value]) => renderNode(key, value, ''))
  }

  const handleEdit = () => {
    if (editMode) {
      const parsed = parseJSON(editedJson)
      if (parsed) {
        updateJsonInput(editedJson)
        setEditMode(false)
      }
    } else {
      setEditedJson(jsonInput)
      setEditMode(true)
    }
  }


  return (
    <div className="container mx-auto space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
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
                <Button onClick={downloadJson}><Download className="w-4 h-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>Download JSON</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={importFromClipboard}><Upload className="w-4 h-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>Import from Clipboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleEdit}>
                  {editMode ? <Check className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{editMode ? 'Save' : 'Edit'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => setExpandedNodes(new Set())}><ChevronRight className="w-4 h-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>Collapse All</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => setExpandedNodes(new Set(Object.keys(parsedJson || {})))}><ChevronDown className="w-4 h-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>Expand All</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Tabs defaultValue="input" className="w-full">
          <TabsList>
            <TabsTrigger value="input">JSON Input</TabsTrigger>
            <TabsTrigger value="viewer">Tree Viewer</TabsTrigger>
          </TabsList>
          <TabsContent value="input">
            <div className="space-y-4">
              <Textarea
                value={jsonInput}
                onChange={(e) => updateJsonInput(e.target.value)}
                placeholder="Enter your JSON here..."
                rows={15}
                className="font-mono"
              />
              <Button onClick={() => parseJSON(jsonInput)}>
                <Play className="w-4 h-4 mr-2" />
                Parse JSON
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="viewer">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search JSON..."
                  className="flex-grow"
                />
              </div>

              {error && (
                <div className="text-red-500 flex items-center">
                  <X className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}

              {selectedPath.length > 0 && (
                <div className="text-sm text-gray-500">
                  Selected: {selectedPath.join(' > ')}
                </div>
              )}

              {searchResults.length > 0 && (
                <ScrollArea className="h-[200px] border rounded-md p-4">
                  <h2 className="text-xl font-semibold mb-2">Search Results</h2>
                  {searchResults.map((result, index) => (
                    <div key={index} className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      <div><strong>Path:</strong> {result.path}</div>
                      <div><strong>Key:</strong> {result.key}</div>
                      <div><strong>Value:</strong> {JSON.stringify(result.value)}</div>
                      <div><strong>Type:</strong> {result.type}</div>
                    </div>
                  ))}
                </ScrollArea>
              )}

              <ScrollArea className="h-[500px] border rounded-md p-4">
                {parsedJson && renderTree(parsedJson)}
              </ScrollArea>

              <div>
                <h2 className="text-xl font-semibold mb-2">Raw JSON</h2>
                <ScrollArea className="h-[200px] border rounded-md">
                  <pre className="p-4">{JSON.stringify(parsedJson, null, 2)}</pre>
                </ScrollArea>
              </div>

              {bookmarkedKeys.size > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Bookmarked Keys</h2>
                  <ul className="list-disc pl-5">
                    {Array.from(bookmarkedKeys).map(key => (
                      <li key={key}>{key}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}