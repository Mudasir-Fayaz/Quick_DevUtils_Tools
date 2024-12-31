import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "CSS Animation Generator",
  description: "Create CSS animations with keyframes and custom properties. This tool allows you to generate dynamic animations for web elements, offering full control over timing, duration, and transition effects. With a user-friendly interface, you can easily customize animations to suit your design needs. Whether you want to animate buttons, text, or images, this tool provides an efficient way to create engaging, smooth animations. The real-time preview feature helps you visualize the animation as you design it.",
  keywords: "CSS animation generator, CSS animations, animation creator, CSS keyframe generator, create CSS animations, CSS animation editor, animate CSS, CSS transitions",
};

const ToolDetail = () => {
  const slug = "css-animation-generator";

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