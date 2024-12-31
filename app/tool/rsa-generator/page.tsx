import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "RSA Key Pair Generator",
  description: "Generate secure RSA public/private key pairs with customizable key sizes. RSA is a widely used public-key encryption algorithm, essential for secure data exchange in many applications, including digital signatures, SSL/TLS, and email encryption.",
  keywords: "rsa, public key, private key, key pair, certificate, encryption",
};

const ToolDetail = () => {
  const slug = "rsa-generator";

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