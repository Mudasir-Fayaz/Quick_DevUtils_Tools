import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "MAC Address Lookup",
  description: "The MAC Address Lookup tool lets you look up vendor information from MAC addresses. This is useful for network troubleshooting and identifying hardware manufacturers based on their MAC address.",
  keywords: "mac address, vendor, lookup, manufacturer",
};

const ToolDetail = () => {
  const slug = "mac-lookup";

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