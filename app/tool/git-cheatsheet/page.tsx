import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Git Cheatsheet",
  description: "The Git Cheatsheet is a comprehensive reference guide for Git commands and their usage. It includes common Git commands with examples, helping developers manage version control efficiently. Whether you’re a beginner or an experienced user, this tool simplifies Git’s complex commands into easy-to-understand formats. It’s perfect for quick look-ups, reminders, and understanding advanced Git functionality. Save time and increase productivity with this ultimate Git reference tool.",
  keywords: "git, commands, cheatsheet, reference, version control",
};

const ToolDetail = () => {
  const slug = "git-cheatsheet";

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