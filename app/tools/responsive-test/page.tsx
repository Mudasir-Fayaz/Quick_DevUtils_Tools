import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Responsive Test",
  description: "Responsive Test is a tool that lets you test how your HTML looks and behaves across different screen sizes. It’s crucial for ensuring that your web content is mobile-friendly and displays correctly on various devices, such as tablets, smartphones, and desktops. This tool simulates different screen resolutions, allowing you to view how your web pages adapt and identify potential issues in your layout or design. Whether you're a web developer or designer, this tool helps you deliver a seamless user experience across all devices and screen sizes.",
  keywords: "responsive test, screen size tester, test HTML responsiveness, responsive HTML, mobile-friendly test, device responsiveness, web design test, adaptive layouts, online responsive tool, screen resolution tester",
};

const ToolDetail = () => {
  const slug = "responsive-test";

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