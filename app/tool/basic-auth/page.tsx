import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Basic Auth Generator",
  description: "Generate Basic Authentication credentials in the form of a username and password combination encoded in base64 for use in web applications.",
  keywords: "basic auth, authentication, credentials, base64",
};

const ToolDetail = () => {
  const slug = "basic-auth";

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