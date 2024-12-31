'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Eye, EyeOff, Download } from 'lucide-react'

type EncryptionMethod = 'nopass' | 'WPA' | 'WEP' | 'WPA2-EAP'

interface WiFiData {
  encryption: EncryptionMethod
  ssid: string
  password: string
  hiddenSSID: boolean
}

const generateWiFiString = (data: WiFiData): string => {
  const { encryption, ssid, password, hiddenSSID } = data
  let wifiString = `WIFI:T:${encryption};S:${ssid};`
  if (encryption !== 'nopass') {
    wifiString += `P:${password};`
  }
  if (hiddenSSID) {
    wifiString += 'H:true;'
  }
  wifiString += ';'
  return wifiString
}

export default function WifiQrCodeGenerator() {
  const [wifiData, setWifiData] = useState<WiFiData>({
    encryption: 'WPA',
    ssid: '',
    password: '',
    hiddenSSID: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setWifiData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }, [])

  const handleEncryptionChange = useCallback((value: EncryptionMethod) => {
    setWifiData(prev => ({ ...prev, encryption: value }))
  }, [])

  const wifiString = useMemo(() => generateWiFiString(wifiData), [wifiData])

  const downloadQRCode = useCallback(() => {
    const canvas = document.getElementById('wifi-qr-code') as HTMLCanvasElement
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream')
      let downloadLink = document.createElement('a')
      downloadLink.href = pngUrl
      downloadLink.download = 'wifi-qr-code.png'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }, [])

  const isQRCodeReady = wifiData.ssid && (wifiData.encryption === 'nopass' || wifiData.password)

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="encryption">Encryption Method</Label>
          <Select
            value={wifiData.encryption}
            onValueChange={handleEncryptionChange}
          >
            <SelectTrigger id="encryption">
              <SelectValue placeholder="Select encryption method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nopass">No Password</SelectItem>
              <SelectItem value="WPA">WPA/WPA2</SelectItem>
              <SelectItem value="WEP">WEP</SelectItem>
              <SelectItem value="WPA2-EAP">WPA2-EAP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ssid">SSID</Label>
          <Input
            id="ssid"
            name="ssid"
            value={wifiData.ssid}
            onChange={handleInputChange}
            placeholder="Your WiFi SSID..."
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="hiddenSSID"
            name="hiddenSSID"
            checked={wifiData.hiddenSSID}
            onCheckedChange={(checked) => setWifiData(prev => ({ ...prev, hiddenSSID: checked }))}
          />
          <Label htmlFor="hiddenSSID">Hidden SSID</Label>
        </div>

        {wifiData.encryption !== 'nopass' && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={wifiData.password}
                onChange={handleInputChange}
                placeholder="Your WiFi Password..."
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fgColor">Foreground Color</Label>
            <Input
              id="fgColor"
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bgColor">Background Color</Label>
            <Input
              id="bgColor"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
        </div>

        {isQRCodeReady && (
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <QRCodeSVG
              id="wifi-qr-code"
              value={wifiString}
              size={200}
              fgColor={fgColor}
              bgColor={bgColor}
              level="M"
              includeMargin={true}
            />
            <Button onClick={downloadQRCode}>
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

