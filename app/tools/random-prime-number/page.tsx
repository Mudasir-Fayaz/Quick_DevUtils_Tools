import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Prime Number",
  description: "Generate random prime numbers. This tool allows you to generate prime numbers within a specified range. Prime numbers are useful in cryptography, algorithms, and other applications requiring prime factors.",
  keywords: "random, prime, number, generate, math",
};

const ToolDetail = () => {
  const slug = "random-prime-number";

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