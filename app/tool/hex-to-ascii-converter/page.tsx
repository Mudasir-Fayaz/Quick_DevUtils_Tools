import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Hex to ASCII Converter",
  description: "Effortlessly convert hexadecimal values into readable ASCII characters for decoding or data analysis.",
};

const ToolDetail = () => {
  const slug = "hex-to-ascii-converter";

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