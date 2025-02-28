import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Hex to RGB Converter",
  description: "Converts HEX color codes into RGB format quickly and accurately. Useful for developers working with web colors in various coding environments. Provides a seamless transition between color code formats. Ensures compatibility across different design and coding tools. A must-have for simplifying color conversions.",
  keywords: "HEX to RGB, HEX converter, RGB format, color conversion, HEX color codes",
};

const ToolDetail = () => {
  const slug = "hex-to-rgb-converter";

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