import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JavaScript Obfuscator",
  description: "JavaScript Obfuscator helps secure your JavaScript code by obfuscating it, making it difficult to read or reverse-engineer. This tool transforms your source code into a scrambled and complex version, protecting intellectual property and preventing unauthorized use or tampering. Ideal for developers who need to protect their code in production environments.",
  keywords: "JavaScript obfuscator, obfuscate JavaScript, secure JavaScript, JavaScript security, protect JavaScript code, JavaScript encryption",
};

const ToolDetail = () => {
  const slug = "javascript-obfuscator";

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