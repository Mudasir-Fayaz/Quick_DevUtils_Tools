import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Lorem Ipsum Generator",
  description: "Generates placeholder text for use in design mockups, templates, and prototypes.",
};

const ToolDetail = () => {
  const slug = "lorem-ipsum-generator";

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