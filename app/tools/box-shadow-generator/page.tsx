import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Box Shadow Generator",
  description: "Generate CSS box shadows with customizable blur, spread, and offsets. This tool makes it easy to create stunning shadow effects for your elements without writing complex CSS. You can adjust the shadow's color, size, and spread to match your design needs. Box shadows add depth and visual interest to your website’s elements, improving user interaction. The preview feature helps you visualize the shadow effect before implementing it into your code.",
  keywords: "box shadow generator, CSS shadows, shadow generator, CSS box shadow, box shadow editor, CSS shadow designer, shadow customization, box shadow preview",
};

const ToolDetail = () => {
  const slug = "box-shadow-generator";

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