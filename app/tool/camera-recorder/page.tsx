import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Camera Recorder",
  description: "Record videos and take snapshots directly from your device's camera. Supports high-resolution recording with multiple format options. Great for creating quick recordings, tutorials, or capturing moments on the go. Offers easy controls for pausing, resuming, and saving recordings. Compatible with most modern browsers and devices.",
  keywords: "camera, recorder, video, snapshot",
};

const ToolDetail = () => {
  const slug = "camera-recorder";

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