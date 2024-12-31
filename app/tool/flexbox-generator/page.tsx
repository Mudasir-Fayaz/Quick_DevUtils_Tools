import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Flexbox Generator",
  description: "Easily generate CSS Flexbox layouts with live previews. This tool allows you to create flexible, responsive layouts without writing complex CSS code. It gives you control over item alignment, order, and wrapping to build adaptable designs for various screen sizes. The real-time preview feature helps you visualize the layout as you make adjustments, speeding up the design process. It's an ideal tool for developers looking to implement modern CSS layouts quickly and efficiently.",
  keywords: "flexbox generator, CSS flexbox, layout generator, CSS layout tools, flexbox preview, flexbox designer, CSS alignment tools, flexbox visualizer",
};

const ToolDetail = () => {
  const slug = "flexbox-generator";

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