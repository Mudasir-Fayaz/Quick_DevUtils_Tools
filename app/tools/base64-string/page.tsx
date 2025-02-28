import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Base64 String Converter",
  description: "Encode and decode Base64 strings with support for various encodings. This tool simplifies encoding and decoding tasks, commonly used for data transmission and storage. It supports both text and binary data encoding, ensuring secure and efficient conversions. Perfect for developers working with APIs, web applications, or encrypted data. The tool provides a seamless interface for handling Base64 strings.",
  keywords: "base64, encode, decode, string conversion",
};

const ToolDetail = () => {
  const slug = "base64-string";

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