import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Alarm Clock",
  description: "An online alarm clock to set alerts for specific times with custom sounds.",
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