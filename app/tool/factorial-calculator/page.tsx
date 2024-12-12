import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Factorial Calculator",
  description: "Calculates the factorial of a number, useful for combinatorics and probability calculations.",
};

const ToolDetail = () => {
  const slug = "factorial-calculator";

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