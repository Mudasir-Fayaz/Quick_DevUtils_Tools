import { CssMinifier, CSSFormatter, CSSFlexbox, CSSGradient, BoxShadow, CSSAnimation, HexRgba, ResponsiveTextTester } from "@/components/tools/css";

const cssTools = {
  name: "CSS Tools",
  icon: 'BracesIcon',
  tools: [
    {
      name: "CSS Minifier",
      icon: 'Minimize',
      description: "Quickly minify CSS to reduce file size and improve loading speeds.",
      keywords: "CSS minifier, minify CSS, compress CSS, reduce CSS size, CSS optimization, online CSS minifier, CSS file compressor, CSS code minifier",
      slug: "/tool/css-minifier",
      component: CssMinifier
    },
    {
      name: "CSS Formatter",
      icon: 'FileJsonIcon',
      description: "Beautifies and formats unorganized CSS code for better readability.",
      keywords: "CSS formatter, beautify CSS, format CSS, CSS beautifier, organize CSS, CSS code formatter, CSS code beautifier, tidy CSS code",
      slug: "/tool/css-formatter",
      component: CSSFormatter
    },
    {
      name: "Flexbox Generator",
      icon: 'BoxesIcon',
      description: "Easily generate CSS Flexbox layouts with live previews.",
      keywords: "flexbox generator, CSS flexbox, layout generator, CSS layout tools, flexbox preview, flexbox designer, CSS alignment tools, flexbox visualizer",
      slug: "/tool/flexbox-generator",
      component: CSSFlexbox
    },
    {
      name: "CSS Gradient Generator",
      icon: 'PaletteIcon',
      description: "Create and customize CSS gradient backgrounds with ease.",
      keywords: "CSS gradient generator, gradient backgrounds, create gradients, CSS background generator, gradient editor, CSS gradient tool, gradient designer, color gradient generator",
      slug: "/tool/css-gradient-generator",
      component: CSSGradient
    },
    {
      name: "Box Shadow Generator",
      icon: 'BoxIcon',
      description: "Generate CSS box shadows with customizable blur, spread, and offsets.",
      keywords: "box shadow generator, CSS shadows, shadow generator, CSS box shadow, box shadow editor, CSS shadow designer, shadow customization, box shadow preview",
      slug: "/tool/box-shadow-generator",
      component: BoxShadow
    },
    {
      name: "CSS Animation Generator",
      icon: 'ActivityIcon',
      description: "Create CSS animations with keyframes and custom properties.",
      keywords: "CSS animation generator, CSS animations, animation creator, CSS keyframe generator, create CSS animations, CSS animation editor, animate CSS, CSS transitions",
      slug: "/tool/css-animation-generator",
      component: CSSAnimation
    },
    {
      name: "Hex to RGBA Converter",
      icon: 'HashIcon',
      description: "Easily convert hex color codes to RGBA format for transparency control.",
      keywords: "hex to RGBA converter, convert hex to RGBA, hex color converter, RGBA color tool, hex to RGBA online, color format converter, CSS color tools, hex to RGBA conversion",
      slug: "/tool/hex-to-rgba-converter",
      component: HexRgba
    },
    {
      name: "Responsive Text Tester",
      icon: 'LetterText',
      description: "Test and preview responsive text styles across different screen sizes.",
      keywords: "responsive text tester, responsive typography, text size tester, CSS text scaling, responsive text preview, typography tools, CSS font tools, text responsiveness",
      slug: "/tool/responsive-text-tester",
      component: ResponsiveTextTester
    }
  ]
}

  export default cssTools;