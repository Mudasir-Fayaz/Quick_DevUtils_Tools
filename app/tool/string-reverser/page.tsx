import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "String Reverser",
  description: "Reverse the characters in a string for fun or to analyze text backward.",
};

const ToolDetail = () => {
  const slug = "string-reverser";

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