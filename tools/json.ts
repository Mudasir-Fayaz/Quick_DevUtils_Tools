import { JsonFormatter, JsonValidator, JsonCsv, CsvJson, JsonMinify, JsonPath, JsonDiff } from "@/components/tools/json";

const jsonTools = {
  name: "JSON Tools",
  icon: 'FileJson',
  tools: [
    {
      name: "JSON Formatter",
      icon: 'BracesIcon',
      description: "JSON Formatter formats and beautifies JSON data to make it human-readable and easier to debug. It structures JSON into a more organized and visually appealing format, which is ideal for developers looking to work with JSON data quickly and efficiently. Whether you're troubleshooting an API response or cleaning up JSON for documentation, this tool ensures your data is easy to navigate and understand.",
      faqs: [
        { question: "What does JSON Formatter do?", answer: "It beautifies and formats JSON data to make it more readable and easier to debug." },
        { question: "Can I format large JSON files?", answer: "Yes, the tool can handle large JSON files and structure them effectively." },
        { question: "Is this tool free?", answer: "Yes, JSON Formatter is free to use." },
        { question: "What does it mean to 'beautify' JSON?", answer: "Beautifying JSON means adding proper indentation, line breaks, and structure to make it easier to read." },
        { question: "How does this tool help with debugging?", answer: "By formatting JSON data, it helps developers quickly spot errors or issues in the structure." }
      ],
      keywords: "json formatter, beautify json, format json, json beautifier, pretty json, json beautify tool, format json online",
      slug: "/tool/json-formatter",
      component: JsonFormatter
    },
    {
      name: "JSON Validator",
      icon: 'Check',
      description: "JSON Validator ensures that your JSON data is correctly structured and syntactically valid. This tool checks for missing braces, commas, and other syntax errors, helping developers avoid common mistakes. It's perfect for ensuring that the JSON data you're working with will parse correctly in your application or API.",
      faqs: [
        { question: "What is JSON Validator?", answer: "It checks and validates the syntax of your JSON data to ensure it's correct and properly structured." },
        { question: "How does this tool validate JSON?", answer: "It scans the JSON data for structural errors, such as missing commas or incorrect formatting." },
        { question: "Can this tool fix invalid JSON?", answer: "No, it only identifies errors. You need to manually correct the errors after validation." },
        { question: "Is this tool free?", answer: "Yes, JSON Validator is free to use." },
        { question: "How does validation help with API integration?", answer: "It ensures that the JSON data returned from APIs is properly structured, reducing errors when consuming the data." }
      ],
      keywords: "json validator, validate json, json checker, check json syntax, online json validator, json validation tool, json syntax checker",
      slug: "/tool/json-validator",
      component: JsonValidator
    },
    {
      name: "JSON to CSV Converter",
      icon: 'FileJson',
      description: "JSON to CSV Converter simplifies the process of converting JSON data into CSV format, making it easier to use in spreadsheets, data analysis, or other tools that require CSV. This tool takes the complex structure of JSON and flattens it into rows and columns, which is ideal for working with large datasets or exporting data for use in non-technical environments.",
      faqs: [
        { question: "What is JSON to CSV Converter?", answer: "It converts JSON data into CSV format for easier analysis in spreadsheet programs." },
        { question: "Why would I need to convert JSON to CSV?", answer: "CSV is a more widely used format for data analysis, especially in tools like Excel, making it easier to work with JSON data." },
        { question: "Does the converter flatten nested JSON?", answer: "Yes, it flattens nested JSON objects into a row-by-row format." },
        { question: "Is this tool free?", answer: "Yes, JSON to CSV Converter is free to use." },
        { question: "Can I convert large JSON files?", answer: "Yes, it can handle large JSON files and export them to CSV." }
      ],
      keywords: "json to csv, convert json to csv, json to csv converter, export json to csv, convert json, json data to csv, json csv tool",
      slug: "/tool/json-to-csv",
      component: JsonCsv
    },
    {
      name: "CSV to JSON Converter",
      icon: 'FileJson',
      description: "CSV to JSON Converter transforms CSV data into JSON format, which is commonly used for APIs, web applications, and various programming tasks. This tool is great for integrating CSV-based datasets into systems that require JSON, streamlining the process of data conversion without manual formatting.",
      faqs: [
        { question: "What does CSV to JSON Converter do?", answer: "It converts CSV data into a structured JSON format for use in web applications and APIs." },
        { question: "Why do I need to convert CSV to JSON?", answer: "JSON is often required for APIs, making it easier to work with data in modern web applications." },
        { question: "Can I convert large CSV files?", answer: "Yes, the tool can handle large CSV files and convert them into JSON." },
        { question: "Is this tool free?", answer: "Yes, CSV to JSON Converter is completely free." },
        { question: "Does it support complex CSV files?", answer: "Yes, it can handle CSV files with various columns and rows, converting them accurately into JSON." }
      ],
      keywords: "csv to json, convert csv to json, csv json converter, csv to json tool, convert csv, csv to json parser, csv data to json",
      slug: "/tool/csv-to-json",
      component: CsvJson
    },
    {
      name: "JSON Minifier",
      icon: 'Minimize',
      description: "JSON Minifier removes unnecessary whitespace and formatting from JSON data to reduce file size and improve performance. It helps in optimizing JSON files for production environments, especially when working with large datasets or APIs. By compressing JSON files, it reduces download times and enhances overall web application performance.",
      faqs: [
        { question: "What is JSON Minifier?", answer: "It reduces the file size of JSON data by removing unnecessary spaces and line breaks." },
        { question: "Why should I minify my JSON data?", answer: "Minifying JSON helps improve performance by reducing the file size, making data transfer faster." },
        { question: "Does minification affect the functionality of the JSON?", answer: "No, minification only removes unnecessary characters while preserving the JSON structure." },
        { question: "Is this tool free?", answer: "Yes, JSON Minifier is free to use." },
        { question: "Can I minify large JSON files?", answer: "Yes, this tool can handle large JSON files for compression." }
      ],
      keywords: "json minifier, minify json, compress json, json compression, reduce json size, minimize json, json optimizer",
      slug: "/tool/json-minifier",
      component: JsonMinify
    },
    {
      name: "JSON Path Finder",
      icon: 'RouteIcon',
      description: "JSON Path Finder allows you to find and extract specific values or paths from JSON objects using the powerful JSONPath syntax. It enables you to perform advanced queries and navigate large JSON structures efficiently, making it ideal for debugging or extracting specific information from complex data sets.",
      faqs: [
        { question: "What is JSONPath?", answer: "JSONPath is a query language used to extract specific data from JSON objects, similar to XPath for XML." },
        { question: "How does JSON Path Finder work?", answer: "You enter a JSONPath expression, and the tool finds and extracts the data corresponding to that path from the JSON object." },
        { question: "Can I extract data from large JSON files?", answer: "Yes, the tool can process large JSON files and extract data using JSONPath queries." },
        { question: "Is this tool free?", answer: "Yes, JSON Path Finder is completely free to use." },
        { question: "Can I use complex JSONPath expressions?", answer: "Yes, the tool supports advanced JSONPath syntax for more detailed queries." }
      ],
      keywords: "json path finder, jsonpath tool, extract json data, json path extractor, find json values, json path search, jsonpath query",
      slug: "/tool/json-path-finder",
      component: JsonPath
    },
    {
      name: "JSON Diff Checker",
      icon: 'GitCompare',
      description: "JSON Diff Checker compares two JSON objects side-by-side and highlights the differences for easy analysis. It helps developers compare different versions of JSON data, track changes, and identify discrepancies between two objects, making it a valuable tool for debugging, data migrations, or API responses comparison.",
      faqs: [
        { question: "What is JSON Diff Checker?", answer: "It compares two JSON objects and highlights the differences between them." },
        { question: "How does JSON Diff Checker highlight differences?", answer: "It uses color-coding to highlight added, removed, or changed values in the JSON objects." },
        { question: "Can I compare large JSON files?", answer: "Yes, the tool can compare large JSON files and show differences between them." },
        { question: "Is this tool free?", answer: "Yes, JSON Diff Checker is free to use." },
        { question: "What kind of JSON data can I compare?", answer: "You can compare any valid JSON data, whether it's simple or complex." }
      ],
      keywords: "json diff checker, compare json, json difference finder, json compare tool, json diff tool, compare two json, json comparison",
      slug: "/tool/json-diff-checker",
      component: JsonDiff
    }
  ]
}

export default jsonTools;