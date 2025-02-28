'use client'

import {  useEffect } from 'react'

import {motion} from 'framer-motion'
// Tool categories and their respective tools with icons
import {Card, CardHeader, CardTitle, CardContent, CardDescription} from '@/components/ui/card'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { setFilteredCategories, setCategories } from '@/lib/features/toolSlice';
import { ToolCategory } from '@/types';
import { toolsData } from '@/tools';
import { setActiveTool } from '@/lib/features/activeToolSlice';
import Link from 'next/link';
import { toolIcons } from '@/tools/tool-icons';
import { File } from 'lucide-react';
export default function HomePage() {
 
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state: RootState) => state.appData.categories);
  const searchTerm = useAppSelector((state: RootState) => state.search.searchTerm);


  

  useEffect(() => {
    dispatch(setCategories(toolsData));
    dispatch(setActiveTool(null));
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm === '') {
      dispatch(setFilteredCategories(categories));
    } else {
      const filteredCategories = categories.map((category) => ({
        ...category,
        tools: category.tools.filter((tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      })).filter((category) => category.tools.length > 0);
      
      dispatch(setFilteredCategories(filteredCategories));
    }
  }, [categories, searchTerm, dispatch]);

  const filteredCategories = useAppSelector((state: RootState) => state.appData.filteredCategories);

  

  return (
    <>
    {filteredCategories.map((category:ToolCategory, categoryIndex: number) => {
      const IconComponent =  toolIcons[category.icon] || File;
      return (
      <motion.section
        key={category.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: categoryIndex * 0.1 }}
        className="mb-12"
      >
        <div className="flex items-center mb-6">
          <IconComponent className="w-8 h-8 mr-3 text-primary" /> 
          <h2 className="text-xl font-bold">{category.name}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.tools.map((tool, toolIndex) => {

let text = tool.description;
    
// Find the position of the first period
const firstPeriodIndex = text.indexOf('.');

// If there's a period, trim the text up to the first period
if (firstPeriodIndex !== -1) {
  text = text.substring(0, firstPeriodIndex + 1); // Include the period
}

            const IconComponent = toolIcons[tool.icon] || File;
            return (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: categoryIndex * 0.1 + toolIndex * 0.05 }}
            >
              <Link href={tool.slug}>
             
              <Card className="h-full cursor-pointer hover:shadow-lg group">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between group-hover:text-primary">
                    {tool.name}
                     <IconComponent className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />  
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{text}</CardDescription>
                </CardContent>
              </Card>
              </Link>
            </motion.div>
          )})}
        </div>
      </motion.section>
    )})}
    </>
  )
}
