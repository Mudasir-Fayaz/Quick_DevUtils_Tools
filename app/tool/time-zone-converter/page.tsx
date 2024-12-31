import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Time Zone Converter",
  description: "Easily convert time between multiple time zones to plan events or meetings. Enter the source and target time zones for instant conversions. Useful for global teams, travelers, and event planners. Displays accurate local times across regions. Includes daylight saving time adjustments for precision.",
  keywords: "time zone converter, timezone clock, convert time, world clock, time converter, global time, timezone tool",
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