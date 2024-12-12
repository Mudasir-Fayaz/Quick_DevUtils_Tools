import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "CSS Minifier",
  description: "Quickly minify CSS to reduce file size and improve loading speeds.",
};

const ToolDetail = () => {
  const slug = "css-minifier";

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