import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Color Palette Generator",
  description: "Generates harmonious color palettes from selected colors, ideal for design projects.",
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