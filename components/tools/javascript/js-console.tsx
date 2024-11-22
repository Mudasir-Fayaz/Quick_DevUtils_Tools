'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Play, Trash2, Info, AlertCircle, AlertTriangle, MessageCircle, Bug, CheckCircle, Clock, FolderOpen, Table, List, Hash, Layers } from 'lucide-react'

type ConsoleOutput = {
  type: 'log' | 'error' | 'warn' | 'info' | 'debug' | 'assert' | 'time' | 'timeEnd' | 'timeLog' | 'group' | 'groupCollapsed' | 'groupEnd' | 'table' | 'trace' | 'count' | 'countReset' | 'dir' | 'dirxml' | 'clear' | 'custom'
  content: any
  lineNumber: number
  label?: string
  style?: string
}

const ObjectViewer = ({ data }: { data: any }) => {
  const [expanded, setExpanded] = useState(false)

  if (typeof data !== 'object' || data === null) {
    return <span>{String(data)}</span>
  }

  return (
    <div className="pl-4">
      <span
        className="cursor-pointer inline-flex items-center"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <Layers className="w-4 h-4 mr-1" /> : <Layers className="w-4 h-4 mr-1" />}
        {Array.isArray(data) ? 'Array' : 'Object'}
      </span>
      {expanded && (
        <div className="pl-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <span className="font-semibold">{key}: </span>
              <ObjectViewer data={value} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const ConsoleItem = ({ item }: { item: ConsoleOutput }) => {
  const getTypeIcon = (type: ConsoleOutput['type']) => {
    switch (type) {
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'warn': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'info': return <Info className="w-4 h-4 text-blue-500" />
      case 'debug': return <Bug className="w-4 h-4 text-purple-500" />
      case 'assert': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'time': case 'timeEnd': case 'timeLog': return <Clock className="w-4 h-4 text-cyan-500" />
      case 'group': case 'groupCollapsed': case 'groupEnd': return <FolderOpen className="w-4 h-4 text-orange-500" />
      case 'table': return <Table className="w-4 h-4 text-indigo-500" />
      case 'trace': return <List className="w-4 h-4 text-gray-500" />
      case 'count': case 'countReset': return <Hash className="w-4 h-4 text-pink-500" />
      default: return <MessageCircle className="w-4 h-4" />
    }
  }

  const renderContent = () => {
    switch (item.type) {
      case 'table':
        return (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {Object.keys(item.content[0]).map((key) => (
                  <th key={key} className="border border-gray-300 p-1">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.content.map((row: any, index: number) => (
                <tr key={index}>
                  {Object.values(row).map((value: any, cellIndex: number) => (
                    <td key={cellIndex} className="border border-gray-300 p-1">{String(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )
      case 'group':
      case 'groupCollapsed':
        return (
          <details open={item.type === 'group'}>
            <summary className="cursor-pointer">{item.label}</summary>
            <div className="pl-4">
              {item.content.map((content: any, i: number) => (
                <ObjectViewer key={i} data={content} />
              ))}
            </div>
          </details>
        )
      case 'custom':
        return <span style={JSON.parse(item.style || '{}')}>{item.content}</span>
      default:
        return item.content.map((content: any, i: number) => (
          <ObjectViewer key={i} data={content} />
        ))
    }
  }

  return (
    <div className="mb-1 p-1 rounded flex items-start">
      <div className="mr-2 mt-1">{getTypeIcon(item.type)}</div>
      <div className="flex-grow">
        <div className="flex items-center">
          <span className="font-bold mr-2">[{item.type.toUpperCase()}]</span>
          <span className="text-xs text-gray-500 mr-2">Line {item.lineNumber}</span>
        </div>
        <div className="mt-1">{renderContent()}</div>
      </div>
    </div>
  )
}

const ConsoleGuide = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="icon">
        <Info className="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Console Guide</DialogTitle>
        <DialogDescription>
          <ScrollArea className="h-[400px] pr-4">
            <ul className="list-disc pl-5 space-y-2">
              <li><code>console.log(message)</code> - Output general messages</li>
              <li><code>console.error(message)</code> - Output error messages</li>
              <li><code>console.warn(message)</code> - Output warning messages</li>
              <li><code>console.info(message)</code> - Output informational messages</li>
              <li><code>console.debug(message)</code> - Output debugging messages</li>
              <li><code>console.assert(condition, message)</code> - Log a message if the condition is false</li>
              <li><code>console.time(label)</code> - Start a timer</li>
              <li><code>console.timeEnd(label)</code> - End a timer and log the elapsed time</li>
              <li><code>console.timeLog(label)</code> - Log the current value of a timer</li>
              <li><code>console.group(label)</code> - Create a new logging group</li>
              <li><code>console.groupCollapsed(label)</code> - Create a new collapsed logging group</li>
              <li><code>console.groupEnd()</code> - Exit the current logging group</li>
              <li><code>console.table(data)</code> - Display tabular data as a table</li>
              <li><code>console.trace()</code> - Output a stack trace</li>
              <li><code>console.count(label)</code> - Log the number of times this line has been called</li>
              <li><code>console.countReset(label)</code> - Reset the counter for the specified label</li>
              <li><code>console.dir(object)</code> - Display an interactive list of object properties</li>
              <li><code>console.dirxml(object)</code> - Display an XML representation of the object</li>
              <li><code>console.clear()</code> - Clear the console</li>
              <li><code>console.log(&apos;%cStyled text&apos;, &apos;CSS styles&apos;)</code> - Output styled console messages</li>
            </ul>
          </ScrollArea>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
)

export default function JSConsole() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState<ConsoleOutput[]>([])
  const consoleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [output])

  const runCode = () => {
    const newOutput: ConsoleOutput[] = []
    const originalConsole = { ...console }

    const getLineNumber = () => {
      const e = new Error()
      const regex = /\<anonymous\>:(\d+):\d+/
      const match = regex.exec(e.stack || '')
      return match ? parseInt(match[1]) - 5 : 0 // Subtracting 5 to account for the wrapper function
    }

    const customConsole = {
      log: (...args: any[]) => newOutput.push({ type: 'log', content: args, lineNumber: getLineNumber() }),
      error: (...args: any[]) => newOutput.push({ type: 'error', content: args, lineNumber: getLineNumber() }),
      warn: (...args: any[]) => newOutput.push({ type: 'warn', content: args, lineNumber: getLineNumber() }),
      info: (...args: any[]) => newOutput.push({ type: 'info', content: args, lineNumber: getLineNumber() }),
      debug: (...args: any[]) => newOutput.push({ type: 'debug', content: args, lineNumber: getLineNumber() }),
      assert: (condition: boolean, ...args: any[]) => {
        if (!condition) {
          newOutput.push({ type: 'assert', content: ['Assertion failed:', ...args], lineNumber: getLineNumber() })
        }
      },
      time: (label = 'default') => {
        newOutput.push({ type: 'time', content: [`Timer '${label}' started`], lineNumber: getLineNumber(), label })
      },
      timeEnd: (label = 'default') => {
        newOutput.push({ type: 'timeEnd', content: [`Timer '${label}' ended`], lineNumber: getLineNumber(), label })
      },
      timeLog: (label = 'default') => {
        newOutput.push({ type: 'timeLog', content: [`Timer '${label}' logged`], lineNumber: getLineNumber(), label })
      },
      group: (...args: any[]) => newOutput.push({ type: 'group', content: args, lineNumber: getLineNumber(), label: args[0] }),
      groupCollapsed: (...args: any[]) => newOutput.push({ type: 'groupCollapsed', content: args, lineNumber: getLineNumber(), label: args[0] }),
      groupEnd: () => newOutput.push({ type: 'groupEnd', content: [], lineNumber: getLineNumber() }),
      table: (data: any) => newOutput.push({ type: 'table', content: data, lineNumber: getLineNumber() }),
      trace: () => {
        const stack = new Error().stack
        newOutput.push({ type: 'trace', content: [stack], lineNumber: getLineNumber() })
      },
      count: (label = 'default') => {
        newOutput.push({ type: 'count', content: [`${label}: count`], lineNumber: getLineNumber(), label })
      },
      countReset: (label = 'default') => {
        newOutput.push({ type: 'countReset', content: [`${label}: count reset`], lineNumber: getLineNumber(), label })
      },
      dir: (obj: any) => newOutput.push({ type: 'dir', content: [obj], lineNumber: getLineNumber() }),
      dirxml: (obj: any) => newOutput.push({ type: 'dirxml', content: [obj], lineNumber: getLineNumber() }),
      clear: () => {
        newOutput.length = 0
        newOutput.push({ type: 'clear', content: ['Console was cleared'], lineNumber: getLineNumber() })
      },
    }

    const proxyHandler = {
      get(target: any, prop: string, receiver: any) {
        if (prop === 'log' && receiver?.toString().includes('%c')) {
          return function (...args: any[]) {
            const style = args[1];
            newOutput.push({
              type: 'custom',
              content: args[0],
              lineNumber: getLineNumber(),
              style,
            });
          };
        }
        return target[prop];
      },
    };

    const proxiedConsole = new Proxy(customConsole, proxyHandler)

    try {
      // eslint-disable-next-line no-new-func
      const wrappedCode = `
        return (function() {
          ${Object.keys(customConsole).map(method => `console.${method} = proxiedConsole.${method};`).join('\n')}
          ${code}
        })();
      `
      new Function('proxiedConsole', wrappedCode)(proxiedConsole)
    } catch (error) {
      newOutput.push({ type: 'error', content: [error], lineNumber: getLineNumber() })
    } finally {
      Object.assign(console, originalConsole)
    }

    setOutput(prevOutput => [...prevOutput, ...newOutput])
  }

  const clearConsole = () => {
    setOutput([])
  }

  return (
    <TooltipProvider>
      <div className=" mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <ConsoleGuide />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-2">Code Input</h2>
            <div className="relative h-64 border rounded border-gray-300">
              <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center py-2 bg-gray-100 text-gray-600 overflow-hidden">
                {Array.from({ length: Math.max(code.split('\n').length, 1) }, (_, i) => (
                  <div key={i} className="text-xs">{i + 1}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-2 pl-10 font-mono text-sm resize-none bg-white text-black"
                placeholder="Enter your JavaScript code here..."
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-2">Console Output</h2>
            <ScrollArea className="h-64 border rounded p-2 font-mono text-sm bg-white border-gray-300" ref={consoleRef}>
              {output.map((item, index) => (
                <ConsoleItem key={index} item={item} />
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={runCode}>
                  <Play className="w-4 h-4 mr-2" />
                  Run Code
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Execute the JavaScript code</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={clearConsole} className="ml-2">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Console
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear all console output</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}