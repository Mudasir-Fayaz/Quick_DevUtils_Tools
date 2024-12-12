import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "CSS Gradient Generator",
  description: "Create and customize CSS gradient backgrounds with ease.",
};

const ToolDetail = () => {
  const slug = "css-gradient-generator";

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