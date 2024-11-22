import { ToolCategory } from "@/types";
import { AsciiText, AsciiArt, BinaryAscii, AsciiTable, HexAscii, HtmlAscii, TextAscii } from "@/components/tools/ascii";


const asciiTools: ToolCategory = {
  name: "ASCII Tools",
  icon: 'LetterTextIcon',
  tools: [
    {
      name: "ASCII to Text Converter",
      icon: 'FileType',
      description: "Easily convert ASCII codes into readable text, enabling seamless decoding of ASCII-based data.",
      keywords: "ASCII to text converter, convert ASCII to text, decode ASCII, ASCII decoder, ASCII text conversion, ASCII translation, ASCII to human-readable text, ASCII utility, ASCII characters to text, text decoder",
      slug: "/tool/ascii-to-text-converter",
      component: AsciiText
    },
    {
      name: "Text to ASCII Converter",
      icon: 'FileType2Icon',
      description: "Converts plain text into corresponding ASCII codes for encoding and data processing needs.",
      keywords: "text to ASCII converter, convert text to ASCII, encode text to ASCII, ASCII encoding tool, text to ASCII code, ASCII generator, plain text to ASCII, string to ASCII, ASCII conversion, encode to ASCII",
      slug: "/tool/text-to-ascii-converter",
      component: TextAscii
    },
    {
      name: "ASCII Art Generator",
      icon: 'LetterTextIcon',
      description: "Generates stunning ASCII art from text or images, perfect for creative or aesthetic purposes.",
      keywords: "ASCII art generator, create ASCII art, text to ASCII art, image to ASCII art, ASCII drawing, ASCII art maker, ASCII graphics tool, generate ASCII designs, artistic ASCII tool, ASCII creative utility",
      slug: "/tool/ascii-art-generator",
      component: AsciiArt
    },
    {
      name: "Binary to ASCII Converter",
      icon: 'BinaryIcon',
      description: "Transforms binary code into readable ASCII text for decoding binary data efficiently.",
      keywords: "binary to ASCII converter, convert binary to ASCII, binary code to text, binary decoder, ASCII from binary, binary to character conversion, decode binary text, binary to string, binary translation, ASCII tool",
      slug: "/tool/binary-to-ascii-converter",
      component: BinaryAscii
    },
    {
      name: "ASCII Table",
      icon: 'Table',
      description: "Provides a comprehensive ASCII table with character mappings for reference and analysis.",
      keywords: "ASCII table, character mappings, ASCII reference table, ASCII character codes, ASCII chart, printable ASCII table, ASCII mappings guide, character code chart, ASCII lookup, ASCII cheat sheet",
      slug: "/tool/ascii-table",
      component: AsciiTable
    },
    {
      name: "Hex to ASCII Converter",
      icon: 'Hash',
      description: "Effortlessly convert hexadecimal values into readable ASCII characters for decoding or data analysis.",
      keywords: "hex to ASCII converter, convert hex to ASCII, hexadecimal to text, hex decoder, ASCII from hexadecimal, hex to character conversion, decode hex text, hex translation tool, ASCII code from hex, ASCII decoding",
      slug: "/tool/hex-to-ascii-converter",
      component: HexAscii
    },
    {
      name: "HTML Entities to ASCII",
      icon: 'SquareCodeIcon',
      description: "Decodes HTML entities and converts them into their corresponding ASCII characters for simplified text representation.",
      keywords: "HTML entities to ASCII, convert HTML entities, decode HTML entities, HTML to ASCII converter, ASCII from HTML, entity to character conversion, HTML text decoder, HTML symbol to ASCII, web entity conversion, ASCII utility",
      slug: "/tool/html-entities-to-ascii",
      component: HtmlAscii
    }
  ]
}

  export default asciiTools;