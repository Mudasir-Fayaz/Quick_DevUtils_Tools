import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Password Strength Analyzer",
  description: "Analyze password strength and estimate crack time with detailed entropy analysis. This tool helps assess whether passwords are strong enough to resist common cracking methods. Ideal for developers and security experts working to improve system security by ensuring strong password policies.",
  keywords: "password strength, entropy, crack time, security analysis, password checker",
};

const ToolDetail = () => {
  const slug = "password-analyzer";

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