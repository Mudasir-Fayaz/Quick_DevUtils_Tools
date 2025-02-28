import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Text to ASCII Art",
  description: "Transform plain text into creative ASCII art. This tool turns your text into visually appealing designs using ASCII characters, great for fun or decorative purposes.",
  keywords: "text to ascii art, ascii converter, ascii text generator, ascii art maker, text to art, creative ascii text",
};

const ToolDetail = () => {
  const slug = "text-to-ascii-art";

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