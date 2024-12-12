'use client'
import { useEffect } from 'react'

import { useAppDispatch } from '@/lib/hooks';
import { setActiveTool } from '@/lib/features/activeToolSlice';
import { toolsData } from '@/data';


interface IntroProps {
  slug: string;
}

const Intro: React.FC<IntroProps> = ({ slug }) => {
    const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveTool('/tool/' + slug));
   
}, [slug,dispatch]);
const tool = toolsData.find((toolCategory) =>
    toolCategory.tools.find((tool) => tool.slug === `/tool/${slug}`)
  )?.tools.find((tool) => tool.slug === `/tool/${slug}`);

  // If no tool is found, show a 404
//   if (!tool) {
//     return notFound();
//   }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 m-1">
    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{tool?.name}</h2>
    <p className="text-gray-600 dark:text-gray-300">{tool?.description}</p>
    
    {tool?.component ? <tool.component /> : <p>No component available for this tool.</p>}
  </div>
  )
}

export default Intro
