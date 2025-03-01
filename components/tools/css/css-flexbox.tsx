"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {  Copy, Download, HelpCircle,  Plus, Minus } from 'lucide-react'


interface FlexboxProperties {
  display: 'flex' | 'inline-flex'
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
  alignContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'stretch'
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse'
}

interface FlexItem {
  order: number
  flexGrow: number
  flexShrink: number
  flexBasis: string
  alignSelf: 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
}

const initialFlexboxProperties: FlexboxProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  alignContent: 'stretch',
  flexWrap: 'nowrap',
}

const initialFlexItem: FlexItem = {
  order: 0,
  flexGrow: 0,
  flexShrink: 1,
  flexBasis: 'auto',
  alignSelf: 'auto',
}

const presetLayouts = {
  'Header Footer': {
    ...initialFlexboxProperties,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  'Sidebar Content': {
    ...initialFlexboxProperties,
    flexDirection: 'row',
  },
  'Card Layout': {
    ...initialFlexboxProperties,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
}

export default function CSSFlexbox() {
  const [flexboxProps, setFlexboxProps] = useState<FlexboxProperties>(initialFlexboxProperties)
  const [items, setItems] = useState<FlexItem[]>([initialFlexItem, initialFlexItem, initialFlexItem])
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null)
  const [generatedCSS, setGeneratedCSS] = useState('')

  
  const generateCSS = () => {
    let css = `.flex-container {
  display: ${flexboxProps.display};
  flex-direction: ${flexboxProps.flexDirection};
  justify-content: ${flexboxProps.justifyContent};
  align-items: ${flexboxProps.alignItems};
  align-content: ${flexboxProps.alignContent};
  flex-wrap: ${flexboxProps.flexWrap};
}

`

    items.forEach((item, index) => {
      css += `.flex-item-${index + 1} {
  order: ${item.order};
  flex-grow: ${item.flexGrow};
  flex-shrink: ${item.flexShrink};
  flex-basis: ${item.flexBasis};
  align-self: ${item.alignSelf};
}

`
    })

    setGeneratedCSS(css)
  }

  useEffect(() => {
    generateCSS()
  }, [flexboxProps, items, generateCSS])


  const addItem = () => {
    setItems([...items, initialFlexItem])
  }

  const removeItem = () => {
    if (items.length > 1) {
      setItems(items.slice(0, -1))
    }
  }

  const updateItemProperty = (index: number, property: keyof FlexItem, value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [property]: value }
    setItems(newItems)
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(generatedCSS)
  }

  const downloadCSS = () => {
    const blob = new Blob([generatedCSS], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'flexbox-styles.css'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto space-y-6">
     

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Flexbox Properties</CardTitle>
            <CardDescription>
              Adjust the Flexbox container properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(Object.keys(flexboxProps) as Array<keyof FlexboxProperties>).map((prop) => (
                <div key={prop}>
                  <Label htmlFor={prop}>{prop}</Label>
                  <Select
                    value={flexboxProps[prop]}
                    onValueChange={(value) => setFlexboxProps({ ...flexboxProps, [prop]: value })}
                  >
                    <SelectTrigger id={prop}>
                      <SelectValue placeholder={`Select ${prop}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {(['flex', 'inline-flex', 'row', 'row-reverse', 'column', 'column-reverse', 'flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly', 'stretch', 'baseline', 'nowrap', 'wrap', 'wrap-reverse'] as const).map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <AnimatePresence>
          {(
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                  <CardDescription>
                    See your Flexbox layout in action
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed border-gray-300 p-4 h-64 overflow-auto"
                    style={{
                      display: flexboxProps.display,
                      flexDirection: flexboxProps.flexDirection,
                      justifyContent: flexboxProps.justifyContent,
                      alignItems: flexboxProps.alignItems,
                      alignContent: flexboxProps.alignContent,
                      flexWrap: flexboxProps.flexWrap,
                    }}
                  >
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className={`p-2 m-1 bg-primary text-primary-foreground text-center cursor-pointer ${activeItemIndex === index ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                        style={{
                          order: item.order,
                          flexGrow: item.flexGrow,
                          flexShrink: item.flexShrink,
                          flexBasis: item.flexBasis,
                          alignSelf: item.alignSelf,
                        }}
                        onClick={() => setActiveItemIndex(index)}
                      >
                        Item {index + 1}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flex Items</CardTitle>
          <CardDescription>
            Manage and customize individual flex items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Button onClick={addItem}><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
              <Button onClick={removeItem}><Minus className="mr-2 h-4 w-4" /> Remove Item</Button>
            </div>
            {activeItemIndex !== null && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Item {activeItemIndex + 1} Properties</h3>
                {(Object.keys(items[activeItemIndex]) as Array<keyof FlexItem>).map((prop) => (
                  <div key={prop}>
                    <Label htmlFor={`item-${prop}`}>{prop}</Label>
                    {prop === 'alignSelf' ? (
                      <Select
                        value={items[activeItemIndex][prop]}
                        onValueChange={(value) => updateItemProperty(activeItemIndex, prop, value)}
                      >
                        <SelectTrigger id={`item-${prop}`}>
                          <SelectValue placeholder={`Select ${prop}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {(['auto', 'flex-start', 'center', 'flex-end', 'stretch', 'baseline'] as const).map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={`item-${prop}`}
                        type={prop === 'flexBasis' ? 'text' : 'number'}
                        value={items[activeItemIndex][prop]}
                        onChange={(e) => updateItemProperty(activeItemIndex, prop, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated CSS</CardTitle>
          <CardDescription>
            Copy or download the generated CSS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] w-full rounded border p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm">{generatedCSS}</pre>

          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={copyCSS}>
                  <Copy className="mr-2 h-4 w-4" /> Copy CSS
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy generated CSS to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={downloadCSS}>
                  <Download className="mr-2 h-4 w-4" /> Download CSS
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download generated CSS file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preset Layouts</CardTitle>
          <CardDescription>
            Choose from predefined Flexbox layouts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(presetLayouts).map(([name, layout]) => (
              <Button
                key={name}
                onClick={() => setFlexboxProps(layout as FlexboxProperties)}
                variant="outline"
              >
                {name}
              </Button>
            ))}
          </div>
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
                  Quick guide on how to use the Flexbox Generator
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  
                  <Label htmlFor="width">1. Properties</Label>
                  <div className="col-span-2 text-sm">
                    Adjust Flexbox container properties
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">2. Items</Label>
                  <div className="col-span-2 text-sm">
                    Add, remove, and customize flex items
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">3. Preview</Label>
                  <div className="col-span-2 text-sm">
                    See live changes in the preview panel
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">4. CSS</Label>
                  <div className="col-span-2 text-sm">
                    Copy or download the generated CSS
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