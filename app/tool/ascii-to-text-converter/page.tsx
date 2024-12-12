import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "ASCII to Text Converter",
  description: "Easily convert ASCII codes into readable text, enabling seamless decoding of ASCII-based data.",
};

const ToolDetail = () => {
  const slug = "ascii-to-text-converter";

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