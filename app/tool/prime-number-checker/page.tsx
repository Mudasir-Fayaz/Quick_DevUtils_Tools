import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Prime Number Checker",
  description: "Prime Number Checker helps determine if a number is prime, meaning it is only divisible by 1 and itself. This tool is useful in number theory, cryptography, and other areas of mathematics where prime numbers play a significant role.",
  keywords: "prime number checker, check prime number, is prime, prime number, prime number verification, number theory",
};

const ToolDetail = () => {
  const slug = "prime-number-checker";

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