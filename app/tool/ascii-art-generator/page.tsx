import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "ASCII Art Generator",
  description: "Generates stunning ASCII art from text or images, perfect for creative or aesthetic purposes.",
};

const ToolDetail = () => {
  const slug = "ascii-art-generator";

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