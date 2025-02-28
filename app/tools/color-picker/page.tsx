import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Color Picker",
  description: "A tool that allows users to visually select colors and provides the corresponding HEX and RGB values. Perfect for designers, developers, and anyone working with colors. Enables precise color selection from a palette or via manual input. Useful for creating consistent color schemes. Integrates seamlessly with design projects.",
  keywords: "color picker, color selector, HEX color, RGB color, color codes, color selection",
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