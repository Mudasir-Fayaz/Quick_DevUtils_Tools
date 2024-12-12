import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Regex Tester",
  description: "Quickly test and debug regular expressions against sample input strings.",
};

const ToolDetail = () => {
  const slug = "regex-tester";

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