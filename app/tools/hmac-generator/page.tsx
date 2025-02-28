import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HMAC Generator",
  description: "Generate Hash-based Message Authentication Codes (HMAC) using various hashing functions. HMAC is a cryptographic technique used to verify the integrity and authenticity of a message or data. It is widely used in APIs and security protocols for ensuring the authenticity of data transmissions.",
  keywords: "HMAC, hash, authentication, message integrity, cryptographic hash",
};

const ToolDetail = () => {
  const slug = "hmac-generator";

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