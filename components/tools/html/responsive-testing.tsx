'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
 
  RefreshCw,
  AlertCircle
} from 'lucide-react'

const devices = {
  // Phones
  iphone14: { name: 'iPhone 14', width: 390, height: 844, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1' },
  iphone14Pro: { name: 'iPhone 14 Pro', width: 393, height: 852, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1' },
  pixel7: { name: 'Pixel 7', width: 412, height: 915, userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36' },
  samsungS23: { name: 'Samsung S23', width: 360, height: 780, userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36' },
  
  // Tablets
  ipadPro: { name: 'iPad Pro 12.9"', width: 1024, height: 1366, userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1' },
  ipadAir: { name: 'iPad Air', width: 820, height: 1180, userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1' },
  galaxyTab: { name: 'Galaxy Tab S9', width: 800, height: 1280, userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-T970) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36' },
  
  // Laptops
  macbook13: { name: 'MacBook Air 13"', width: 1280, height: 800, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15' },
  macbook14: { name: 'MacBook Pro 14"', width: 1512, height: 982, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15' },
  
  // Desktops
  desktop1080p: { name: '1080p Monitor', width: 1920, height: 1080, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36' },
  desktop1440p: { name: '1440p Monitor', width: 2560, height: 1440, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36' },
  desktop4k: { name: '4K Monitor', width: 3840, height: 2160, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36' },
}

const deviceCategories = {
  phones: ['iphone14', 'iphone14Pro', 'pixel7', 'samsungS23'],
  tablets: ['ipadPro', 'ipadAir', 'galaxyTab'],
  laptops: ['macbook13', 'macbook14'],
  desktops: ['desktop1080p', 'desktop1440p', 'desktop4k']
}

export default function ResponsiveTesting() {
  const [selectedDevice, setSelectedDevice] = useState('macbook13')
  const [orientation, setOrientation] = useState('portrait')
  const [dimensions, setDimensions] = useState(devices.macbook13)
  const [zoom, setZoom] = useState(1)
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeBreakpoint, setActiveBreakpoint] = useState('')
  const [preferences, setPreferences] = useState({
    showRulers: true,
    showDeviceFrame: true,
    autoRefresh: true,
    darkMode: false,
    showScrollbars: true,
  })

  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const device = devices[selectedDevice as keyof typeof devices]
    setDimensions(orientation === 'portrait' 
      ? { ...device, width: device.width, height: device.height }
      : { ...device, width: device.height, height: device.width }
    )
  }, [selectedDevice, orientation])

  useEffect(() => {
    const breakpoints = [
      { name: 'xs', minWidth: 0 },
      { name: 'sm', minWidth: 640 },
      { name: 'md', minWidth: 768 },
      { name: 'lg', minWidth: 1024 },
      { name: 'xl', minWidth: 1280 },
      { name: '2xl', minWidth: 1536 },
    ]

    const active = breakpoints.find(bp => dimensions.width >= bp.minWidth)?.name || ''
    setActiveBreakpoint(active)
  }, [dimensions])

  const handleUrlSubmit = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to load URL')
      
      if (iframeRef.current) {
        iframeRef.current.src = url
      }
    } catch (err) {
      console.log(err)
      setError('Failed to load the URL. Make sure it\'s accessible and includes the protocol (http:// or https://)')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResize = (newWidth: number, newHeight: number) => {
    setDimensions(prev => ({
      ...prev,
      width: Math.max(320, Math.min(newWidth, 3840)),
      height: Math.max(320, Math.min(newHeight, 2160))
    }))
  }

  return (
    <div className="flex flex-col space-y-4 p-4 max-w-[95vw] mx-auto">
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="url">URL to Test</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleUrlSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Load'}
                  </Button>
                </div>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="phones">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="phones">Phones</TabsTrigger>
                <TabsTrigger value="tablets">Tablets</TabsTrigger>
                <TabsTrigger value="laptops">Laptops</TabsTrigger>
                <TabsTrigger value="desktops">Desktops</TabsTrigger>
              </TabsList>
              {Object.entries(deviceCategories).map(([category, deviceList]) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {deviceList.map(deviceKey => (
                      <Button
                        key={deviceKey}
                        variant={selectedDevice === deviceKey ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setSelectedDevice(deviceKey)}
                      >
                        {devices[deviceKey as keyof typeof devices].name}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait')}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Rotate
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Label>Width</Label>
                <Input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => handleResize(Number(e.target.value), dimensions.height)}
                  className="w-20"
                />
                <Label>Height</Label>
                <Input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => handleResize(dimensions.width, Number(e.target.value))}
                  className="w-20"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setZoom(prev => Math.max(0.1, prev - 0.1))}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="min-w-[4ch] text-center">{(zoom * 100).toFixed(0)}%</span>
                <Button variant="outline" onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={preferences.showRulers}
                  onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, showRulers: checked }))}
                />
                <Label>Show Rulers</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  checked={preferences.showDeviceFrame}
                  onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, showDeviceFrame: checked }))}
                />
                <Label>Show Device Frame</Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={preferences.autoRefresh}
                  onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, autoRefresh: checked }))}
                />
                <Label>Auto Refresh</Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={preferences.darkMode}
                  onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, darkMode: checked }))}
                />
                <Label>Dark Mode</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="relative mx-auto" style={{ 
        width: dimensions.width * zoom,
        height: dimensions.height * zoom,
      }}>
        {preferences.showRulers && (
          <>
            <div className="absolute -top-4 left-0 w-full h-4 bg-muted flex">
              {Array.from({ length: Math.ceil(dimensions.width / 100) }).map((_, i) => (
                <div key={i} className="relative flex-1 min-w-[100px]">
                  <div className="absolute bottom-0 left-0 w-px h-2 bg-border"></div>
                  <div className="absolute bottom-0 left-1/4 w-px h-1 bg-border"></div>
                  <div className="absolute bottom-0 left-1/2 w-px h-1 bg-border"></div>
                  <div className="absolute bottom-0 left-3/4 w-px h-1 bg-border"></div>
                  <span className="absolute bottom-1 left-0 text-[10px] text-muted-foreground">{i * 100}</span>
                </div>
              ))}
            </div>
            <div className="absolute -left-4 top-0 h-full w-4 bg-muted flex flex-col">
              {Array.from({ length: Math.ceil(dimensions.height / 100) }).map((_, i) => (
                <div key={i} className="relative flex-1 min-h-[100px]">
                  <div className="absolute right-0 top-0 h-px w-2 bg-border"></div>
                  <div className="absolute right-0 top-1/4 h-px w-1 bg-border"></div>
                  <div className="absolute right-0 top-1/2 h-px w-1 bg-border"></div>
                  <div className="absolute right-0 top-3/4 h-px w-1 bg-border"></div>
                  <span className="absolute top-0 right-1 text-[10px] text-muted-foreground transform -rotate-90">{i * 100}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className={`relative ${preferences.showDeviceFrame ? 'border-8 border-gray-800 rounded-lg' : ''}`}>
          <iframe
            ref={iframeRef}
            src={url || 'about:blank'}
            style={{
              width: dimensions.width,
              height: dimensions.height,
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
            }}
            className={`bg-white ${preferences.darkMode ? 'dark' : ''} ${'touch-auto'} ${preferences.showScrollbars ? '' : 'scrollbar-none'}`}
          />
          
          { (
            <div className="absolute top-2 right-2 bg-black/75 text-white px-2 py-1 rounded text-sm">
              Breakpoint: {activeBreakpoint}
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Device</TableCell>
                <TableCell>{devices[selectedDevice as keyof typeof devices].name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dimensions</TableCell>
                <TableCell>{dimensions.width}x{dimensions.height}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Orientation</TableCell>
                <TableCell className="capitalize">{orientation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>User Agent</TableCell>
                <TableCell className="break-all">{devices[selectedDevice as keyof typeof devices].userAgent}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Active Breakpoint</TableCell>
                <TableCell>{activeBreakpoint}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}