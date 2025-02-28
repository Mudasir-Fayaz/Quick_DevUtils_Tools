import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Alarm Clock",
  description: "An online alarm clock to set alerts for specific times with custom sounds. Use it to wake up, schedule reminders, or manage tasks. Easy-to-use interface with snooze functionality. Choose from built-in alarm sounds or upload your own. Perfect for time management and daily routines.",
  keywords: "alarm clock, online alarm clock, set alarm, digital alarm, alarm app, wake-up timer, reminder clock",
};

const ToolDetail = () => {
  const slug = "alarm-clock";

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