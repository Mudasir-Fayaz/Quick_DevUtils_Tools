import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random MAC",
  description: "Generate random MAC (Media Access Control) addresses. This tool generates random MAC addresses, which are unique identifiers assigned to network interfaces. Useful for network testing, security simulations, and device identification purposes.",
  keywords: "random, MAC, address, generate, network",
};

const ToolDetail = () => {
  const slug = "random-mac";

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