import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Prime Number Checker",
  description: "Checks if a number is a prime number, which is only divisible by 1 and itself.",
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