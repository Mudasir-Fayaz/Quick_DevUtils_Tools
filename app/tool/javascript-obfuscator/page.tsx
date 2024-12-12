import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JavaScript Obfuscator",
  description: "Secure your JavaScript code by obfuscating it, making it difficult to read or reverse-engineer.",
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