import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Text to Binary",
  description: "Convert text to binary ASCII representation. Ideal for programmers, cryptographers, or anyone working with binary data. It allows you to see how characters are represented in the binary numeral system. This is a handy tool for educational purposes or debugging data transmission. Perfect for those learning about low-level computing or encoding/decoding tasks.",
  keywords: "text to binary, ascii binary, binary conversion",
};

const ToolDetail = () => {
  const slug = "text-binary";

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