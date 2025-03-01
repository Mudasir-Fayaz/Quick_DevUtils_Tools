import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Digit",
  description: "Generate a list of random digits from 0 to 9. This tool is useful for generating PINs, OTPs, or any other use case that requires random digits. You can generate any number of random digits in a single click, making it ideal for quickly testing systems that require numerical input.",
  keywords: "random, digit, generate, number, pin",
};

const ToolDetail = () => {
  const slug = "random-digit";

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