import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Hex to RGBA Converter",
  description: "Easily convert hex color codes to RGBA format for transparency control.",
};

const ToolDetail = () => {
  const slug = "hex-to-rgba-converter";

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