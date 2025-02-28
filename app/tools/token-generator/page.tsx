import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Token Generator",
  description: "A tool that generates unique tokens or keys for various applications, ensuring secure and efficient data handling. This tool is essential for generating authentication tokens, API keys, or random tokens for secure access control and communication. Ideal for developers, system administrators, and security professionals needing to generate secure and unpredictable keys or tokens for their applications.",
  keywords: "token generator, unique key generator, secure tokens, token creation, random token, authentication token, token management, cryptographic tokens, secure key generation",
};

const ToolDetail = () => {
  const slug = "token-generator";

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