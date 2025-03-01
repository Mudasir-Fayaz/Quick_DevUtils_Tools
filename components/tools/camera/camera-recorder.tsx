"use client"

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Video, Image, Trash2, Download, StopCircle } from 'lucide-react'

export default function CameraRecorder() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [recording, setRecording] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [screenshots, setScreenshots] = useState<string[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing the camera:", err)
    }
  }, [])

  useEffect(() => {
    startCamera()
    const currentVideo = videoRef.current
    return () => {
      if (currentVideo && currentVideo.srcObject) {
        const tracks = (currentVideo.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [startCamera])

  const startRecording = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      mediaRecorderRef.current = new MediaRecorder(videoRef.current.srcObject as MediaStream)
      const chunks: Blob[] = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        const url = URL.createObjectURL(blob)
        setVideoUrl(url)
      }

      mediaRecorderRef.current.start()
      setRecording(true)
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setRecording(false)
    }
  }, [])

  const takeScreenshot = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageDataUrl = canvasRef.current.toDataURL('image/png')
        setScreenshots(prev => [...prev, imageDataUrl])
      }
    }
  }, [])

  const deleteScreenshot = useCallback((index: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== index))
  }, [])

  const downloadScreenshot = useCallback((url: string, index: number) => {
    const link = document.createElement('a')
    link.href = url
    link.download = `screenshot-${index + 1}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const previewVideo = useCallback(() => {
    if (videoUrl) {
      setPreviewUrl(videoUrl)
    }
  }, [videoUrl])

  const deleteVideo = useCallback(() => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
      setVideoUrl(null)
      setPreviewUrl(null)
    }
  }, [videoUrl])

  const downloadVideo = useCallback(() => {
    if (videoUrl) {
      const link = document.createElement('a')
      link.href = videoUrl
      link.download = 'recorded-video.webm'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [videoUrl])

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg"
            />
            {previewUrl && (
              <video
                src={previewUrl}
                controls
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <div className="flex flex-wrap gap-2">
            <Button onClick={recording ? stopRecording : startRecording}>
              {recording ? <StopCircle className="mr-2 h-4 w-4" /> : <Video className="mr-2 h-4 w-4" />}
              {recording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            <Button onClick={takeScreenshot}>
              <Camera className="mr-2 h-4 w-4" />
              Take Screenshot
            </Button>
            {videoUrl && (
              <>
                <Button onClick={previewVideo}>
                  <Image className="mr-2 h-4 w-4" />
                  Preview Video
                </Button>
                <Button onClick={deleteVideo} variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Video
                </Button>
                <Button onClick={downloadVideo} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Video
                </Button>
              </>
            )}
          </div>
          {screenshots.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {screenshots.map((screenshot, index) => (
                <div key={index} className="relative group">
                  <img src={screenshot} alt={`Screenshot ${index + 1}`} className="w-full h-auto rounded-lg" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <Button size="icon" variant="destructive" onClick={() => deleteScreenshot(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => downloadScreenshot(screenshot, index)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

