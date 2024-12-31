"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const cronExpressions = [
  { symbol: "*", meaning: "Any value", example: "* * * *", equivalent: "Every minute" },
  { symbol: "-", meaning: "Range of values", example: "1-10 * * *", equivalent: "Minutes 1 through 10" },
  { symbol: ",", meaning: "List of values", example: "1,10 * * *", equivalent: "At minutes 1 and 10" },
  { symbol: "/", meaning: "Step values", example: "*/10 * * *", equivalent: "Every 10 minutes" },
  { symbol: "@yearly", meaning: "Once every year at midnight of 1 January", example: "@yearly", equivalent: "0 0 1 1 *" },
  { symbol: "@annually", meaning: "Same as @yearly", example: "@annually", equivalent: "0 0 1 1 *" },
  { symbol: "@monthly", meaning: "Once a month at midnight on the first day", example: "@monthly", equivalent: "0 0 1 * *" },
  { symbol: "@weekly", meaning: "Once a week at midnight on Sunday morning", example: "@weekly", equivalent: "0 0 * * 0" },
  { symbol: "@daily", meaning: "Once a day at midnight", example: "@daily", equivalent: "0 0 * * *" },
  { symbol: "@midnight", meaning: "Same as @daily", example: "@midnight", equivalent: "0 0 * * *" },
  { symbol: "@hourly", meaning: "Once an hour at the beginning of the hour", example: "@hourly", equivalent: "0 * * * *" },
  { symbol: "@reboot", meaning: "Run at startup", example: "@reboot", equivalent: "" },
]

export default function CrontabGenerator() {
  const [cronExpression, setCronExpression] = useState("40 * * * *")
  const [description, setDescription] = useState("At 40 minutes past the hour, every hour, every day")
  const [isVerbose, setIsVerbose] = useState(false)
  const [use24HourFormat, setUse24HourFormat] = useState(true)
  const [daysStartAt0, setDaysStartAt0] = useState(true)
  const { toast } = useToast()

  const generateDescription = () => {
    // This is a placeholder function. In a real implementation, you would use a library like 'cron-parser' to generate the description.
    setDescription("At 40 minutes past the hour, every hour, every day")
  }

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${description} copied to clipboard.`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cron-expression">Cron Expression</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="cron-expression"
                  value={cronExpression}
                  onChange={(e) => setCronExpression(e.target.value)}
                  placeholder="Enter cron expression (e.g., 40 * * * *)"
                />
                <Button onClick={generateDescription}>Generate</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <div className="flex items-center space-x-2">
                <Input value={description} readOnly />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(description, "Description")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="verbose"
                  checked={isVerbose}
                  onCheckedChange={setIsVerbose}
                />
                <Label htmlFor="verbose">Verbose</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="24-hour"
                  checked={use24HourFormat}
                  onCheckedChange={setUse24HourFormat}
                />
                <Label htmlFor="24-hour">Use 24 hour time format</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="days-start-0"
                  checked={daysStartAt0}
                  onCheckedChange={setDaysStartAt0}
                />
                <Label htmlFor="days-start-0">Days start at 0</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cron Format</Label>
              <div className="bg-muted p-4 rounded-md text-sm font-mono">
                <p>┌──────────── [optional] seconds (0 - 59)</p>
                <p>| ┌────────── minute (0 - 59)</p>
                <p>| | ┌──────── hour (0 - 23)</p>
                <p>| | | ┌────── day of month (1 - 31)</p>
                <p>| | | | ┌──── month (1 - 12) OR jan,feb,mar,apr ...</p>
                <p>| | | | | ┌── day of week (0 - 6, sunday=0) OR sun,mon ...</p>
                <p>| | | | | |</p>
                <p>* * * * * * command</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cron Expressions</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Meaning</TableHead>
                    <TableHead>Example</TableHead>
                    <TableHead>Equivalent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cronExpressions.map((expr, index) => (
                    <TableRow key={index}>
                      <TableCell>{expr.symbol}</TableCell>
                      <TableCell>{expr.meaning}</TableCell>
                      <TableCell>{expr.example}</TableCell>
                      <TableCell>{expr.equivalent}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

