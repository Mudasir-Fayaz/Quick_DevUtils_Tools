import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random IP",
  description: "Generate random IP addresses. This tool generates random IPv4 addresses within a specified range, useful for network testing, security simulations, or other IP-related tasks.",
  keywords: "random, IP, address, generate, network",
};

const ToolDetail = () => {
  const slug = "random-ip";

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