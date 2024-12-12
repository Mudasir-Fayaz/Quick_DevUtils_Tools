import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Calculator",
  description: "Performs basic arithmetic operations such as addition, subtraction, multiplication, and division.",
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