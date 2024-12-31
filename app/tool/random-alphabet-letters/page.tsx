import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Alphabet Letters",
  description: "Quickly generate one or more random alphabet letters. This tool is useful for generating random characters for games, testing, or creative projects. Whether you need a single random letter or multiple letters, this tool allows you to customize the number of letters generated and the type (uppercase or lowercase). Perfect for generating random strings, passwords, or just for fun!",
  keywords: "random, alphabet, letters, generate, characters",
};

const ToolDetail = () => {
  const slug = "random-alphabet-letters";

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