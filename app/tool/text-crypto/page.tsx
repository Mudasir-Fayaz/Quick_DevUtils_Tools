import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Encrypt/Decrypt Text",
  description: "Encrypt and decrypt text using various crypto algorithms like AES, TripleDES, Rabbit, and RC4. This tool provides a range of encryption and decryption methods to secure sensitive text data for storage or communication. It's ideal for developers and security professionals working on encryption tasks for web applications, API security, or file protection.",
  keywords: "encryption, decryption, AES, TripleDES, Rabbit, RC4, cipher",
};

const ToolDetail = () => {
  const slug = "text-crypto";

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