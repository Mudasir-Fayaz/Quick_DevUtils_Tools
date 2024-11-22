import {DiffChecker, WordCounter, TextAscii, TextFormatter, LoremIpsum, LineSorter, DuplicateLines, TextEditor} from "@/components/tools/text";
import { ToolCategory } from "@/types";
const textTools: ToolCategory = {
  name: "Text Tools",
  icon: "Type",
  tools: [
    {
      name: "Text Editor",
      icon: "Pencil",
      description: "A simple text editor for creating, editing, and formatting text documents.",
      keywords: "text editor, edit text, text writing tool, plain text editor, text creation",
      slug: "/tool/text-editor",
      component: TextEditor,
    },
    {
      name: "Text Diff Checker",
      icon: "GitCompare",
      description: "Compares two text inputs and highlights differences for side-by-side analysis.",
      keywords: "text diff checker, compare text, text comparison, text differences, diff tool, compare documents",
      slug: "/tool/text-diff-checker",
      component: DiffChecker,
    },
    {
      name: "Word Counter",
      icon: "Hash",
      description: "Counts words, characters, and spaces in your text to help you analyze content length.",
      keywords: "word counter, character counter, text analysis, word count tool, content length checker, character count tool",
      slug: "/tool/word-counter",
      component: WordCounter,
    },
    {
      name: "Text Formatter",
      icon: "AlignLeft",
      description: "Formats text by applying capitalization, lowercasing, or other text transformations.",
      keywords: "text formatter, capitalize text, lowercase text, format text, text case converter, text transformer",
      slug: "/tool/text-formatter",
      component: TextFormatter,
    },
    {
      name: "Lorem Ipsum Generator",
      icon: "Type",
      description: "Generates placeholder text for use in design mockups, templates, and prototypes.",
      keywords: "lorem ipsum generator, placeholder text, filler text, dummy text generator, mockup text, design text generator",
      slug: "/tool/lorem-ipsum-generator",
      component: LoremIpsum,
    },
    {
      name: "Text to ASCII Art",
      icon: "Columns",
      description: "Transforms plain text into creative ASCII art for decorative or fun purposes.",
      keywords: "text to ascii art, ascii converter, ascii text generator, ascii art maker, text to art, creative ascii text",
      slug: "/tool/text-to-ascii-art",
      component: TextAscii,
    },
    {
      name: "Line Sorter",
      icon: "SortAsc",
      description: "Sorts lines of text alphabetically or numerically for better organization.",
      keywords: "line sorter, sort text, sort lines, alphabetical sorter, text sorting tool, numeric line sorter",
      slug: "/tool/line-sorter",
      component: LineSorter,
    },
    {
      name: "Remove Duplicate Lines",
      icon: "Search",
      description: "Detects and removes duplicate lines from a text input, ensuring unique content.",
      keywords: "remove duplicate lines, deduplicate text, text deduplication tool, clean duplicate lines, unique line generator",
      slug: "/tool/remove-duplicate-lines",
      component: DuplicateLines,
    },
  ],
};

  export default textTools;