import { 
  IntegerBaseConverter, 
  RomanNumeralConverter,
  Base64Converter,
  Base64FileConverter,
  ColorConverter,
  CaseConverter,
  NatoAlphabetConverter,
  TextToBinaryConverter,
  TextToUnicodeConverter,
  YamlJsonConverter,
  YamlTomlConverter,
  JsonToYamlConverter,
  JsonToTomlConverter,
  ListConverter,
  TomlConverter,
  XmlConverter,
  MarkdownHtmlConverter
} from "@/components/tools/converter";
import { ToolCategory } from "@/types";

const converterTools: ToolCategory = {
  name: "Converter Tools",
  icon: 'Replace',
  tools: [
    {
      name: "Integer Base Converter",
      icon: 'Binary',
      description: "Convert numbers between different bases (binary, octal, decimal, hexadecimal). Simplifies understanding and working with number systems. Ideal for students, developers, or anyone working with low-level programming. Supports various base formats with high accuracy. Perfect for debugging, algorithm development, and computation tasks.",
      keywords: "base conversion, binary, octal, decimal, hex, number system",
      slug: "/tool/integer-base",
      component: IntegerBaseConverter,
      faqs: [
        {
          question: "What is base conversion?",
          answer: "Base conversion is the process of converting a number from one numeral system (base) to another, like binary to decimal or hexadecimal to octal."
        },
        {
          question: "Why would I need a number base converter?",
          answer: "You might need a base converter for tasks like debugging code, working with computer systems, or learning number theory and algorithms."
        },
        {
          question: "What bases can I convert between?",
          answer: "You can convert between binary, octal, decimal, and hexadecimal formats."
        },
        {
          question: "Is there any limit on the number size I can convert?",
          answer: "There is no specific limit, but very large numbers may affect processing time depending on the tool's handling capacity."
        },
        {
          question: "Can I use this tool for programming?",
          answer: "Yes, it's perfect for developers working with different number systems for low-level programming or understanding how data is represented in computers."
        }
      ]
    },
    {
      name: "Roman Numeral Converter",
      icon: 'HashIcon',
      description: "Convert between Roman numerals and decimal numbers. Ideal for learning and converting numbers in historical contexts. Useful for students, historians, and those working with traditional documents. The tool ensures accurate conversion between Roman numerals and decimals. It is particularly beneficial when working with classical literature or ancient texts.",
      keywords: "roman numerals, decimal, number conversion",
      slug: "/tool/roman-numeral",
      component: RomanNumeralConverter,
      faqs: [
        {
          question: "What are Roman numerals?",
          answer: "Roman numerals are an ancient number system used by the Romans, represented by combinations of letters from the Latin alphabet (I, V, X, L, C, D, M)."
        },
        {
          question: "How do I convert Roman numerals to numbers?",
          answer: "The tool automatically converts Roman numerals into decimal numbers using standard conversion rules."
        },
        {
          question: "Can I convert numbers larger than 1000?",
          answer: "Yes, the tool can handle Roman numerals representing numbers larger than 1000, up to a reasonable limit."
        },
        {
          question: "Why are Roman numerals still used today?",
          answer: "Roman numerals are still used today for certain purposes like clock faces, numbering of monarchs, and for designating chapters or sections in books."
        },
        {
          question: "Can I convert both Roman and decimal numbers?",
          answer: "Yes, the tool allows you to easily convert between both Roman numerals and decimal numbers."
        }
      ]
    },
    {
      name: "Base64 String Converter",
      icon: 'Replace',
      description: "Encode and decode Base64 strings with support for various encodings. This tool simplifies encoding and decoding tasks, commonly used for data transmission and storage. It supports both text and binary data encoding, ensuring secure and efficient conversions. Perfect for developers working with APIs, web applications, or encrypted data. The tool provides a seamless interface for handling Base64 strings.",
      keywords: "base64, encode, decode, string conversion",
      slug: "/tool/base64-string",
      component: Base64Converter,
      faqs: [
        {
          question: "What is Base64 encoding?",
          answer: "Base64 encoding is a method of encoding binary data into ASCII text, commonly used to encode images or files for transmission over the internet."
        },
        {
          question: "Can I decode Base64 strings with this tool?",
          answer: "Yes, this tool allows you to both encode and decode Base64 strings efficiently."
        },
        {
          question: "Why use Base64 encoding?",
          answer: "Base64 encoding is used when binary data needs to be stored or transferred in environments that only support text, such as email or URLs."
        },
        {
          question: "Can I convert large files using Base64?",
          answer: "Yes, you can convert large files, but keep in mind that very large files may take more time to process depending on your system."
        },
        {
          question: "What kind of data can I encode or decode?",
          answer: "You can encode and decode text, images, files, and other types of binary data using this tool."
        }
      ]
    },
    {
      name: "Base64 File Converter",
      icon: 'Replace',
      description: "Convert files to and from Base64 format. The tool makes it easy to encode files such as images, documents, or any binary files to Base64 format for easier sharing and storage. It also decodes Base64 encoded files back into their original form. This is a must-have for developers and those dealing with file transmission over networks.",
      keywords: "base64, file conversion, encode file, decode file",
      slug: "/tool/base64-file",
      component: Base64FileConverter,
      faqs: [
        {
          question: "What types of files can I convert to Base64?",
          answer: "You can convert any file type to Base64, such as images, PDFs, or any binary file formats."
        },
        {
          question: "How do I convert files to Base64?",
          answer: "Simply upload the file and the tool will automatically convert it to Base64 format, which you can then copy or download."
        },
        {
          question: "Can I decode Base64 encoded files back to their original format?",
          answer: "Yes, you can decode Base64 encoded files back to their original format using the same tool."
        },
        {
          question: "Why is Base64 used for file conversion?",
          answer: "Base64 is used for file conversion because it ensures that binary files can be transmitted over text-based protocols, such as email or HTTP requests."
        },
        {
          question: "Is there a file size limit for conversion?",
          answer: "While there is no strict limit, very large files may take longer to process depending on your system and internet speed."
        }
      ]
    },
    {
      name: "Color Converter",
      icon: 'Palette',
      description: "Convert colors between different formats such as HEX, RGB, HSL, and CMYK. This tool is essential for designers, developers, and anyone working with digital art or web development. It provides accurate color conversion, ensuring consistency across different platforms and media. Easily switch between color formats to find the best match for your project. Ideal for graphic design, web design, and UI/UX work.",
      keywords: "color conversion, hex, rgb, hsl, cmyk",
      slug: "/tool/color",
      component: ColorConverter,
      faqs: [
        {
          question: "What color formats can I convert?",
          answer: "You can convert between HEX, RGB, HSL, and CMYK color formats."
        },
        {
          question: "Why would I need a color converter?",
          answer: "A color converter helps ensure consistency when working with colors across different applications, such as web design or graphic design."
        },
        {
          question: "Can I use this tool for web design?",
          answer: "Yes, this tool is perfect for web designers needing to convert colors to different formats like HEX or RGB."
        },
        {
          question: "What is the difference between RGB and CMYK?",
          answer: "RGB is used for digital screens (Red, Green, Blue), while CMYK is used for printing (Cyan, Magenta, Yellow, Black)."
        },
        {
          question: "Can I convert color names to HEX or RGB?",
          answer: "Yes, you can easily convert color names to HEX or RGB values using this tool."
        }
      ]
    }, {
      name: "Case Converter",
      icon: 'ALargeSmallIcon',
      description: "Convert text between different cases like upper, lower, title, camel, snake, etc. This tool makes it easy to format text for programming, web development, or simply improving readability. Perfect for coders, content creators, and anyone needing quick text transformations. It's an essential tool for ensuring uniformity in text styling and formatting. Supports multiple case types to suit various needs.",
      keywords: "text case, uppercase, lowercase, camelcase, snakecase",
      slug: "/tool/case",
      component: CaseConverter,
      faqs: [
        {
          question: "What case types can I convert between?",
          answer: "You can convert between upper case, lower case, title case, camel case, snake case, and more."
        },
        {
          question: "How can this tool help with programming?",
          answer: "It allows you to convert text to different case formats, which is especially useful in programming languages like JavaScript and Python for variables, functions, and constants."
        },
        {
          question: "Is there a limit to the text length I can convert?",
          answer: "There is no specific limit, but extremely long texts may affect processing time."
        },
        {
          question: "Can I convert text in different languages?",
          answer: "Yes, you can convert any text in any language that uses the Latin alphabet."
        },
        {
          question: "Can this tool be used for SEO?",
          answer: "Yes, it helps in formatting text consistently for headings, meta tags, and URLs, which is useful for SEO purposes."
        }
      ]
    },
    {
      name: "NATO Alphabet Converter",
      icon: 'FileText',
      description: "Convert text to NATO phonetic alphabet representation. This tool helps with clear communication, especially in noisy environments or over the phone. Useful for military personnel, aviation professionals, or anyone needing to spell out words or letters in an easy-to-understand way. It ensures accuracy when conveying important information. Ideal for both casual and professional uses.",
      keywords: "nato phonetic, military alphabet, spelling alphabet",
      slug: "/tool/nato-alphabet",
      component: NatoAlphabetConverter,
      faqs: [
        {
          question: "What is the NATO phonetic alphabet?",
          answer: "The NATO phonetic alphabet is a standardized set of words used to represent each letter of the alphabet to avoid confusion in verbal communication."
        },
        {
          question: "How do I convert text to the NATO alphabet?",
          answer: "Simply type your text, and the tool will convert each letter into its corresponding NATO code word."
        },
        {
          question: "Is this tool useful for military or aviation?",
          answer: "Yes, it is widely used in military, aviation, and emergency services for clear and precise communication."
        },
        {
          question: "Can this tool be used for spelling difficult words?",
          answer: "Yes, it's perfect for spelling out difficult or unclear words, ensuring the message is accurately received."
        },
        {
          question: "Do I need an internet connection to use it?",
          answer: "Yes, an internet connection is required to access the tool and perform the conversion."
        }
      ]
    },
    {
      name: "Text to Binary",
      icon: 'Binary',
      description: "Convert text to binary ASCII representation. Ideal for programmers, cryptographers, or anyone working with binary data. It allows you to see how characters are represented in the binary numeral system. This is a handy tool for educational purposes or debugging data transmission. Perfect for those learning about low-level computing or encoding/decoding tasks.",
      keywords: "text to binary, ascii binary, binary conversion",
      slug: "/tool/text-binary",
      component: TextToBinaryConverter,
      faqs: [
        {
          question: "What is binary text representation?",
          answer: "Binary representation converts each character into its binary ASCII equivalent, where each character is represented by a sequence of 0s and 1s."
        },
        {
          question: "Why is binary important?",
          answer: "Binary is the foundational language of computers, and understanding it is crucial for low-level programming and computing concepts."
        },
        {
          question: "Can I convert large texts into binary?",
          answer: "Yes, the tool can handle large texts, though processing time may increase for longer strings."
        },
        {
          question: "Can I convert binary back to text?",
          answer: "Yes, this tool allows for two-way conversion between text and binary."
        },
        {
          question: "Is this tool useful for encryption tasks?",
          answer: "Yes, it can help in understanding how data is encrypted and transmitted in binary form."
        }
      ]
    },
    {
      name: "Text to Unicode",
      icon: 'FileText',
      description: "Convert text to Unicode code points and entities. This tool provides a quick way to convert any text into its corresponding Unicode representation, which is essential for internationalization. Ideal for developers, content creators, and those dealing with multi-language support. It's useful for ensuring compatibility across different platforms and systems. Perfect for anyone working with global content or web standards.",
      keywords: "unicode, text conversion, code points, entities",
      slug: "/tool/text-unicode",
      component: TextToUnicodeConverter,
      faqs: [
        {
          question: "What is Unicode?",
          answer: "Unicode is a standard for representing text from almost all writing systems in the world, allowing for consistent text representation across platforms."
        },
        {
          question: "Why do I need a Unicode converter?",
          answer: "A Unicode converter ensures your text is represented correctly on all devices, supporting multiple languages and special characters."
        },
        {
          question: "Can I convert any text to Unicode?",
          answer: "Yes, this tool works for any standard text, converting it into its respective Unicode code points and entities."
        },
        {
          question: "Can I convert back from Unicode to text?",
          answer: "Yes, the tool supports both conversion to and from Unicode format."
        },
        {
          question: "Is this useful for web development?",
          answer: "Absolutely! Unicode is vital for ensuring your website works across all languages and devices, making this tool essential for web developers."
        }
      ]
    },
    {
      name: "YAML to JSON",
      icon: 'FileCode',
      description: "Convert YAML documents to JSON format. Ideal for developers working with data serialization and APIs. YAML is often used for configuration files, while JSON is the preferred format for web APIs. This tool makes it easy to convert YAML data into a format that's compatible with most web applications. It streamlines the workflow for developers working on data processing or API integration.",
      keywords: "yaml, json, format conversion, data format",
      slug: "/tool/yaml-json",
      component: YamlJsonConverter,
      faqs: [
        {
          question: "What is YAML?",
          answer: "YAML is a human-readable data serialization format often used for configuration files or data storage."
        },
        {
          question: "What is JSON?",
          answer: "JSON (JavaScript Object Notation) is a lightweight data-interchange format that's easy for humans to read and write and easy for machines to parse and generate."
        },
        {
          question: "Why convert YAML to JSON?",
          answer: "JSON is more widely supported in APIs, making this conversion useful for developers working with data across systems."
        },
        {
          question: "Can I use this tool to convert JSON to YAML?",
          answer: "Yes, this tool allows for both YAML to JSON and JSON to YAML conversions."
        },
        {
          question: "Is this tool useful for API development?",
          answer: "Yes, this tool is essential for developers who need to work with APIs that require JSON data, as it makes the conversion from YAML quick and easy."
        }
      ]
    },

    {
      name: "YAML to TOML",
      icon: 'FileCode',
      description: "Convert YAML documents to TOML format. This tool helps developers working with configuration files or data serialization to easily convert between these two formats. TOML is popular for its simplicity and readability in configuration files. This converter supports seamless transformation between YAML and TOML, facilitating smoother workflows for developers. Perfect for those working with both formats in various programming environments.",
      keywords: "yaml, toml, format conversion, data format",
      slug: "/tool/yaml-toml",
      component: YamlTomlConverter,
      faqs: [
        {
          question: "What is the TOML format?",
          answer: "TOML (Tom's Obvious, Minimal Language) is a data serialization language intended for configuration files, designed to be easy to read due to its simple syntax."
        },
        {
          question: "Why would I convert YAML to TOML?",
          answer: "YAML is often used for data storage, while TOML is favored in configuration files for its human-readable structure. Conversion makes data easier to manage across different environments."
        },
        {
          question: "Is TOML widely used?",
          answer: "TOML is commonly used for configuration files in projects, especially with Rust and Python applications."
        },
        {
          question: "Can I convert TOML back to YAML?",
          answer: "Yes, the tool supports bidirectional conversion between YAML and TOML."
        },
        {
          question: "Is there a limit to the file size?",
          answer: "The tool can handle standard file sizes, but very large documents might take longer to process."
        }
      ]
    },
    {
      name: "JSON to YAML",
      icon: 'FileJson',
      description: "Convert JSON documents to YAML format. This tool is ideal for developers who need to transform JSON data into a more human-readable format. YAML is more compact and easier to edit manually, making it suitable for configuration files and documentation. The tool ensures quick and accurate conversion between these popular data formats. It simplifies working with APIs, configurations, and data interchange.",
      keywords: "json, yaml, format conversion",
      slug: "/tool/json-yaml",
      component: JsonToYamlConverter,
      faqs: [
        {
          question: "What is JSON?",
          answer: "JSON (JavaScript Object Notation) is a lightweight data-interchange format that's easy for humans to read and write, and easy for machines to parse and generate."
        },
        {
          question: "Why use YAML instead of JSON?",
          answer: "YAML is more readable and allows for a cleaner, more structured format, especially for configuration files. It is often preferred for human-editable data."
        },
        {
          question: "How do I convert JSON to YAML?",
          answer: "Simply input your JSON data, and the tool will convert it into YAML format, maintaining its structure and readability."
        },
        {
          question: "Can I convert YAML back to JSON?",
          answer: "Yes, the tool also supports conversion from YAML to JSON, enabling easy switching between formats."
        },
        {
          question: "Is this tool suitable for API developers?",
          answer: "Absolutely! API developers can use this tool to easily convert JSON responses to YAML for easier readability in configuration files."
        }
      ]
    },
    {
      name: "JSON to TOML",
      icon: 'FileCode',
      description: "Convert JSON documents to TOML format. This conversion tool is designed for developers who need to work with TOML's simpler and more human-readable structure. TOML is often used for configuration files, while JSON is more commonly used for data exchange. This tool streamlines the process of converting JSON data into TOML to meet specific formatting requirements. It is useful for managing configuration files and improving readability in TOML format.",
      keywords: "json, toml, format conversion",
      slug: "/tool/json-toml",
      component: JsonToTomlConverter,
      faqs: [
        {
          question: "What is TOML used for?",
          answer: "TOML is used for configuration files, known for its easy-to-read format, often in software development and DevOps processes."
        },
        {
          question: "Why convert JSON to TOML?",
          answer: "TOML is simpler to read and edit manually than JSON, especially for configuration files, making this conversion helpful in various programming environments."
        },
        {
          question: "Can I convert TOML back to JSON?",
          answer: "Yes, you can also convert TOML back to JSON using the same tool for flexibility."
        },
        {
          question: "What types of data can be in TOML?",
          answer: "TOML supports strings, integers, floats, dates, arrays, and tables, making it suitable for complex configuration files."
        },
        {
          question: "Is this tool fast for large documents?",
          answer: "Yes, the tool is optimized for handling reasonably large JSON documents, though very large files may take slightly more time to convert."
        }
      ]
    },
    {
      name: "List Converter",
      icon: 'SquareCode',
      description: "Convert between different list formats (CSV, Array, etc.). This tool is perfect for data analysts, programmers, and anyone who deals with lists in different formats. It can transform arrays, CSV files, and other list-based data types into the format you need. Whether you're working with spreadsheet data, databases, or code, this tool ensures seamless conversion between list formats. Ideal for handling data imports and exports in various software environments.",
      keywords: "list, array, csv, conversion",
      slug: "/tool/list-converter",
      component: ListConverter,
      faqs: [
        {
          question: "What formats can I convert lists into?",
          answer: "You can convert lists between CSV, array, and other common list formats."
        },
        {
          question: "Why would I need a list converter?",
          answer: "List conversion is useful for handling data between different software or applications that use varying formats for lists and arrays."
        },
        {
          question: "Can I convert a CSV file to an array?",
          answer: "Yes, the tool allows you to convert CSV data into an array format, suitable for use in programming languages."
        },
        {
          question: "Is there a file size limit for conversion?",
          answer: "The tool can handle standard-sized lists and arrays, but larger files might take longer to process."
        },
        {
          question: "Can I use this for data analysis?",
          answer: "Yes, this tool is especially useful for transforming lists and CSV files for analysis in different programming languages."
        }
      ]
    },
    {
      name: "TOML Converter",
      icon: 'FileCode',
      description: "Convert TOML documents to and from JSON/YAML formats. This tool provides an efficient solution for developers who need to switch between TOML, JSON, and YAML formats. TOML is commonly used in configuration files, while JSON and YAML are more prevalent in data exchange. This converter helps streamline workflows by offering bidirectional conversion between these formats. It is essential for developers working with configuration files and managing data across various formats.",
      keywords: "toml, json, yaml, format conversion",
      slug: "/tool/toml-converter",
      component: TomlConverter,
      faqs: [
        {
          question: "What is TOML?",
          answer: "TOML is a human-readable data serialization format used primarily for configuration files in software development."
        },
        {
          question: "Why use this tool to convert TOML?",
          answer: "This tool helps you easily convert TOML files into JSON or YAML formats, which are more widely used for data interchange."
        },
        {
          question: "Can I convert JSON and YAML to TOML?",
          answer: "Yes, this tool supports bidirectional conversion, making it easy to switch between TOML, JSON, and YAML."
        },
        {
          question: "Is TOML better than JSON or YAML?",
          answer: "TOML is simpler and more human-readable for configuration files, while JSON and YAML are more commonly used for data interchange."
        },
        {
          question: "Can this tool handle large configuration files?",
          answer: "Yes, the tool can handle larger files, though performance may vary with file size."
        }
      ]
    },
    {
      name: "XML Converter",
      icon: 'FileType',
      description: "Convert XML documents to and from JSON format. XML is often used for data storage, web services, and document management, while JSON is widely adopted in web applications and APIs. This tool makes it easy to transform XML data into JSON and vice versa. It's essential for developers and system integrators who need to work with both formats. Perfect for converting between XML and JSON in web development, APIs, and data interchange.",
      keywords: "xml, json, format conversion",
      slug: "/tool/xml-converter",
      component: XmlConverter,
      faqs: [
        {
          question: "What is XML?",
          answer: "XML (eXtensible Markup Language) is a markup language designed for storing and transporting data."
        },
        {
          question: "Why convert XML to JSON?",
          answer: "JSON is more lightweight and easier to work with in web development, making this conversion useful when working with web services or APIs."
        },
        {
          question: "Can I convert JSON to XML?",
          answer: "Yes, this tool also allows you to convert JSON data back into XML format."
        },
        {
          question: "What is the advantage of using JSON over XML?",
          answer: "JSON is simpler and less verbose than XML, making it easier to parse and faster to process, which is beneficial for web applications."
        },
        {
          question: "Is this tool suitable for data processing?",
          answer: "Yes, it is useful for processing data between XML and JSON formats in various applications and APIs."
        }
      ]
    },
    {
      name: "Markdown to HTML",
      icon: 'FileText',
      description: "Convert Markdown to HTML with preview. Markdown is widely used for writing content in a lightweight, readable format, while HTML is the standard for web pages. This tool converts Markdown text into HTML, maintaining the formatting for websites, blogs, and content management systems. It also includes a preview of the HTML result. Ideal for content creators, web developers, and anyone writing content for the web.",
      keywords: "markdown, html, preview, conversion",
      slug: "/tool/markdown-html",
      component: MarkdownHtmlConverter,
      faqs: [
        {
          question: "What is Markdown?",
          answer: "Markdown is a lightweight markup language with plain-text formatting syntax, used for creating formatted text in a simple way."
        },
        {
          question: "Why convert Markdown to HTML?",
          answer: "Markdown is easier to write and read, but HTML is necessary for displaying content on web pages, making this conversion essential for web publishing."
        },
        {
          question: "Can I see a preview of the HTML output?",
          answer: "Yes, this tool provides a preview of the HTML code before you copy it, so you can ensure it looks correct."
        },
        {
          question: "Is there any limit to the Markdown length?",
          answer: "The tool can handle typical Markdown files, but very large files may take a little longer to process."
        },
        {
          question: "Does it work with all Markdown syntax?",
          answer: "Yes, the tool supports standard Markdown syntax, including headings, lists, links, and images."
        }
      ]
    }
  ]
};

export default converterTools;
