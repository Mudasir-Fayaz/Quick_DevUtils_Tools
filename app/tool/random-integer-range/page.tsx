import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Integer Range",
  description: "Generate a sequence of random integers within a specified range. This tool allows you to customize the range of values and specify how many integers to generate, making it useful for simulations, gaming, and testing.",
  keywords: "random, integer, range, generate, number",
};

const ToolDetail = () => {
  const slug = "random-integer-range";

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