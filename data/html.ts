import { HtmlEntityEd, HtmlFormatter, HtmlMarkdown, HtmlMinifier, HtmlTableGen, HTMLViewer, MarkdownViewer, MetaTags, ResponsiveTesting } from "@/components/tools/html";
import { ToolCategory } from "@/types";


const htmlTools: ToolCategory = {
  name: "HTML Tools",
  icon: "Code",
  tools: [
    {
      name: "HTML Viewer",
      icon: "FileCodeIcon",
      description: "View, format, and preview HTML code with enhanced readability.",
      keywords: "HTML viewer, HTML formatter, beautify HTML, HTML code viewer, format HTML, HTML previewer, online HTML tool, HTML beautifier, code readability, web development tool",
      slug: "/tool/html-viewer",
      component: HTMLViewer
    },
    {
      name: "Markdown Viewer",
      icon: "FileCodeIcon",
      description: "Render and preview Markdown content as HTML for better visualization.",
      keywords: "Markdown viewer, Markdown to HTML, Markdown previewer, Markdown renderer, view Markdown, Markdown to web, Markdown formatting, online Markdown tool, text to HTML, web development",
      slug: "/tool/markdown-viewer",
      component: MarkdownViewer
    },
    {
      name: "HTML Formatter",
      icon: "FileCodeIcon",
      description: "Formats and beautifies messy or minified HTML for better readability.",
      keywords: "HTML formatter, beautify HTML, format HTML, prettify HTML, HTML beautifier, HTML formatting tool, online HTML formatter, code beautifier, readable HTML, web tools",
      slug: "/tool/html-formatter",
      component: HtmlFormatter
    },
    {
      name: "HTML Minifier",
      icon: "MinimizeIcon",
      description: "Compresses and minifies HTML files to reduce size and improve performance.",
      keywords: "HTML minifier, minify HTML, compress HTML, optimize HTML, HTML compressor, HTML size reducer, web optimization, lightweight HTML, performance optimization, reduce HTML size",
      slug: "/tool/html-minifier",
      component: HtmlMinifier
    },
    {
      name: "HTML to Markdown Converter",
      icon: "Heading1",
      description: "Easily converts HTML code into Markdown format for simplified content editing.",
      keywords: "HTML to Markdown, HTML to Markdown converter, convert HTML, HTML to text, Markdown conversion, Markdown tools, content conversion, HTML simplifier, Markdown editor, HTML formatter",
      slug: "/tool/html-to-markdown",
      component: HtmlMarkdown
    },
    {
      name: "HTML Entity Encoder/Decoder",
      icon: "Code",
      description: "Encodes or decodes special characters in HTML entities for clean code.",
      keywords: "HTML entity encoder, HTML entity decoder, encode HTML entities, decode HTML entities, special character encoding, HTML special characters, web development tools, entity converter, HTML clean-up, code tools",
      slug: "/tool/html-entity-encoder-decoder",
      component: HtmlEntityEd
    },
    {
      name: "HTML Table Generator",
      icon: "Table",
      description: "Easily create customizable HTML tables from data with styling options.",
      keywords: "HTML table generator, create HTML table, table maker, table HTML code, dynamic table generator, online table creator, HTML table builder, responsive tables, table design, web tools",
      slug: "/tool/html-table-generator",
      component: HtmlTableGen
    },
    {
      name: "Meta Tag Generator",
      icon: "TagIcon",
      description: "Generate SEO-friendly meta tags for better search engine optimization.",
      keywords: "meta tag generator, SEO meta tags, create meta tags, meta description generator, SEO tools, online meta tag tool, HTML meta tags, meta title generator, website SEO, meta keywords",
      slug: "/tool/meta-tag-generator",
      component: MetaTags
    },
    {
      name: "Responsive Test",
      icon: "TabletSmartphone",
      description: "Test how your HTML looks and behaves across different screen sizes.",
      keywords: "responsive test, screen size tester, test HTML responsiveness, responsive HTML, mobile-friendly test, device responsiveness, web design test, adaptive layouts, online responsive tool, screen resolution tester",
      slug: "/tool/responsive-test",
      component: ResponsiveTesting
    }
  ]
}

  export default htmlTools;