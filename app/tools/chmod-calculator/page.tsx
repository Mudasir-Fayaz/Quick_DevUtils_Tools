import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Chmod Calculator",
  description: "Chmod Calculator helps you calculate Unix file permissions, allowing you to set access levels for different users and groups. Whether you need to grant or restrict permissions, this tool simplifies the process. It converts numeric permissions into symbolic format and vice versa, making it easier to understand and manage Unix file permissions. Perfect for developers and system administrators working with Linux and Unix systems, this tool ensures that file access control is both accurate and secure.",
  keywords: "chmod, unix, permissions, linux",
};

const ToolDetail = () => {
  const slug = "chmod-calculator";

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