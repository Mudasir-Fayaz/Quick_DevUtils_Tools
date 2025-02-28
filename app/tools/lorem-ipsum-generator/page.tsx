import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Lorem Ipsum Generator",
  description: "The Lorem Ipsum Generator produces placeholder text for use in design mockups, templates, and prototypes. It's commonly used in design and web development projects to fill empty spaces with text.",
  keywords: "lorem ipsum generator, placeholder text, filler text, dummy text generator, mockup text, design text generator",
};

const ToolDetail = () => {
  const slug = "lorem-ipsum-generator";

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