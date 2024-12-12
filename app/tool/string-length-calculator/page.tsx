import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "String Length Calculator",
  description: "Quickly calculate the number of characters in a string, including spaces and special symbols.",
};

const ToolDetail = () => {
  const slug = "string-length-calculator";

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