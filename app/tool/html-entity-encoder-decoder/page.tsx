import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML Entity Encoder/Decoder",
  description: "HTML Entity Encoder/Decoder helps encode or decode special characters in HTML entities for clean and readable code. It converts characters like '<', '>', '&', and others into their corresponding HTML entities to ensure proper formatting in web content. This tool is crucial for developers who need to handle special characters in HTML, especially when working with content that may conflict with HTML syntax. It also simplifies the process of cleaning up and converting encoded characters back to their original form for better display and readability.",
  keywords: "HTML entity encoder, HTML entity decoder, encode HTML entities, decode HTML entities, special character encoding, HTML special characters, web development tools, entity converter, HTML clean-up, code tools",
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