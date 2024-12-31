import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "IPv4 Subnet Calculator",
  description: "The IPv4 Subnet Calculator helps in calculating subnet masks, network addresses, and host ranges. This tool is essential for network administrators and IT professionals who need to manage IPv4 subnets and ensure proper network configuration.",
  keywords: "ipv4, subnet, network, cidr, calculator",
};

const ToolDetail = () => {
  const slug = "ipv4-subnet";

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