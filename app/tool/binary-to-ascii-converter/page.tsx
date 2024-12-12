import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Binary to ASCII Converter",
  description: "Transforms binary code into readable ASCII text for decoding binary data efficiently.",
};

const ToolDetail = () => {
  const slug = "binary-to-ascii-converter";

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