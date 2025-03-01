import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML Minifier",
  description: "HTML Minifier is a tool that compresses and minifies HTML files, reducing their size to improve website performance. By removing unnecessary spaces, line breaks, and comments, the tool significantly decreases the file size, making it ideal for web developers focused on optimizing page load times. Smaller HTML files mean faster loading, better user experience, and improved SEO rankings. This tool is essential for developers looking to optimize their websites and reduce bandwidth usage. It’s simple, fast, and efficient for any website optimization project.",
  keywords: "HTML minifier, minify HTML, compress HTML, optimize HTML, HTML compressor, HTML size reducer, web optimization, lightweight HTML, performance optimization, reduce HTML size",
};

const ToolDetail = () => {
  const slug = "html-minifier";

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