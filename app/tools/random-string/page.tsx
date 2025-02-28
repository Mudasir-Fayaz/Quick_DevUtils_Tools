import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random String",
  description: "Generate random strings of arbitrary length and complexity. This tool lets you generate alphanumeric or custom strings with the option to include special characters. It’s great for creating random tokens, user identifiers, or any other type of string data you need for your web or app development.",
  keywords: "string, random, generate, text, identifier",
};

const ToolDetail = () => {
  const slug = "random-string";

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