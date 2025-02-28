import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "URL Encoder",
  description: "Encode and decode URLs to ensure safe transmission across the web. This tool helps handle special characters in URLs to prevent errors.",
  keywords: "url, encode, decode, web, uri",
};

const ToolDetail = () => {
  const slug = "url-encoder";

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