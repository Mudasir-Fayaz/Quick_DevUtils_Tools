"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { format, KeywordCase, IndentStyle } from "sql-formatter"
import { Copy } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const dialects = [
  "sql",
  "bigquery",
  "db2",
  "hive",
  "mariadb",
  "mysql",
  "n1ql",
  "plsql",
  "postgresql",
  "redshift",
  "spark",
  "sqlite",
  "tsql",
]

const keywordCases = ["upper", "lower", "preserve"]

const indentStyles = ["standard", "tabularLeft", "tabularRight"]
type Dialect = "sql" | "bigquery" | "db2" | "hive" | "mariadb" | "mysql" | "n1ql" | "plsql" | "postgresql" | "redshift" | "spark" | "sqlite" | "tsql" | "db2i" | "singlestoredb" | "snowflake" | "tidb" | "transactsql" | "trino" | undefined;

export default function SqlPretty() {
  const [sql, setSql] = useState("select field1,field2,field3 from my_table where my_condition;")
  const [dialect, setDialect] = useState<Dialect>("sql")
  const [keywordCase, setKeywordCase] = useState<KeywordCase | undefined>("upper")
  const [indentStyle, setIndentStyle] = useState<IndentStyle | undefined>("standard")
  const [prettifiedSql, setPrettifiedSql] = useState("")

  const handleFormat = () => {
    const formatted = format(sql, {
      language: dialect,
      keywordCase: keywordCase,
      indentStyle: indentStyle,
    })
    setPrettifiedSql(formatted)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(prettifiedSql)
  }
  
 
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4"></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Select onValueChange={(v) => setDialect(v as Dialect)} defaultValue={dialect}>
            <SelectTrigger>
              <SelectValue placeholder="Select Dialect" />
            </SelectTrigger>
            <SelectContent>
              {dialects.map((d) => (
                <SelectItem key={d} value={d}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => setKeywordCase(v as KeywordCase)} defaultValue={keywordCase}>
            <SelectTrigger>
              <SelectValue placeholder="Keyword Case" />
            </SelectTrigger>
            <SelectContent>
              {keywordCases.map((kc) => (
                <SelectItem key={kc} value={kc}>
                  {kc.charAt(0).toUpperCase() + kc.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => setIndentStyle(v as IndentStyle)} defaultValue={indentStyle}>
            <SelectTrigger>
              <SelectValue placeholder="Indent Style" />
            </SelectTrigger>
            <SelectContent>
              {indentStyles.map((is) => (
                <SelectItem key={is} value={is}>
                  {is.charAt(0).toUpperCase() + is.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="input">Input SQL</TabsTrigger>
            <TabsTrigger value="output">Prettified SQL</TabsTrigger>
          </TabsList>
          <TabsContent value="input">
            <Textarea
              placeholder="Enter your SQL query here"
              value={sql}
              onChange={(e) => setSql(e.target.value)}
              className="min-h-[200px]"
            />
            <Button onClick={handleFormat} className="mt-4">
              Prettify SQL
            </Button>
          </TabsContent>
          <TabsContent value="output">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
                <code>{prettifiedSql}</code>
              </pre>
              <Button onClick={handleCopy} className="mt-4">
                <Copy className="mr-2 h-4 w-4" /> Copy Prettified SQL
              </Button>
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

