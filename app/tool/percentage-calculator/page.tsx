import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Percentage Calculator",
  description: "Percentage Calculator calculates percentages, percentage increase, and percentage decrease for various values. It's ideal for quickly determining percentage values, changes, and differences. Whether you're calculating a discount, tax, or profit margin, this tool simplifies the process.",
  keywords: "percentage calculator, percentage increase, percentage decrease, percent change, percentage calculations, percent, percentage difference",
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