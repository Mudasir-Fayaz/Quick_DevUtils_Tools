import { 
  UrlEncoder,
  HtmlEntities,
  UrlParser,
  DeviceInfo,
  BasicAuthGenerator,
  MetaTagGenerator,
  OtpGenerator,
  MimeTypes,
  JwtParser,
  KeycodeInfo,
  SlugGenerator,
  HtmlEditor,
  UserAgentParser,
  HttpStatusCodes,
  SafelinkDecoder
} from "@/components/tools/web";

import { ToolCategory } from "@/types";

const webTools: ToolCategory = {
  name: "Web Tools",
  icon: "Globe",
  tools: [
    {
      name: "URL Encoder",
      icon: 'Link',
      description: "Encode and decode URLs to ensure safe transmission across the web. This tool helps handle special characters in URLs to prevent errors.",
      faqs: [
        { question: "How do I encode a URL?", answer: "Paste the URL into the input field, and the tool will encode it to a URL-safe format." },
        { question: "Can I decode a URL as well?", answer: "Yes, simply paste an encoded URL, and the tool will decode it back to its original form." },
        { question: "Why do I need URL encoding?", answer: "URL encoding ensures that special characters like spaces, &, and ? are safely transmitted across the web." },
        { question: "Is this tool free?", answer: "Yes, the URL Encoder is completely free to use." }
      ],
      keywords: "url, encode, decode, web, uri",
      slug: "/tool/url-encoder",
      component: UrlEncoder
    },
    {
      name: "HTML Entities",
      icon: 'Code2',
      description: "Convert text to HTML entities and vice versa. This tool helps when working with special characters like &, <, > in HTML documents.",
      faqs: [
        { question: "What are HTML entities?", answer: "HTML entities are special codes used to represent characters in HTML that would otherwise be interpreted as HTML code." },
        { question: "How do I use this tool?", answer: "Paste your text into the input box, and the tool will convert it to HTML entities, or convert HTML entities back to text." },
        { question: "Why do I need HTML entities?", answer: "HTML entities are used to display characters that have special meanings in HTML, ensuring your content displays correctly." },
        { question: "Can I convert multiple entities at once?", answer: "Yes, you can convert entire paragraphs or documents at once." }
      ],
      keywords: "html, entities, encode, decode, special characters",
      slug: "/tool/html-entities",
      component: HtmlEntities
    },
    {
      name: "URL Parser",
      icon: 'Split',
      description: "Parse and analyze URL components such as the domain, path, and query parameters. This tool is useful for developers to break down and understand URLs.",
      faqs: [
        { question: "What can I do with the URL Parser?", answer: "You can input a URL, and the tool will break it down into its components like protocol, domain, query parameters, etc." },
        { question: "Can I parse URLs with complex query parameters?", answer: "Yes, the URL Parser can handle URLs with multiple query parameters and even nested values." },
        { question: "Why would I need to parse a URL?", answer: "URL parsing is useful when you need to extract specific information, such as a query parameter or the domain, from a URL." },
        { question: "Is it free?", answer: "Yes, the URL Parser is completely free to use." }
      ],
      keywords: "url, parse, query parameters, domain, path",
      slug: "/tool/url-parser",
      component: UrlParser
    },
    {
      name: "Device Information",
      icon: 'Smartphone',
      description: "View detailed device and browser information such as operating system, browser type, and device specifications. A great tool for developers and testers.",
      faqs: [
        { question: "What information does this tool provide?", answer: "The Device Information tool provides details like browser type, operating system, screen resolution, and more." },
        { question: "How can I use this tool?", answer: "Simply visit the tool, and it will automatically detect and display the details about your device and browser." },
        { question: "Why do I need this information?", answer: "Device information is useful for developers when testing apps, websites, and ensuring compatibility across different devices." },
        { question: "Can I view this information for other users?", answer: "No, the tool only displays information about your current device and browser." }
      ],
      keywords: "device, browser, system, info, detection",
      slug: "/tool/device-info",
      component: DeviceInfo
    },
    {
      name: "Basic Auth Generator",
      icon: 'Key',
      description: "Generate Basic Authentication credentials in the form of a username and password combination encoded in base64 for use in web applications.",
      faqs: [
        { question: "What is Basic Authentication?", answer: "Basic Authentication is a method for an HTTP user agent to provide a username and password when making a request." },
        { question: "How do I use this tool?", answer: "Enter your username and password, and the tool will generate the corresponding base64 encoded credentials." },
        { question: "Can I use these credentials for web APIs?", answer: "Yes, Basic Authentication credentials are often used for authenticating API requests." },
        { question: "Is this tool secure?", answer: "The tool generates credentials, but remember to use secure transmission (such as HTTPS) when sending authentication data." }
      ],
      keywords: "basic auth, authentication, credentials, base64",
      slug: "/tool/basic-auth",
      component: BasicAuthGenerator
    },
    {
      name: "Meta Tag Generator",
      icon: 'Tags',
      description: "Generate meta tags for SEO, social media, and HTML documents. This tool helps optimize content for search engines and improve social sharing appearances.",
      faqs: [
        { question: "What are meta tags?", answer: "Meta tags are snippets of text that describe a page's content, and they're used for SEO and social media optimization." },
        { question: "How do I generate meta tags?", answer: "Enter your content, and the tool will generate appropriate meta tags for you to add to your website's HTML." },
        { question: "Do meta tags help with SEO?", answer: "Yes, meta tags help search engines understand and rank your content, improving SEO." },
        { question: "Can I use this tool for social media optimization?", answer: "Yes, the tool also generates meta tags for improving how your content looks when shared on social media." }
      ],
      keywords: "meta tags, seo, social media, html",
      slug: "/tool/meta-tags",
      component: MetaTagGenerator
    },
    {
      name: "OTP Generator & Validator",
      icon: 'Shield',
      description: "Generate and validate One-Time Passwords (OTPs) for added security in user authentication, two-factor authentication (2FA), and secure login processes.",
      faqs: [
        { question: "What is an OTP?", answer: "An OTP is a one-time password used for secure user authentication that expires after a short period of time." },
        { question: "How do I generate an OTP?", answer: "Simply use the OTP Generator tool to create a secure password that can be used once for authentication." },
        { question: "What is OTP validation?", answer: "OTP validation ensures that the password entered matches the one-time password generated and hasn't expired." },
        { question: "Why use OTPs?", answer: "OTPs provide an additional layer of security, reducing the risk of unauthorized access." }
      ],
      keywords: "otp, 2fa, authentication, security",
      slug: "/tool/otp-generator",
      component: OtpGenerator
    },
    {
      name: "MIME Types",
      icon: 'FileType',
      description: "A comprehensive MIME type reference and lookup tool. This tool helps identify the content type of files based on their extensions or headers.",
      faqs: [
        { question: "What are MIME types?", answer: "MIME types (Multipurpose Internet Mail Extensions) are standard identifiers for the type of data a file contains." },
        { question: "How do I use this tool?", answer: "Simply enter a file extension or MIME type to retrieve information about it, including its content type and usage." },
        { question: "Why do MIME types matter?", answer: "MIME types are important for ensuring that files are correctly processed by browsers, email clients, and other software." },
        { question: "Can I use this tool for web development?", answer: "Yes, MIME types are frequently used in web development for proper handling of content, especially for file uploads and responses." }
      ],
      keywords: "mime, content type, file type, media type",
      slug: "/tool/mime-types",
      component: MimeTypes
    },
    {
      name: "JWT Parser",
      icon: 'KeySquare',
      description: "Parse and validate JSON Web Tokens (JWTs) to decode, verify, and understand the contents of the token for secure authentication.",
      faqs: [
        { question: "What is JWT?", answer: "JSON Web Token (JWT) is a compact, URL-safe means of representing claims between two parties." },
        { question: "How do I use the JWT Parser?", answer: "Simply paste your JWT into the input box, and the tool will decode and validate it for you." },
        { question: "Why should I validate JWTs?", answer: "Validating JWTs ensures that the token has not been tampered with and is issued by a trusted source." },
        { question: "Can I use the JWT Parser for any token?", answer: "Yes, the tool supports parsing any standard JWT." }
      ],
      keywords: "jwt, token, decode, parse, authentication",
      slug: "/tool/jwt-parser",
      component: JwtParser
    },
    {
      name: "Keycode Info",
      icon: 'Keyboard',
      description: "Get detailed information about keyboard keys and key events in JavaScript, making it useful for developers working with keyboard events.",
      faqs: [
        { question: "What is Keycode Info?", answer: "Keycode Info provides detailed information about keyboard keys and their corresponding codes." },
        { question: "How do I use this tool?", answer: "Press any key on your keyboard, and the tool will show the key's code, name, and other related details." },
        { question: "Is this tool useful for JavaScript development?", answer: "Yes, it's especially useful for developers working with keyboard events in JavaScript." },
        { question: "Can I see all keycodes?", answer: "Yes, the tool displays the keycodes for every key on the keyboard." }
      ],
      keywords: "keycode, keyboard, key events, javascript",
      slug: "/tool/keycode-info",
      component: KeycodeInfo
    },
    {
      name: "Slug Generator",
      icon: 'Text',
      description: "Generate URL-friendly slugs from text for SEO optimization, ensuring readable and concise URLs for your web pages.",
      faqs: [
        { question: "What is a slug?", answer: "A slug is the part of a URL that identifies a particular page in a way that is easy to read by both humans and search engines." },
        { question: "How do I generate a slug?", answer: "Simply enter your text, and the tool will convert it into a URL-friendly slug, replacing spaces with hyphens and removing special characters." },
        { question: "Can I customize the generated slug?", answer: "Yes, the tool allows you to edit the slug after it's generated to fit your specific needs." },
        { question: "Why do slugs matter for SEO?", answer: "Slugs are important for SEO because they provide both clarity for users and better indexing by search engines." }
      ],
      keywords: "slug, url, seo, text transform",
      slug: "/tool/slug-generator",
      component: SlugGenerator
    },
    {
      name: "HTML WYSIWYG Editor",
      icon: 'Edit3',
      description: "A rich text editor that generates clean HTML code, allowing you to format content easily for web pages or emails without coding.",
      faqs: [
        { question: "What is a WYSIWYG editor?", answer: "WYSIWYG stands for 'What You See Is What You Get'. It's a type of editor that allows you to format text visually, without needing to know HTML." },
        { question: "How do I use this editor?", answer: "Type or paste your content into the editor, and use the formatting tools to adjust text, links, images, and more." },
        { question: "Can I see the HTML output?", answer: "Yes, you can view the HTML code generated by your content using the 'HTML' button." },
        { question: "Is this tool free to use?", answer: "Yes, the HTML WYSIWYG Editor is free for all users." }
      ],
      keywords: "wysiwyg, html, editor, rich text",
      slug: "/tool/html-editor",
      component: HtmlEditor
    },
    {
      name: "User Agent Parser",
      icon: 'Scan',
      description: "Parse and analyze User Agent strings to extract details about the browser, operating system, and device being used.",
      faqs: [
        { question: "What is a User Agent?", answer: "A User Agent is a string of text sent by the browser to identify itself to the web server, providing information about the browser and device." },
        { question: "How does the User Agent Parser work?", answer: "Paste a User Agent string, and the tool will break it down to show you details such as the browser, device type, and operating system." },
        { question: "Why do I need to parse a User Agent?", answer: "Parsing a User Agent string helps developers understand which devices and browsers their users are on, which is useful for testing compatibility." },
        { question: "Can I parse any User Agent string?", answer: "Yes, you can input any User Agent string into the tool, and it will analyze it for you." }
      ],
      keywords: "user agent, browser, device, parser",
      slug: "/tool/user-agent",
      component: UserAgentParser
    },
    {
      name: "HTTP Status Codes",
      icon: 'AlertCircle',
      description: "A complete reference for HTTP status codes, providing a quick guide for developers and system administrators to understand different server responses.",
      faqs: [
        { question: "What are HTTP status codes?", answer: "HTTP status codes are responses sent from a web server to a browser indicating the outcome of the request (e.g., success, error)." },
        { question: "What does each HTTP status code mean?", answer: "Each status code represents a different server response. For example, 404 means 'Not Found' and 200 means 'OK'." },
        { question: "Why do I need to know HTTP status codes?", answer: "Understanding HTTP status codes is important for debugging, managing APIs, and ensuring a smooth user experience on websites." },
        { question: "Can I find all HTTP status codes in this tool?", answer: "Yes, this tool provides a full list of HTTP status codes with explanations for each." }
      ],
      keywords: "http, status codes, web, reference",
      slug: "/tool/http-status",
      component: HttpStatusCodes
    },
    {
      name: "Safelink Decoder",
      icon: 'UnlockKeyhole',
      description: "Decode and analyze Safelinks and URL redirects to uncover the original destination, ensuring transparency and security.",
      faqs: [
        { question: "What are Safelinks?", answer: "Safelinks are links that redirect you to another URL, often used for security or tracking purposes." },
        { question: "How does this tool work?", answer: "Paste a Safelink into the tool, and it will decode it to reveal the original URL behind the redirect." },
        { question: "Why would I want to decode a Safelink?", answer: "Decoding Safelinks ensures that the link is safe to click, as some redirects can lead to malicious websites." },
        { question: "Is this tool free?", answer: "Yes, the Safelink Decoder is available for free to all users." }
      ],
      keywords: "safelink, redirect, decode, url",
      slug: "/tool/safelink-decoder",
      component: SafelinkDecoder
    }
  ]
};

export default webTools;