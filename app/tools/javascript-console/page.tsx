import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JavaScript Console",
  description: "JavaScript Console is a tool that allows you to run and test JavaScript code snippets in a browser-like environment, making it ideal for quick debugging and testing. It enables you to execute JavaScript directly within the tool and view the results instantly. This tool is perfect for developers who need a fast and easy way to test JavaScript code without opening a browser's developer tools.",
  keywords: "JavaScript console, run JavaScript, test JavaScript, JS console, JavaScript debugger, execute JS code, JavaScript snippets",
};

const ToolDetail = () => {
  const slug = "javascript-console";

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