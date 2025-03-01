import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Digit Pair",
  description: "Generate random digit pairs from 00 to 99. This tool is useful for generating two-digit numbers for purposes such as codes, OTPs, or testing systems that require paired digits. You can customize the number of digit pairs generated based on your needs.",
  keywords: "random, digit, pair, generate, number",
};

const ToolDetail = () => {
  const slug = "random-digit-pair";

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