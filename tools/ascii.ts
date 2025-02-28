import { ToolCategory } from "@/types";
import { AsciiText, AsciiArt, BinaryAscii, AsciiTable, HexAscii, HtmlAscii, TextAscii } from "@/components/tools/ascii";


const asciiTools: ToolCategory = {
  name: "ASCII Tools",
  icon: 'LetterText',
  tools: [
    {
      name: "ASCII to Text Converter",
      icon: 'FileType',
      description: "The ASCII to Text Converter decodes ASCII codes into human-readable text. This tool simplifies the conversion of encoded ASCII data into standard text, ensuring easy comprehension and utility. Ideal for developers, students, and anyone dealing with ASCII-encoded information. It supports batch processing for enhanced productivity. A user-friendly interface ensures effortless use without technical expertise.",
      keywords: "ASCII to text converter, convert ASCII to text, decode ASCII, ASCII decoder, ASCII text conversion, ASCII translation, ASCII to human-readable text, ASCII utility, ASCII characters to text, text decoder",
      slug: "/tool/ascii-to-text-converter",
      component: AsciiText,
      faqs: [
        { question: "What is ASCII?", answer: "ASCII (American Standard Code for Information Interchange) is a character encoding standard for text data." },
        { question: "How does the converter work?", answer: "It translates numeric ASCII codes into their respective characters based on the ASCII standard." },
        { question: "Can it handle large amounts of data?", answer: "Yes, the tool supports batch conversion for multiple ASCII codes at once." },
        { question: "Is this tool suitable for beginners?", answer: "Absolutely! It has an intuitive design for users of all experience levels." },
        { question: "Does it require an internet connection?", answer: "It depends on implementation; online versions require the internet, but local tools do not." }
      ]
    },
    {
      name: "Text to ASCII Converter",
      icon: 'LetterText',
      description: "The Text to ASCII Converter encodes plain text into corresponding ASCII codes. It's a vital tool for encoding, data analysis, and software development. The converter ensures quick and accurate transformation for seamless data processing. Supports multiple languages and formats. Its efficiency saves time and enhances data handling capabilities.",
      keywords: "text to ASCII converter, convert text to ASCII, encode text to ASCII, ASCII encoding tool, text to ASCII code, ASCII generator, plain text to ASCII, string to ASCII, ASCII conversion, encode to ASCII",
      slug: "/tool/text-to-ascii-converter",
      component: AsciiArt,
      faqs: [
        { question: "What types of text can I convert?", answer: "Any text that conforms to standard characters in the ASCII table." },
        { question: "Is this tool useful for developers?", answer: "Yes, developers often use it for encoding text data in software applications." },
        { question: "Does it support batch processing?", answer: "Yes, you can process multiple text inputs simultaneously." },
        { question: "Can I copy the generated ASCII output?", answer: "Yes, the tool provides options to copy and save the output easily." },
        { question: "Is this tool available offline?", answer: "That depends on implementation; some versions can run offline." }
      ]
    },
    {
      name: "ASCII Art Generator",
      icon: 'LetterText',
      description: "The ASCII Art Generator creates stunning visual designs using ASCII characters. It's perfect for artists, developers, or anyone looking to make creative textual designs. Generate art from text or images effortlessly with customizable styles. Supports various patterns for enhanced creativity. Its easy-to-use interface ensures a delightful user experience.",
      keywords: "ASCII art generator, create ASCII art, text to ASCII art, image to ASCII art, ASCII drawing, ASCII art maker, ASCII graphics tool, generate ASCII designs, artistic ASCII tool, ASCII creative utility",
      slug: "/tool/ascii-art-generator",
      component: AsciiArt,
      faqs: [
        { question: "What is ASCII art?", answer: "ASCII art is a graphic design technique using characters from the ASCII standard to create images." },
        { question: "Can I generate art from images?", answer: "Yes, the tool can transform images into ASCII art representations." },
        { question: "Is customization available?", answer: "Yes, you can adjust styles, patterns, and text size for personalization." },
        { question: "Can I save the generated art?", answer: "Yes, you can download or copy the generated ASCII art." },
        { question: "Does it support high-resolution art?", answer: "It supports resolutions based on text sizes but may not match image quality." }
      ]
    },
    {
      name: "Binary to ASCII Converter",
      icon: 'BinaryIcon',
      description: "The Binary to ASCII Converter decodes binary sequences into readable ASCII text. It simplifies the translation of binary data into human-understandable formats, useful for debugging or analysis. Supports batch conversions for efficient processing. Ideal for developers working with binary code. Designed for simplicity and speed.",
      keywords: "binary to ASCII converter, convert binary to ASCII, binary code to text, binary decoder, ASCII from binary, binary to character conversion, decode binary text, binary to string, binary translation, ASCII tool",
      slug: "/tool/binary-to-ascii-converter",
      component: BinaryAscii,
      faqs: [
        { question: "What is binary code?", answer: "Binary code represents text or instructions using a two-symbol system, 0s and 1s." },
        { question: "How does this tool work?", answer: "It converts binary sequences into their corresponding ASCII text equivalents." },
        { question: "Can it decode multiple binary codes at once?", answer: "Yes, batch processing is supported for multiple conversions." },
        { question: "Is the tool beginner-friendly?", answer: "Yes, its intuitive design makes it accessible for users of all levels." },
        { question: "Does it handle non-standard binary formats?", answer: "It supports standard formats; custom formats may need pre-processing." }
      ]
    },
    {
      name: "ASCII Table",
      icon: 'Table',
      description: "The ASCII Table provides a complete reference of ASCII characters and their corresponding codes. It’s an essential tool for developers, designers, and learners working with ASCII standards. Displays codes in decimal, hexadecimal, and binary formats. Easy to navigate and perfect for quick lookups. A must-have for coding and analysis tasks.",
      keywords: "ASCII table, character mappings, ASCII reference table, ASCII character codes, ASCII chart, printable ASCII table, ASCII mappings guide, character code chart, ASCII lookup, ASCII cheat sheet",
      slug: "/tool/ascii-table",
      component: AsciiTable,
      faqs: [
        { question: "What is the ASCII Table?", answer: "It’s a reference chart showing characters and their associated numeric codes in ASCII." },
        { question: "Can I search for specific characters?", answer: "Yes, the tool supports quick lookups by character or code." },
        { question: "Does it include non-printable characters?", answer: "Yes, it lists both printable and non-printable ASCII characters." },
        { question: "Is it useful for students?", answer: "Absolutely! It’s a great resource for learning ASCII encoding." },
        { question: "Can I download the table?", answer: "Yes, the tool offers an option to download or print the ASCII Table." }
      ]
    }
  ]

}

  export default asciiTools;