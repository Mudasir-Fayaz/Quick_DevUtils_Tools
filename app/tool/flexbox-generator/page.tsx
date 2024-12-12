import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Flexbox Generator",
  description: "Easily generate CSS Flexbox layouts with live previews.",
};

const ToolDetail = () => {
  const slug = "flexbox-generator";

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