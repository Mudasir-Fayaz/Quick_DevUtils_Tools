import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Base64 Encoder/Decoder",
  description: "The Base64 Encoder/Decoder allows you to easily encode text to Base64 or decode Base64 back to text. This tool is commonly used for secure data transformation and encoding sensitive information.",
  keywords: "base64 encoder, base64 decoder, encode text, decode text, secure encoding, text transformation, base64 tool, base64 converter, data encoding, text to base64, decode base64 string",
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