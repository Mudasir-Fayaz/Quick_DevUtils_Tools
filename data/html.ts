import { HtmlEntityEd, HtmlFormatter, HtmlMarkdown, HtmlMinifier, HtmlTableGen, HTMLViewer, MarkdownViewer, MetaTags, ResponsiveTesting } from "@/components/tools/html";
import { ToolCategory } from "@/types";


const htmlTools: ToolCategory = {
  name: "HTML Tools",
  icon: "Code",
  tools: [
    {
      name: "HTML Viewer",
      icon: "FileCodeIcon",
      description: "HTML Viewer allows you to view, format, and preview HTML code with enhanced readability. It simplifies the process of inspecting HTML documents and ensures clean formatting, making it easy to visualize the structure and content. This tool is perfect for web developers, designers, and anyone working with HTML code. It ensures that your code is formatted correctly, improving the readability and maintenance of your projects. Whether you're debugging or reviewing, the HTML Viewer is an essential tool for improving the web development workflow.",
      faqs: [
        { question: "What does HTML Viewer do?", answer: "It formats and previews HTML code for better readability and visualization." },
        { question: "Can I view HTML code directly in the viewer?", answer: "Yes, you can paste or upload HTML code, and the viewer will display it." },
        { question: "Does it format messy HTML?", answer: "Yes, it beautifies and formats messy or minified HTML code." },
        { question: "Is it possible to view HTML in a live preview?", answer: "Yes, the tool provides a live preview of the formatted HTML." },
        { question: "Can I use this tool for large HTML files?", answer: "Yes, the tool can handle large HTML files, but performance may vary depending on file size." }
      ],
      keywords: "HTML viewer, HTML formatter, beautify HTML, HTML code viewer, format HTML, HTML previewer, online HTML tool, HTML beautifier, code readability, web development tool",
      slug: "/tool/html-viewer",
      component: HTMLViewer
    },
    {
      name: "Markdown Viewer",
      icon: "FileCodeIcon",
      description: "Markdown Viewer renders and previews Markdown content as HTML for better visualization. This tool is essential for converting Markdown syntax into formatted HTML, making it easy to preview how the content will appear on a web page. It helps users understand the final structure without needing to open a Markdown renderer. Whether you're working on documentation or content editing, this tool simplifies the process of visualizing Markdown. It's a handy tool for web developers and content creators who frequently use Markdown for web-based content.",
      faqs: [
        { question: "What does Markdown Viewer do?", answer: "It renders and previews Markdown content as HTML." },
        { question: "Can I view my Markdown file in HTML format?", answer: "Yes, you can paste your Markdown content, and the tool will generate a live HTML preview." },
        { question: "Is this tool suitable for web content creators?", answer: "Yes, it helps content creators visualize Markdown content in HTML before publishing." },
        { question: "Does it support all Markdown syntax?", answer: "It supports most Markdown syntax but may not handle every extension or custom syntax." },
        { question: "Can I save the converted content?", answer: "Currently, the tool only provides previews and doesn't support saving the converted content." }
      ],
      keywords: "Markdown viewer, Markdown to HTML, Markdown previewer, Markdown renderer, view Markdown, Markdown to web, Markdown formatting, online Markdown tool, text to HTML, web development",
      slug: "/tool/markdown-viewer",
      component: MarkdownViewer
    },
    {
      name: "HTML Formatter",
      icon: "FileCodeIcon",
      description: "HTML Formatter is a tool that beautifies and formats messy or minified HTML code to make it more readable. It automatically corrects the formatting, such as indentations and line breaks, to ensure your HTML is structured in a way that’s easier to understand and maintain. Perfect for web developers working with poorly formatted HTML, this tool improves readability and reduces debugging time. It’s a must-have for any developer needing to work with raw or compressed HTML code efficiently. Whether you're debugging, reviewing, or optimizing HTML, the formatter enhances your workflow.",
      faqs: [
        { question: "What does HTML Formatter do?", answer: "It beautifies and formats messy or minified HTML code." },
        { question: "Can it fix improperly indented HTML?", answer: "Yes, it automatically fixes indentation and structure to make the HTML more readable." },
        { question: "Does it support large HTML files?", answer: "Yes, the tool can handle both small and large HTML files for formatting." },
        { question: "Can I format HTML directly from a URL?", answer: "Currently, the tool requires you to paste the HTML code, but URL-based formatting may be available in future updates." },
        { question: "Is this tool free?", answer: "Yes, HTML Formatter is completely free to use." }
      ],
      keywords: "HTML formatter, beautify HTML, format HTML, prettify HTML, HTML beautifier, HTML formatting tool, online HTML formatter, code beautifier, readable HTML, web tools",
      slug: "/tool/html-formatter",
      component: HtmlFormatter
    },
    {
      name: "HTML Minifier",
      icon: "MinimizeIcon",
      description: "HTML Minifier is a tool that compresses and minifies HTML files, reducing their size to improve website performance. By removing unnecessary spaces, line breaks, and comments, the tool significantly decreases the file size, making it ideal for web developers focused on optimizing page load times. Smaller HTML files mean faster loading, better user experience, and improved SEO rankings. This tool is essential for developers looking to optimize their websites and reduce bandwidth usage. It’s simple, fast, and efficient for any website optimization project.",
      faqs: [
        { question: "What does HTML Minifier do?", answer: "It compresses and minifies HTML files by removing unnecessary spaces, comments, and line breaks." },
        { question: "How much can HTML Minifier reduce file size?", answer: "It can reduce the file size by up to 50% or more depending on the HTML content." },
        { question: "Does it affect the functionality of my website?", answer: "No, it only removes unnecessary formatting, and the functionality remains the same." },
        { question: "Can I use this tool for large HTML files?", answer: "Yes, the tool can handle both small and large HTML files efficiently." },
        { question: "Is HTML Minifier free?", answer: "Yes, this tool is free to use." }
      ],
      keywords: "HTML minifier, minify HTML, compress HTML, optimize HTML, HTML compressor, HTML size reducer, web optimization, lightweight HTML, performance optimization, reduce HTML size",
      slug: "/tool/html-minifier",
      component: HtmlMinifier
    },
    {
      name: "HTML to Markdown Converter",
      icon: "Heading1",
      description: "HTML to Markdown Converter helps simplify content editing by converting HTML code into the Markdown format. It allows users to edit content more easily in a text-based format, which is cleaner and easier to work with. The tool is designed for content creators, web developers, and anyone who wants to convert complex HTML content into simpler Markdown. Whether you're looking to migrate content from HTML to Markdown or simplify editing workflows, this tool streamlines the process. It’s an efficient solution for content editing and conversion tasks.",
      faqs: [
        { question: "What does HTML to Markdown Converter do?", answer: "It converts HTML code into Markdown format, making it easier to edit and work with." },
        { question: "Is this tool useful for content migration?", answer: "Yes, it helps convert content from HTML to Markdown for easier content management." },
        { question: "Can I convert complex HTML to Markdown?", answer: "Yes, the tool handles most HTML code, but some complex elements may need manual adjustments." },
        { question: "Can I preview the converted Markdown?", answer: "Currently, the tool only converts HTML to Markdown without providing a preview." },
        { question: "Is this tool free to use?", answer: "Yes, HTML to Markdown Converter is free to use." }
      ],
      keywords: "HTML to Markdown, HTML to Markdown converter, convert HTML, HTML to text, Markdown conversion, Markdown tools, content conversion, HTML simplifier, Markdown editor, HTML formatter",
      slug: "/tool/html-to-markdown",
      component: HtmlMarkdown
    },
    {
      name: "HTML Entity Encoder/Decoder",
      icon: "Code",
      description: "HTML Entity Encoder/Decoder helps encode or decode special characters in HTML entities for clean and readable code. It converts characters like '<', '>', '&', and others into their corresponding HTML entities to ensure proper formatting in web content. This tool is crucial for developers who need to handle special characters in HTML, especially when working with content that may conflict with HTML syntax. It also simplifies the process of cleaning up and converting encoded characters back to their original form for better display and readability.",
      faqs: [
        { question: "What does the HTML Entity Encoder/Decoder do?", answer: "It encodes or decodes special characters in HTML code to ensure proper formatting." },
        { question: "Why would I need to encode HTML entities?", answer: "Encoding ensures special characters are displayed correctly in web browsers without causing HTML syntax errors." },
        { question: "Can this tool decode encoded HTML entities?", answer: "Yes, it can convert HTML entities back into their original characters for easier reading and editing." },
        { question: "Is this tool suitable for cleaning up HTML code?", answer: "Yes, it’s perfect for cleaning up and ensuring proper formatting of HTML code." },
        { question: "Does this tool support all HTML entities?", answer: "Yes, it supports all standard HTML entities used in web development." }
      ],
      keywords: "HTML entity encoder, HTML entity decoder, encode HTML entities, decode HTML entities, special character encoding, HTML special characters, web development tools, entity converter, HTML clean-up, code tools",
      slug: "/tool/html-entity-encoder-decoder",
      component: HtmlEntityEd
    },
    {
      name: "HTML Table Generator",
      icon: "Table",
      description: "HTML Table Generator allows users to easily create customizable HTML tables from raw data with various styling options. It helps developers quickly generate tables with the right structure, from simple to complex layouts, and apply custom styles to make them more visually appealing. This tool is ideal for anyone who needs to create data-driven tables for websites or applications, reducing the time spent coding and designing tables manually. Whether you need a dynamic table for a website or a responsive one for mobile users, this tool streamlines the process.",
      faqs: [
        { question: "What does the HTML Table Generator do?", answer: "It helps create customizable HTML tables from raw data with styling options." },
        { question: "Can I style the tables generated by this tool?", answer: "Yes, the tool allows you to apply different styles to the generated tables." },
        { question: "Can I create responsive tables?", answer: "Yes, the tool supports generating responsive tables that adapt to different screen sizes." },
        { question: "Does the tool support dynamic data?", answer: "Yes, you can input dynamic data for your tables, and it will be converted into HTML." },
        { question: "Is this tool suitable for web development projects?", answer: "Absolutely, it’s a time-saving tool for generating tables for websites and web applications." }
      ],
      keywords: "HTML table generator, create HTML table, table maker, table HTML code, dynamic table generator, online table creator, HTML table builder, responsive tables, table design, web tools",
      slug: "/tool/html-table-generator",
      component: HtmlTableGen
    },
    {
      name: "Meta Tag Generator",
      icon: "TagIcon",
      description: "Meta Tag Generator helps generate SEO-friendly meta tags, such as meta descriptions and meta keywords, for better search engine optimization (SEO). It simplifies the process of adding meta tags to your web pages, making it easier to enhance visibility and ranking on search engines. This tool is essential for website owners and developers who want to improve their site’s SEO without manually crafting each meta tag. Whether you're working on a new site or optimizing an existing one, the Meta Tag Generator makes it quick and easy to implement SEO best practices.",
      faqs: [
        { question: "What does the Meta Tag Generator do?", answer: "It helps generate SEO-friendly meta tags to improve search engine optimization." },
        { question: "Do I need to manually add meta tags to my site?", answer: "The tool automates the creation of meta tags, saving you time and effort." },
        { question: "Can I generate meta descriptions with this tool?", answer: "Yes, you can generate meta descriptions and other SEO-related meta tags." },
        { question: "Does the tool support all types of meta tags?", answer: "Yes, it supports a variety of meta tags for SEO purposes, including title, description, and keywords." },
        { question: "Is this tool useful for increasing my website's search ranking?", answer: "Yes, it helps improve SEO by providing the right meta tags for better search engine visibility." }
      ],
      keywords: "meta tag generator, SEO meta tags, create meta tags, meta description generator, SEO tools, online meta tag tool, HTML meta tags, meta title generator, website SEO, meta keywords",
      slug: "/tool/meta-tag-generator",
      component: MetaTags
    },
    {
      name: "Responsive Test",
      icon: "TabletSmartphone",
      description: "Responsive Test is a tool that lets you test how your HTML looks and behaves across different screen sizes. It’s crucial for ensuring that your web content is mobile-friendly and displays correctly on various devices, such as tablets, smartphones, and desktops. This tool simulates different screen resolutions, allowing you to view how your web pages adapt and identify potential issues in your layout or design. Whether you're a web developer or designer, this tool helps you deliver a seamless user experience across all devices and screen sizes.",
      faqs: [
        { question: "What does the Responsive Test tool do?", answer: "It tests how your HTML looks and behaves across different screen sizes and devices." },
        { question: "How can I check mobile responsiveness?", answer: "You can simulate mobile views and test how your site behaves on smartphones and tablets." },
        { question: "Does it support all screen resolutions?", answer: "Yes, it provides a variety of screen sizes to test the responsiveness of your web pages." },
        { question: "Can I test my website's responsiveness in real-time?", answer: "Yes, the tool allows you to view live previews of your website’s responsiveness." },
        { question: "Is this tool free?", answer: "Yes, the Responsive Test tool is free to use." }
      ],
      keywords: "responsive test, screen size tester, test HTML responsiveness, responsive HTML, mobile-friendly test, device responsiveness, web design test, adaptive layouts, online responsive tool, screen resolution tester",
      slug: "/tool/responsive-test",
      component: ResponsiveTesting
    }
  ]
}

  export default htmlTools;