import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Date",
  description: "Generate random calendar dates. This tool allows you to generate random dates within a specified range. Useful for testing, simulations, or generating historical or future dates for various applications.",
  keywords: "random, date, generate, calendar, testing",
};

const ToolDetail = () => {
  const slug = "random-date";

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