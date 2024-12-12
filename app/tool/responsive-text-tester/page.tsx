import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Responsive Text Tester",
  description: "Test and preview responsive text styles across different screen sizes.",
};

const ToolDetail = () => {
  const slug = "responsive-text-tester";

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