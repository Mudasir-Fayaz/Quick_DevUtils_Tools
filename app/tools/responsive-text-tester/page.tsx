import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Responsive Text Tester",
  description: "Test and preview responsive text styles across different screen sizes. This tool helps you check how text will scale and adjust on various devices, ensuring readability and optimal design. It’s perfect for web developers who want to implement responsive typography using CSS. You can modify the text size, line height, and other properties to see how they adapt to different screen sizes in real-time. This ensures that your typography is consistent and legible on all devices.",
  keywords: "responsive text tester, responsive typography, text size tester, CSS text scaling, responsive text preview, typography tools, CSS font tools, text responsiveness",
};

const ToolDetail = () => {
  const slug = "responsive-text-tester";

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