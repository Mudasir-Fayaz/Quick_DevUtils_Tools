import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Base64 Encoder/Decoder",
  description: "Easily encode text to Base64 or decode Base64 back to text for secure data transformation.",
};

const ToolDetail = () => {
  const slug = "base64-encoder-decoder";

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