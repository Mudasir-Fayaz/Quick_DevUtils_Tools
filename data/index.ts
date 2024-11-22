import { ToolCategory } from "@/types";


import {textTools, stringTools, jsonTools, mathTools, asciiTools, htmlTools, cssTools, javascriptTools, clockTools, colorTools} from "./tools";

export const toolsData: ToolCategory[] = [
   textTools,
   stringTools,
jsonTools,
     mathTools,
    asciiTools,
    htmlTools,
    cssTools,
    javascriptTools,
    colorTools,
    clockTools
        
]


export const getToolMetadata = (slug:string) => {
   for (const category of toolsData) {
     for (const tool of category.tools) {
       if (tool.slug === '/tool/' + slug) {
         return {
           title: tool.name + ' - Quick Devutils',
           description: tool.description,
           keywords: tool.keywords,
         };
       }
     }
   }
   return null; // Return null if no tool is found with the given slug
 };