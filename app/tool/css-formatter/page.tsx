import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "CSS Formatter",
  description: "Beautify and format your unorganized CSS code for better readability. This tool organizes your CSS into a structured and well-indented format, making it easier to read and debug. It's perfect for working with complex or messy CSS code, helping developers to maintain clean and consistent styling. Whether you're collaborating with a team or working on a solo project, a well-formatted CSS file improves workflow. It ensures your code stays neat and understandable, making future edits simpler.",
  keywords: "CSS formatter, beautify CSS, format CSS, CSS beautifier, organize CSS, CSS code formatter, CSS code beautifier, tidy CSS code",
};

const ToolDetail = () => {
  const slug = "css-formatter";

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