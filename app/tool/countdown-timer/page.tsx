import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Countdown Timer",
  description: "A customizable timer that counts down to any specified duration or event.",
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