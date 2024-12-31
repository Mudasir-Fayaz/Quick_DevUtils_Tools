import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "User Agent Parser",
  description: "Parse and analyze User Agent strings to extract details about the browser, operating system, and device being used.",
  keywords: "user agent, browser, device, parser",
};

const ToolDetail = () => {
  const slug = "user-agent";

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