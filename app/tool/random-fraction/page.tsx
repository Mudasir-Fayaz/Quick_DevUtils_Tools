import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Fraction",
  description: "Quickly generate random fractions. You can generate fractions with custom numerators and denominators or let the tool randomly pick values for you. Perfect for mathematical testing, games, or any other project requiring random fractions.",
  keywords: "random, fraction, generate, number, math",
};

const ToolDetail = () => {
  const slug = "random-fraction";

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