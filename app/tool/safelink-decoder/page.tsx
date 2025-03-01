import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Safelink Decoder",
  description: "Decode and analyze Safelinks and URL redirects to uncover the original destination, ensuring transparency and security.",
  keywords: "safelink, redirect, decode, url",
};

const ToolDetail = () => {
  const slug = "safelink-decoder";

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