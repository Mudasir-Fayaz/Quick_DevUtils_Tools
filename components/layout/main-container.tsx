'use client'
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import {  useAppSelector } from '@/lib/hooks';

const MainContainer = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {

        setIsSmallScreen(window.innerWidth < 640);
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sidebarWidth = 300;

    
    const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  
  return (
    <motion.div
    className="flex flex-col flex-1"
    animate={{
      marginLeft: isSmallScreen ? 0 : sidebarOpen ? sidebarWidth : 0,
    }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
{children}
    </motion.div>
  )
}

export default MainContainer
