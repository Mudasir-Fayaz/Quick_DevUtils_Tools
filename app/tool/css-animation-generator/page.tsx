import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "CSS Animation Generator",
  description: "Create CSS animations with keyframes and custom properties.",
};

const ToolDetail = () => {
  const slug = "css-animation-generator";

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