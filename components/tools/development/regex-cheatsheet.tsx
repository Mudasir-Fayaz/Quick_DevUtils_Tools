"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const regexCategories = [
  {
    name: "Normal characters",
    patterns: [
      { expression: ".", description: "any character excluding a newline or carriage return" },
      { expression: "[A-Za-z]", description: "alphabet" },
      { expression: "[a-z]", description: "lowercase alphabet" },
      { expression: "[A-Z]", description: "uppercase alphabet" },
      { expression: "\\d", description: "digit" },
      { expression: "\\D", description: "non-digit" },
      { expression: "_", description: "underscore" },
      { expression: "\\w", description: "alphabet, digit or underscore" },
      { expression: "\\W", description: "inverse of \\w" },
      { expression: "\\S", description: "inverse of \\s" },
    ]
  },
  {
    name: "Whitespace characters",
    patterns: [
      { expression: " ", description: "space" },
      { expression: "\\t", description: "tab" },
      { expression: "\\n", description: "newline" },
      { expression: "\\r", description: "carriage return" },
      { expression: "\\s", description: "space, tab, newline or carriage return" },
    ]
  },
  {
    name: "Character set",
    patterns: [
      { expression: "[xyz]", description: "either x, y or z" },
      { expression: "[^xyz]", description: "neither x, y nor z" },
      { expression: "[1-3]", description: "either 1, 2 or 3" },
      { expression: "[^1-3]", description: "neither 1, 2 nor 3" },
    ]
  },
  {
    name: "Quantifiers",
    patterns: [
      { expression: "{2}", description: "exactly 2" },
      { expression: "{2,}", description: "at least 2" },
      { expression: "{2,7}", description: "at least 2 but no more than 7" },
      { expression: "*", description: "0 or more" },
      { expression: "+", description: "1 or more" },
      { expression: "?", description: "exactly 0 or 1" },
    ]
  },
  {
    name: "Boundaries",
    patterns: [
      { expression: "^", description: "start of string" },
      { expression: "$", description: "end of string" },
      { expression: "\\b", description: "word boundary" },
    ]
  },
  {
    name: "Matching",
    patterns: [
      { expression: "foo|bar", description: "match either foo or bar" },
      { expression: "foo(?=bar)", description: "match foo if it's before bar" },
      { expression: "foo(?!bar)", description: "match foo if it's not before bar" },
      { expression: "(?<=bar)foo", description: "match foo if it's after bar" },
      { expression: "(?<!bar)foo", description: "match foo if it's not after bar" },
    ]
  },
  {
    name: "Grouping and capturing",
    patterns: [
      { expression: "(foo)", description: "capturing group; match and capture foo" },
      { expression: "(?:foo)", description: "non-capturing group; match foo but without capturing foo" },
      { expression: "(foo)bar\\1", description: "\\1 is a backreference to the 1st capturing group; match foobarfoo" },
    ]
  },
]

function RegexTester({ pattern }: { pattern: string }) {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    try {
      const regex = new RegExp(pattern)
      setResult(regex.test(e.target.value) ? "Match" : "No match")
    } catch (error) {
      setResult("Invalid regex")
    }
  }

  return (
    <div className="mt-2 space-y-2">
      <Label htmlFor={`test-${pattern}`} className="text-sm font-medium">
        Test string:
      </Label>
      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <Input
          id={`test-${pattern}`}
          value={input}
          onChange={handleInputChange}
          className="flex-grow"
        />
        <div className="text-sm">
          Result: <span className="font-semibold">{result}</span>
        </div>
      </div>
    </div>
  )
}

export default function RegexCheatSheet() {
  const [activeCategory, setActiveCategory] = useState(regexCategories[0].name)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Javascript Regex/Regular Expression Cheatsheet</CardTitle>
        <CardDescription>A comprehensive guide to regular expressions in JavaScript</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-wrap">
          {regexCategories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? "default" : "outline"}
              onClick={() => setActiveCategory(category.name)}
              className="w-full sm:w-auto"
            >
              {category.name}
            </Button>
          ))}
        </div>
        {regexCategories.map((category) => (
          category.name === activeCategory && (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Expression</th>
                        <th className="text-left">Description</th>
                        <th className="text-left">Tester</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.patterns.map((pattern, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-2 pr-4">
                            <code>{pattern.expression}</code>
                          </td>
                          <td className="py-2 pr-4">{pattern.description}</td>
                          <td className="py-2">
                            <RegexTester pattern={pattern.expression} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </motion.div>
          )
        ))}
      </CardContent>
    </Card>
  )
}

