'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { ChevronRight, Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleModal } from '@/lib/features/uiSlice';
import { toolsData } from '@/data';
import Link from 'next/link';
const SearchModal = () => {
  const dispatch = useAppDispatch();
  const modalOpen = useAppSelector((state) => state.ui.modalOpen);
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = toolsData.map(category => ({
    ...category,
    tools: category.tools.filter(tool =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.tools.length > 0)

  return (
    <Dialog open={modalOpen} onOpenChange={() => dispatch(toggleModal())}>
      
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Search Tools</DialogTitle>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              className="pl-8 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
        </DialogHeader>
        <ScrollArea className="flex-grow mt-4">
          <AnimatePresence>
            {filteredCategories.map((category, categoryIndex) => {
               
              return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-6"
              >
                <div className="flex items-center mb-2">
                  {/* <category.icon className="w-5 h-5 mr-2 text-primary" /> */}
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>
                <AnimatePresence>
                  {category.tools.map((tool, toolIndex) => {
                    
                    return (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: categoryIndex * 0.1 + toolIndex * 0.05 }}
                    >
                      <Link href={tool.slug} passHref>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left mb-1 py-2"
                        onClick={() => {
                          // Handle tool selection here
                          dispatch(toggleModal())
                        }}
                      >
                        <div>
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-sm text-muted-foreground">{tool.description}</div>
                        </div>
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </Button>
                        </Link>
                        
                    </motion.div>
                  )})}
                </AnimatePresence>
              </motion.div>
            )})}
          </AnimatePresence>
          {filteredCategories.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground py-8"
            >
              No tools found matching your search.
            </motion.div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default SearchModal
