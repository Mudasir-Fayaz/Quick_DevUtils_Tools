"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Copy, Save } from "lucide-react"

interface CronJob {
  minute: string
  hour: string
  day: string
  month: string
  weekday: string
  timezone: string
}

const initialCronJob: CronJob = {
  minute: "*",
  hour: "*",
  day: "*",
  month: "*",
  weekday: "*",
  timezone: "UTC",
}

export default function CrontabGenerator() {
  const [cronJob, setCronJob] = useState<CronJob>(initialCronJob)
  const [savedJobs, setSavedJobs] = useState<CronJob[]>([])
  const [nextExecutions, setNextExecutions] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("savedCronJobs")
    if (saved) {
      setSavedJobs(JSON.parse(saved))
    }
  }, [])

  const generateTimeOptions = (max: number) => {
    return Array.from({ length: max }, (_, i) => (
      <SelectItem key={i} value={i.toString()}>
        {i}
      </SelectItem>
    ))
  }

  const handleCronChange = (field: keyof CronJob, value: string) => {
    setCronJob((prev) => ({ ...prev, [field]: value }))
    calculateNextExecutions({ ...cronJob, [field]: value })
  }

  const calculateNextExecutions = (job: CronJob) => {
    // This is a simplified version. In a real app, you'd want to use a proper cron parser
    const now = new Date()
    const executions = []
    for (let i = 0; i < 5; i++) {
      const next = new Date(now)
      next.setMinutes(now.getMinutes() + i)
      executions.push(next.toLocaleString())
    }
    setNextExecutions(executions)
  }

  const getCronExpression = () => {
    return `${cronJob.minute} ${cronJob.hour} ${cronJob.day} ${cronJob.month} ${cronJob.weekday}`
  }

  const getHumanReadable = () => {
    return `Runs at ${cronJob.minute === "*" ? "every minute" : `minute ${cronJob.minute}`} of ${
      cronJob.hour === "*" ? "every hour" : `hour ${cronJob.hour}`
    } on ${cronJob.day === "*" ? "every day" : `day ${cronJob.day}`} of ${
      cronJob.month === "*" ? "every month" : `month ${cronJob.month}`
    } on ${cronJob.weekday === "*" ? "every day of the week" : `weekday ${cronJob.weekday}`} (${cronJob.timezone})`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCronExpression())
  }

  const saveJob = () => {
    const newSavedJobs = [...savedJobs, cronJob]
    setSavedJobs(newSavedJobs)
    localStorage.setItem("savedCronJobs", JSON.stringify(newSavedJobs))
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Crontab Generator</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Minute</label>
              <Select onValueChange={(value) => handleCronChange("minute", value)} defaultValue="*">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="*">Every minute (*)</SelectItem>
                  {generateTimeOptions(60)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Hour</label>
              <Select onValueChange={(value) => handleCronChange("hour", value)} defaultValue="*">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="*">Every hour (*)</SelectItem>
                  {generateTimeOptions(24)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Day</label>
              <Select onValueChange={(value) => handleCronChange("day", value)} defaultValue="*">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="*">Every day (*)</SelectItem>
                  {generateTimeOptions(31)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Month</label>
              <Select onValueChange={(value) => handleCronChange("month", value)} defaultValue="*">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="*">Every month (*)</SelectItem>
                  {generateTimeOptions(12)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Weekday</label>
              <Select onValueChange={(value) => handleCronChange("weekday", value)} defaultValue="*">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="*">Every day (*)</SelectItem>
                  <SelectItem value="0">Sunday (0)</SelectItem>
                  <SelectItem value="1">Monday (1)</SelectItem>
                  <SelectItem value="2">Tuesday (2)</SelectItem>
                  <SelectItem value="3">Wednesday (3)</SelectItem>
                  <SelectItem value="4">Thursday (4)</SelectItem>
                  <SelectItem value="5">Friday (5)</SelectItem>
                  <SelectItem value="6">Saturday (6)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Timezone</label>
              <Select onValueChange={(value) => handleCronChange("timezone", value)} defaultValue="UTC">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="GMT">GMT</SelectItem>
                  <SelectItem value="EST">EST</SelectItem>
                  <SelectItem value="PST">PST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Generated Expression</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Cron Expression</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-muted rounded-md">{getCronExpression()}</code>
                <Button size="icon" variant="outline" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={saveJob}>
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Human Readable</label>
              <p className="text-muted-foreground">{getHumanReadable()}</p>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Next Executions</label>
              <ul className="space-y-2">
                {nextExecutions.map((time, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-sm text-muted-foreground"
                  >
                    {time}
                  </motion.li>
                ))}
              </ul>
            </div>

            {savedJobs.length > 0 && (
              <div className="grid gap-2">
                <label className="text-sm font-medium">Saved Jobs</label>
                <ul className="space-y-2">
                  {savedJobs.map((job, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
                      onClick={() => setCronJob(job)}
                    >
                      {`${job.minute} ${job.hour} ${job.day} ${job.month} ${job.weekday} (${job.timezone})`}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

