import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "WiFi QR Code Generator",
  description: "Create QR codes to simplify WiFi connections for guests and users. Input network name, password, and security type to generate a QR code. Perfect for businesses or events where you want easy network access. Scanning the QR code connects devices automatically to your network. Export as an image for printing or sharing.",
  keywords: "wifi, qr code, network, connection",
};

const ToolDetail = () => {
  const slug = "wifi-qr";

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