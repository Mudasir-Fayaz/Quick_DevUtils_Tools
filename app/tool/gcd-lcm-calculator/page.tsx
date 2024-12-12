import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "GCD & LCM Calculator",
  description: "Finds the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two or more numbers.",
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