import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "SVG Placeholder Generator",
  description: "Generate lightweight SVG placeholder images with customizable dimensions and colors. Ideal for use during web development to represent content that will be replaced later. Supports adding text, shapes, and background colors. Efficient and scalable for high-performance websites. Export as SVG files for seamless integration into your project.",
  keywords: "svg, placeholder, image, generator",
};

const ToolDetail = () => {
  const slug = "svg-placeholder";

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