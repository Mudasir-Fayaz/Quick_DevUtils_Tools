import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "IPv4 Address Converter",
  description: "The IPv4 Address Converter allows you to convert IPv4 addresses between decimal, binary, and hexadecimal formats. This tool is ideal for network engineers and those working with IPv4 address configurations.",
  keywords: "ipv4, conversion, decimal, binary, hexadecimal",
};

const ToolDetail = () => {
  const slug = "ipv4-converter";

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