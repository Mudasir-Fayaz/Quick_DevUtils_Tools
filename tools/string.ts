
import { Base64EncodeDecode, SlugGenerator, StrCaseConvert, StrLenCalc, StringReverse, SubstringFinder, UrlEncodeDecode } from "@/components/tools/string";
import { ToolCategory } from "@/types";

const stringTools: ToolCategory = {
  name: "String Tools",
  icon: 'Clipboard',
  tools: [
    {
      name: "Base64 Encoder/Decoder",
      icon: 'Code',
      description: "The Base64 Encoder/Decoder allows you to easily encode text to Base64 or decode Base64 back to text. This tool is commonly used for secure data transformation and encoding sensitive information.",
      faqs: [
        { question: "What is Base64 encoding?", answer: "Base64 encoding is a method of converting binary data into ASCII text, often used for encoding sensitive data in URLs or email." },
        { question: "How do I encode or decode Base64?", answer: "You can enter the text you want to encode or decode into the respective field, and the tool will perform the transformation." },
        { question: "Is this tool free?", answer: "Yes, the Base64 Encoder/Decoder tool is free to use." },
        { question: "What are some common use cases for Base64 encoding?", answer: "Base64 is often used to encode binary data for transmission over text-based protocols like email or URLs." },
        { question: "Can I decode Base64 to text?", answer: "Yes, this tool can decode Base64 encoded strings back to their original text form." }
      ],
      keywords: "base64 encoder, base64 decoder, encode text, decode text, secure encoding, text transformation, base64 tool, base64 converter, data encoding, text to base64, decode base64 string",
      slug: "/tool/base64-encoder-decoder",
      component: Base64EncodeDecode
    },
    {
      name: "String Length Calculator",
      icon: 'Ruler',
      description: "The String Length Calculator allows you to quickly calculate the number of characters in a string, including spaces and special symbols. This tool is helpful for content creators and developers working with string data.",
      faqs: [
        { question: "How does the String Length Calculator work?", answer: "Simply enter your string of text, and the tool will calculate the total number of characters, including spaces and punctuation." },
        { question: "Is this tool free?", answer: "Yes, the String Length Calculator is free to use." },
        { question: "Can I measure text length in different formats?", answer: "Yes, the tool will provide the character count in its most basic form, including all spaces and symbols." },
        { question: "Why do I need to calculate string length?", answer: "String length calculations are useful for determining text size for formatting, data storage, or when dealing with API limitations." }
      ],
      keywords: "string length calculator, text length, character count, calculate string size, text size, string analysis, word count tool, measure text, string length checker, character measurement",
      slug: "/tool/string-length-calculator",
      component: StrLenCalc
    },
    {
      name: "String Reverser",
      icon: 'Undo2Icon',
      description: "The String Reverser tool allows you to reverse the characters in a string. It's useful for fun text manipulation or analyzing text backward for specific patterns or cryptography.",
      faqs: [
        { question: "How do I reverse a string?", answer: "Simply input the string you want to reverse, and the tool will automatically reverse the characters." },
        { question: "What are some practical uses for a String Reverser?", answer: "Reversing strings can be useful for checking mirror text, cryptography, or creating challenges for text analysis." },
        { question: "Is this tool free?", answer: "Yes, the String Reverser is free to use." },
        { question: "Can I reverse sentences or words in a string?", answer: "Yes, the tool will reverse the entire string, including spaces and words." }
      ],
      keywords: "string reverser, reverse text, reverse characters, text flip, reverse string tool, backward text, string manipulation, flip string, mirror text, reverse word order",
      slug: "/tool/string-reverser",
      component: StringReverse
    },
    {
      name: "String Case Converter",
      icon: 'TextCursor',
      description: "The String Case Converter allows you to change the case of text to uppercase, lowercase, or title case. It's useful for formatting text for websites, documents, or other written content.",
      faqs: [
        { question: "How does the String Case Converter work?", answer: "Simply paste or type the text and select the case you want (uppercase, lowercase, or title case). The tool will adjust the text accordingly." },
        { question: "Is this tool free?", answer: "Yes, the String Case Converter is free to use." },
        { question: "What is the difference between uppercase, lowercase, and title case?", answer: "Uppercase converts all letters to capital letters, lowercase converts all to small letters, and title case capitalizes the first letter of each word." },
        { question: "Can I convert mixed-case text?", answer: "Yes, the tool can convert mixed-case text into your chosen format." }
      ],
      keywords: "string case converter, uppercase converter, lowercase converter, title case tool, case formatting, text case changer, text formatting, convert text case, capitalize text, case adjustment",
      slug: "/tool/string-case-converter",
      component: StrCaseConvert
    },
    {
      name: "Slug Generator",
      icon: 'Slash',
      description: "The Slug Generator creates clean, URL-friendly slugs from any text, making it easier to create SEO-friendly and readable web links.",
      faqs: [
        { question: "What is a URL slug?", answer: "A URL slug is the part of a web address that identifies a specific page or post, typically derived from the title or main content." },
        { question: "How do I generate a slug?", answer: "Enter the text you want to convert into a URL-friendly format, and the tool will generate a clean, readable slug." },
        { question: "Is this tool free?", answer: "Yes, the Slug Generator is free to use." },
        { question: "Can I generate slugs for SEO purposes?", answer: "Yes, the tool is designed to generate SEO-friendly slugs for better web indexing and readability." }
      ],
      keywords: "slug generator, url slug tool, url-friendly text, text to slug, slugify tool, create slugs, seo-friendly url, text to url, slug converter, web-friendly text",
      slug: "/tool/slug-generator",
      component: SlugGenerator
    },
    {
      name: "Substring Finder",
      icon: 'Search',
      description: "The Substring Finder helps you search for and locate substrings within a string, simplifying text analysis and helping you find patterns or keywords in large texts.",
      faqs: [
        { question: "What is a substring?", answer: "A substring is any sequence of characters that appears within another string." },
        { question: "How do I find a substring?", answer: "Simply enter the string and the substring you want to search for, and the tool will locate its position." },
        { question: "Is this tool free?", answer: "Yes, the Substring Finder is free to use." },
        { question: "Can I search for multiple substrings at once?", answer: "No, currently the tool searches for one substring at a time." }
      ],
      keywords: "substring finder, find text in string, text search tool, substring search, locate text, string analysis tool, string searcher, find words in text, search text tool, substring locator",
      slug: "/tool/substring-finder",
      component: SubstringFinder
    },
    {
      name: "URL Encoder/Decoder",
      icon: 'Columns',
      description: "The URL Encoder/Decoder encodes strings to URL-safe format or decodes URL-encoded strings for seamless web interactions. This tool helps ensure that URLs are properly formatted and readable.",
      faqs: [
        { question: "What is URL encoding?", answer: "URL encoding is a method of converting characters into a format that can be safely transmitted over the web." },
        { question: "How do I encode a URL?", answer: "Simply enter the text or URL, and the tool will convert it into a URL-safe format." },
        { question: "Is this tool free?", answer: "Yes, the URL Encoder/Decoder is free to use." },
        { question: "Can I decode URL-encoded strings?", answer: "Yes, you can decode URL-encoded strings back to their original text format." }
      ],
      keywords: "url encoder, url decoder, encode url, decode url, url-safe text, url formatting, text to url, url conversion, decode web links, encode text for url",
      slug: "/tool/url-encoder-decoder",
      component: UrlEncodeDecode
    }
  ],
}


  export default stringTools;