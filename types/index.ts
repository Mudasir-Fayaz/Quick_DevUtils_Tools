import { Icon } from "lucide-react";
import React, { ReactElement, FC } from "react";
import { FunctionComponent, SVGProps } from 'react';

// Define an IconType type for SVG icon components
type IconType = FunctionComponent<SVGProps<SVGSVGElement>>;

// types.ts
export interface Tool {
  name: string;
  icon: string; // Replace `any` with the actual type if you know the type of the icon component
  description: string;
  keywords: string;
  slug: string;
  component: FC;
  faqs: FAQ[];
}
type FAQ = {
  question:string
  answer:string
}
export interface ToolCategory {
  name: string;
  icon: string;
  tools: Tool[];

}
type IconKey = string;

// Define ToolIcon as a Record where each IconKey maps to a functional component (typically SVG)
export interface ToolIcon {
  [key: IconKey]: FunctionComponent<SVGProps<SVGSVGElement>>;
}

export interface DataState {
  categories: ToolCategory[];
  filteredCategories: ToolCategory[];
}

export interface SearchState {
  searchTerm: string;
}

// types.ts
export interface ActiveToolState {
  slug: string | null | undefined | string[];
}
