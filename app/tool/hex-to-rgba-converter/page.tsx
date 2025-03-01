import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Hex to RGBA Converter",
  description: "Easily convert hex color codes to RGBA format for transparency control. This tool allows you to quickly convert any hex color code to its corresponding RGBA value, enabling you to control the transparency of elements. It's an essential tool for web developers working with color overlays, backgrounds, and elements requiring opacity. The RGBA format offers flexibility in adding transparency to colors for modern web designs. Simply enter a hex code and get the RGBA color code in seconds.",
  keywords: "hex to RGBA converter, convert hex to RGBA, hex color converter, RGBA color tool, hex to RGBA online, color format converter, CSS color tools, hex to RGBA conversion",
};

const ToolDetail = () => {
  const slug = "hex-to-rgba-converter";

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