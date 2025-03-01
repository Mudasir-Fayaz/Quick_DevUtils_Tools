import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Countdown Timer",
  description: "A customizable timer that counts down to any specified duration or event. Set timers for workouts, cooking, studying, or any other task. Provides visual and sound alerts when time is up. Easy to use and flexible for various scenarios. Ideal for time-sensitive activities or reminders.",
  keywords: "countdown timer, countdown clock, timer app, event timer, countdown tool, custom timer, countdown utility",
};

const ToolDetail = () => {
  const slug = "countdown-timer";

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