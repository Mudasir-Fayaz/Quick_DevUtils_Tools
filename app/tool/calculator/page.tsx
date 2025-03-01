import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Calculator",
  description: "Calculator performs basic arithmetic operations such as addition, subtraction, multiplication, and division. It is a simple and easy-to-use tool for anyone needing to solve basic math problems, whether for school, work, or personal use. The calculator works efficiently for quick computations and everyday calculations.",
  keywords: "calculator, math calculator, basic math, arithmetic operations, addition, subtraction, multiplication, division",
};

const ToolDetail = () => {
  const slug = "calculator";

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