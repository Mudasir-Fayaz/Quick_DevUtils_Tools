import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Gradient Generator",
  description: "Generates CSS code for creating smooth, attractive color gradients for websites or apps. Choose between linear or radial gradients and customize colors, angles, and positions. Instantly preview the gradient design. Simplifies the process of adding stylish backgrounds to web projects. Saves time for designers and developers.",
  keywords: "gradient generator, CSS gradient, create gradient, web gradients, gradient design, color gradient",
};

const ToolDetail = () => {
  const slug = "gradient-generator";

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