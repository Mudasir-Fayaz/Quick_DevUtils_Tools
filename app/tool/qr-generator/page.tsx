import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "QR Code Generator",
  description: "Generate customizable QR codes for any text or URL. Choose colors, sizes, and styles to match your branding needs. Perfect for sharing links, contact info, or promotional materials. Ensures compatibility with most QR scanners. Export as high-resolution images for professional use.",
  keywords: "qr code, generator, scanner, encode",
};

const ToolDetail = () => {
  const slug = "qr-generator";

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