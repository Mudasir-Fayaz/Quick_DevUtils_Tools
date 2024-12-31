import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Color Converter",
  description: "Convert colors between different formats such as HEX, RGB, HSL, and CMYK. This tool is essential for designers, developers, and anyone working with digital art or web development. It provides accurate color conversion, ensuring consistency across different platforms and media. Easily switch between color formats to find the best match for your project. Ideal for graphic design, web design, and UI/UX work.",
  keywords: "color conversion, hex, rgb, hsl, cmyk",
};

const ToolDetail = () => {
  const slug = "color";

  if (!slug) {
    notFound();
  }

  return (
    <>
      <RenderTool slug={slug} />
    </>
  );
};

export default ToolDetail;