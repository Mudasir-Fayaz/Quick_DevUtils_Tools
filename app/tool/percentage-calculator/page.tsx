import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Percentage Calculator",
  description: "Calculates percentages, percentage increase, and percentage decrease for various values.",
};

const ToolDetail = () => {
  const slug = "percentage-calculator";

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