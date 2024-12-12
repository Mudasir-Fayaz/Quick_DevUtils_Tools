import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON Validator",
  description: "Checks and validates JSON data to ensure correct syntax and structure.",
};

const ToolDetail = () => {
  const slug = "json-validator";

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