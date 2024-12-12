import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Time Zone Converter",
  description: "Easily convert time between multiple time zones to plan events or meetings.",
};

const ToolDetail = () => {
  const slug = "time-zone-converter";

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