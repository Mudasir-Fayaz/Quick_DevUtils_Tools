import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Time Difference Calculator",
  description: "Calculate the precise time difference between two dates or times. Enter start and end times to get the duration in days, hours, minutes, and seconds. Ideal for tracking project durations or planning schedules. Includes support for various time zones. Accurate and easy to use for any time gap calculation.",
  keywords: "time difference calculator, calculate time difference, time calculator, date difference tool, duration calculator, time interval, time gap calculator",
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