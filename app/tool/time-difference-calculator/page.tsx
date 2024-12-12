import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Time Difference Calculator",
  description: "Calculate the precise time difference between two dates or times.",
};

const ToolDetail = () => {
  const slug = "time-difference-calculator";

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