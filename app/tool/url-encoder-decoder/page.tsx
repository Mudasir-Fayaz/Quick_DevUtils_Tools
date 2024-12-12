import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "URL Encoder/Decoder",
  description: "Encode strings to URL-safe format or decode URL-encoded strings for seamless web interactions.",
};

const ToolDetail = () => {
  const slug = "url-encoder-decoder";

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