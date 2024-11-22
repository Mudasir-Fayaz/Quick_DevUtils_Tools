'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDown, ChevronRight, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Textarea } from '@/components/ui/textarea'

export default function JsonDiff() {
  const [leftJSON, setLeftJSON] = useState('')
  const [rightJSON, setRightJSON] = useState('')
  const [diffResult, setDiffResult] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'tree' | 'raw'>('tree')
  const [ignoreOptions, setIgnoreOptions] = useState({
    whitespace: false,
    case: false,
    dataType: false,
  })
  const [filterType, setFilterType] = useState<'all' | 'added' | 'removed' | 'changed' | string>('all')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [sortKeys, setSortKeys] = useState(false)

  const compareJSON = useCallback(() => {
    try {
      const left = JSON.parse(leftJSON)
      const right = JSON.parse(rightJSON)
      const result = diffObjects(left, right, ignoreOptions)
      setDiffResult(result)
    } catch (error) {
      console.error('Error parsing JSON:', error)
      setDiffResult({ error: 'Invalid JSON' })
    }
  }, [leftJSON, rightJSON, ignoreOptions])

  useEffect(() => {
    compareJSON()
  }, [compareJSON])

  const diffObjects = (obj1: any, obj2: any, options: any, path: string = ''): any => {
    const result: any = {}

    const keys1 = sortKeys ? Object.keys(obj1).sort() : Object.keys(obj1)
    const keys2 = sortKeys ? Object.keys(obj2).sort() : Object.keys(obj2)

    for (const key of new Set([...keys1, ...keys2])) {
      const currentPath = path ? `${path}.${key}` : key
      if (!(key in obj1)) {
        result[key] = { type: 'added', value: obj2[key] }
      } else if (!(key in obj2)) {
        result[key] = { type: 'removed', value: obj1[key] }
      } else if (typeof obj1[key] !== typeof obj2[key] && !options.dataType) {
        result[key] = { type: 'changed', oldValue: obj1[key], newValue: obj2[key] }
      } else if (typeof obj1[key] === 'object' && obj1[key] !== null && obj2[key] !== null) {
        const nestedDiff = diffObjects(obj1[key], obj2[key], options, currentPath)
        if (Object.keys(nestedDiff).length > 0) {
          result[key] = nestedDiff
        }
      } else if (obj1[key] !== obj2[key]) {
        if (options.whitespace && typeof obj1[key] === 'string' && typeof obj2[key] === 'string') {
          if (obj1[key].trim() !== obj2[key].trim()) {
            result[key] = { type: 'changed', oldValue: obj1[key], newValue: obj2[key] }
          }
        } else if (options.case && typeof obj1[key] === 'string' && typeof obj2[key] === 'string') {
          if (obj1[key].toLowerCase() !== obj2[key].toLowerCase()) {
            result[key] = { type: 'changed', oldValue: obj1[key], newValue: obj2[key] }
          }
        } else {
          result[key] = { type: 'changed', oldValue: obj1[key], newValue: obj2[key] }
        }
      }
    }

    return result
  }

  const toggleNode = (path: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(path)) {
        newSet.delete(path)
      } else {
        newSet.add(path)
      }
      return newSet
    })
  }

  const renderTreeView = (diff: any, path: string = '') => {
    return Object.entries(diff).map(([key, value]: [string, any]) => {
      const currentPath = path ? `${path}.${key}` : key
      const isExpanded = expandedNodes.has(currentPath)

      if (typeof value === 'object' && value !== null && !('type' in value)) {
        return (
          <div key={currentPath} className="ml-4">
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => toggleNode(currentPath)}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span className="font-semibold">{key}</span>
            </div>
            {isExpanded && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderTreeView(value, currentPath)}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        )
      } else {
        const diffType = (value as any).type
        if (filterType !== 'all' && filterType !== diffType) return null

        return (
          <div key={currentPath} className="ml-4">
            <span className={`font-semibold ${getDiffTypeColor(diffType)}`}>{key}: </span>
            {diffType === 'changed' ? (
              <>
                <span className="line-through text-red-500">{JSON.stringify((value as any).oldValue)}</span>
                <span className="text-green-500"> → {JSON.stringify((value as any).newValue)}</span>
              </>
            ) : (
              <span className={getDiffTypeColor(diffType)}>{JSON.stringify((value as any).value)}</span>
            )}
          </div>
        )
      }
    })
  }

  const renderRawView = (json: string) => {
    return (
      <pre className="whitespace-pre-wrap break-words">
        {json}
      </pre>
    )
  }

  const getDiffTypeColor = (type: string) => {
    switch (type) {
      case 'added': return 'text-green-500'
      case 'removed': return 'text-red-500'
      case 'changed': return 'text-yellow-500'
      default: return ''
    }
  }

  const getDiffSummary = () => {
    let added = 0, removed = 0, changed = 0

    const countDiffs = (obj: any) => {
      Object.values(obj).forEach((value: any) => {
        if (value.type === 'added') added++
        else if (value.type === 'removed') removed++
        else if (value.type === 'changed') changed++
        else if (typeof value === 'object' && value !== null) countDiffs(value)
      })
    }

    countDiffs(diffResult)
    return { added, removed, changed }
  }

  const exportDiff = () => {
    const element = document.createElement("a")
    const file = new Blob([JSON.stringify(diffResult, null, 2)], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "json_diff_result.json"
    document.body.appendChild(element)
    element.click()
  }

  return (
    <div className="container mx-auto">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="leftJSON">Left JSON</Label>
          <Textarea
            id="leftJSON"
            value={leftJSON}
            onChange={(e) => setLeftJSON(e.target.value)}
            className="w-full h-64 p-4 text-lg"
            placeholder="Paste your JSON here"
          />
        </div>
        <div>
          <Label htmlFor="rightJSON">Right JSON</Label>
          <Textarea
            id="rightJSON"
            value={rightJSON}
            onChange={(e) => setRightJSON(e.target.value)}
            className="w-full h-64 p-4 text-lg"
            placeholder="Paste your JSON here"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="ignoreWhitespace"
            checked={ignoreOptions.whitespace}
            onCheckedChange={(checked) => setIgnoreOptions(prev => ({ ...prev, whitespace: checked }))}
          />
          <Label htmlFor="ignoreWhitespace">Ignore Whitespace</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="ignoreCase"
            checked={ignoreOptions.case}
            onCheckedChange={(checked) => setIgnoreOptions(prev => ({ ...prev, case: checked }))}
          />
          <Label htmlFor="ignoreCase">Ignore Case</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="ignoreDataType"
            checked={ignoreOptions.dataType}
            onCheckedChange={(checked) => setIgnoreOptions(prev => ({ ...prev, dataType: checked }))}
          />
          <Label htmlFor="ignoreDataType">Ignore Data Type</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="sortKeys"
            checked={sortKeys}
            onCheckedChange={setSortKeys}
          />
          <Label htmlFor="sortKeys">Sort Keys</Label>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <Select value={filterType} onValueChange={(v:string)=> setFilterType(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter changes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Changes</SelectItem>
            <SelectItem value="added">Added</SelectItem>
            <SelectItem value="removed">Removed</SelectItem>
            <SelectItem value="changed">Changed</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setExpandedNodes(new Set())}>Collapse All</Button>
        <Button onClick={() => setExpandedNodes(new Set(getAllPaths(diffResult)))}>Expand All</Button>
        <Button onClick={exportDiff}>
          <Download className="mr-2 h-4 w-4" /> Export Diff
        </Button>
      </div>
      {diffResult && (
        <>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Diff Summary</h2>
            <div className="flex gap-4">
              <span className="text-green-500">Added: {getDiffSummary().added}</span>
              <span className="text-red-500">Removed: {getDiffSummary().removed}</span>
              <span className="text-yellow-500">Changed: {getDiffSummary().changed}</span>
            </div>
          </div>
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'tree' | 'raw')}>
            <TabsList>
              <TabsTrigger value="tree">Tree View</TabsTrigger>
              <TabsTrigger value="raw">Raw View</TabsTrigger>
            </TabsList>
            <TabsContent value="tree">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {renderTreeView(diffResult)}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="raw">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {renderRawView(JSON.stringify(diffResult, null, 2))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

function getAllPaths(obj: any, path: string = ''): string[] {
  let paths: string[] = []
  for (const key in obj) {
    const currentPath = path ? `${path}.${key}` : key
    paths.push(currentPath)
    if (typeof obj[key] === 'object' && obj[key] !== null && !('type' in obj[key])) {
      paths = paths.concat(getAllPaths(obj[key], currentPath))
    }
  }
  return paths
}