import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "IPv6 ULA Generator",
  description: "The IPv6 Unique Local Address (ULA) Generator generates IPv6 ULAs, which are used for local networks and are not routed on the public internet. This tool is valuable for network administrators working with IPv6 configurations.",
  keywords: "ipv6, ula, generator, unique local address",
};

const ToolDetail = () => {
  const slug = "ipv6-ula";

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