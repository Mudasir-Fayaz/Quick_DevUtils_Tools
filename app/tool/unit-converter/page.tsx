import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Unit Converter",
  description: "Converts between various units of measurement such as length, weight, and temperature.",
};

const ToolDetail = () => {
  const slug = "unit-converter";

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