import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Color Contrast Checker",
  description: "A tool for checking the contrast between colors, ensuring they meet accessibility standards.",
};

const ToolDetail = () => {
  const slug = "color-contrast-checker";

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