import { ToolCategory } from "@/types";


import {networkTools,converterTools,cryptoTools, textTools, stringTools, jsonTools, mathTools, asciiTools, htmlTools, cssTools, javascriptTools, clockTools, colorTools, webTools, devTools, cameraTools, randomTools} from "./tools";

export const toolsData: ToolCategory[] = [
  asciiTools,
  cameraTools,
  clockTools,
  colorTools,
  converterTools,
  cryptoTools,
  cssTools,
  devTools,
  htmlTools,
  javascriptTools,
  jsonTools,
  mathTools,
  networkTools,
  randomTools,
  stringTools,
  textTools,
  webTools,
];


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