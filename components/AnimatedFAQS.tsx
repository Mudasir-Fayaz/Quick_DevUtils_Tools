"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { FAQ, FAQsProps } from '@/types/faq'

export default function AnimatedFAQs({ faqs = [] }: FAQsProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  if (!faqs || faqs.length === 0) {
    return (
      <Card className="w-full">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600">No FAQs available at the moment.</p>
      </Card>
    );
  }

  const toggleItem = (value: string) => {
    setExpandedItems((prevItems) =>
      prevItems.includes(value)
        ? prevItems.filter((item) => item !== value)
        : [...prevItems, value]
    )
  }

  return (
    <Card className="w-full mt-4 p-3">
      <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
      <Accordion type="multiple" value={expandedItems} className="space-y-4">
        {faqs.map((faq: FAQ, index: number) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-lg overflow-hidden"
          >
            <AccordionTrigger
              onClick={() => toggleItem(`item-${index}`)}
              className="flex justify-between items-center w-full p-4 text-left transition-colors"
            >
              <span className="text-lg font-medium">{faq.question}</span>
            </AccordionTrigger>
            <AnimatePresence initial={false}>
              {expandedItems.includes(`item-${index}`) && (
                <motion.div
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={{
                    expanded: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <AccordionContent className="p-4">
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                </motion.div>
              )}
            </AnimatePresence>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  )
}

