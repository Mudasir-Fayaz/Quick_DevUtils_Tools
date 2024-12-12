import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Image Color Extractor",
  description: "Extracts a range of dominant colors from an image, useful for design inspiration or theme creation.",
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