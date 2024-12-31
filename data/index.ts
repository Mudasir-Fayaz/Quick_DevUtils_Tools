import { ToolCategory } from "@/types";


import {networkTools,converterTools,cryptoTools, textTools, stringTools, jsonTools, mathTools, asciiTools, htmlTools, cssTools, javascriptTools, clockTools, colorTools, webTools, devTools, cameraTools, generatorTools} from "./tools";

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
    clockTools,
    cryptoTools,
  converterTools,
  webTools,
  devTools,
  cameraTools,
  networkTools,
    generatorTools,
        
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