'use client'

import { useState } from 'react'
import { useUserAgentParser } from '@/hooks/useUserAgentParser'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Chrome, Cpu, Globe, Layout, Monitor } from 'lucide-react'

export default function UserAgentParser() {
  const [userAgent, setUserAgent] = useState(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  )
  const parsedInfo = useUserAgentParser(userAgent)


  return (
   
      <Card className="w-full">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="user-agent">User agent string</Label>
              <Input
                id="user-agent"
                value={userAgent}
                onChange={(e) => setUserAgent(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoCard
                icon={<Chrome className="h-6 w-6" />}
                title="Browser"
                items={[parsedInfo.browser.name, parsedInfo.browser.version]}
               
                delay={0}
              />
              <InfoCard
                icon={<Globe className="h-6 w-6" />}
                title="Engine"
                items={[parsedInfo.engine.name, parsedInfo.engine.version]}
                
                delay={100}
              />
              <InfoCard
                icon={<Monitor className="h-6 w-6" />}
                title="OS"
                items={[parsedInfo.os.name, parsedInfo.os.version]}
                
                delay={200}
              />
              <InfoCard
                icon={<Layout className="h-6 w-6" />}
                title="Device"
                items={[parsedInfo.device.model, parsedInfo.device.type, parsedInfo.device.vendor]}
                
                delay={300}
              />
              <InfoCard
                icon={<Cpu className="h-6 w-6" />}
                title="CPU"
                items={[parsedInfo.cpu.architecture]}
                
                delay={400}
              />
            </div>
          </div>
        </CardContent>
      </Card>
   
  )
}

interface InfoCardProps {
  icon: React.ReactNode
  title: string
  items: string[]
 
  delay: number
}

function InfoCard({ icon, title, items,  delay }: InfoCardProps) {
  return (
    <Card className={`transition-all duration-500 ease-in-out transform ${
     'translate-y-0 opacity-100'
    }`} style={{ transitionDelay: `${delay}ms` }}>
      <CardHeader className="flex flex-row items-center space-x-2 pb-2">
        {icon}
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li key={index} className="text-sm text-gray-600">
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

