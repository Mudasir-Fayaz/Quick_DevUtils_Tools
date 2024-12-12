import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Pomodoro Timer",
  description: "A productivity timer that helps you focus using the Pomodoro technique.",
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