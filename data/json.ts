import { JsonFormatter, JsonValidator, JsonCsv, CsvJson, JsonMinify, JsonPath, JsonDiff } from "@/components/tools/json";

const jsonTools = {
  name: "JSON Tools",
  icon: 'FileJson',
  tools: [
    {
      name: "JSON Formatter",
      icon: 'BracesIcon',
      description: "Formats and beautifies JSON data to make it human-readable and easier to debug.",
      keywords: "json formatter, beautify json, format json, json beautifier, pretty json, json beautify tool, format json online",
      slug: "/tool/json-formatter",
      component: JsonFormatter
    },
    {
      name: "JSON Validator",
      icon: 'Check',
      description: "Checks and validates JSON data to ensure correct syntax and structure.",
      keywords: "json validator, validate json, json checker, check json syntax, online json validator, json validation tool, json syntax checker",
      slug: "/tool/json-validator",
      component: JsonValidator
    },
    {
      name: "JSON to CSV Converter",
      icon: 'File',
      description: "Converts JSON data into CSV format for easier use in spreadsheets and data analysis.",
      keywords: "json to csv, convert json to csv, json to csv converter, export json to csv, convert json, json data to csv, json csv tool",
      slug: "/tool/json-to-csv",
      component: JsonCsv
    },
    {
      name: "CSV to JSON Converter",
      icon: 'FileJson',
      description: "Transforms CSV files into JSON format for seamless use in APIs and applications.",
      keywords: "csv to json, convert csv to json, csv json converter, csv to json tool, convert csv, csv to json parser, csv data to json",
      slug: "/tool/csv-to-json",
      component: CsvJson
    },
    {
      name: "JSON Minifier",
      icon: 'Minimize',
      description: "Minifies JSON data by removing unnecessary spaces to reduce file size and improve performance.",
      keywords: "json minifier, minify json, compress json, json compression, reduce json size, minimize json, json optimizer",
      slug: "/tool/json-minifier",
      component: JsonMinify
    },
    {
      name: "JSON Path Finder",
      icon: 'RouteIcon',
      description: "Finds and extracts specific values or data paths from JSON objects using JSONPath syntax.",
      keywords: "json path finder, jsonpath tool, extract json data, json path extractor, find json values, json path search, jsonpath query",
      slug: "/tool/json-path-finder",
      component: JsonPath
    },
    {
      name: "JSON Diff Checker",
      icon: 'GitCompare',
      description: "Compares two JSON objects side-by-side and highlights the differences for easy analysis.",
      keywords: "json diff checker, compare json, json difference finder, json compare tool, json diff tool, compare two json, json comparison",
      slug: "/tool/json-diff-checker",
      component: JsonDiff
    }
  ]
}

export default jsonTools;