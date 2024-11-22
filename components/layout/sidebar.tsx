'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef, useState, useEffect } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Sidebar,ChevronDown, ChevronRight, ArrowLeft  } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleSidebar } from '@/lib/features/uiSlice';
import { toolsData } from '@/data'
import { ToolCategory } from '@/types'
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Link from 'next/link'
import { toolIcons } from '@/data/tool-icons'
import DonateButton from './donate-button'
import Logo from './logo'

const SideBar = () => {

  const sidebarWidth = 300;
  const sidebarRef = useRef(null)
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isSmallDevice, setIsSmallDevice] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    // Function to handle resize events
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 768);
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }
  const activeTool = useSelector((state: RootState) => state.activeTool.slug);

  return (
    <AnimatePresence>
    {sidebarOpen && (
      <motion.div
        initial={{ x: -sidebarWidth }}
        animate={{ x: 0 }}
        exit={{ x: -sidebarWidth }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className=" fixed inset-y-0 left-0 z-50 w-[300px] bg-background border-r shadow-lg md:shadow-none"
      >
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <Sidebar className="h-6 w-6" />
          <Button variant="ghost" size="icon" onClick={() => dispatch(toggleSidebar())}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100%-4rem)] md:h-full" ref={sidebarRef}>
        <div className="p-4 space-y-4">
         <Logo />
          <DonateButton />
                {toolsData.map((category: ToolCategory) => {
                   const IconComponent = toolIcons[category.icon];
                  return (
                  <div key={category.name} className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-between font-semibold"
                      onClick={() => toggleCategory(category.name)}
                    >
                      <span className='flex justify-center items-center gap-3'>

                      <IconComponent className="w-8 mr-0 h-8 text-primary" />  {category.name}
                      </span>
                      {expandedCategories.includes(category.name) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                    <AnimatePresence>
                      {expandedCategories.includes(category.name) && (
                        <motion.div key={category.name}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-1 overflow-hidden"
                        >
                          {category.tools.map((tool) => {
                             const IconComponent = toolIcons[tool.icon];
                            return (
                             <Link href={tool.slug} passHref key={tool.slug}>
                  
                          <Button
                              key={tool.name}
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "w-full justify-start pl-6",
                                activeTool === tool.slug && "bg-primary text-primary-foreground"
                              )}
                              onClick={() => {if(isSmallDevice) dispatch(toggleSidebar())}}
                            >
                               <IconComponent className="w-8 h-8" /> 
                              {tool.name}
                              
                            </Button>
                            </Link>
                          )})}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )})}
              </div>
        </ScrollArea>
      </motion.div>
    )}
  </AnimatePresence>
  )
}

export default SideBar
