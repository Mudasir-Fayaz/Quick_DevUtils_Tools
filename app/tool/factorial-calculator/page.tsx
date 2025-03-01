import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Factorial Calculator",
  description: "Factorial Calculator calculates the factorial of a number, useful for combinatorics, probability calculations, and algebra. Factorials are commonly used in permutations, combinations, and other mathematical concepts that involve counting or arranging objects.",
  keywords: "factorial calculator, factorial, combinatorics, math factorial, n factorial, factorial math, probability calculations",
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