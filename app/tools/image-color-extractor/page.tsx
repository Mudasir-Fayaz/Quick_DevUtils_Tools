import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Image Color Extractor",
  description: "Extracts dominant colors from images to inspire design themes or create custom palettes. Upload an image, and the tool identifies prominent colors used. Perfect for graphic designers, photographers, and branding professionals. Enables easy color identification for projects. Helps match themes or create consistent designs.",
  keywords: "image color extractor, color extraction, extract colors, color palette from image, color from photos",
};

const ToolDetail = () => {
  const slug = "image-color-extractor";

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