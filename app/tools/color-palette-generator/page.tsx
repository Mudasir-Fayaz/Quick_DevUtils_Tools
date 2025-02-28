import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Color Palette Generator",
  description: "Generates harmonious color palettes from selected colors. Ideal for designers looking to create cohesive themes for websites, apps, or branding. Offers suggestions based on color theory, such as complementary or analogous palettes. Customizable to meet project-specific needs. Simplifies the creative process for design professionals.",
  keywords: "color palette generator, palette creation, color harmony, design palettes, palette generator",
};

const ToolDetail = () => {
  const slug = "color-palette-generator";

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