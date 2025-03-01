import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "MAC Address Generator",
  description: "The MAC Address Generator generates random or vendor-specific MAC addresses. This tool is useful for network simulations, device testing, and other tasks where MAC addresses are needed.",
  keywords: "mac address, generator, random, vendor",
};

const ToolDetail = () => {
  const slug = "mac-generator";

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