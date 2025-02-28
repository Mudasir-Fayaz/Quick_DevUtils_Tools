import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Stopwatch",
  description: "A simple and efficient stopwatch to measure elapsed time for any activity. Ideal for workouts, competitions, or tracking event durations. Features start, stop, and reset options for easy use. Provides precise timing to milliseconds for accurate measurements. Use it for personal or professional tasks.",
  keywords: "stopwatch, online stopwatch, timer, time tracker, event timing, activity timing, stopwatch utility",
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