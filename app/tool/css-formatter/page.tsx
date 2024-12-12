import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "CSS Formatter",
  description: "Beautifies and formats unorganized CSS code for better readability.",
};

const ToolDetail = () => {
  const slug = "css-formatter";

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