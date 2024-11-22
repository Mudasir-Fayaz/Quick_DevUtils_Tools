import { ColorContrast, ColorPicker, GradientGenerator, HexRgb, ImageColor, PaletteGenerator, ShadeTint } from "@/components/tools/color";
import { ToolCategory } from "@/types";

const colorTools: ToolCategory = {
  name: "Color Tools",
  icon: 'Palette',
  tools: [
    {
      name: "Color Picker",
      icon: 'Eye',
      description: "A tool that allows users to select a color visually and provides the corresponding HEX and RGB values.",
      keywords: "color picker, color selector, HEX color, RGB color, color codes, color selection",
      slug: "/tool/color-picker",
      component: ColorPicker
    },
    {
      name: "Color Palette Generator",
      icon: 'Palette',
      description: "Generates harmonious color palettes from selected colors, ideal for design projects.",
      keywords: "color palette generator, palette creation, color harmony, design palettes, palette generator",
      slug: "/tool/color-palette-generator",
      component: PaletteGenerator
    },
    {
      name: "Hex to RGB Converter",
      icon: 'HashIcon',
      description: "Converts HEX color codes into RGB format, making it easier to work with web color codes.",
      keywords: "HEX to RGB, HEX converter, RGB format, color conversion, HEX color codes",
      slug: "/tool/hex-to-rgb-converter",
      component: HexRgb
    },
    {
      name: "Color Contrast Checker",
      icon: 'Eye',
      description: "A tool for checking the contrast between colors, ensuring they meet accessibility standards.",
      keywords: "color contrast checker, accessibility, WCAG compliance, contrast ratio, color accessibility",
      slug: "/tool/color-contrast-checker",
      component: ColorContrast
    },
    {
      name: "Gradient Generator",
      icon: 'Eye',
      description: "Generates CSS code for creating smooth, attractive color gradients for websites or apps.",
      keywords: "gradient generator, CSS gradient, create gradient, web gradients, gradient design, color gradient",
      slug: "/tool/gradient-generator",
      component: GradientGenerator
    },
    {
      name: "Image Color Extractor",
      icon: 'Eye',
      description: "Extracts a range of dominant colors from an image, useful for design inspiration or theme creation.",
      keywords: "image color extractor, color extraction, extract colors, color palette from image, color from photos",
      slug: "/tool/image-color-extractor",
      component: ImageColor
    },
    {
      name: "Shades and Tints Generator",
      icon: 'Palette',
      description: "Creates lighter and darker shades or tints of a selected color, allowing for a range of variations.",
      keywords: "shades generator, tints generator, color shades, color tints, create shades, color variation",
      slug: "/tool/shades-and-tints-generator",
      component: ShadeTint
    }
  ]
}


  export default colorTools;
