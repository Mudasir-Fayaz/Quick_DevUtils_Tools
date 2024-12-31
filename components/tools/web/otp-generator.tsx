'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {QRCodeSVG } from 'qrcode.react'
import * as OTPAuth from 'otpauth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CopyIcon, ExternalLinkIcon, RefreshCwIcon } from 'lucide-react'

const PERIOD = 30

const OtpGenerator: React.FC = () => {
  const [secret, setSecret] = useState(() => generateRandomSecret())
  const [currentOtp, setCurrentOtp] = useState('')
  const [previousOtp, setPreviousOtp] = useState('')
  const [nextOtp, setNextOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(PERIOD)
  const [epoch, setEpoch] = useState(0)
  const [iteration, setIteration] = useState(0)

  function generateRandomSecret() {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    let secret = ''
    for (let i = 0; i < 15; i++) {
      secret += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    return secret
  }

  useEffect(() => {
    const totp = new OTPAuth.TOTP({
      secret: OTPAuth.Secret.fromBase32(secret),
      algorithm: 'SHA1',
      digits: 6,
      period: PERIOD
    })

    const intervalId = setInterval(() => {
      const now = Math.floor(Date.now() / 1000)
      const currentEpoch = Math.floor(now / PERIOD) * PERIOD
      setEpoch(currentEpoch)
      setTimeLeft(PERIOD - (now % PERIOD))
      
      const currentToken = totp.generate({ timestamp: currentEpoch * 1000 })
      const previousToken = totp.generate({ timestamp: (currentEpoch - PERIOD) * 1000 })
      const nextToken = totp.generate({ timestamp: (currentEpoch + PERIOD) * 1000 })
      
      setCurrentOtp(currentToken)
      setPreviousOtp(previousToken)
      setNextOtp(nextToken)
      
      setIteration(Math.floor(currentEpoch / PERIOD))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [secret])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const regenerateSecret = () => {
    setSecret(generateRandomSecret())
  }

  const hexSecret = Buffer.from(secret).toString('hex')
  const paddedHex = iteration.toString(16).padStart(16, '0')
  const qrCodeData = `otpauth://totp/QuickDevUtils:demo-user?issuer=QuickDevUtils&secret=${secret}&algorithm=SHA1&digits=6&period=30`

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="secret">Secret</Label>
              <div className="flex">
                <Input id="secret" value={secret} readOnly />
                <Button variant="outline" size="icon" onClick={regenerateSecret} title="Regenerate Secret">
                  <RefreshCwIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <Label>Previous OTP</Label>
                <div>{previousOtp}</div>
              </div>
              <div>
                <Label>Current OTP</Label>
                <motion.div
                  key={currentOtp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold"
                >
                  {currentOtp}
                </motion.div>
              </div>
              <div>
                <Label>Next OTP</Label>
                <div>{nextOtp}</div>
              </div>
            </div>
            <div className="text-center">
              <Label>Next in</Label>
              <motion.div
                key={timeLeft}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-semibold"
              >
                {timeLeft}s
              </motion.div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Secret in hexadecimal</Label>
              <div className="flex">
                <Input value={hexSecret} readOnly />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(hexSecret)}>
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label>Epoch</Label>
              <div className="flex">
                <Input value={epoch.toString()} readOnly />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(epoch.toString())}>
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label>Iteration</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex">
                  <Input value={iteration.toString()} readOnly />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(iteration.toString())}>
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex">
                  <Input value={paddedHex} readOnly />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(paddedHex)}>
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col items-center space-y-4">
          <Label>QR Code</Label>
          <QRCodeSVG value={qrCodeData} size={200} />
          <Button
            variant="outline"
            onClick={() => window.open(qrCodeData, '_blank')}
          >
            Open Key URI in new tab <ExternalLinkIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default OtpGenerator

