import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Integer",
  description: "Quickly generate random integers within a specified range. This tool is useful for generating whole numbers that are needed in programming, testing, or simulations. You can define the minimum and maximum values for the integers and generate a range of them easily.",
  keywords: "random, integer, generate, range, number",
};

const ToolDetail = () => {
  const slug = "random-integer";

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