import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Responsive Test",
  description: "Test how your HTML looks and behaves across different screen sizes.",
};

const ToolDetail = () => {
  const slug = "responsive-test";

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