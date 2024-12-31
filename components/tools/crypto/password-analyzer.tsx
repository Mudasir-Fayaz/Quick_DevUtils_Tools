'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from 'lucide-react'
import { calculatePasswordStrength } from '@/utils/passwordStrength'
import { useSmoothAnimation } from '@/hooks/useSmoothAnimation'

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState('')
  const { score, crackTime, length, entropy, charSetSize } = calculatePasswordStrength(password)
  const animatedScore = useSmoothAnimation(score)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold"></CardTitle>
        <CardDescription>
         
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Enter a password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          <Progress value={animatedScore} className="w-full h-2" />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Duration to crack this password with brute force:
            <span className="ml-1 font-bold">{crackTime}</span>
          </p>
          <p className="text-sm">Password length: {length}</p>
          <p className="text-sm">Entropy: {entropy}</p>
          <p className="text-sm">Character set size: {charSetSize}</p>
          <p className="text-sm">
            Score: {animatedScore} / 100
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="inline-block w-4 h-4 ml-1 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Score is based on password entropy and other factors.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
        </div>

        <Alert>
          <AlertDescription>
            Note: The computed strength is based on the time it would take to crack the password using a brute force approach, it does not take into account the possibility of a dictionary attack.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

