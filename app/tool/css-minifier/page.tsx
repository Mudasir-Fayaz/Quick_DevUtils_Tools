import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "CSS Minifier",
  description: "Quickly minify CSS to reduce file size and improve loading speeds. By removing unnecessary spaces, comments, and characters, this tool ensures your CSS is compact and efficient. It's perfect for developers looking to optimize their websites for better performance. The minified code is ideal for production environments where loading times are crucial. Use it to reduce the size of your CSS files without losing any functionality or design elements.",
  keywords: "CSS minifier, minify CSS, compress CSS, reduce CSS size, CSS optimization, online CSS minifier, CSS file compressor, CSS code minifier",
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