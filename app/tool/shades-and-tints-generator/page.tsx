import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Shades and Tints Generator",
  description: "Creates lighter and darker variations (shades and tints) of a selected color. Ideal for generating cohesive color schemes with subtle differences. Helps designers achieve depth and variety in their projects. Provides HEX and RGB values for each variation. Simplifies the color customization process.",
  keywords: "shades generator, tints generator, color shades, color tints, create shades, color variation",
};

const ToolDetail = () => {
  const slug = "shades-and-tints-generator";

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