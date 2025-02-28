import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "String Reverser",
  description: "The String Reverser tool allows you to reverse the characters in a string. It's useful for fun text manipulation or analyzing text backward for specific patterns or cryptography.",
  keywords: "string reverser, reverse text, reverse characters, text flip, reverse string tool, backward text, string manipulation, flip string, mirror text, reverse word order",
};

const ToolDetail = () => {
  const slug = "string-reverser";

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