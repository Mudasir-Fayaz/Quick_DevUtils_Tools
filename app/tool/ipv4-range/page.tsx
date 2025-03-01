import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "IPv4 Range Expander",
  description: "The IPv4 Range Expander generates IP lists from a given range of IPv4 addresses. This tool is useful for network administrators when they need to quickly expand a range of IPs for subnetting, DHCP configurations, or network planning.",
  keywords: "ipv4, range, list, expand, generator",
};

const ToolDetail = () => {
  const slug = "ipv4-range";

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