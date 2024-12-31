import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Number Generator",
  description: "Random Number Generator generates a random number within a specified range, useful for simulations, probability studies, and random selection tasks. This tool is ideal for creating random values for lotteries, experiments, or games.",
  keywords: "random number generator, rng, random number, number generator, randomizer, random range, random value",
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