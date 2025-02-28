import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Crontab Generator",
  description: "Create and validate crontab expressions with ease using the Crontab Generator. This tool allows you to generate cron jobs with flexible scheduling options for automating tasks on Unix-like systems. Whether you're setting up daily, weekly, or custom interval jobs, the Crontab Generator simplifies the syntax. It also validates your expression to ensure it’s correct, saving time and avoiding errors. This is an essential tool for system administrators and developers working with automated tasks.",
  keywords: "cron, schedule, linux, automation",
};

const ToolDetail = () => {
  const slug = "crontab";

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