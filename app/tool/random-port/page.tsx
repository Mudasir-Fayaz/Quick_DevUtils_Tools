import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Port Generator",
  description: "The Random Port Generator helps developers generate available ports for development purposes. It ensures that the generated ports are not in use, preventing conflicts. This tool is particularly useful for setting up development environments where unique ports are necessary. With an intuitive interface, users can quickly generate ports without worrying about overlaps. It’s a must-have for software engineers and network administrators setting up local services or testing applications.",
  keywords: "port, random, network, development",
};

const ToolDetail = () => {
  const slug = "random-port";

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