import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Time",
  description: "Generate random clock times. This tool generates random times within a specified range of hours and minutes. Ideal for creating test data for time-based applications, simulations, or event scheduling.",
  keywords: "random, time, generate, clock, testing",
};

const ToolDetail = () => {
  const slug = "random-time";

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