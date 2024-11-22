'use client'
import React, { useEffect, ReactNode } from 'react'

import { useAppDispatch } from '@/lib/hooks';
import { setActiveTool } from '@/lib/features/activeToolSlice';

interface PageProp {
    slug: string;         // Example of a prop
    children?: ReactNode;  // The children prop
  }
  

const PageRender: React.FC<PageProp> = ({
    slug, children
  }) => {
    const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveTool('/tool/' + slug));
   
}, [slug,dispatch]);

  // If no tool is found, show a 404
//   if (!tool) {
//     return notFound();
//   }
  
  return (
   <>
   {children}
   </>
  )
}

export default PageRender
