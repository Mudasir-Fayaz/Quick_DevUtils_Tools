import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "CSS Gradient Generator",
  description: "Create and customize CSS gradient backgrounds with ease. The CSS Gradient Generator allows you to design vibrant gradient effects with just a few clicks. Customize the angle, color stops, and direction of the gradient for unique background designs. It’s perfect for giving your website a modern and professional look with beautiful gradient backgrounds. The real-time preview feature allows you to see your changes as you make them, ensuring a smooth design experience.",
  keywords: "CSS gradient generator, gradient backgrounds, create gradients, CSS background generator, gradient editor, CSS gradient tool, gradient designer, color gradient generator",
};

const ToolDetail = () => {
  const slug = "css-gradient-generator";

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