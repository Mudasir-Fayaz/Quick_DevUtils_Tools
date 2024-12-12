import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Stopwatch",
  description: "A simple and efficient stopwatch to measure elapsed time for any activity.",
};

const ToolDetail = () => {
  const slug = "stopwatch";

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