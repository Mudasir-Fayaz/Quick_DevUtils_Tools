
import { Base64EncodeDecode, SlugGenerator, StrCaseConvert, StrLenCalc, StringReverse, SubstringFinder, UrlEncodeDecode } from "@/components/tools/string";
import { ToolCategory } from "@/types";

const stringTools: ToolCategory = {
  name: "String Tools",
  icon: 'Clipboard',
  tools: [
    {
      name: "Base64 Encoder/Decoder",
      icon: 'Code',
      description: "Easily encode text to Base64 or decode Base64 back to text for secure data transformation.",
      keywords: "base64 encoder, base64 decoder, encode text, decode text, secure encoding, text transformation, base64 tool, base64 converter, data encoding, text to base64, decode base64 string",
      slug: "/tool/base64-encoder-decoder",
      component: Base64EncodeDecode
    },
    {
      name: "String Length Calculator",
      icon: 'Ruler',
      description: "Quickly calculate the number of characters in a string, including spaces and special symbols.",
      keywords: "string length calculator, text length, character count, calculate string size, text size, string analysis, word count tool, measure text, string length checker, character measurement",
      slug: "/tool/string-length-calculator",
      component: StrLenCalc
    },
    {
      name: "String Reverser",
      icon: 'Undo2Icon',
      description: "Reverse the characters in a string for fun or to analyze text backward.",
      keywords: "string reverser, reverse text, reverse characters, text flip, reverse string tool, backward text, string manipulation, flip string, mirror text, reverse word order",
      slug: "/tool/string-reverser",
      component: StringReverse
    },
    {
      name: "String Case Converter",
      icon: 'TextCursor', 
      description: "Change the case of text to uppercase, lowercase, or title case for formatting purposes.",
      keywords: "string case converter, uppercase converter, lowercase converter, title case tool, case formatting, text case changer, text formatting, convert text case, capitalize text, case adjustment",
      slug: "/tool/string-case-converter",
      component: StrCaseConvert
    },
    {
      name: "Slug Generator",
      icon: 'Slash',
      description: "Generate clean, URL-friendly slugs from any text for better web links.",
      keywords: "slug generator, url slug tool, url-friendly text, text to slug, slugify tool, create slugs, seo-friendly url, text to url, slug converter, web-friendly text",
      slug: "/tool/slug-generator",
      component: SlugGenerator
    },
    {
      name: "Substring Finder",
      icon: 'Search',
      description: "Search for and locate substrings within a string to simplify text analysis.",
      keywords: "substring finder, find text in string, text search tool, substring search, locate text, string analysis tool, string searcher, find words in text, search text tool, substring locator",
      slug: "/tool/substring-finder",
      component: SubstringFinder
    },
    {
      name: "URL Encoder/Decoder",
      icon: 'Columns',
      description: "Encode strings to URL-safe format or decode URL-encoded strings for seamless web interactions.",
      keywords: "url encoder, url decoder, encode url, decode url, url-safe text, url formatting, text to url, url conversion, decode web links, encode text for url",
      slug: "/tool/url-encoder-decoder",
      component: UrlEncodeDecode
    }
  ],
}


  export default stringTools;