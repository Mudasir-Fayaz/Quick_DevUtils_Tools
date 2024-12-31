import { ColorContrast, ColorPicker, GradientGenerator, HexRgb, ImageColor, PaletteGenerator, ShadeTint } from "@/components/tools/color";
import { ToolCategory } from "@/types";

const colorTools: ToolCategory = {
  name: "Color Tools",
  icon: 'Palette',
  tools: [
    {
      name: "Color Picker",
      icon: 'Eye',
      description: "A tool that allows users to visually select colors and provides the corresponding HEX and RGB values. Perfect for designers, developers, and anyone working with colors. Enables precise color selection from a palette or via manual input. Useful for creating consistent color schemes. Integrates seamlessly with design projects.",
      keywords: "color picker, color selector, HEX color, RGB color, color codes, color selection",
      slug: "/tool/color-picker",
      component: ColorPicker,
      faqs: [
        { question: "How do I select a color?", answer: "Click on the color palette or input a specific HEX or RGB value to choose your color." },
        { question: "What formats are supported?", answer: "The tool provides color values in HEX and RGB formats." },
        { question: "Can I copy the color codes?", answer: "Yes, the tool allows you to copy HEX or RGB values with a single click." },
        { question: "Does it support transparency?", answer: "No, this version focuses on solid colors only." },
        { question: "Is the tool suitable for web design?", answer: "Yes, it is ideal for selecting and using web-compatible color codes." }
      ]
    },
    {
      name: "Color Palette Generator",
      icon: 'Palette',
      description: "Generates harmonious color palettes from selected colors. Ideal for designers looking to create cohesive themes for websites, apps, or branding. Offers suggestions based on color theory, such as complementary or analogous palettes. Customizable to meet project-specific needs. Simplifies the creative process for design professionals.",
      keywords: "color palette generator, palette creation, color harmony, design palettes, palette generator",
      slug: "/tool/color-palette-generator",
      component: PaletteGenerator,
      faqs: [
        { question: "How do I generate a palette?", answer: "Select a base color, and the tool generates harmonious palettes automatically." },
        { question: "What types of palettes can I create?", answer: "You can create complementary, analogous, triadic, or custom palettes." },
        { question: "Can I export the palette?", answer: "Yes, palettes can be exported in multiple formats for design use." },
        { question: "Does it support multiple base colors?", answer: "Currently, the tool generates palettes from one base color at a time." },
        { question: "Is it useful for branding?", answer: "Absolutely, it helps create consistent color schemes for branding projects." }
      ]
    },
    {
      name: "Hex to RGB Converter",
      icon: 'HashIcon',
      description: "Converts HEX color codes into RGB format quickly and accurately. Useful for developers working with web colors in various coding environments. Provides a seamless transition between color code formats. Ensures compatibility across different design and coding tools. A must-have for simplifying color conversions.",
      keywords: "HEX to RGB, HEX converter, RGB format, color conversion, HEX color codes",
      slug: "/tool/hex-to-rgb-converter",
      component: HexRgb,
      faqs: [
        { question: "How do I convert HEX to RGB?", answer: "Enter the HEX code, and the tool will instantly display the RGB equivalent." },
        { question: "Does it support transparency?", answer: "No, it only converts solid HEX colors to RGB values." },
        { question: "Can I copy the RGB values?", answer: "Yes, the tool allows copying RGB values with one click." },
        { question: "Is it accurate for all HEX codes?", answer: "Yes, the tool accurately converts all valid HEX codes to RGB." },
        { question: "Does it work offline?", answer: "No, an internet connection is required to use the tool." }
      ]
    },
    {
      name: "Color Contrast Checker",
      icon: 'Eye',
      description: "A tool for checking color contrast to ensure accessibility standards like WCAG compliance. Useful for creating readable and visually appealing text and background combinations. Helps designers meet legal and ethical standards for inclusivity. Provides contrast ratio and pass/fail results. Essential for accessible web and app design.",
      keywords: "color contrast checker, accessibility, WCAG compliance, contrast ratio, color accessibility",
      slug: "/tool/color-contrast-checker",
      component: ColorContrast,
      faqs: [
        { question: "How does the tool work?", answer: "Enter two colors, and the tool calculates the contrast ratio between them." },
        { question: "What standards does it follow?", answer: "The tool complies with WCAG 2.1 accessibility guidelines." },
        { question: "Can it check contrast for text and background?", answer: "Yes, the tool is specifically designed for text and background contrast checks." },
        { question: "Does it provide recommendations?", answer: "Yes, the tool suggests alternative colors to meet accessibility standards." },
        { question: "Is it suitable for print design?", answer: "While designed for digital media, it can also be used for print designs." }
      ]
    },
    {
      name: "Gradient Generator",
      icon: 'Eye',
      description: "Generates CSS code for creating smooth, attractive color gradients for websites or apps. Choose between linear or radial gradients and customize colors, angles, and positions. Instantly preview the gradient design. Simplifies the process of adding stylish backgrounds to web projects. Saves time for designers and developers.",
      keywords: "gradient generator, CSS gradient, create gradient, web gradients, gradient design, color gradient",
      slug: "/tool/gradient-generator",
      component: GradientGenerator,
      faqs: [
        { question: "What types of gradients can I create?", answer: "The tool supports linear and radial gradients." },
        { question: "Can I customize gradient angles?", answer: "Yes, you can adjust angles and positions for linear gradients." },
        { question: "Does the tool generate CSS code?", answer: "Yes, the tool provides CSS code for your gradient design." },
        { question: "Can I preview the gradient?", answer: "Yes, an instant preview is available for adjustments." },
        { question: "Is it suitable for app design?", answer: "Yes, it’s perfect for designing gradients for web and app interfaces." }
      ]
    },
    {
      name: "Image Color Extractor",
      icon: 'Eye',
      description: "Extracts dominant colors from images to inspire design themes or create custom palettes. Upload an image, and the tool identifies prominent colors used. Perfect for graphic designers, photographers, and branding professionals. Enables easy color identification for projects. Helps match themes or create consistent designs.",
      keywords: "image color extractor, color extraction, extract colors, color palette from image, color from photos",
      slug: "/tool/image-color-extractor",
      component: ImageColor,
      faqs: [
        { question: "How do I use the color extractor?", answer: "Upload an image, and the tool will analyze and display the dominant colors." },
        { question: "Can I save the extracted colors?", answer: "Yes, the tool provides an option to download the color palette." },
        { question: "What image formats are supported?", answer: "The tool supports JPG, PNG, and GIF formats." },
        { question: "How many colors does it extract?", answer: "The tool extracts a range of 5-10 dominant colors." },
        { question: "Is it suitable for web and print design?", answer: "Yes, the extracted colors can be used for both web and print design projects." }
      ]
    },
    {
      name: "Shades and Tints Generator",
      icon: 'Palette',
      description: "Creates lighter and darker variations (shades and tints) of a selected color. Ideal for generating cohesive color schemes with subtle differences. Helps designers achieve depth and variety in their projects. Provides HEX and RGB values for each variation. Simplifies the color customization process.",
      keywords: "shades generator, tints generator, color shades, color tints, create shades, color variation",
      slug: "/tool/shades-and-tints-generator",
      component: ShadeTint,
      faqs: [
        { question: "How do I generate shades and tints?", answer: "Select a base color, and the tool will create lighter and darker variations." },
        { question: "Can I export the variations?", answer: "Yes, you can download the generated shades and tints as a palette." },
        { question: "What formats are supported?", answer: "The tool provides variations in HEX and RGB formats." },
        { question: "Is it suitable for creating gradients?", answer: "Yes, the shades and tints can be used to design smooth gradients." },
        { question: "Can I generate multiple variations at once?", answer: "Yes, the tool generates a full range of shades and tints in one go." }
      ]
    }
  ]
  
}


  export default colorTools;
