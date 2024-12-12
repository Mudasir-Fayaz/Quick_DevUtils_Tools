import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Hex to RGB Converter",
  description: "Converts HEX color codes into RGB format, making it easier to work with web color codes.",
};

const ToolDetail = () => {
  const slug = "hex-to-rgb-converter";

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