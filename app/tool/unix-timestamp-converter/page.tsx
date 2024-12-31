import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Unix Timestamp Converter",
  description: "Converts Unix timestamps to human-readable date and time formats, and vice versa. Useful for developers and those working with time-based data. Supports various time zones and formats for versatility. Enter a timestamp or date to get the equivalent format. Perfect for debugging or formatting timestamps in applications.",
  keywords: "Unix timestamp converter, timestamp to date, Unix time tool, convert Unix time, epoch time converter, Unix time utility",
};

const ToolDetail = () => {
  const slug = "unix-timestamp-converter";

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