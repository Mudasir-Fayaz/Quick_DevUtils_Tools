import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Bytes",
  description: "Generate random bytes. This tool generates random byte sequences for use in encryption, data generation, or testing. You can specify the length of the byte sequence or generate it randomly.",
  keywords: "random, bytes, generate, cryptography, data",
};

const ToolDetail = () => {
  const slug = "random-bytes";

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