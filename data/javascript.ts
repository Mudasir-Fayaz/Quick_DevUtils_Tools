import { CodeBeautifier, JSFormatter, JSMinifier, JSObfuscator, JSONViewer, RegexTester, JSConsole } from "@/components/tools/javascript";

import { ToolCategory } from "@/types";

const javascriptTools: ToolCategory = {
  name: "JavaScript Tools",
  icon: 'Code',
  tools: [
    {
      name: "JavaScript Minifier",
      icon: 'Code',
      description: "Effortlessly minify JavaScript code by removing unnecessary characters, improving file size and performance.",
      keywords: "JavaScript minifier, minify JavaScript, compress JavaScript, JS minification, reduce JavaScript size, optimize JavaScript",
      slug: "/tool/javascript-minifier",
      component: JSMinifier
    },
    {
      name: "JavaScript Formatter",
      icon: 'Code',
      description: "Formats and organizes JavaScript code to improve readability and consistency.",
      keywords: "JavaScript formatter, beautify JavaScript, format JavaScript, code formatting, readable JavaScript, JavaScript beautifier",
      slug: "/tool/javascript-formatter",
      component: JSFormatter
    },
    {
      name: "Regex Tester",
      icon: 'Code',
      description: "Quickly test and debug regular expressions against sample input strings.",
      keywords: "regex tester, test regex, regular expression tester, regex debugging, regex validator, validate regex patterns",
      slug: "/tool/regex-tester",
      component: RegexTester
    },
    {
      name: "JavaScript Obfuscator",
      icon: 'Code',
      description: "Secure your JavaScript code by obfuscating it, making it difficult to read or reverse-engineer.",
      keywords: "JavaScript obfuscator, obfuscate JavaScript, secure JavaScript, JavaScript security, protect JavaScript code, JavaScript encryption",
      slug: "/tool/javascript-obfuscator",
      component: JSObfuscator
    },
    {
      name: "JSON Viewer",
      icon: 'Code',
      description: "View and parse JSON data in a tree format for easier exploration and analysis.",
      keywords: "JSON viewer, parse JSON, view JSON, JSON tree viewer, JSON formatter, analyze JSON, structured JSON view",
      slug: "/tool/json-viewer",
      component: JSONViewer
    },
    {
      name: "Code Beautifier",
      icon: 'Code',
      description: "Beautify and reformat messy JavaScript code into a clean and readable format.",
      keywords: "code beautifier, beautify JavaScript, format JavaScript, code cleaner, JavaScript formatting, reformat code",
      slug: "/tool/code-beautifier",
      component: CodeBeautifier
    },
    {
      name: "JavaScript Console",
      icon: 'Code',
      description: "Run and test JavaScript code snippets in a browser-like environment, perfect for quick debugging.",
      keywords: "JavaScript console, run JavaScript, test JavaScript, JS console, JavaScript debugger, execute JS code, JavaScript snippets",
      slug: "/tool/javascript-console",
      component: JSConsole
    }
  ]
};

  export default javascriptTools;