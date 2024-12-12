import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Box Shadow Generator",
  description: "Generate CSS box shadows with customizable blur, spread, and offsets.",
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