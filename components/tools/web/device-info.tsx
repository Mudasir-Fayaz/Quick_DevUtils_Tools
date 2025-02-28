"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

type DeviceInfo = {
  screen: {
    width: number
    height: number
    orientation: string
    angle: number
    colorDepth: number
    pixelRatio: number
  }
  window: {
    width: number
    height: number
  }
  device: {
    vendor: string
    languages: string[]
    platform: string
    userAgent: string
  }
}

const InfoItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="mb-2">
    <Label className="text-sm font-medium">{label}</Label>
    <p className="text-sm">{value}</p>
  </div>
)

const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  </motion.div>
)

export default function DeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)

  useEffect(() => {
    const getDeviceInfo = () => {
      const info: DeviceInfo = {
        screen: {
          width: window.screen.width,
          height: window.screen.height,
          orientation: screen.orientation ? screen.orientation.type : 'N/A',
          angle: screen.orientation ? screen.orientation.angle : 0,
          colorDepth: screen.colorDepth,
          pixelRatio: window.devicePixelRatio,
        },
        window: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        device: {
          vendor: navigator.vendor,
          languages: [...navigator.languages],
          platform: navigator.platform,
          userAgent: navigator.userAgent,
        },
      }
      setDeviceInfo(info)
    }

    getDeviceInfo()
    window.addEventListener('resize', getDeviceInfo)
    return () => window.removeEventListener('resize', getDeviceInfo)
  }, [])

  if (!deviceInfo) {
    return <div>Loading device information...</div>
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard title="Screen">
          <InfoItem label="Screen size" value={`${deviceInfo.screen.width} x ${deviceInfo.screen.height}`} />
          <InfoItem label="Orientation" value={deviceInfo.screen.orientation} />
          <InfoItem label="Orientation angle" value={`${deviceInfo.screen.angle}°`} />
          <InfoItem label="Color depth" value={`${deviceInfo.screen.colorDepth} bits`} />
          <InfoItem label="Pixel ratio" value={`${deviceInfo.screen.pixelRatio} dppx`} />
        </InfoCard>

        <InfoCard title="Window">
          <InfoItem label="Window size" value={`${deviceInfo.window.width} x ${deviceInfo.window.height}`} />
        </InfoCard>

        <InfoCard title="Device">
          <InfoItem label="Browser vendor" value={deviceInfo.device.vendor} />
          <InfoItem label="Languages" value={deviceInfo.device.languages.join(', ')} />
          <InfoItem label="Platform" value={deviceInfo.device.platform} />
          <InfoItem label="User agent" value={deviceInfo.device.userAgent} />
        </InfoCard>
      </div>
    </div>
  )
}

