import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Color Contrast Checker",
  description: "A tool for checking color contrast to ensure accessibility standards like WCAG compliance. Useful for creating readable and visually appealing text and background combinations. Helps designers meet legal and ethical standards for inclusivity. Provides contrast ratio and pass/fail results. Essential for accessible web and app design.",
  keywords: "color contrast checker, accessibility, WCAG compliance, contrast ratio, color accessibility",
};

const ToolDetail = () => {
  const slug = "color-contrast-checker";

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