import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML Entity Encoder/Decoder",
  description: "Encodes or decodes special characters in HTML entities for clean code.",
};

const ToolDetail = () => {
  const slug = "html-entity-encoder-decoder";

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