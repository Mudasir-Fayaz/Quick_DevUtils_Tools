import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Decimal Number",
  description: "Generate random decimal numbers. This tool allows you to generate decimal numbers (base-10) with specified precision or within a specified range. It's ideal for financial applications, simulations, or any task requiring random decimal numbers.",
  keywords: "random, decimal, number, generate, finance",
};

const ToolDetail = () => {
  const slug = "random-decimal-number";

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