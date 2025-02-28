import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Number",
  description: "Quickly generate random numbers of any range and size. Whether you need small numbers, large numbers, or even numbers within a specific range, this tool makes it easy to generate random numbers for your needs. Perfect for use in games, simulations, and random selection processes.",
  keywords: "random, number, generate, range, game",
};

const ToolDetail = () => {
  const slug = "random-number";

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