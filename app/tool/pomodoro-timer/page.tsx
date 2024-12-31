import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Pomodoro Timer",
  description: "A productivity timer that helps you focus using the Pomodoro technique. Work in timed intervals, typically 25 minutes, followed by short breaks. Boost efficiency and manage distractions effectively. Ideal for students, professionals, or anyone looking to improve focus. Track progress and achieve goals systematically.",
  keywords: "pomodoro timer, focus timer, productivity timer, task timer, work session timer, break timer, time management tool",
};

const ToolDetail = () => {
  const slug = "pomodoro-timer";

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