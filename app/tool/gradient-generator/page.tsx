import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Gradient Generator",
  description: "Generates CSS code for creating smooth, attractive color gradients for websites or apps.",
};

const ToolDetail = () => {
  const slug = "gradient-generator";

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