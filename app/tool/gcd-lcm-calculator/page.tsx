import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "GCD & LCM Calculator",
  description: "GCD & LCM Calculator finds the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two or more numbers. These mathematical operations are essential in simplifying fractions, solving problems in number theory, and finding common denominators in fractions.",
  keywords: "gcd calculator, lcm calculator, greatest common divisor, least common multiple, gcd, lcm, math gcd, math lcm, number theory",
};

const ToolDetail = () => {
  const slug = "gcd-lcm-calculator";

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