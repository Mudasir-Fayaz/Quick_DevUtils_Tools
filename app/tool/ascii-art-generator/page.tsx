import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "ASCII Art Generator",
  description: "The ASCII Art Generator creates stunning visual designs using ASCII characters. It's perfect for artists, developers, or anyone looking to make creative textual designs. Generate art from text or images effortlessly with customizable styles. Supports various patterns for enhanced creativity. Its easy-to-use interface ensures a delightful user experience.",
  keywords: "ASCII art generator, create ASCII art, text to ASCII art, image to ASCII art, ASCII drawing, ASCII art maker, ASCII graphics tool, generate ASCII designs, artistic ASCII tool, ASCII creative utility",
};

const ToolDetail = () => {
  const slug = "ascii-art-generator";

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