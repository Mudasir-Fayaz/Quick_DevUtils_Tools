import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Docker Run to Compose",
  description: "The Docker Run to Compose tool helps developers easily convert Docker run commands into docker-compose.yml files. It simplifies the transition from individual container commands to a more structured Docker Compose setup. By automatically generating the Compose file, it saves time and reduces manual effort. Ideal for developers who are new to Docker Compose or for those looking to streamline their container orchestration workflow. This tool is essential for developers working with Docker containers on complex projects.",
  keywords: "docker, compose, container, conversion",
};

const ToolDetail = () => {
  const slug = "docker-compose";

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