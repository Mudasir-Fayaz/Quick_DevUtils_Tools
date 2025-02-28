import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Keycode Info",
  description: "Get detailed information about keyboard keys and key events in JavaScript, making it useful for developers working with keyboard events.",
  keywords: "keycode, keyboard, key events, javascript",
};

const ToolDetail = () => {
  const slug = "keycode-info";

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