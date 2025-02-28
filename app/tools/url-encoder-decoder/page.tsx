import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "URL Encoder/Decoder",
  description: "The URL Encoder/Decoder encodes strings to URL-safe format or decodes URL-encoded strings for seamless web interactions. This tool helps ensure that URLs are properly formatted and readable.",
  keywords: "url encoder, url decoder, encode url, decode url, url-safe text, url formatting, text to url, url conversion, decode web links, encode text for url",
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