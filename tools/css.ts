import { CssMinifier, CSSFormatter, CSSFlexbox, CSSGradient, BoxShadow, CSSAnimation, HexRgba, ResponsiveTextTester } from "@/components/tools/css";

const cssTools = {
  name: "CSS Tools",
  icon: 'BracesIcon',
  tools: [
    {
      name: "CSS Minifier",
      icon: 'Minimize',
      description: "Quickly minify CSS to reduce file size and improve loading speeds. By removing unnecessary spaces, comments, and characters, this tool ensures your CSS is compact and efficient. It's perfect for developers looking to optimize their websites for better performance. The minified code is ideal for production environments where loading times are crucial. Use it to reduce the size of your CSS files without losing any functionality or design elements.",
      faqs: [
        { question: "How does the CSS Minifier work?", answer: "It removes unnecessary characters like spaces and comments from the CSS code." },
        { question: "Can I minify multiple files?", answer: "Currently, you can minify one CSS file at a time." },
        { question: "Is the tool free?", answer: "Yes, the CSS Minifier is completely free to use." },
        { question: "Does the minified CSS affect the layout?", answer: "No, the functionality and layout remain the same after minification." },
        { question: "Can I undo the minification?", answer: "No, the minification is irreversible without the original unminified file." }
      ],
      keywords: "CSS minifier, minify CSS, compress CSS, reduce CSS size, CSS optimization, online CSS minifier, CSS file compressor, CSS code minifier",
      slug: "/tool/css-minifier",
      component: CssMinifier
    },
    {
      name: "CSS Formatter",
      icon: 'FileJsonIcon',
      description: "Beautify and format your unorganized CSS code for better readability. This tool organizes your CSS into a structured and well-indented format, making it easier to read and debug. It's perfect for working with complex or messy CSS code, helping developers to maintain clean and consistent styling. Whether you're collaborating with a team or working on a solo project, a well-formatted CSS file improves workflow. It ensures your code stays neat and understandable, making future edits simpler.",
      faqs: [
        { question: "How does the CSS Formatter work?", answer: "It formats your CSS by adding indentation, spacing, and organizing the code." },
        { question: "Can I format external CSS files?", answer: "Yes, you can format external CSS by pasting the code into the tool." },
        { question: "Does it fix syntax errors?", answer: "No, it doesn’t fix errors, but it makes them easier to spot." },
        { question: "Can I format SCSS or SASS code?", answer: "No, it only works with CSS, not SCSS or SASS." },
        { question: "Is the tool free to use?", answer: "Yes, the CSS Formatter is free and can be used unlimited times." }
      ],
      keywords: "CSS formatter, beautify CSS, format CSS, CSS beautifier, organize CSS, CSS code formatter, CSS code beautifier, tidy CSS code",
      slug: "/tool/css-formatter",
      component: CSSFormatter
    },
    {
      name: "Flexbox Generator",
      icon: 'BoxesIcon',
      description: "Easily generate CSS Flexbox layouts with live previews. This tool allows you to create flexible, responsive layouts without writing complex CSS code. It gives you control over item alignment, order, and wrapping to build adaptable designs for various screen sizes. The real-time preview feature helps you visualize the layout as you make adjustments, speeding up the design process. It's an ideal tool for developers looking to implement modern CSS layouts quickly and efficiently.",
      faqs: [
        { question: "What is Flexbox?", answer: "Flexbox is a CSS layout model that allows easy arrangement and distribution of space among items." },
        { question: "Can I save the generated code?", answer: "Yes, you can copy or download the generated Flexbox CSS code." },
        { question: "Does this support nested Flexbox layouts?", answer: "Yes, you can nest Flexbox layouts inside other Flexbox containers." },
        { question: "Can I preview the layout on different screen sizes?", answer: "Yes, the live preview adapts to various screen sizes automatically." },
        { question: "Is Flexbox compatible with all browsers?", answer: "Flexbox is supported by most modern browsers, but may not fully work in older versions." }
      ],
      keywords: "flexbox generator, CSS flexbox, layout generator, CSS layout tools, flexbox preview, flexbox designer, CSS alignment tools, flexbox visualizer",
      slug: "/tool/flexbox-generator",
      component: CSSFlexbox
    },
    {
      name: "CSS Gradient Generator",
      icon: 'PaletteIcon',
      description: "Create and customize CSS gradient backgrounds with ease. The CSS Gradient Generator allows you to design vibrant gradient effects with just a few clicks. Customize the angle, color stops, and direction of the gradient for unique background designs. It’s perfect for giving your website a modern and professional look with beautiful gradient backgrounds. The real-time preview feature allows you to see your changes as you make them, ensuring a smooth design experience.",
      faqs: [
        { question: "What is a CSS gradient?", answer: "A CSS gradient is a smooth transition between two or more colors in a web design." },
        { question: "Can I use multiple color stops?", answer: "Yes, you can add multiple color stops to create complex gradient effects." },
        { question: "Can I customize the gradient angle?", answer: "Yes, you can adjust the angle of the gradient to fit your design needs." },
        { question: "Is the generated gradient code compatible with all browsers?", answer: "Yes, the generated gradient code works across modern browsers." },
        { question: "Can I save the gradient for later use?", answer: "Yes, you can copy or download the gradient code to use later." }
      ],
      keywords: "CSS gradient generator, gradient backgrounds, create gradients, CSS background generator, gradient editor, CSS gradient tool, gradient designer, color gradient generator",
      slug: "/tool/css-gradient-generator",
      component: CSSGradient
    },
    {
      name: "Box Shadow Generator",
      icon: 'BoxIcon',
      description: "Generate CSS box shadows with customizable blur, spread, and offsets. This tool makes it easy to create stunning shadow effects for your elements without writing complex CSS. You can adjust the shadow's color, size, and spread to match your design needs. Box shadows add depth and visual interest to your website’s elements, improving user interaction. The preview feature helps you visualize the shadow effect before implementing it into your code.",
      faqs: [
        { question: "What is a CSS box shadow?", answer: "A box shadow is a visual effect that adds depth by creating a shadow around an element." },
        { question: "Can I adjust the blur and spread of the shadow?", answer: "Yes, you can customize the blur, spread, and offset to get the perfect shadow effect." },
        { question: "Does this tool support multiple shadows?", answer: "Yes, you can generate multiple shadows for a single element." },
        { question: "Can I change the shadow color?", answer: "Yes, you can customize the color of the shadow to fit your design palette." },
        { question: "Is the shadow effect visible on all browsers?", answer: "Yes, CSS box shadows are supported by most modern browsers." }
      ],
      keywords: "box shadow generator, CSS shadows, shadow generator, CSS box shadow, box shadow editor, CSS shadow designer, shadow customization, box shadow preview",
      slug: "/tool/box-shadow-generator",
      component: BoxShadow
    },
    {
      name: "CSS Animation Generator",
      icon: 'ActivityIcon',
      description: "Create CSS animations with keyframes and custom properties. This tool allows you to generate dynamic animations for web elements, offering full control over timing, duration, and transition effects. With a user-friendly interface, you can easily customize animations to suit your design needs. Whether you want to animate buttons, text, or images, this tool provides an efficient way to create engaging, smooth animations. The real-time preview feature helps you visualize the animation as you design it.",
      faqs: [
        { question: "How do CSS animations work?", answer: "CSS animations use keyframes to define the state of an element at various points, creating smooth transitions between those states." },
        { question: "Can I use custom properties in animations?", answer: "Yes, you can use CSS custom properties (variables) to add flexibility and control over your animations." },
        { question: "Is there a limit to the number of animations?", answer: "No, you can create multiple animations for different elements on the same page." },
        { question: "How can I preview the animations?", answer: "You can preview the animation in real-time before generating the CSS code." },
        { question: "Is the tool free to use?", answer: "Yes, the CSS Animation Generator is completely free to use." }
      ],
      keywords: "CSS animation generator, CSS animations, animation creator, CSS keyframe generator, create CSS animations, CSS animation editor, animate CSS, CSS transitions",
      slug: "/tool/css-animation-generator",
      component: CSSAnimation
    },
    {
      name: "Hex to RGBA Converter",
      icon: 'HashIcon',
      description: "Easily convert hex color codes to RGBA format for transparency control. This tool allows you to quickly convert any hex color code to its corresponding RGBA value, enabling you to control the transparency of elements. It's an essential tool for web developers working with color overlays, backgrounds, and elements requiring opacity. The RGBA format offers flexibility in adding transparency to colors for modern web designs. Simply enter a hex code and get the RGBA color code in seconds.",
      faqs: [
        { question: "What is RGBA?", answer: "RGBA is a color model that includes Red, Green, Blue, and Alpha (opacity), allowing for transparent colors." },
        { question: "Can I convert RGB to RGBA?", answer: "Yes, RGB colors can be converted to RGBA by adding an alpha value for transparency." },
        { question: "Does the converter support short hex codes?", answer: "Yes, it supports both long (6 characters) and short (3 characters) hex codes." },
        { question: "What is the maximum opacity value in RGBA?", answer: "The alpha value in RGBA ranges from 0 (completely transparent) to 1 (fully opaque)." },
        { question: "Can I use RGBA in all browsers?", answer: "Yes, RGBA is supported in all modern browsers." }
      ],
      keywords: "hex to RGBA converter, convert hex to RGBA, hex color converter, RGBA color tool, hex to RGBA online, color format converter, CSS color tools, hex to RGBA conversion",
      slug: "/tool/hex-to-rgba-converter",
      component: HexRgba
    },
    {
      name: "Responsive Text Tester",
      icon: 'LetterText',
      description: "Test and preview responsive text styles across different screen sizes. This tool helps you check how text will scale and adjust on various devices, ensuring readability and optimal design. It’s perfect for web developers who want to implement responsive typography using CSS. You can modify the text size, line height, and other properties to see how they adapt to different screen sizes in real-time. This ensures that your typography is consistent and legible on all devices.",
      faqs: [
        { question: "What does responsive text mean?", answer: "Responsive text adjusts its size and layout based on the screen size or viewport to ensure readability." },
        { question: "Can I test custom fonts?", answer: "Yes, you can test different font types along with various size and scaling options." },
        { question: "Is the preview real-time?", answer: "Yes, the preview updates in real-time as you modify the text properties." },
        { question: "Can I adjust the font size using media queries?", answer: "Yes, you can simulate how text will look under different media queries to test its responsiveness." },
        { question: "Is the tool free to use?", answer: "Yes, the Responsive Text Tester is available for free." }
      ],
      keywords: "responsive text tester, responsive typography, text size tester, CSS text scaling, responsive text preview, typography tools, CSS font tools, text responsiveness",
      slug: "/tool/responsive-text-tester",
      component: ResponsiveTextTester
    }
  ]
}

  export default cssTools;