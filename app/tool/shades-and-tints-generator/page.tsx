import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Shades and Tints Generator",
  description: "Creates lighter and darker shades or tints of a selected color, allowing for a range of variations.",
};

const ToolDetail = () => {
  const slug = "shades-and-tints-generator";

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