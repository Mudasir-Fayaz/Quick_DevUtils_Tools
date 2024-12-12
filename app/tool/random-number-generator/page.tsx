import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Number Generator",
  description: "Generates a random number within a specified range, useful for simulations and probability studies.",
};

const ToolDetail = () => {
  const slug = "random-number-generator";

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