'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlignJustify, Eye, MessageSquare, Type, VolumeIcon } from 'lucide-react'

export default function WordCounter() {
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [sentenceCount, setSentenceCount] = useState(0)
  const [paragraphCount, setParagraphCount] = useState(0)
  const [readTime, setReadTime] = useState(0)
  const [speakTime, setSpeakTime] = useState(0)

  const analyzeText = useCallback(() => {
    const words = text.trim().split(/\s+/).filter(word => word !== '')
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim() !== '')
    const paragraphs = text.split('\n').filter(para => para.trim() !== '')

    setWordCount(words.length)
    setCharCount(text.length)
    setSentenceCount(sentences.length)
    setParagraphCount(paragraphs.length)
    setReadTime(Math.ceil(words.length / 200)) // Assuming average reading speed of 200 words per minute
    setSpeakTime(Math.ceil(words.length / 130)) // Assuming average speaking speed of 130 words per minute
  }, [text])

  useEffect(() => {
    analyzeText()
  }, [analyzeText])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleClearText = () => {
    setText('')
  }

  const MotionCard = motion(Card)

  return (
    <div className="container mx-auto ">
     
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <Textarea
            placeholder="Type or paste your text here..."
            value={text}
            onChange={handleTextChange}
            className="w-full h-64 p-4 text-lg"
            aria-label="Text input for word count analysis"
          />
          <Button onClick={handleClearText} className="mt-2">Clear Text</Button>
        </div>
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2" />
              Word Count
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{wordCount}</p>
          </CardContent>
        </MotionCard>
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <Type className="mr-2" />
              Character Count
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{charCount}</p>
          </CardContent>
        </MotionCard>
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlignJustify className="mr-2" />
              Sentence Count
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{sentenceCount}</p>
          </CardContent>
        </MotionCard>
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlignJustify className="mr-2" />
              Paragraph Count
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{paragraphCount}</p>
          </CardContent>
        </MotionCard>
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="mr-2" />
              Read Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{readTime} min</p>
          </CardContent>
        </MotionCard>
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <VolumeIcon className="mr-2" />
              Speak Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{speakTime} min</p>
          </CardContent>
        </MotionCard>
      </div>
    </div>
  )
}