import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Hash Text",
  description: "Generates secure hash values for text using various algorithms. This tool helps you securely hash passwords, sensitive data, or any other text using algorithms like MD5, SHA-256, and more. It is useful for storing data securely and verifying integrity. Ideal for developers and security experts working with data encryption and hashing techniques.",
  keywords: "hash generator, text hashing tool, secure hash generator, hash algorithms, data encryption, text encryption, hash encoding, secure text tools, cryptographic hash",
};

const ToolDetail = () => {
  const slug = "hash-text";

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