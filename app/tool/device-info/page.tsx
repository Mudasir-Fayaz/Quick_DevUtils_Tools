import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Device Information",
  description: "View detailed device and browser information such as operating system, browser type, and device specifications. A great tool for developers and testers.",
  keywords: "device, browser, system, info, detection",
};

const ToolDetail = () => {
  const slug = "device-info";

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