import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Color Picker",
  description: "A tool that allows users to select a color visually and provides the corresponding HEX and RGB values.",
};

const ToolDetail = () => {
  const slug = "color-picker";

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