import { CodeBeautifier, JSFormatter, JSMinifier, JSObfuscator, JSONViewer, RegexTester, JSConsole } from "@/components/tools/javascript";

import { ToolCategory } from "@/types";

const javascriptTools: ToolCategory = {
  name: "JavaScript Tools",
  icon: 'Code',
  tools: [
    {
      name: "JavaScript Minifier",
      icon: 'Code',
      description: "JavaScript Minifier helps you effortlessly minify JavaScript code by removing unnecessary characters such as spaces, line breaks, and comments. This reduces the file size, improving load times and performance for your website or web application. Minifying JavaScript is a crucial step in optimizing the code for production environments. With this tool, developers can quickly compress JavaScript files without affecting their functionality.",
      faqs: [
        { question: "What is JavaScript minification?", answer: "JavaScript minification is the process of removing unnecessary characters to reduce the size of the file and improve performance." },
        { question: "Can I minify multiple JavaScript files?", answer: "Yes, you can minify multiple JavaScript files using this tool." },
        { question: "Will minifying JavaScript break my code?", answer: "No, minification removes only unnecessary characters, keeping the code functional." },
        { question: "Why should I minify my JavaScript code?", answer: "Minifying reduces the file size, leading to faster loading times and better performance for users." },
        { question: "Is this tool free to use?", answer: "Yes, this tool is completely free to use." }
      ],
      keywords: "JavaScript minifier, minify JavaScript, compress JavaScript, JS minification, reduce JavaScript size, optimize JavaScript",
      slug: "/tool/javascript-minifier",
      component: JSMinifier
    },
    {
      name: "JavaScript Formatter",
      icon: 'Code',
      description: "JavaScript Formatter helps format and organize your JavaScript code to improve readability and consistency. It automatically indents and structures your code, making it easier for developers to read, debug, and maintain. Whether you're working with complex code or trying to clean up a messy script, this tool ensures your code is well-organized and professional-looking.",
      faqs: [
        { question: "What does a JavaScript formatter do?", answer: "It reformats JavaScript code to improve readability and structure, making it easier to debug and maintain." },
        { question: "How does the JavaScript Formatter work?", answer: "The tool automatically adds proper indentation and line breaks to the code to make it more readable." },
        { question: "Can I format large JavaScript files?", answer: "Yes, the tool can handle large JavaScript files and format them for better readability." },
        { question: "Is this tool suitable for team projects?", answer: "Yes, it helps maintain consistent code formatting across team members." },
        { question: "Does it support ES6+ syntax?", answer: "Yes, the formatter supports modern JavaScript syntax, including ES6 and later." }
      ],
      keywords: "JavaScript formatter, beautify JavaScript, format JavaScript, code formatting, readable JavaScript, JavaScript beautifier",
      slug: "/tool/javascript-formatter",
      component: JSFormatter
    },
    {
      name: "Regex Tester",
      icon: 'Code',
      description: "Regex Tester is a powerful tool that allows you to quickly test and debug regular expressions (regex) against sample input strings. It helps you validate the correctness of your regular expression patterns, making it easier to identify issues and optimize your expressions for better performance. Whether you’re a beginner or an experienced developer, this tool simplifies the regex testing process and aids in debugging.",
      faqs: [
        { question: "What is Regex Tester?", answer: "It’s a tool to test and debug regular expression patterns against sample strings." },
        { question: "Can I test multiple regex patterns at once?", answer: "Yes, you can test multiple regex patterns with different input strings." },
        { question: "Does the tool highlight errors in regex patterns?", answer: "Yes, the tool helps identify mistakes or errors in your regex patterns." },
        { question: "Can I save my regex tests?", answer: "No, currently, regex tests are not saved, but you can quickly re-enter them for testing." },
        { question: "Is this tool suitable for beginners?", answer: "Yes, it's perfect for both beginners and experienced developers working with regular expressions." }
      ],
      keywords: "regex tester, test regex, regular expression tester, regex debugging, regex validator, validate regex patterns",
      slug: "/tool/regex-tester",
      component: RegexTester
    },
    {
      name: "JavaScript Obfuscator",
      icon: 'Code',
      description: "JavaScript Obfuscator helps secure your JavaScript code by obfuscating it, making it difficult to read or reverse-engineer. This tool transforms your source code into a scrambled and complex version, protecting intellectual property and preventing unauthorized use or tampering. Ideal for developers who need to protect their code in production environments.",
      faqs: [
        { question: "What is JavaScript obfuscation?", answer: "Obfuscation is the process of converting readable JavaScript code into a more complex and less understandable format to protect it from reverse engineering." },
        { question: "Why would I obfuscate my JavaScript code?", answer: "Obfuscation helps protect your code from being easily understood or copied by unauthorized users." },
        { question: "Does obfuscation impact performance?", answer: "There may be a slight impact on performance, but it is usually minimal compared to the security benefits." },
        { question: "Can I revert obfuscated code back to its original form?", answer: "No, once obfuscated, the code is difficult to revert back to its original, readable form." },
        { question: "Is this tool free to use?", answer: "Yes, this tool is completely free." }
      ],
      keywords: "JavaScript obfuscator, obfuscate JavaScript, secure JavaScript, JavaScript security, protect JavaScript code, JavaScript encryption",
      slug: "/tool/javascript-obfuscator",
      component: JSObfuscator
    },
    {
      name: "JSON Viewer",
      icon: 'Code',
      description: "JSON Viewer helps you view and parse JSON data in a tree format, making it easier to explore and analyze the structure of JSON objects. It helps developers understand complex JSON structures and quickly spot issues or errors in the data. This tool is essential for debugging API responses or working with JSON-formatted data in web applications.",
      faqs: [
        { question: "What is JSON Viewer?", answer: "It’s a tool that helps you view and parse JSON data in a readable tree format." },
        { question: "How does this tool help with JSON data?", answer: "It helps visualize JSON data in a structured format, making it easier to understand and debug." },
        { question: "Can I edit JSON data in this tool?", answer: "No, the tool only allows you to view and analyze JSON data." },
        { question: "Is this tool useful for working with APIs?", answer: "Yes, it’s great for debugging API responses and analyzing complex JSON data." },
        { question: "Does it support large JSON files?", answer: "Yes, it can handle large JSON files and display them in a readable format." }
      ],
      keywords: "JSON viewer, parse JSON, view JSON, JSON tree viewer, JSON formatter, analyze JSON, structured JSON view",
      slug: "/tool/json-viewer",
      component: JSONViewer
    },
    {
      name: "Code Beautifier",
      icon: 'Code',
      description: "Code Beautifier is a tool that helps beautify and reformat messy JavaScript code into a clean and readable format. It automatically organizes your code with proper indentation, line breaks, and structure. This tool is a time-saver for developers who need to quickly clean up their code for better readability and maintenance.",
      faqs: [
        { question: "What is Code Beautifier?", answer: "It’s a tool that beautifies and formats messy JavaScript code into a cleaner and more readable format." },
        { question: "Can I format large JavaScript files?", answer: "Yes, it can handle and format large JavaScript files for better readability." },
        { question: "Does it support other programming languages?", answer: "Currently, it only supports JavaScript formatting." },
        { question: "Will this tool help with debugging?", answer: "While it doesn’t directly debug code, it helps improve code readability, which can aid in debugging." },
        { question: "Is it free?", answer: "Yes, the Code Beautifier is completely free." }
      ],
      keywords: "code beautifier, beautify JavaScript, format JavaScript, code cleaner, JavaScript formatting, reformat code",
      slug: "/tool/code-beautifier",
      component: CodeBeautifier
    },
    {
      name: "JavaScript Console",
      icon: 'Code',
      description: "JavaScript Console is a tool that allows you to run and test JavaScript code snippets in a browser-like environment, making it ideal for quick debugging and testing. It enables you to execute JavaScript directly within the tool and view the results instantly. This tool is perfect for developers who need a fast and easy way to test JavaScript code without opening a browser's developer tools.",
      faqs: [
        { question: "What is the JavaScript Console?", answer: "It’s a tool that lets you run and test JavaScript code in a browser-like environment." },
        { question: "Can I run multiple JavaScript snippets?", answer: "Yes, you can run multiple JavaScript code snippets sequentially." },
        { question: "Does this tool support ES6+ features?", answer: "Yes, it supports modern JavaScript features such as ES6 and beyond." },
        { question: "Can I debug my JavaScript code in this console?", answer: "While it doesn’t offer full debugging features, it allows for quick testing of JavaScript code." },
        { question: "Is this tool free to use?", answer: "Yes, the JavaScript Console is completely free to use." }
      ],
      keywords: "JavaScript console, run JavaScript, test JavaScript, JS console, JavaScript debugger, execute JS code, JavaScript snippets",
      slug: "/tool/javascript-console",
      component: JSConsole
    }
  ]
};

  export default javascriptTools;