import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JWT Parser",
  description: "Parse and validate JSON Web Tokens (JWTs) to decode, verify, and understand the contents of the token for secure authentication.",
  keywords: "jwt, token, decode, parse, authentication",
};

const ToolDetail = () => {
  const slug = "jwt-parser";

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