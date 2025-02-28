import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Roman Numeral Converter",
  description: "Convert between Roman numerals and decimal numbers. Ideal for learning and converting numbers in historical contexts. Useful for students, historians, and those working with traditional documents. The tool ensures accurate conversion between Roman numerals and decimals. It is particularly beneficial when working with classical literature or ancient texts.",
  keywords: "roman numerals, decimal, number conversion",
};

const ToolDetail = () => {
  const slug = "roman-numeral";

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