import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "UUID Generator",
  description: "Generate various versions of Universally Unique Identifiers (UUIDs) with customizable options. UUIDs are used to uniquely identify objects or entities in databases, APIs, and distributed systems. This tool supports multiple versions of UUIDs, allowing developers to create IDs that are unique and globally recognizable.",
  keywords: "uuid, guid, unique identifier, v1, v3, v4, v5, nil uuid, random uuid",
};

const ToolDetail = () => {
  const slug = "uuid-generator";

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