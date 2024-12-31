import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Base64 File Converter",
  description: "Convert files to and from Base64 format. The tool makes it easy to encode files such as images, documents, or any binary files to Base64 format for easier sharing and storage. It also decodes Base64 encoded files back into their original form. This is a must-have for developers and those dealing with file transmission over networks.",
  keywords: "base64, file conversion, encode file, decode file",
};

const ToolDetail = () => {
  const slug = "base64-file";

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