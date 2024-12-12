import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Unix Timestamp Converter",
  description: "Converts Unix timestamps to human-readable date and time formats, and vice versa.",
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