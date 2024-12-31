import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "MIME Types",
  description: "A comprehensive MIME type reference and lookup tool. This tool helps identify the content type of files based on their extensions or headers.",
  keywords: "mime, content type, file type, media type",
};

const ToolDetail = () => {
  const slug = "mime-types";

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