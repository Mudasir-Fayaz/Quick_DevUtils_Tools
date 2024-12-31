import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "NATO Alphabet Converter",
  description: "Convert text to NATO phonetic alphabet representation. This tool helps with clear communication, especially in noisy environments or over the phone. Useful for military personnel, aviation professionals, or anyone needing to spell out words or letters in an easy-to-understand way. It ensures accuracy when conveying important information. Ideal for both casual and professional uses.",
  keywords: "nato phonetic, military alphabet, spelling alphabet",
};

const ToolDetail = () => {
  const slug = "nato-alphabet";

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