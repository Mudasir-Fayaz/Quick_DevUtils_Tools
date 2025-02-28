"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Copy, Download, Plus, Trash2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

type TableStyle = "simple" | "compact" | "grid" | "fancy" | "unicode"
type CellData = string
type TableData = CellData[][]

const tableStyles: Record<
  TableStyle,
  {
    topLeft: string
    topMid: string
    topRight: string
    midLeft: string
    midMid: string
    midRight: string
    bottomLeft: string
    bottomMid: string
    bottomRight: string
    horizontal: string
    vertical: string
    cross: string
  }
> = {
  simple: {
    topLeft: "+",
    topMid: "+",
    topRight: "+",
    midLeft: "+",
    midMid: "+",
    midRight: "+",
    bottomLeft: "+",
    bottomMid: "+",
    bottomRight: "+",
    horizontal: "-",
    vertical: "|",
    cross: "+",
  },
  compact: {
    topLeft: "",
    topMid: "",
    topRight: "",
    midLeft: "",
    midMid: "",
    midRight: "",
    bottomLeft: "",
    bottomMid: "",
    bottomRight: "",
    horizontal: "-",
    vertical: "|",
    cross: "+",
  },
  grid: {
    topLeft: "+",
    topMid: "+",
    topRight: "+",
    midLeft: "+",
    midMid: "+",
    midRight: "+",
    bottomLeft: "+",
    bottomMid: "+",
    bottomRight: "+",
    horizontal: "=",
    vertical: "|",
    cross: "+",
  },
  fancy: {
    topLeft: "╔",
    topMid: "╦",
    topRight: "╗",
    midLeft: "╠",
    midMid: "╬",
    midRight: "╣",
    bottomLeft: "╚",
    bottomMid: "╩",
    bottomRight: "╝",
    horizontal: "═",
    vertical: "║",
    cross: "╬",
  },
  unicode: {
    topLeft: "┌",
    topMid: "┬",
    topRight: "┐",
    midLeft: "├",
    midMid: "┼",
    midRight: "┤",
    bottomLeft: "└",
    bottomMid: "┴",
    bottomRight: "┘",
    horizontal: "─",
    vertical: "│",
    cross: "┼",
  },
}

export default function AsciiTable() {
  const [tableData, setTableData] = useState<TableData>([
    ["", ""],
    ["", ""],
  ])
  const [tableStyle, setTableStyle] = useState<TableStyle>("simple")
  const [asciiTable, setAsciiTable] = useState<string>("")
  const [columnWidths, setColumnWidths] = useState<number[]>([])
  const { toast } = useToast()

  // Calculate column widths and generate ASCII table
  useEffect(() => {
    // Calculate the width of each column
    const widths = tableData[0].map((_, colIndex) => {
      return Math.max(
        ...tableData.map((row) => row[colIndex]?.length || 0),
        3, // Minimum width
      )
    })
    setColumnWidths(widths)

    // Generate the ASCII table
    const style = tableStyles[tableStyle]
    let result = ""

    // Top border
    if (tableStyle !== "compact") {
      result += style.topLeft
      widths.forEach((width, index) => {
        result += style.horizontal.repeat(width + 2)
        result += index < widths.length - 1 ? style.topMid : style.topRight
      })
      result += "\n"
    }

    // Rows
    tableData.forEach((row, rowIndex) => {
      // Cell content
      result += style.vertical
      row.forEach((cell, colIndex) => {
        const content = cell.padEnd(widths[colIndex], " ")
        result += ` ${content} `
        result += style.vertical
      })
      result += "\n"

      // Row separator (except after the last row)
      if (rowIndex < tableData.length - 1 && tableStyle !== "compact") {
        result += style.midLeft
        widths.forEach((width, index) => {
          result += style.horizontal.repeat(width + 2)
          result += index < widths.length - 1 ? style.midMid : style.midRight
        })
        result += "\n"
      }
    })

    // Bottom border
    if (tableStyle !== "compact") {
      result += style.bottomLeft
      widths.forEach((width, index) => {
        result += style.horizontal.repeat(width + 2)
        result += index < widths.length - 1 ? style.bottomMid : style.bottomRight
      })
      result += "\n"
    }

    setAsciiTable(result)
  }, [tableData, tableStyle])

  // Add a new row
  const addRow = () => {
    const newRow = Array(tableData[0].length).fill("")
    setTableData([...tableData, newRow])
  }

  // Add a new column
  const addColumn = () => {
    setTableData(tableData.map((row) => [...row, ""]))
  }

  // Remove a row
  const removeRow = (rowIndex: number) => {
    if (tableData.length <= 1) return
    setTableData(tableData.filter((_, index) => index !== rowIndex))
  }

  // Remove a column
  const removeColumn = (colIndex: number) => {
    if (tableData[0].length <= 1) return
    setTableData(tableData.map((row) => row.filter((_, index) => index !== colIndex)))
  }

  // Update cell content
  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...tableData]
    newData[rowIndex][colIndex] = value
    setTableData(newData)
  }

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(asciiTable)
    toast({
      title: "Copied to clipboard",
      description: "The ASCII table has been copied to your clipboard.",
    })
  }

  // Download as text file
  const downloadAsText = () => {
    const element = document.createElement("a")
    const file = new Blob([asciiTable], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "ascii-table.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast({
      title: "Downloaded",
      description: "The ASCII table has been downloaded as a text file.",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button onClick={addRow} size="sm" variant="outline" className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add Row
              </Button>
              <Button onClick={addColumn} size="sm" variant="outline" className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add Column
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <Select value={tableStyle} onValueChange={(value) => setTableStyle(value as TableStyle)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Table Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="fancy">Fancy</SelectItem>
                  <SelectItem value="unicode">Unicode</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="w-10 p-2"></th>
                  {tableData[0].map((_, colIndex) => (
                    <th key={colIndex} className="p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">Col {colIndex + 1}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => removeColumn(colIndex)}
                                disabled={tableData[0].length <= 1}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove column</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <motion.tr
                    key={rowIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t"
                  >
                    <td className="p-2">
                      <div className="flex items-center justify-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => removeRow(rowIndex)}
                                disabled={tableData.length <= 1}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove row</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className="p-2">
                        <Input
                          value={cell}
                          onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                          className="w-full"
                          placeholder={`Cell ${rowIndex + 1},${colIndex + 1}`}
                        />
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={copyToClipboard} size="sm" variant="outline" className="flex items-center gap-1">
                    <Copy className="h-4 w-4" /> Copy
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={downloadAsText} size="sm" variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" /> Download
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download as text file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="border rounded-lg p-4 bg-muted/30 overflow-x-auto">
            <pre className="font-mono text-sm whitespace-pre">{asciiTable}</pre>
          </div>
        </TabsContent>
      </Tabs>

      <Toaster />
    </div>
  )
}

